/* ═══════════════════════════════════════════════════════════════
   THE LOVECRAFT EXPERIENCE — script.js
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SCROLL REVEAL ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));


  /* ── 2. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 3. HEADER: MUDANÇA DE ESTILO NO SCROLL ── */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 30px rgba(26,15,8,0.4)';
    } else {
      header.style.boxShadow = '0 4px 20px rgba(26,15,8,0.3)';
    }
  });


  /* ── 4. EFEITO DE "TINTA CORRENDO" NOS WORK-ITEMS ── */
  document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
    });
  });


  /* ── 5. EFEITO DE GLITCH TEXTUAL NO HERO ── */
  const heroTitle = document.querySelector('.hero h2');
  if (heroTitle) {
    const glitchChars = 'Ph\'nglui mglw\'nafh Cthulhu R\'lyeh';
    let glitchInterval;

    heroTitle.addEventListener('mouseenter', () => {
      let i = 0;
      const original = heroTitle.innerHTML;
      glitchInterval = setInterval(() => {
        i++;
        if (i > 6) {
          clearInterval(glitchInterval);
          heroTitle.innerHTML = original;
        } else {
          const rand = Math.floor(Math.random() * glitchChars.length);
          const glitch = glitchChars.substring(rand, rand + 3);
          heroTitle.style.textShadow = i % 2 === 0
            ? `2px 0 rgba(45,74,42,0.6), -2px 0 rgba(92,26,10,0.4)`
            : `0 0 8px rgba(201,168,76,0.3)`;
        }
      }, 60);
    });

    heroTitle.addEventListener('mouseleave', () => {
      clearInterval(glitchInterval);
      heroTitle.style.textShadow = '';
    });
  }


  /* ── 6. PARTICLES DE POEIRA/ESPOROS ── */
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position: absolute;
        width: ${1 + Math.random() * 2}px;
        height: ${1 + Math.random() * 2}px;
        background: rgba(45,74,42,${0.2 + Math.random() * 0.4});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        animation: spore ${10 + Math.random() * 15}s linear ${Math.random() * 10}s infinite;
        pointer-events: none;
      `;
      particleContainer.appendChild(p);
    }

    // Injetar keyframes dinamicamente
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spore {
        0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
        10%  { opacity: 0.7; }
        90%  { opacity: 0.3; }
        100% { transform: translateY(-80vh) translateX(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 40}px) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }


  /* ── 7. NEWSLETTER: FEEDBACK DE SUBMIT ── */
  const form = document.querySelector('.ritual-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const input = form.querySelector('input');
      if (!input.value) return;

      btn.textContent = '⁂ Invocado';
      btn.style.background = '#2d4a2a';
      btn.style.borderColor = '#2d4a2a';
      input.value = '';
      input.placeholder = 'O pacto foi selado...';
      input.disabled = true;
      btn.disabled = true;
    });
  }


  /* ── 8. PARALLAX SUTIL NA IMAGEM DO HERO ── */
  const heroImg = document.querySelector('.hero-image-col img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }, { passive: true });
  }

});