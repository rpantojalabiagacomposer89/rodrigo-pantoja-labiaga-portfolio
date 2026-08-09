(() => {
  const BASE_W = 1394, H = 1000, PHONE_MAX = 767;

  function fit() {
    const root = document.querySelector('.home, .page, .film-page, .art-page, .read-more');
    if (!root) return;

    /* Phone layout is handled entirely by the mobile-only CSS below 768px.
       Desktop behavior is intentionally identical to the finished version. */
    if (innerWidth <= PHONE_MAX) {
      root.style.setProperty('--screen-edge', '24px');
      Object.assign(root.style, {
        position: 'relative',
        width: '100%',
        height: 'auto',
        minHeight: '0',
        left: 'auto',
        top: 'auto',
        transform: 'none',
        transformOrigin: 'top left',
        overflow: 'visible'
      });
      return;
    }

    /* Finished desktop behavior — unchanged. */
    const s = Math.min(1, innerHeight / H);
    const narrow = innerWidth < BASE_W * s;
    const W = narrow ? BASE_W : innerWidth / s;
    const edge = narrow ? 60 : 60 / s;
    root.style.setProperty('--screen-edge', edge + 'px');
    Object.assign(root.style, {
      position: 'fixed', width: W + 'px', height: H + 'px', minHeight: H + 'px',
      left: '0px', top: ((innerHeight - H * s) / 2) + 'px',
      transform: `scale(${s})`, transformOrigin: 'top left', overflow: 'hidden'
    });
  }

  addEventListener('resize', fit, {passive:true});
  addEventListener('DOMContentLoaded', fit);
  fit();
})();
