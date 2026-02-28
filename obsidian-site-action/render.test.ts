import { describe, it, expect } from 'vitest';
import {
  extractTitle,
  downgradeHeadings,
  processWikilinks,
  renderRelated,
  renderBacklinks,
} from './render.js';
import type { PageInfo } from './build.js';

function pages(entries: Record<string, string>): Map<string, PageInfo> {
  const map = new Map<string, PageInfo>();
  for (const [stem, content] of Object.entries(entries)) {
    map.set(stem, { path: `${stem}.md`, content });
  }
  return map;
}

describe('extractTitle', () => {
  it('replaces hyphens with spaces', () => {
    expect(extractTitle('spring-boot')).toBe('spring boot');
  });

  it('returns as-is when no hyphens', () => {
    expect(extractTitle('react')).toBe('react');
  });
});

describe('downgradeHeadings', () => {
  it('downgrades h1 to h2', () => {
    expect(downgradeHeadings('<h1>Title</h1>')).toBe('<h2>Title</h2>');
  });

  it('downgrades h2 to h3', () => {
    expect(downgradeHeadings('<h2>Sub</h2>')).toBe('<h3>Sub</h3>');
  });

  it('caps at h6', () => {
    expect(downgradeHeadings('<h5>Deep</h5>')).toBe('<h6>Deep</h6>');
  });

  it('handles multiple headings', () => {
    const input = '<h1>A</h1><h2>B</h2>';
    expect(downgradeHeadings(input)).toBe('<h2>A</h2><h3>B</h3>');
  });

  it('leaves non-heading content unchanged', () => {
    expect(downgradeHeadings('<p>text</p>')).toBe('<p>text</p>');
  });
});

describe('processWikilinks', () => {
  it('converts wikilink to anchor when page exists', () => {
    const p = pages({ foo: '' });
    const result = processWikilinks('[[foo]]', p);
    expect(result).toBe('<a href="foo.html" class="wikilink">foo</a>');
  });

  it('converts wikilink with display text', () => {
    const p = pages({ foo: '' });
    const result = processWikilinks('[[foo|My Foo]]', p);
    expect(result).toBe('<a href="foo.html" class="wikilink">My Foo</a>');
  });

  it('renders broken link for non-existent page', () => {
    const p = pages({});
    const result = processWikilinks('[[missing]]', p);
    expect(result).toBe('<span class="broken-link">missing</span>');
  });

  it('replaces hyphens in default display text', () => {
    const p = pages({ 'my-page': '' });
    const result = processWikilinks('[[my-page]]', p);
    expect(result).toBe('<a href="my-page.html" class="wikilink">my page</a>');
  });
});

describe('renderRelated', () => {
  it('returns empty string for no wikilinks', () => {
    expect(renderRelated([], pages({}))).toBe('');
  });

  it('renders related section with valid links', () => {
    const p = pages({ foo: '', bar: '' });
    const result = renderRelated(['foo', 'bar'], p);
    expect(result).toContain('<section class="related">');
    expect(result).toContain('<a href="bar.html">bar</a>');
    expect(result).toContain('<a href="foo.html">foo</a>');
  });

  it('skips non-existent pages', () => {
    const p = pages({ foo: '' });
    const result = renderRelated(['foo', 'missing'], p);
    expect(result).toContain('foo.html');
    expect(result).not.toContain('missing');
  });

  it('deduplicates links', () => {
    const p = pages({ foo: '' });
    const result = renderRelated(['foo', 'foo'], p);
    const matches = result.match(/foo\.html/g) || [];
    expect(matches).toHaveLength(1);
  });

  it('returns empty string when all links are broken', () => {
    expect(renderRelated(['missing'], pages({}))).toBe('');
  });
});

describe('renderBacklinks', () => {
  it('returns empty string when no backlinks', () => {
    const bl = new Map<string, string[]>([['a', []]]);
    expect(renderBacklinks('a', bl, pages({}))).toBe('');
  });

  it('renders backlinks section', () => {
    const p = pages({ a: '', b: '' });
    const bl = new Map<string, string[]>([['a', ['b']]]);
    const result = renderBacklinks('a', bl, p);
    expect(result).toContain('<section class="backlinks">');
    expect(result).toContain('<a href="b.html">b</a>');
  });

  it('returns empty string for unknown stem', () => {
    const bl = new Map<string, string[]>();
    expect(renderBacklinks('unknown', bl, pages({}))).toBe('');
  });
});
