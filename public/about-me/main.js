const progressBars = document.querySelectorAll('.progress');

progressBars.forEach(bar => {
  const start = Number(bar.value) || 0;
  const target = start * 10; // preserve your original target logic

  // If you want the animation duration to depend on how far it must go:
  const distance = Math.abs(target - start);
  const duration = Math.max(800, 8 * distance + 600); // ms, tweak to taste

  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    bar.value = start + (target - start) * eased;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Ensure final is exact
      bar.value = target;
    }
  }

  requestAnimationFrame(animate);
});
