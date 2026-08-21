document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.top-menu').forEach(menu => {
    const hamburger = menu.querySelector('.menu-icon');

    if (!hamburger) return;

    hamburger.setAttribute('aria-expanded', 'false');

    function closeMenu() {
      menu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = menu.classList.contains('is-open');

      if (isOpen) {
        closeMenu();
      } else {
        menu.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
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
