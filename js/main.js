/* ============================================================
   THE CURVE VIRAR — GSAP ANIMATIONS
   Cinematic scroll-driven experience
   ============================================================ */

// ─── GSAP SCROLL & ANIMATION SYSTEM ──────────────────────────
class CurveAnimations {
  constructor() {
    this.gsap = window.gsap;
    this.ST = window.ScrollTrigger;
    this.initialized = false;
  }

  init() {
    if (!this.gsap || !this.ST) {
      console.warn('GSAP not loaded, using CSS fallbacks');
      document.body.classList.add('gsap-fallback');
      return;
    }

    this.gsap.registerPlugin(this.ST);
    this.initialized = true;

    this.heroAnimations();
    this.whyAnimations();
    this.plazaAnimations();
    this.amenityAnimations();
    this.floorplanAnimations();
    this.locationAnimations();
    this.developerAnimations();
    this.enquiryAnimations();
    this.parallaxEffects();
    this.navbarBehavior();
  }

  // ─── HERO ──────────────────────────────────────────────────
  heroAnimations() {
    const tl = this.gsap.timeline({ delay: 0.2 });

    // Stagger hero eyebrow
    tl.from('.hero-eyebrow', {
      opacity: 0, y: 20, duration: 0.8,
      ease: 'power2.out'
    })

    // Title chars appear
    .from('.hero-title .char', {
      opacity: 0,
      y: 60,
      rotateX: -40,
      stagger: 0.025,
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.4')

    // Subtitle
    .from('.hero-subtitle', {
      opacity: 0, y: 30, duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')

    // CTAs
    .from('.hero-cta-group .btn', {
      opacity: 0, y: 20, stagger: 0.12, duration: 0.7,
      ease: 'power2.out'
    }, '-=0.4')

    // Stats
    .from('.hero-stat', {
      opacity: 0, y: 20, stagger: 0.1, duration: 0.7,
      ease: 'power2.out'
    }, '-=0.3')

    // Scroll indicator
    .from('.scroll-indicator', {
      opacity: 0, y: 10, duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2');

    // Hero parallax on scroll
    this.ST.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        this.gsap.set('.hero-content', {
          y: progress * 120,
          opacity: 1 - progress * 1.5
        });
        this.gsap.set('.hero-bg-image, .hero-placeholder', {
          scale: 1 + progress * 0.08
        });
      }
    });
  }

  // ─── WHY THE CURVE ─────────────────────────────────────────
  whyAnimations() {
    // Section label
    this.gsap.from('#why .label-text', {
      scrollTrigger: { trigger: '#why', start: 'top 75%' },
      opacity: 0, x: -30, duration: 0.8, ease: 'power2.out'
    });

    // Title
    this.gsap.from('#why .display-lg', {
      scrollTrigger: { trigger: '#why', start: 'top 70%' },
      opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 0.1
    });

    // Image parallax
    this.ST.create({
      trigger: '#why',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        this.gsap.set('.why-building-visual', {
          y: (self.progress - 0.5) * -60
        });
      }
    });

    // Gold badge pop
    this.gsap.from('.why-gold-badge', {
      scrollTrigger: { trigger: '.why-gold-badge', start: 'top 85%' },
      scale: 0, rotation: -20, opacity: 0,
      duration: 0.8, ease: 'back.out(1.7)', delay: 0.5
    });

    // Feature items stagger
    this.gsap.from('.why-feature', {
      scrollTrigger: { trigger: '.why-features', start: 'top 70%' },
      opacity: 0, x: 40, stagger: 0.15,
      duration: 0.7, ease: 'power2.out'
    });
  }

  // ─── AMENITY PLAZA ─────────────────────────────────────────
  plazaAnimations() {
    const tl = this.gsap.timeline({
      scrollTrigger: { trigger: '#plaza', start: 'top 60%' }
    });

    tl.from('#plaza .label-text', { opacity: 0, y: 20, duration: 0.7 })
      .from('#plaza .display-lg', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, '-=0.3')
      .from('#plaza .body-text', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      .from('.plaza-tagline', { opacity: 0, y: 20, duration: 0.7 }, '-=0.3')
      .from('.plaza-play-btn', { opacity: 0, scale: 0.7, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3');
  }

  // ─── AMENITIES ─────────────────────────────────────────────
  amenityAnimations() {
    this.gsap.from('.amenity-card', {
      scrollTrigger: { trigger: '.amenity-grid', start: 'top 70%' },
      opacity: 0, y: 40, scale: 0.96,
      stagger: { amount: 0.8, from: 'start' },
      duration: 0.7, ease: 'power2.out'
    });
  }

  // ─── FLOOR PLANS ───────────────────────────────────────────
  floorplanAnimations() {
    this.gsap.from('.floorplan-grid > *', {
      scrollTrigger: { trigger: '#floorplans', start: 'top 70%' },
      opacity: 0, y: 50, stagger: 0.2,
      duration: 0.9, ease: 'power3.out'
    });
  }

  // ─── LOCATION ──────────────────────────────────────────────
  locationAnimations() {
    this.gsap.from('.location-map-wrapper', {
      scrollTrigger: { trigger: '#location', start: 'top 70%' },
      opacity: 0, x: -60, duration: 1, ease: 'power3.out'
    });

    this.gsap.from('.location-item', {
      scrollTrigger: { trigger: '.location-categories', start: 'top 70%' },
      opacity: 0, x: 40, stagger: 0.07,
      duration: 0.6, ease: 'power2.out'
    });
  }

  // ─── DEVELOPER ─────────────────────────────────────────────
  developerAnimations() {
    this.gsap.from('.dev-stat', {
      scrollTrigger: { trigger: '.developer-stats', start: 'top 75%' },
      opacity: 0, y: 30, scale: 0.95,
      stagger: 0.1, duration: 0.7, ease: 'power2.out'
    });

    // Number counting animation
    document.querySelectorAll('.dev-stat-num[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';

      this.ST.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          this.gsap.fromTo(el,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: 'power1.out',
              snap: { innerText: 1 },
              onUpdate: function() {
                el.textContent = prefix + Math.round(this.targets()[0].innerText) + suffix;
              }
            }
          );
        }
      });
    });

    // Stagger image stack
    this.gsap.from(['.dev-image-main', '.dev-image-secondary'], {
      scrollTrigger: { trigger: '.dev-image-wrapper', start: 'top 75%' },
      opacity: 0, stagger: 0.2, y: 30, duration: 0.9, ease: 'power3.out'
    });
  }

