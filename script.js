const activateButton = document.querySelector('#activate-button');
const landing = document.querySelector('#landing');
const loading = document.querySelector('#loading');
const videoScreen = document.querySelector('#video-screen');
const video = document.querySelector('#main-video');
const soundButton = document.querySelector('#sound-button');

// Puedes cambiarlo por cualquier valor entre 5000 y 10000 milisegundos.
const loadingDuration = 7000;

activateButton.addEventListener('click', () => {
  activateButton.hidden = true;
  loading.hidden = false;

  window.setTimeout(() => {
    landing.hidden = true;
    videoScreen.hidden = false;
    requestAnimationFrame(() => videoScreen.classList.add('visible'));

    // El navegador permite la reproducción automática sin sonido.
    video.muted = true;
    video.play().catch(() => {});
  }, loadingDuration);
});

soundButton.addEventListener('click', () => {
  video.muted = !video.muted;
  soundButton.textContent = video.muted ? 'SOUND ON' : 'SOUND OFF';
  soundButton.setAttribute('aria-label', video.muted ? 'Activate sound' : 'Mute sound');
  if (!video.paused) video.play();
});