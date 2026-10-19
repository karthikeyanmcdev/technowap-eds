export default function decorate(block) {
  [...block.children].forEach((row) => {
    const label = row.children[0];
    const body = row.children[1];
    
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    
    summary.append(...label.childNodes);
    details.append(summary);
    
    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.append(...body.childNodes);
    details.append(content);
    
    row.replaceWith(details);
  });
}