  // ─── ENQUIRY ───────────────────────────────────────────────
  enquiryAnimations() {
    this.gsap.from('.enquiry-grid > *', {
      scrollTrigger: { trigger: '#enquiry', start: 'top 70%' },
      opacity: 0, y: 40, stagger: 0.2,
      duration: 0.9, ease: 'power3.out'
    });
  }

  // ─── PARALLAX ──────────────────────────────────────────────
  parallaxEffects() {
    // Subtle parallax on section backgrounds
    document.querySelectorAll('.parallax-slow').forEach(el => {
      this.ST.create({
        trigger: el.closest('section') || el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        onUpdate: (self) => {
          this.gsap.set(el, { y: (self.progress - 0.5) * -40 });
        }
      });
    });
  }

  // ─── NAVBAR ────────────────────────────────────────────────
  navbarBehavior() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    this.ST.create({
      trigger: 'body',
      start: 'top -80',
      onEnter: () => navbar?.classList.add('scrolled'),
      onLeaveBack: () => navbar?.classList.remove('scrolled')
    });
  }
}

// ─── MAIN JS ──────────────────────────────────────────────────
class TheCurveWebsite {
  constructor() {
    this.animations = new CurveAnimations();
    this.activeAmenityTab = 'ground';
    this.activeFloorplan = '2bhk';
  }

  init() {
    this.setupPreloader();
    this.setupCustomCursor();
    this.setupNav();
    this.setupAmenityTabs();
    this.setupFloorplanTabs();
    this.setupEnquiryForm();
    this.setupScrollReveal();
    this.setupHeroTitle();
    this.setupWhatsAppFloat();
    this.setupBackToTop();
    this.setupStars();
    this.setupTowerIllustration();
  }

