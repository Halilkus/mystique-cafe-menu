// main.js — menü geçişleri ve mobil navigasyon
document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.menu-section');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  function showSection(id) {
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    // kaydet (sayfa yenilense seçili kalır)
    try { localStorage.setItem('myst_selected', id); } catch(e){}
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.target);
      // mobilde menüyü kapat
      if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
    });
  });

  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Başlangıçta daha önce seçilmişse onu göster
  const saved = (() => { try { return localStorage.getItem('myst_selected'); } catch(e){ return null } })();
  if (saved && document.getElementById(saved)) {
    showSection(saved);
  } else {
    // varsayılan soft
    showSection('soft');
  }

  // ESC ile mobil menüyü kapat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) mainNav.classList.remove('open');
  });
});
