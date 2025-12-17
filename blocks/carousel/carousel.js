import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];
  [...block.children].forEach((row, r) => {
    if (r === 0) row.classList.add('carousel-slide-active');
    row.classList.add('carousel-slide');
    [...row.children].forEach((col, c) => {
      if (col.querySelector('picture')) {
        col.classList.add('carousel-slide-image');
      } else {
        col.classList.add('carousel-slide-content');
      }
    });
  });

  // Add navigation buttons if more than one slide
  if (rows.length > 1) {
    const nav = document.createElement('div');
    nav.classList.add('carousel-nav');
    rows.forEach((row, i) => {
      const btn = document.createElement('button');
      btn.ariaLabel = `Slide ${i + 1}`;
      btn.addEventListener('click', () => {
        block.querySelector('.carousel-slide-active').classList.remove('carousel-slide-active');
        row.classList.add('carousel-slide-active');
      });
      nav.append(btn);
    });
    block.append(nav);
  }
}
