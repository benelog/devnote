/**
 * HTML rendering — pure functions.
 */

import { marked } from 'marked';
import { WIKILINK_RE, type PageInfo, type SiteConfig, type GitHubConfig } from './build.js';
import { extractWikilinks } from './graph.js';
import type { GraphData } from './graph.js';

export function extractTitle(stem: string): string {
  return stem.replace(/-/g, ' ');
}

export function convertMarkdown(text: string): string {
  return marked.parse(text, { async: false }) as string;
}

export function processWikilinks(html: string, pages: Map<string, PageInfo>): string {
  return html.replace(new RegExp(WIKILINK_RE.source, 'g'), (_match, target: string, display?: string) => {
    const label = display || target.replace(/-/g, ' ');
    if (pages.has(target)) {
      return `<a href="${target}.html" class="wikilink">${label}</a>`;
    }
    return `<span class="broken-link">${label}</span>`;
  });
}

export function downgradeHeadings(html: string): string {
  return html.replace(/<h([1-5])>(.*?)<\/h\1>/g, (_match, level: string, content: string) => {
    const newLevel = Math.min(parseInt(level) + 1, 6);
    return `<h${newLevel}>${content}</h${newLevel}>`;
  });
}

export function renderRelated(wikilinks: string[], pages: Map<string, PageInfo>): string {
  if (wikilinks.length === 0) return '';

  const seen = new Set<string>();
  const items: string[] = [];
  for (const target of [...wikilinks].sort()) {
    if (seen.has(target)) continue;
    seen.add(target);
    if (pages.has(target)) {
      const display = extractTitle(target);
      items.push(`<li><a href="${target}.html">${display}</a></li>`);
    }
  }

  if (items.length === 0) return '';
  return '<section class="related"><h2>Related</h2><ul>' + items.join('\n') + '</ul></section>';
}

export function renderBacklinks(stem: string, backlinks: Map<string, string[]>, pages: Map<string, PageInfo>): string {
  const links = backlinks.get(stem) || [];
  if (links.length === 0) return '';

  const items: string[] = [];
  for (const src of links) {
    const display = extractTitle(src);
    items.push(`<li><a href="${src}.html">${display}</a></li>`);
  }
  return '<section class="backlinks"><h2>Backlinks</h2><ul>' + items.join('\n') + '</ul></section>';
}

export function renderEditLink(stem: string, contentDirectory: string, gitHub?: GitHubConfig): string {
  if (!gitHub?.['repository-url']) return '';
  const branch = gitHub['content-branch'] || 'main';
  const url = `${gitHub['repository-url']}/edit/${branch}/${contentDirectory}/${stem}.md`;
  return `<a href="${url}" class="edit-link" target="_blank" rel="noopener noreferrer">Edit</a>`;
}

export function buildPage(
  stem: string,
  pages: Map<string, PageInfo>,
  backlinks: Map<string, string[]>,
  template: string,
  config: SiteConfig,
): string {
  const content = pages.get(stem)!.content;
  const title = extractTitle(stem);
  const wikilinks = extractWikilinks(content);

  const contentWithoutRelated = content.split(/^##\s+Related\s*$/m)[0];

  let htmlBody = convertMarkdown(contentWithoutRelated);
  htmlBody = downgradeHeadings(htmlBody);
  htmlBody = processWikilinks(htmlBody, pages);

  const relatedHtml = renderRelated(wikilinks, pages);
  const backlinksHtml = renderBacklinks(stem, backlinks, pages);

  const editLinkHtml = renderEditLink(stem, config['content-directory'], config.gitHub);

  return template
    .replaceAll('{title}', title)
    .replaceAll('{site_title}', config.title)
    .replaceAll('{lang}', config.lang)
    .replaceAll('{body}', htmlBody)
    .replaceAll('{related}', relatedHtml)
    .replaceAll('{backlinks}', backlinksHtml)
    .replaceAll('{edit_link}', editLinkHtml);
}

export function buildIndex(
  graphData: GraphData,
  pages: Map<string, PageInfo>,
  template: string,
  config: SiteConfig,
): string {
  const pageListItems: string[] = [];
  for (const stem of [...pages.keys()].sort()) {
    const title = extractTitle(stem);
    pageListItems.push(`<li><a href="${stem}.html">${title}</a></li>`);
  }
  const pageListHtml = pageListItems.join('\n');

  return template
    .replaceAll('{title}', config.title)
    .replaceAll('{subtitle}', config.subtitle || '')
    .replaceAll('{lang}', config.lang)
    .replaceAll('{graph_data}', JSON.stringify(graphData))
    .replaceAll('{page_list}', pageListHtml)
    .replaceAll('{page_count}', String(pages.size));
}
