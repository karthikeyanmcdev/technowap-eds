export default function decorate(block) {
  // Add structural classes to rows and columns for flexible styling
  const rows = [...block.children];
  rows.forEach((row, i) => {
    row.classList.add(`hero-row-${i + 1}`);
    const cols = [...row.children];
    cols.forEach((col, j) => {
      col.classList.add(`hero-col-${j + 1}`);
      
      // If the column contains an image, mark it as background container
      const picture = col.querySelector('picture');
      if (picture && j === 0) {
        block.style.backgroundImage = `url(${picture.querySelector('img').src})`;
        col.remove(); // Remove image element so it handles via background-image CSS
      }
    });
  });
}