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

  // Add navigation arrows if more than one slide
  if (rows.length > 1) {
    const nav = document.createElement('div');
    nav.classList.add('carousel-nav');

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('carousel-nav-prev');
    prevBtn.ariaLabel = 'Previous Slide';
    prevBtn.innerHTML = '<span class="icon icon-arrow-left"></span>';
    prevBtn.addEventListener('click', () => {
      const current = block.querySelector('.carousel-slide-active');
      let prev = current.previousElementSibling;
      if (!prev || !prev.classList.contains('carousel-slide')) {
        prev = rows[rows.length - 1];
      }
      current.classList.remove('carousel-slide-active');
      prev.classList.add('carousel-slide-active');
    });

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('carousel-nav-next');
    nextBtn.ariaLabel = 'Next Slide';
    nextBtn.innerHTML = '<span class="icon icon-arrow-right"></span>';
    nextBtn.addEventListener('click', () => {
      const current = block.querySelector('.carousel-slide-active');
      let next = current.nextElementSibling;
      if (!next || !next.classList.contains('carousel-slide')) {
        next = rows[0];
      }
      current.classList.remove('carousel-slide-active');
      next.classList.add('carousel-slide-active');
    });

    nav.append(prevBtn);
    nav.append(nextBtn);
    block.append(nav);
  }
}
