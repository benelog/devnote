#!/usr/bin/env npx tsx
/**
 * Build a static website from an Obsidian vault.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync } from 'fs';
import { resolve, join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

import { buildGraph, buildBacklinks } from './graph.js';
import { buildPage, buildIndex } from './render.js';

const TOOL_DIR = resolve(fileURLToPath(import.meta.url), '..');

export const WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export interface PageInfo {
  path: string;
  content: string;
}

export interface GitHubConfig {
  'repository-url': string;
  'content-branch'?: string;
}

export interface SiteConfig {
  title: string;
  subtitle: string;
  lang: string;
  'output-directory': string;
  gitHub?: GitHubConfig;
}

function loadConfig(source: string): SiteConfig {
  const config: SiteConfig = { title: basename(source), subtitle: '', lang: 'en', 'output-directory': 'public' };
  const configPath = join(source, 'site.yaml');
  if (existsSync(configPath)) {
    const data = parseYaml(readFileSync(configPath, 'utf-8'));
    Object.assign(config, data);
  }
  return config;
}

function scanVault(source: string): Map<string, PageInfo> {
  const contentDir = join(source, 'content');
  const scanDir = existsSync(contentDir) ? contentDir : source;
  const pages = new Map<string, PageInfo>();

  const files = readdirSync(scanDir)
    .filter(f => extname(f) === '.md')
    .sort();

  for (const file of files) {
    const stem = basename(file, '.md');
    const filePath = join(scanDir, file);
    pages.set(stem, { path: filePath, content: readFileSync(filePath, 'utf-8') });
  }
  return pages;
}

function parseArgs(argv: string[]): { source: string; output: string | null } {
  const args = argv.slice(2);
  let source = process.cwd();
  let output: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--source' && i + 1 < args.length) {
      source = resolve(args[++i]);
    } else if (args[i] === '--output' && i + 1 < args.length) {
      output = args[++i];
    }
  }

  return { source, output };
}

function main(): void {
  const args = parseArgs(process.argv);
  const source = args.source;
  const config = loadConfig(source);
  if (args.output) {
    config['output-directory'] = args.output;
  }
  const output = resolve(source, config['output-directory']);

  console.log(`Source: ${source}`);
  console.log(`Output: ${output}`);

  // Load templates
  const pageTemplate = readFileSync(join(TOOL_DIR, 'layouts', 'page.html'), 'utf-8');
  const indexTemplate = readFileSync(join(TOOL_DIR, 'layouts', 'index.html'), 'utf-8');

  // Scan vault
  const pages = scanVault(source);
  console.log(`Found ${pages.size} pages`);

  // Build graph and backlinks
  const graphData = buildGraph(pages);
  const backlinks = buildBacklinks(pages);
  console.log(`Graph: ${graphData.nodes.length} nodes, ${graphData.links.length} edges`);

  // Create output directory
  mkdirSync(output, { recursive: true });

  // Generate pages
  for (const stem of pages.keys()) {
    const html = buildPage(stem, pages, backlinks, pageTemplate, config);
    writeFileSync(join(output, `${stem}.html`), html, 'utf-8');
  }

  // Generate index
  const indexHtml = buildIndex(graphData, pages, indexTemplate, config);
  writeFileSync(join(output, 'index.html'), indexHtml, 'utf-8');

  // Copy static files
  copyFileSync(join(TOOL_DIR, 'styles', 'style.css'), join(output, 'style.css'));

  console.log(`Generated ${pages.size} pages + index.html → ${output}`);
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) {
  main();
}
