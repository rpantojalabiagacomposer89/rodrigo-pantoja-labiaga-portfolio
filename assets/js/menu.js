document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.top-menu').forEach(menu => {
    const button = menu.querySelector('.menu-icon');

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
  });
});
