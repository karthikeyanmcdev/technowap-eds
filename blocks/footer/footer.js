import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const footerPath = getMetadata('footer') || '/footer';
  try {
    const resp = await fetch(`${footerPath}.plain.html`);
    if (resp.ok) {
      const html = await resp.text();
      const footerContainer = document.createElement('div');
      footerContainer.className = 'technowp-footer-wrapper';
      footerContainer.innerHTML = html;

      // Structure sections (Columns & Copyright)
      const rows = [...footerContainer.children];
      if (rows.length > 0) {
        rows[0].className = 'technowp-footer-widgets';
      }
      if (rows.length > 1) {
        rows[1].className = 'technowp-footer-bottom';
      }

      block.textContent = '';
      block.append(footerContainer);
    }
  } catch (error) {
    console.error('Failed to load footer content:', error);
  }
}