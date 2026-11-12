import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = resolve(fileURLToPath(new URL('..', import.meta.url)));
const readSource = (path) => readFileSync(resolve(rootDirectory, path), 'utf8');

describe('accessibility interaction contracts', () => {
  it('composes the project modal from Radix Dialog with an accessible name and close control', () => {
    const modal = readSource('src/components/ui/AnimatedModal.tsx');
    const dialog = readSource('src/components/ui/dialog.tsx');

    assert.match(modal, /import\s*\{\s*Dialog\s*,\s*DialogContent\s*\}\s*from\s*['"]\.\/dialog['"]/);
    assert.match(modal, /<Dialog\s+open={isOpen}/);
    assert.match(modal, /<DialogContent[\s\S]*?aria-labelledby={labelledBy}/);
    assert.match(modal, /aria-label="Close modal"/);
    assert.match(modal, /onOpenChange=\{\(open\)\s*=>\s*\{\s*if\s*\(!open\)\s*onClose\(\)/);
    assert.match(dialog, /const DialogContent = React\.forwardRef/);
    assert.match(dialog, /<DialogPrimitive\.Content/);
    assert.match(dialog, /<DialogPortal>/);
    assert.match(dialog, /<DialogPrimitive\.Overlay/);
  });

  it('uses Radix Sheet state and provides a labelled mobile navigation dialog', () => {
    const navigation = readSource('src/components/navigation/Navigation.tsx');
    const sheet = readSource('src/components/ui/sheet.tsx');

    assert.match(navigation, /<Sheet\s+open={isMobileMenuOpen}\s+onOpenChange={setIsMobileMenuOpen}/);
    assert.match(navigation, /<SheetTrigger\s+asChild>/);
    assert.match(navigation, /aria-label={isMobileMenuOpen \? "Close navigation menu" : "Open navigation menu"}/);
    assert.match(navigation, /<SheetContent\s+side="top"/);
    assert.match(navigation, /<SheetTitle\s+className="sr-only">Mobile navigation<\/SheetTitle>/);
    assert.match(navigation, /<SheetDescription\s+className="sr-only">Choose a section of the portfolio to visit\.<\/SheetDescription>/);
    assert.match(navigation, /id="mobile-navigation-menu"/);
    assert.match(navigation, /aria-current={activeSection === item\.id \? 'location' : undefined}/);
    assert.match(sheet, /const Sheet = DialogPrimitive\.Root/);
    assert.match(sheet, /const SheetTrigger = DialogPrimitive\.Trigger/);
    assert.match(sheet, /<DialogPrimitive\.Content/);
    assert.match(sheet, /<DialogPrimitive\.Close/);
  });

  it('provides an accessible Radix Dialog lightbox with keyboard-operable image controls', () => {
    const detail = readSource('src/components/projects/ProjectDetail.tsx');
    const dialog = readSource('src/components/ui/dialog.tsx');

    assert.match(detail, /import\s*\{[^}]*Dialog[^}]*DialogContent[^}]*DialogDescription[^}]*DialogTitle[^}]*\}\s*from\s*['"]\.\.\/ui\/dialog['"]/);
    assert.match(detail, /<Dialog\s+open={isLightboxOpen && hasGallery}\s+onOpenChange={setIsLightboxOpen}>/);
    assert.match(detail, /<DialogContent[\s\S]*?<DialogTitle className="sr-only">\s*\{project\.title\} screenshot gallery/);
    assert.match(detail, /<DialogDescription className="sr-only">\s*Browse screenshots with the previous and next controls or arrow keys\./);
    assert.match(detail, /aria-label="Close fullscreen"/);
    assert.match(detail, /aria-label="Previous image"/);
    assert.match(detail, /aria-label="Next image"/);
    assert.match(detail, /event\.key === 'ArrowRight'/);
    assert.match(detail, /event\.key === 'ArrowLeft'/);
    assert.match(dialog, /<DialogPrimitive\.Content/);
  });
  it('uses the shared shadcn Button for common actions while preserving anchor semantics', () => {
    const contact = readSource('src/components/contact/Contact.tsx');
    const navigation = readSource('src/components/navigation/Navigation.tsx');
    const projectDetail = readSource('src/components/projects/ProjectDetail.tsx');

    assert.ok(contact.includes("import { Button } from '../ui/button';"));
    assert.ok(contact.includes('<Button asChild'));
    assert.ok(contact.includes("href={`mailto:${emailAddress}`}"));
    assert.ok(contact.includes('Say Hello'));
    assert.ok(navigation.includes('<Button'));
    assert.ok(navigation.includes('asChild'));
    assert.ok(navigation.includes('href="/Martirez_Resume.pdf"'));
    assert.ok(navigation.includes('aria-label="View resume"'));
    assert.ok(navigation.includes('<SheetTrigger asChild>'));
    assert.ok(navigation.includes('variant="ghost"'));
    assert.ok(navigation.includes('!h-5 !w-5'));
    assert.ok(navigation.includes('!h-6 !w-6'));
    assert.ok(contact.includes('!h-6 !w-6'));
    assert.ok(navigation.includes('aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}'));
    assert.ok(projectDetail.includes('<Button asChild'));
    assert.ok(projectDetail.includes('href={project.liveUrl} target="_blank" rel="noopener noreferrer"'));
    assert.ok(projectDetail.includes('href={project.githubUrl} target="_blank" rel="noopener noreferrer"'));
    assert.ok(projectDetail.includes('variant="outline"'));
  });

});
