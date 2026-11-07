import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolioProjects } from '../src/data/projectsData.ts';
import { getActiveSection } from '../src/utils/scrollUtils.ts';

const rootDirectory = resolve(fileURLToPath(new URL('..', import.meta.url)));
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');

afterEach(() => {
  if (originalWindow) {
    Object.defineProperty(globalThis, 'window', originalWindow);
  } else {
    Reflect.deleteProperty(globalThis, 'window');
  }

  if (originalDocument) {
    Object.defineProperty(globalThis, 'document', originalDocument);
  } else {
    Reflect.deleteProperty(globalThis, 'document');
  }
});

describe('portfolio project data', () => {
  it('keeps project titles and image folders unique', () => {
    const titles = portfolioProjects.map((project) => project.title);
    const imageFolders = portfolioProjects.map((project) => project.imageFolder);

    assert.equal(new Set(titles).size, titles.length, 'project titles must be unique');
    assert.equal(new Set(imageFolders).size, imageFolders.length, 'image folders must be unique');
  });

  it('provides complete project content and existing image folders', () => {
    for (const project of portfolioProjects) {
      assert.ok(project.title.trim(), 'project title must not be empty');
      assert.ok(project.description.trim(), `${project.title} needs a description`);
      assert.ok(project.technologies.length > 0, `${project.title} needs technologies`);
      assert.match(project.liveUrl, /^(#|https:\/\/)/, `${project.title} has an invalid live URL`);
      assert.match(project.githubUrl, /^(#|https:\/\/)/, `${project.title} has an invalid GitHub URL`);

      const imageDirectory = resolve(rootDirectory, 'public', 'images', project.imageFolder);
      assert.ok(readdirSync(imageDirectory).length > 0, `${project.title} image folder must contain assets`);
    }
  });

  it('keeps every project represented in the static HTML fallback and SEO metadata', () => {
    const html = readFileSync(resolve(rootDirectory, 'index.html'), 'utf8');

    for (const project of portfolioProjects) {
      assert.ok(html.includes(project.title), `${project.title} is missing from index.html`);
    }
  });
});

describe('getActiveSection', () => {
  const installDocument = (offsets) => {
    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: {
        getElementById: (id) => (
          Object.hasOwn(offsets, id) ? { offsetTop: offsets[id] } : null
        ),
      },
    });
  };

  const installWindow = (scrollY) => {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { scrollY },
    });
  };

  it('returns the first section when the page is at the top', () => {
    installWindow(0);
    installDocument({ home: 0, about: 500, projects: 1000 });

    assert.equal(getActiveSection(['home', 'about', 'projects']), 'home');
  });

  it('returns the most recently passed section using the navigation offset', () => {
    installWindow(700);
    installDocument({ home: 0, about: 500, projects: 1000 });

    assert.equal(getActiveSection(['home', 'about', 'projects']), 'about');
  });

  it('returns an empty string when no sections are supplied', () => {
    installWindow(0);
    installDocument({});

    assert.equal(getActiveSection([]), '');
  });
});
