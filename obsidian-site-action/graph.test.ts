import { describe, it, expect } from 'vitest';
import { extractWikilinks, buildGraph, buildBacklinks } from './graph.js';
import type { PageInfo } from './build.js';

function pages(entries: Record<string, string>): Map<string, PageInfo> {
  const map = new Map<string, PageInfo>();
  for (const [stem, content] of Object.entries(entries)) {
    map.set(stem, { path: `${stem}.md`, content });
  }
  return map;
}

describe('extractWikilinks', () => {
  it('extracts simple wikilinks', () => {
    expect(extractWikilinks('see [[foo]] and [[bar]]')).toEqual(['foo', 'bar']);
  });

  it('extracts wikilinks with display text', () => {
    expect(extractWikilinks('see [[foo|Foo Page]]')).toEqual(['foo']);
  });

  it('returns empty array for no wikilinks', () => {
    expect(extractWikilinks('plain text')).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(extractWikilinks('')).toEqual([]);
  });

  it('handles multiple wikilinks on one line', () => {
    expect(extractWikilinks('[[a]] [[b]] [[c]]')).toEqual(['a', 'b', 'c']);
  });
});

describe('buildGraph', () => {
  it('creates nodes for all pages', () => {
    const p = pages({ alpha: '', beta: '' });
    const graph = buildGraph(p);
    expect(graph.nodes.map(n => n.id).sort()).toEqual(['alpha', 'beta']);
  });

  it('creates edges for mutual links', () => {
    const p = pages({ a: '[[b]]', b: '[[a]]' });
    const graph = buildGraph(p);
    expect(graph.links).toEqual([{ source: 'a', target: 'b' }]);
  });

  it('deduplicates bidirectional edges', () => {
    const p = pages({ x: '[[y]]', y: '[[x]]' });
    const graph = buildGraph(p);
    expect(graph.links).toHaveLength(1);
  });

  it('ignores links to non-existent pages', () => {
    const p = pages({ a: '[[missing]]' });
    const graph = buildGraph(p);
    expect(graph.links).toEqual([]);
  });

  it('counts links correctly', () => {
    const p = pages({ a: '[[b]] [[c]]', b: '', c: '[[a]]' });
    const graph = buildGraph(p);
    const nodeA = graph.nodes.find(n => n.id === 'a')!;
    expect(nodeA.count).toBe(2);
  });

  it('uses stem as title with hyphens replaced by spaces', () => {
    const p = pages({ 'my-page': '' });
    const graph = buildGraph(p);
    expect(graph.nodes[0].title).toBe('my page');
  });
});

describe('buildBacklinks', () => {
  it('builds reverse links', () => {
    const p = pages({ a: '[[b]]', b: '' });
    const bl = buildBacklinks(p);
    expect(bl.get('b')).toEqual(['a']);
    expect(bl.get('a')).toEqual([]);
  });

  it('excludes self-links', () => {
    const p = pages({ a: '[[a]]' });
    const bl = buildBacklinks(p);
    expect(bl.get('a')).toEqual([]);
  });

  it('ignores links to non-existent pages', () => {
    const p = pages({ a: '[[missing]]' });
    const bl = buildBacklinks(p);
    expect(bl.has('missing')).toBe(false);
  });

  it('sorts backlinks alphabetically', () => {
    const p = pages({ c: '[[a]]', b: '[[a]]', a: '' });
    const bl = buildBacklinks(p);
    expect(bl.get('a')).toEqual(['b', 'c']);
  });
});
