document.addEventListener('DOMContentLoaded', () => {
  const menus = document.querySelectorAll('.top-menu');

  menus.forEach(menu => {
    const button = menu.querySelector('.menu-icon');

    if (!button) return;

    button.setAttribute('aria-expanded', 'false');

    const closeMenu = () => {
      menu.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    };

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

  /*
    Mobile-only:
    Keep ONLY the hamburger pinned to the visible iPhone viewport.
    This does not change page layout, menu size, text, spacing,
    images, audio players, or desktop behavior.
  */
  const mobile = window.matchMedia('(max-width: 767px)');

  function pinHamburger() {
    document.querySelectorAll('.menu-icon').forEach(button => {
      if (!mobile.matches) {
        button.style.removeProperty('position');
        button.style.removeProperty('top');
        button.style.removeProperty('right');
        button.style.removeProperty('left');
        button.style.removeProperty('bottom');
        button.style.removeProperty('z-index');
        return;
      }

      const offsetTop = window.visualViewport
        ? window.visualViewport.offsetTop
        : 0;

      button.style.setProperty('position', 'fixed', 'important');
      button.style.setProperty('top', `${offsetTop + 28}px`, 'important');
      button.style.setProperty('right', '20px', 'important');
      button.style.setProperty('left', 'auto', 'important');
      button.style.setProperty('bottom', 'auto', 'important');
      button.style.setProperty('z-index', '10002', 'important');
    });
  }

  pinHamburger();

  window.addEventListener('scroll', pinHamburger, { passive: true });
  window.addEventListener('resize', pinHamburger, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('scroll', pinHamburger, {
      passive: true
    });

    window.visualViewport.addEventListener('resize', pinHamburger, {
      passive: true
    });
  }

  if (mobile.addEventListener) {
    mobile.addEventListener('change', pinHamburger);
  }
});
