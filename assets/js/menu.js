document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.top-menu').forEach(menu => {
    const button = menu.querySelector('.menu-icon');
    const title = document.querySelector('main h1');

    if (!button) return;

    button.setAttribute('aria-expanded', 'false');

    function closeMenu() {
      menu.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = menu.classList.toggle('is-open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    menu.querySelectorAll('.top-menu-links a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', event => {
      if (!menu.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    /* Mobile only:
       align hamburger with the page title,
       but let it scroll away naturally with the page.
    */
    if (window.matchMedia('(max-width: 767px)').matches && title) {
      const titleBox = title.getBoundingClientRect();

      menu.style.setProperty('position', 'absolute', 'important');
      menu.style.setProperty(
        'top',
        `${window.scrollY + titleBox.top}px`,
        'important'
      );
      menu.style.setProperty('right', '20px', 'important');
      menu.style.setProperty('left', 'auto', 'important');
      menu.style.setProperty('bottom', 'auto', 'important');
    }
  });
});
