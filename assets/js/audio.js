(() => {
  const format = seconds => {
    if (!Number.isFinite(seconds)) return '0:00';
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  };

  const controllers = [];
  document.querySelectorAll('.track-play').forEach(oldButton => {
    const audio = document.getElementById(oldButton.dataset.audio);
    const host = oldButton.closest('.track-row, .work-player');
    if (!audio || !host) return;

    const oldTime = oldButton.nextElementSibling;
    oldButton.remove();
    if (oldTime && oldTime.tagName === 'SPAN') oldTime.remove();

    const player = document.createElement('div');
    player.className = 'media-player';
    player.innerHTML = `
      <button class="media-toggle" type="button" aria-label="Play">▶</button>
      <span class="media-time">0:00 / 0:00</span>
      <input class="media-progress" type="range" min="0" max="1000" value="0" aria-label="Track position">
      <button class="media-skip media-back" type="button" aria-label="Back 10 seconds">‹‹</button>
      <button class="media-skip" type="button" aria-label="Forward 10 seconds">››</button>`;
    host.appendChild(player);

    const toggle = player.querySelector('.media-toggle');
    const back = player.querySelector('.media-back');
    const forward = player.querySelector('button:last-child');
    const progress = player.querySelector('.media-progress');
    const time = player.querySelector('.media-time');

    const sync = () => {
      const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
      progress.value = duration ? Math.round(audio.currentTime / duration * 1000) : 0;
      time.textContent = `${format(audio.currentTime)} / ${format(duration)}`;
      toggle.textContent = '';
      toggle.classList.toggle('is-playing', !audio.paused);
      toggle.setAttribute('aria-label', audio.paused ? 'Play' : 'Pause');
    };

    toggle.addEventListener('click', () => {
      controllers.forEach(item => { if (item.audio !== audio) item.audio.pause(); });
      audio.paused ? audio.play() : audio.pause();
    });
    back.addEventListener('click', () => { audio.currentTime = Math.max(0, audio.currentTime - 10); });
    forward.addEventListener('click', () => {
      const end = Number.isFinite(audio.duration) ? audio.duration : audio.currentTime + 10;
      audio.currentTime = Math.min(end, audio.currentTime + 10);
    });
    progress.addEventListener('input', () => {
      if (Number.isFinite(audio.duration)) audio.currentTime = Number(progress.value) / 1000 * audio.duration;
    });
    ['loadedmetadata', 'timeupdate', 'play', 'pause', 'ended'].forEach(name => audio.addEventListener(name, sync));
    controllers.push({audio, sync});
    sync();
  });
})();
