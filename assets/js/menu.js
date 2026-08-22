document.addEventListener('DOMContentLoaded', () => {
  const mobile = window.matchMedia('(max-width: 767px)');

  document.querySelectorAll('.top-menu').forEach(menu => {
    const hamburger = menu.querySelector('.menu-icon');
    const title = document.querySelector('main h1');

    if (!hamburger) return;

    hamburger.setAttribute('aria-expanded', 'false');

    function alignMenuWithTitle() {
      if (!mobile.matches || !title) {
        menu.style.removeProperty('top');
        return;
      }

      const rect = title.getBoundingClientRect();

      /*
        Film's title has slightly different line-height geometry.
        Move ONLY the Film menu 4px upward.
        Every other page gets 0px correction.
      */
      const filmCorrection =
        document.querySelector('.film-page') ? 0 : 0;

      const top =
        window.scrollY +
        rect.top +
        ((rect.height - 28) / 2) +
        filmCorrection;

      menu.style.setProperty(
        'top',
        `${top}px`,
        'important'
      );
    }

    function openMenu() {
      menu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    /*
      Tap hamburger once = open.
      Tap the same hamburger again = close.
    */
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
      Navigation links are intentionally left alone.
      Their normal href behavior handles navigation.
    */

    alignMenuWithTitle();

    window.addEventListener('resize', alignMenuWithTitle, {
      passive: true
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(alignMenuWithTitle);
    }
  });
});