  // ─── PRELOADER ─────────────────────────────────────────────
  setupPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        this.animations.init();
      }, 1800);
    });

    document.body.style.overflow = 'hidden';
  }

  // ─── CUSTOM CURSOR ─────────────────────────────────────────
  setupCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Scale cursor on interactive elements
    document.querySelectorAll('a, button, .amenity-card, .why-feature').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.borderColor = 'var(--gold)';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(201,169,110,0.5)';
      });
    });
  }

  // ─── NAVIGATION ────────────────────────────────────────────
  setupNav() {
    const toggle = document.getElementById('nav-mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-overlay');
    const closeBtn = document.getElementById('mobile-close');
    const drawerLinks = document.querySelectorAll('#mobile-drawer a');

    const openDrawer = () => {
      drawer?.classList.add('open');
      overlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
      drawer?.classList.remove('open');
      overlay?.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggle?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ─── AMENITY TABS ──────────────────────────────────────────
  setupAmenityTabs() {
    const tabs = document.querySelectorAll('.amenity-tab');
    const panels = document.querySelectorAll('.amenity-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(panel => {
          panel.style.display = panel.dataset.panel === target ? 'grid' : 'none';
          if (panel.dataset.panel === target) {
            panel.style.opacity = '0';
            setTimeout(() => { panel.style.opacity = '1'; }, 10);
            panel.style.transition = 'opacity 0.5s ease';
          }
        });

        this.activeAmenityTab = target;
      });
    });
  }

  // ─── FLOOR PLAN TABS ───────────────────────────────────────
  setupFloorplanTabs() {
    const tabs = document.querySelectorAll('.floorplan-tab');
    const panels = document.querySelectorAll('.floorplan-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.plan;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(panel => {
          const isActive = panel.dataset.plan === target;
          panel.style.display = isActive ? 'grid' : 'none';
          if (isActive) {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(20px)';
            setTimeout(() => {
              panel.style.opacity = '1';
              panel.style.transform = 'translateY(0)';
            }, 10);
            panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          }
        });

        this.activeFloorplan = target;
      });
    });
  }

  // ─── ENQUIRY FORM ──────────────────────────────────────────
  setupEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.form-submit');
      const successEl = document.getElementById('form-success');

      // Basic validation
      const name = form.querySelector('#name').value.trim();
      const phone = form.querySelector('#phone').value.trim();

      if (!name || !phone) {
        this.shakeElement(submitBtn);
        return;
      }

      if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) {
        this.showFieldError(form.querySelector('#phone'), 'Please enter a valid 10-digit Indian mobile number');
        return;
      }

      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // WhatsApp redirect as fallback
      const message = encodeURIComponent(
        `Hello, I'm interested in The Curve Virar.\n\nName: ${name}\nPhone: ${phone}\nConfiguration: ${form.querySelector('#config')?.value || 'TBD'}`
      );

      form.style.display = 'none';
      if (successEl) {
        successEl.classList.add('show');
      }

      // Open WhatsApp after 1 second
      setTimeout(() => {
        window.open(`https://wa.me/918530285005?text=${message}`, '_blank');
      }, 1000);
    });
  }

  shakeElement(el) {
    if (!el) return;
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.5s ease';
    el.addEventListener('animationend', () => { el.style.animation = ''; }, { once: true });
  }

  showFieldError(field, message) {
    if (!field) return;
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 0 1px #e74c3c20';
    const existing = field.parentElement.querySelector('.field-error');
    if (existing) existing.remove();
    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'color:#e74c3c;font-size:0.72rem;margin-top:4px;display:block;letter-spacing:0.05em;';
    err.textContent = message;
    field.parentElement.appendChild(err);
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.style.boxShadow = '';
      err.remove();
    }, { once: true });
  }

  // ─── SCROLL REVEAL ─────────────────────────────────────────
  setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });
  }

  // ─── HERO TITLE SPLIT ──────────────────────────────────────
  setupHeroTitle() {
    const titleEl = document.querySelector('.hero-title');
    if (!titleEl) return;

    // If GSAP SplitText not available, just add class
    if (!window.SplitText) return;

    try {
      const split = new window.SplitText(titleEl, { type: 'chars,words' });
      titleEl.querySelectorAll('.char').forEach(char => {
        char.style.display = 'inline-block';
      });
    } catch(e) {}
  }

  // ─── WHATSAPP ──────────────────────────────────────────────
  setupWhatsAppFloat() {
    const btn = document.querySelector('.whatsapp-btn');
    if (!btn) return;
    // Already handled via href in HTML
  }

  // ─── BACK TO TOP ───────────────────────────────────────────
  setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── GENERATE STARS ────────────────────────────────────────
  setupStars() {
    const containers = document.querySelectorAll('.hero-stars, .sky-gradient');
    containers.forEach(container => {
      for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.5 + 0.5;
        star.style.cssText = `
          width: ${size}px; height: ${size}px;
          top: ${Math.random() * 70}%;
          left: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 4}s;
          animation-duration: ${2 + Math.random() * 4}s;
        `;
        container.appendChild(star);
      }
    });
  }

  // ─── TOWER CSS ILLUSTRATION ────────────────────────────────
  setupTowerIllustration() {
    const containers = document.querySelectorAll('.sky-gradient');
    containers.forEach(container => {
      for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.className = 'sky-star';
        const size = Math.random() * 2 + 0.5;
        star.style.cssText = `
          width: ${size}px; height: ${size}px;
          top: ${Math.random() * 65}%;
          left: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 5}s;
          animation-duration: ${2 + Math.random() * 5}s;
        `;
        container.appendChild(star);
      }
    });
  }
}

// ─── SHAKE ANIMATION ─────────────────────────────────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// ─── BOOT ─────────────────────────────────────────────────────
const site = new TheCurveWebsite();
document.addEventListener('DOMContentLoaded', () => site.init());
