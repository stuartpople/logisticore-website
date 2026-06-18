(function () {
  function closeAllDropdowns(except) {
    document.querySelectorAll('.has-dropdown.is-open').forEach(el => {
      if (el !== except) {
        el.classList.remove('is-open');
        const btn = el.querySelector('.nav-dropdown-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('.has-dropdown').forEach(drop => {
    const trigger = drop.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const open = drop.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) closeAllDropdowns(drop);
    });
  });

  document.addEventListener('click', () => closeAllDropdowns(null));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllDropdowns(null);
  });
})();
