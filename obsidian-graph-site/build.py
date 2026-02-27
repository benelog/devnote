#!/usr/bin/env python3
"""Build a static website from an Obsidian vault."""

import argparse
import json
import re
import shutil
from pathlib import Path

TOOL_DIR = Path(__file__).parent
WIKILINK_RE = re.compile(r'\[\[([^\]|]+)(?:\|([^\]]+))?\]\]')


def load_config(source: Path) -> dict:
    config = {"title": source.name, "subtitle": "", "lang": "en", "output": "public"}
    config_path = source / "site.json"
    if config_path.exists():
        with open(config_path, encoding="utf-8") as f:
            config.update(json.load(f))
    return config


def scan_vault(source: Path) -> dict:
    """Scan all .md files. Return {stem: {"path": Path, "content": str}}."""
    content_dir = source / "content"
    scan_dir = content_dir if content_dir.is_dir() else source
    pages = {}
    for md in sorted(scan_dir.glob("*.md")):
        pages[md.stem] = {"path": md, "content": md.read_text(encoding="utf-8")}
    return pages


def extract_title(stem: str, content: str) -> str:
    """Derive page title from filename.

    In this vault, H1 headings are section headings, not page titles,
    so we always use the filename as the title.
    """
    return stem.replace('-', ' ')


def extract_wikilinks(content: str) -> list:
    """Extract all wikilink targets from content."""
    return [m.group(1) for m in WIKILINK_RE.finditer(content)]


def build_graph(pages: dict) -> dict:
    """Build nodes and edges for D3 graph."""
    links_map = {}
    for stem, info in pages.items():
        links_map[stem] = extract_wikilinks(info["content"])

    edges_set = set()
    for src, targets in links_map.items():
        for tgt in targets:
            if tgt in pages:
                edge = tuple(sorted([src, tgt]))
                edges_set.add(edge)

    link_counts = {}
    for a, b in edges_set:
        link_counts[a] = link_counts.get(a, 0) + 1
        link_counts[b] = link_counts.get(b, 0) + 1

    nodes = []
    for stem in pages:
        title = extract_title(stem, pages[stem]["content"])
        nodes.append({
            "id": stem,
            "title": title,
            "count": link_counts.get(stem, 0),
        })

    edges = [{"source": a, "target": b} for a, b in sorted(edges_set)]
    return {"nodes": nodes, "links": edges}


def build_backlinks(pages: dict) -> dict:
    """Build {stem: [stems that link to it]}."""
    backlinks = {stem: [] for stem in pages}
    for stem, info in pages.items():
        for target in extract_wikilinks(info["content"]):
            if target in backlinks and target != stem:
                backlinks[target].append(stem)
    for stem in backlinks:
        backlinks[stem] = sorted(set(backlinks[stem]))
    return backlinks


def convert_markdown(text: str) -> str:
    """Convert markdown to HTML using the markdown library, with fallback."""
    try:
        import markdown as md_lib
        return md_lib.markdown(
            text,
            extensions=["fenced_code", "tables", "codehilite"],
            extension_configs={"codehilite": {"guess_lang": False}},
        )
    except ImportError:
        return _fallback_convert(text)


def _fallback_convert(text: str) -> str:
    """Minimal markdown to HTML fallback."""
    lines = text.split('\n')
    html_lines = []
    in_code = False
    in_list = False
    in_paragraph = False

    for line in lines:
        if line.startswith('```'):
            if in_paragraph:
                html_lines.append('</p>')
                in_paragraph = False
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            if in_code:
                html_lines.append('</code></pre>')
                in_code = False
            else:
                lang = line[3:].strip()
                cls = f' class="language-{lang}"' if lang else ''
                html_lines.append(f'<pre><code{cls}>')
                in_code = True
            continue

        if in_code:
            html_lines.append(line)
            continue

        if not line.strip():
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            if in_paragraph:
                html_lines.append('</p>')
                in_paragraph = False
            continue

        heading = re.match(r'^(#{1,6})\s+(.+)', line)
        if heading:
            if in_paragraph:
                html_lines.append('</p>')
                in_paragraph = False
            level = len(heading.group(1))
            html_lines.append(f'<h{level}>{heading.group(2)}</h{level}>')
            continue

        list_item = re.match(r'^[-*]\s+(.+)', line)
        if list_item:
            if in_paragraph:
                html_lines.append('</p>')
                in_paragraph = False
            if not in_list:
                html_lines.append('<ul>')
                in_list = True
            html_lines.append(f'<li>{list_item.group(1)}</li>')
            continue

        # Regular text
        if not in_paragraph:
            html_lines.append('<p>')
            in_paragraph = True
        html_lines.append(line)

    if in_code:
        html_lines.append('</code></pre>')
    if in_list:
        html_lines.append('</ul>')
    if in_paragraph:
        html_lines.append('</p>')

    result = '\n'.join(html_lines)
    # Inline formatting
    result = re.sub(r'`([^`]+)`', r'<code>\1</code>', result)
    result = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', result)
    result = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', result)
    # Auto-link bare URLs wrapped in angle brackets
    result = re.sub(r'&lt;(https?://[^&]+)&gt;', r'<a href="\1">\1</a>', result)
    # Markdown links
    result = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', result)
    return result


