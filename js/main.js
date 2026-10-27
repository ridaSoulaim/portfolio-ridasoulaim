/**
 * Main Application Logic & Interactivity
 * Rida Soulaim Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Management (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      showToast(`Switched to ${targetTheme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode`, 'info');
    });
  }

  // --------------------------------------------------------------------------
  // 2. Navigation & Mobile Drawer
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  // Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    highlightNavOnScroll();
  });

  // ScrollSpy / Active Link Highlighting
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        matchingLink?.classList.add('active');
      }
    });
  }

  // Mobile Drawer Toggle
  function toggleMobileMenu(open) {
    if (open) {
      mobileNav.classList.add('open');
      mobileNavBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      mobileNavBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });
  }

  mobileNavBackdrop?.addEventListener('click', () => toggleMobileMenu(false));

  // Close mobile drawer when clicking any link
  document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // --------------------------------------------------------------------------
  // 3. Dynamic Typing Effect in Hero
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  const titles = [
    'Full-Stack Web Developer',
    'React.js & Laravel Specialist',
    'PHP & JavaScript Developer',
    'Modern HTML5 & CSS3 Craftsman',
    'Docker & Database Engineer'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typingElement) return;

    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // --------------------------------------------------------------------------
  // 4. Statistics Counters & Skill Bars Observer
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number, .dev-stat-number');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  let statsAnimated = false;
  let skillsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.25 });

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        animateSkillBars();
      }
    });
  }, { threshold: 0.2 });

  const aboutSection = document.getElementById('about');
  const skillsSection = document.getElementById('skills');

  if (aboutSection) statsObserver.observe(aboutSection);
  if (skillsSection) skillsObserver.observe(skillsSection);

  function animateCounters() {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target') || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(interval);
        } else {
          counter.textContent = current + suffix;
        }
      }, 30);
    });
  }

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width') || '0%';
      bar.style.width = width;
    });
  }

  // --------------------------------------------------------------------------
  // 5. Project Filtering
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. Project Details Modal
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalContainer = document.getElementById('modal-container');
  const modalClose = document.getElementById('modal-close');
  const projectDetailBtns = document.querySelectorAll('.view-project-btn');
  const videoModal = document.getElementById('video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const demoVideo = document.getElementById('samiraart-demo-video');

  const projectData = {
    buildingproject: {
      title: 'Building Project — Modern Architecture & Construction Showcase',
      category: 'Full-Stack / React & Web App',
      description: 'A modern, responsive web application for architectural studios and construction companies. Features dynamic project exploration, interactive filtering, rich media galleries, custom admin management dashboard, and seamless client inquiry flows.',
      keyFeatures: [
        'Interactive project catalog with multi-category filtering and high-resolution photo galleries',
        'Custom Admin Dashboard for managing building listings, status updates, and media uploads',
        'Refined editorial design with Cormorant Garamond typography and warm architectural palette',
        'Instant edge hosting and automated continuous deployment with Vercel'
      ],
      techStack: ['React.js', 'JavaScript', 'CSS3', 'HTML5', 'Vercel', 'REST API'],
      liveDemo: 'https://building-project-2.vercel.app',
      github: 'https://github.com/ridaSoulaim/building-project-'
    },
    nexus: {
      title: 'Samira Art — Artist Portfolio & Online Shop',
      category: 'Full-Stack / E-Commerce',
      description: 'A polished artist portfolio and online shop where visitors can explore artwork, view product details, manage a cart, and complete their purchase journey.',
      keyFeatures: [
        'Artwork portfolio with dedicated detail pages',
        'Online shop with product browsing and cart management',
        'Multilingual pages for an accessible visitor experience',
        'Admin area for managing the store experience'
      ],
      techStack: ['React.js', 'JavaScript', 'Node.js', 'Tailwind CSS', 'Vite'],
      liveDemo: 'assets/samiraart.mp4',
      github: 'https://github.com/ridaSoulaim/samiraart'
    },
    moroccomap: {
      title: 'Morocco Map — Interactive Regional & Geospatial Explorer',
      category: 'Frontend / Geospatial Visualization',
      description: 'An interactive geospatial visualization platform featuring dynamic mapping of Moroccan regions, provinces, and key socio-demographic indicators with intuitive navigation and vector rendering.',
      keyFeatures: [
        'Interactive SVG & GeoJSON multi-layer mapping of all Moroccan regions and provinces',
        'Dynamic data inspection tooltips with socio-demographic indicators and regional stats',
        'Responsive touch-friendly navigation with fluid zoom and pan capabilities',
        'Clean client-side rendering with optimized modern JavaScript, HTML5, and CSS3'
      ],
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'GeoJSON', 'SVG'],
      liveDemo: 'https://github.com/ridaSoulaim/moroccomap',
      github: 'https://github.com/ridaSoulaim/moroccomap'
    }
  };

  projectDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const project = projectData[projectId];

      if (project && projectModal) {
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-category').textContent = project.category;
        document.getElementById('modal-description').textContent = project.description;

        // Features
        const featuresContainer = document.getElementById('modal-features');
        featuresContainer.innerHTML = project.keyFeatures
          .map(f => `<li>${f}</li>`)
          .join('');

        // Tech Stack
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = project.techStack
          .map(t => `<span class="tech-tag">${t}</span>`)
          .join('');

        // Links
        const demoLink = document.getElementById('modal-demo-link');
        const codeLink = document.getElementById('modal-code-link');
        if (demoLink) {
          demoLink.href = project.liveDemo;
          demoLink.dataset.videoUrl = project.liveDemo.endsWith('.mp4') ? project.liveDemo : '';
        }
        if (codeLink) codeLink.href = project.github;

        // Open modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    projectModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal?.classList.contains('active')) closeVideoModal();
      else if (projectModal?.classList.contains('active')) closeModal();
    }
  });

  function openVideoModal(videoUrl) {
    if (!videoModal || !demoVideo) return;
    closeModal();
    demoVideo.src = videoUrl;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    demoVideo.play().catch(() => {});
  }

  function closeVideoModal() {
    videoModal?.classList.remove('active');
    if (demoVideo) {
      demoVideo.pause();
      demoVideo.currentTime = 0;
    }
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.video-demo-btn').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoModal(link.href);
    });
  });

  document.getElementById('modal-demo-link')?.addEventListener('click', (e) => {
    const videoUrl = e.currentTarget.dataset.videoUrl;
    if (!videoUrl) return;
    e.preventDefault();
    openVideoModal(videoUrl);
  });

  videoModalClose?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  // --------------------------------------------------------------------------
  // 7. Interactive Contact Form & Toast Notifications
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const submitBtn = contactForm?.querySelector('button[type="submit"]');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Simple email regex check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending message...</span>`;

      try {
        const response = await fetch('https://formsubmit.co/ajax/ridasoul3@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _replyto: email,
            _subject: subject ? `${subject} — ${name}` : `Portfolio Contact from ${name}`,
            message: message,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
          contactForm.reset();
          showToast('Message sent successfully! Rida will reply to your email shortly.', 'success');
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          contactForm.reset();
          showToast('Activation email sent! Please check ridasoul3@gmail.com to activate FormSubmit.', 'info');
        } else {
          throw new Error(data.message || 'Error occurred while sending message');
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        showToast('Could not send message. Please email directly at ridasoul3@gmail.com', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  function showToast(message, type = 'info') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${icon}</span>
      <span style="font-size: 0.9rem; font-weight: 500;">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --------------------------------------------------------------------------
  // 8. Back To Top Button
  // --------------------------------------------------------------------------
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
