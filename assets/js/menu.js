document.addEventListener('DOMContentLoaded', () => {
  const mobile = window.matchMedia('(max-width: 767px)');

  document.querySelectorAll('.top-menu').forEach(menu => {
    const hamburger = menu.querySelector('.menu-icon');
    const title = document.querySelector('main h1');

    const isFilmPage = !!document.querySelector('.film-page');
    const isPhotographyPage =
      document.title.startsWith('Photography');

    if (!hamburger) return;

    hamburger.setAttribute('aria-expanded', 'false');

    function alignMenuWithTitle() {
      if (!mobile.matches || !title) {
        menu.style.removeProperty('top');
        return;
      }

      const rect = title.getBoundingClientRect();

      /*
        Film and Photography need the same tiny vertical correction.
        All other pages remain unchanged.
      */
      const correction =
        (isFilmPage || isPhotographyPage) ? 2 : 0;

      const top =
        window.scrollY +
        rect.top +
        ((rect.height - 28) / 2) +
        correction;

      menu.style.setProperty(
        'top',
        `${top}px`,
        'important'
      );
    }

    function alignAfterLayout() {
      /*
        Film is affected by scale.js, so wait until its layout
        has settled before measuring the title.
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
      Navigation links are intentionally untouched.
      Their normal href behavior handles navigation.
    */

    alignAfterLayout();

    window.addEventListener(
      'resize',
      alignAfterLayout,
      { passive: true }
    );

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(alignAfterLayout);
    }
  });
});