def process_wikilinks(html: str, pages: dict) -> str:
    """Replace [[wikilink]] with <a href>."""
    def replace(m):
        target = m.group(1)
        display = m.group(2) or target.replace('-', ' ')
        if target in pages:
            return f'<a href="{target}.html" class="wikilink">{display}</a>'
        return f'<span class="broken-link">{display}</span>'
    return WIKILINK_RE.sub(replace, html)


def downgrade_headings(html: str) -> str:
    """Downgrade H1→H2, H2→H3, etc. since the template provides the page H1."""
    def replace_heading(m):
        level = min(int(m.group(1)) + 1, 6)
        return f'<h{level}>{m.group(2)}</h{level}>'
    return re.sub(r'<h([1-5])>(.*?)</h\1>', replace_heading, html)


def render_related(wikilinks: list, pages: dict) -> str:
    """Render a Related section as HTML links."""
    if not wikilinks:
        return ""
    items = []
    for target in sorted(set(wikilinks)):
        if target in pages:
            display = extract_title(target, pages[target]["content"])
            items.append(f'<li><a href="{target}.html">{display}</a></li>')
    if not items:
        return ""
    return '<section class="related"><h2>Related</h2><ul>' + '\n'.join(items) + '</ul></section>'


def render_backlinks(stem: str, backlinks: dict, pages: dict) -> str:
    """Render backlinks section."""
    links = backlinks.get(stem, [])
    if not links:
        return ""
    items = []
    for src in links:
        display = extract_title(src, pages[src]["content"])
        items.append(f'<li><a href="{src}.html">{display}</a></li>')
    return '<section class="backlinks"><h2>Backlinks</h2><ul>' + '\n'.join(items) + '</ul></section>'


def build_page(stem: str, pages: dict, backlinks: dict, template: str, config: dict) -> str:
    """Build a single page HTML."""
    content = pages[stem]["content"]
    title = extract_title(stem, content)
    wikilinks = extract_wikilinks(content)

    # Remove Related section from content before converting
    # (we render it separately in the sidebar)
    content_without_related = re.split(r'^##\s+Related\s*$', content, maxsplit=1, flags=re.MULTILINE)[0]

    html_body = convert_markdown(content_without_related)
    html_body = downgrade_headings(html_body)
    html_body = process_wikilinks(html_body, pages)

    related_html = render_related(wikilinks, pages)
    backlinks_html = render_backlinks(stem, backlinks, pages)

    return template.replace('{title}', title) \
        .replace('{site_title}', config['title']) \
        .replace('{lang}', config['lang']) \
        .replace('{body}', html_body) \
        .replace('{related}', related_html) \
        .replace('{backlinks}', backlinks_html)


def build_index(graph_data: dict, pages: dict, template: str, config: dict) -> str:
    """Build the index page with graph and page list."""
    page_list_items = []
    for stem in sorted(pages.keys()):
        title = extract_title(stem, pages[stem]["content"])
        page_list_items.append(f'<li><a href="{stem}.html">{title}</a></li>')
    page_list_html = '\n'.join(page_list_items)

    return template.replace('{title}', config['title']) \
        .replace('{subtitle}', config.get('subtitle', '')) \
        .replace('{lang}', config['lang']) \
        .replace('{graph_data}', json.dumps(graph_data)) \
        .replace('{page_list}', page_list_html) \
        .replace('{page_count}', str(len(pages)))


def main():
    parser = argparse.ArgumentParser(description="Build static site from Obsidian vault")
    parser.add_argument('--source', type=Path, default=Path.cwd(),
                        help='Path to Obsidian vault (default: current directory)')
    parser.add_argument('--output', type=str, default=None,
                        help='Output directory (overrides site.json)')
    args = parser.parse_args()

    source = args.source.resolve()
    config = load_config(source)
    if args.output:
        config['output'] = args.output
    output = source / config['output']

    print(f"Source: {source}")
    print(f"Output: {output}")

    # Load templates
    page_template = (TOOL_DIR / "templates" / "page.html").read_text(encoding="utf-8")
    index_template = (TOOL_DIR / "templates" / "index.html").read_text(encoding="utf-8")

    # Scan vault
    pages = scan_vault(source)
    print(f"Found {len(pages)} pages")

    # Build graph and backlinks
    graph_data = build_graph(pages)
    backlinks = build_backlinks(pages)
    print(f"Graph: {len(graph_data['nodes'])} nodes, {len(graph_data['links'])} edges")

    # Create output directory
    output.mkdir(parents=True, exist_ok=True)

    # Generate pages
    for stem in pages:
        html = build_page(stem, pages, backlinks, page_template, config)
        (output / f"{stem}.html").write_text(html, encoding="utf-8")

    # Generate index
    index_html = build_index(graph_data, pages, index_template, config)
    (output / "index.html").write_text(index_html, encoding="utf-8")

    # Copy static files
    shutil.copy2(TOOL_DIR / "static" / "style.css", output / "style.css")

    print(f"Generated {len(pages)} pages + index.html → {output}")


if __name__ == "__main__":
    main()
