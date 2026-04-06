// ===== RAYTON Sensor Solutions - Main JS =====

document.addEventListener('DOMContentLoaded', () => {

  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // Scroll Animation (Intersection Observer)
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => observer.observe(el));
  }

  // Navbar scroll effect + Back to Top button
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 26, 18, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
      } else {
        navbar.style.background = 'rgba(10, 26, 18, 0.95)';
        navbar.style.boxShadow = 'none';
      }
      // Back to top visibility
      if (backToTop) {
        if (window.scrollY > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    });
  }
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Contact form handler — mailto fallback (or Google Forms if connected)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const googleFormURL = contactForm.getAttribute('data-google-form');

      if (googleFormURL) {
        // Google Forms connected
        fetch(googleFormURL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        }).then(() => {
          alert('문의가 성공적으로 전송되었습니다. 감사합니다!');
          contactForm.reset();
        }).catch(() => {
          alert('전송 중 오류가 발생했습니다. 이메일로 직접 문의해 주세요.');
        });
      } else {
        // mailto fallback
        const company = formData.get('entry.company') || '';
        const name = formData.get('entry.name') || '';
        const phone = formData.get('entry.phone') || '';
        const email = formData.get('entry.email') || '';
        const type = formData.get('entry.type') || '';
        const message = formData.get('entry.message') || '';

        const subject = encodeURIComponent('[RAYTON 문의] ' + type + ' - ' + (company || name));
        const body = encodeURIComponent(
          '회사명: ' + company + '\n' +
          '담당자: ' + name + '\n' +
          '연락처: ' + phone + '\n' +
          '이메일: ' + email + '\n' +
          '문의유형: ' + type + '\n\n' +
          '문의내용:\n' + message
        );
        window.location.href = 'mailto:info@rayton.ai?subject=' + subject + '&body=' + body;
      }
    });
  }

});
