import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = resolve(fileURLToPath(new URL('..', import.meta.url)));
const readSource = (path) => readFileSync(resolve(rootDirectory, path), 'utf8');

describe('accessibility interaction contracts', () => {
  it('keeps the project modal labelled, modal, keyboard dismissible, and focus contained', () => {
    const modal = readSource('src/components/ui/AnimatedModal.tsx');

    assert.match(modal, /role="dialog"/);
    assert.match(modal, /aria-modal="true"/);
    assert.match(modal, /aria-labelledby={labelledBy}/);
    assert.match(modal, /event\.key === 'Escape'/);
    assert.match(modal, /event\.key !== 'Tab'/);
    assert.match(modal, /lastElement\.focus\(\)/);
    assert.match(modal, /firstElement\.focus\(\)/);
    assert.match(modal, /previousActiveElementRef\.current\?\.focus\(\)/);
    assert.match(modal, /previousBodyOverflowRef\.current/);
    assert.match(modal, /window\.clearTimeout\(focusTimer\)/);
  });

  it('exposes mobile navigation state and the current section to assistive technology', () => {
    const navigation = readSource('src/components/navigation/Navigation.tsx');

    assert.match(navigation, /aria-expanded={isMobileMenuOpen}/);
    assert.match(navigation, /aria-controls="mobile-navigation-menu"/);
    assert.match(navigation, /id="mobile-navigation-menu"/);
    assert.match(navigation, /aria-current={activeSection === item\.id \? 'location' : undefined}/);
    assert.match(navigation, /type="button"/);
  });

  it('provides an accessible, keyboard-operable project screenshot lightbox', () => {
    const detail = readSource('src/components/projects/ProjectDetail.tsx');

    assert.match(detail, /role="dialog"/);
    assert.match(detail, /aria-modal="true"/);
    assert.match(detail, /aria-label={\`\${project\.title} screenshot gallery\`}/);
    assert.match(detail, /e\.key === 'Escape'/);
    assert.match(detail, /e\.key === 'ArrowRight'/);
    assert.match(detail, /e\.key === 'ArrowLeft'/);
    assert.match(detail, /e\.key === 'Tab'/);
    assert.match(detail, /lightboxTriggerRef\.current\?\.focus\(\)/);
    assert.match(detail, /button\[aria-label="Close fullscreen"\]/);
  });
});
