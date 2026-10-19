export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'pricing-grid';

  rows.forEach((row, index) => {
    const card = document.createElement('div');
    card.className = 'pricing-card';
    
    // Highlight the middle/popular tier if desired
    if (index === 1) {
      card.classList.add('popular');
    }

    [...row.children].forEach((col, colIndex) => {
      if (colIndex === 0) col.className = 'pricing-header';
      if (colIndex === 1) col.className = 'pricing-price';
      if (colIndex === 2) col.className = 'pricing-features';
      if (colIndex === 3) col.className = 'pricing-action';
      card.append(col);
    });
    grid.append(card);
  });

  block.textContent = '';
  block.append(grid);
}