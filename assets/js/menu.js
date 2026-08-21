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
    }

    function alignWithTitle() {
      if (!mobile.matches || !title) {
        menu.style.removeProperty('top');
        menu.style.removeProperty('right');
        return;
      }

      const titleBox = title.getBoundingClientRect();

      /*
        Align the CENTER of the 20px hamburger
        with the vertical center of the page title.
      */
      const hamburgerHeight = 20;

      const top =
        window.scrollY +
        titleBox.top +
        ((titleBox.height - hamburgerHeight) / 2);

      menu.style.setProperty(
        'top',
        `${top}px`,
        'important'
      );

      menu.style.setProperty(
        'right',
        '20px',
        'important'
      );
    }

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const willOpen = !menu.classList.contains('is-open');

      if (willOpen) {
        menu.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      } else {
        closeMenu();
      }

      /*
        Prevent Safari from keeping :focus-within
        active after tapping the hamburger.
      */
      button.blur();
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

    alignWithTitle();

    window.addEventListener('resize', alignWithTitle, {
      passive: true
    });

    if (mobile.addEventListener) {
      mobile.addEventListener('change', alignWithTitle);
    }
  });
});
