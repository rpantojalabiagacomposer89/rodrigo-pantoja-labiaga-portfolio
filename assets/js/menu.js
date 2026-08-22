document.addEventListener('DOMContentLoaded', () => {
  const mobile = window.matchMedia('(max-width: 767px)');

  document.querySelectorAll('.top-menu').forEach(menu => {
    const hamburger = menu.querySelector('.menu-icon');
    const title = document.querySelector('main h1');
    const isFilmPage = !!document.querySelector('.film-page');

    if (!hamburger) return;

    hamburger.setAttribute('aria-expanded', 'false');

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

    function alignAfterScaling() {
      /*
        Film's scale.js runs after menu.js.
        Wait until scaling has finished, then measure the
        title's FINAL visible position.
      */
      if (isFilmPage) {
        requestAnimationFrame(() => {
          requestAnimationFrame(alignMenuWithTitle);
        });
      } else {
        alignMenuWithTitle();
      }
    }

    function openMenu() {
      menu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /*
      Navigation links are untouched.
      Their normal href behavior handles navigation.
    */

    alignAfterScaling();

    window.addEventListener('resize', () => {
      alignAfterScaling();
    }, {
      passive: true
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(alignAfterScaling);
    }
  });
});
