document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('scrollVideo');
  let hasPlayed = false;

  // IntersectionObserver detects when video enters viewport
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      // Triggers when at least 50% of the video is visible in viewport
      if (entry.isIntersecting && !hasPlayed) {
        hasPlayed = true; // Ensures it only plays ONCE ever

        video.play().catch(err => {
          console.warn("Autoplay blocked or interrupted:", err);
        });

        // Unobserve after playing to free memory
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2 // 50% visibility required before playing
  });

  observer.observe(video);

  // Prevent user keyboard shortcuts (Spacebar/K for pause, Left/Right for seek) when video is focused
  window.addEventListener('keydown', (e) => {
    if (['Space', 'KeyK', 'ArrowLeft', 'ArrowRight'].includes(e.code) && document.activeElement === video) {
      e.preventDefault();
    }
  });
});