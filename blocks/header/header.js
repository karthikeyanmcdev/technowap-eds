import { getMetadata } from '../../scripts/aem.js';

// Helper to decode or load navigation fragment if using standard EDS pattern
export default async function decorate(block) {
  // Fetch nav content from metadata or default path
  const navPath = getMetadata('nav') || '/nav';
  try {
    const resp = await fetch(`${navPath}.plain.html`);
    if (resp.ok) {
      const html = await resp.text();
      const navContainer = document.createElement('div');
      navContainer.className = 'technowp-nav-wrapper';
      navContainer.innerHTML = html;

      // Structure sections (Top Bar, Main Menu, Mobile Toggle)
      const rows = [...navContainer.children];
      if (rows[0]) rows[0].className = 'technowp-header-top';
      if (rows[1]) rows[1].className = 'technowp-main-menu';

      // Mobile Menu Toggle functionality
      const hamburger = document.createElement('div');
      hamburger.className = 'nav-hamburger';
      hamburger.innerHTML = `<button aria-label="Open navigation"><span class="nav-hamburger-icon"></span></button>`;
      hamburger.addEventListener('click', () => {
        const expanded = navContainer.getAttribute('aria-expanded') === 'true';
        navContainer.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
      
      navContainer.prepend(hamburger);
      block.textContent = '';
      block.append(navContainer);
    }
  } catch (error) {
    console.error('Failed to load header navigation:', error);
  }
}