document.addEventListener('DOMContentLoaded', () => {
  const mobile = window.matchMedia('(max-width: 767px)');

  document.querySelectorAll('.top-menu').forEach(menu => {
    const button = menu.querySelector('.menu-icon');
    const title = document.querySelector('main h1');

    if (!button) return;

    button.setAttribute('aria-expanded', 'false');

    function closeMenu() {
      menu.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.blur();
    }

    function alignMenuWithTitle() {
      if (!mobile.matches || !title) {
        menu.style.removeProperty('top');
        return;
      }

      const rect = title.getBoundingClientRect();

      const top =
        window.scrollY +
        rect.top +
        ((rect.height - 28) / 2);

      menu.style.setProperty(
        'top',
        `${top}px`,
        'important'
      );
    }

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        menu.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        button.blur();
      }
    });

    /*
      IMPORTANT:
      Do not prevent the link's normal navigation.
      Just close the menu and let Safari follow href normally.
    */
    menu.querySelectorAll('.top-menu-links a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
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

    alignMenuWithTitle();

    window.addEventListener('resize', alignMenuWithTitle, {
      passive: true
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(alignMenuWithTitle);
    }
  });
});
