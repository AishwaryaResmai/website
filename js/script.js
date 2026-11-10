/**
 * VISHWAS ENTERPRISES - CORE SCRIPTS (js/script.js)
 * Master Corporate Script for Banking Recovery Agency
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollSpy();
  initStatCounters();
  initMapTabs();
  initFaqAccordion();
  initContactForm();
  initFloatingActions();
  initModals();
});

/* --- 1. Sticky Navigation & Header Shadows --- */
function initNavbar() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- 2. Mobile Drawer Navigation --- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.close-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --- 3. Scroll Spy for Main Navigation --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `index.html#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --- 4. Animated Statistics Counters --- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1600;
          const stepTime = Math.max(Math.floor(duration / target), 25);

          const timer = setInterval(() => {
            current += 1;
            stat.textContent = current + suffix;
            if (current >= target) {
              stat.textContent = target + suffix;
              clearInterval(timer);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.25 });

  const heroCard = document.querySelector('.hero-card, .team-stats-banner');
  if (heroCard) {
    observer.observe(heroCard);
  }
}

/* --- 5. Google Maps Tabs (Suchitra vs Navakethan Secunderabad) --- */
function initMapTabs() {
  const tabButtons = document.querySelectorAll('.map-tab-btn');
  const panes = document.querySelectorAll('.map-pane');

  if (!tabButtons.length || !panes.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPaneId = btn.getAttribute('data-target');

      tabButtons.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* --- 6. Institutional FAQ Accordion --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');

    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBody = otherItem.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 35 + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });
}

/* --- 7. Institutional B2B Form Validation & Compliance Check --- */
function initContactForm() {
  const form = document.getElementById('b2bEnquiryForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const controls = form.querySelectorAll('.form-control');
    controls.forEach(c => c.classList.remove('error'));

    let isValid = true;

    const orgName = form.querySelector('#orgName');
    const contactPerson = form.querySelector('#contactPerson');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const service = form.querySelector('#service');
    const region = form.querySelector('#region');
    const message = form.querySelector('#message');

    if (!orgName || !orgName.value.trim()) {
      showFieldError(orgName, 'Bank or Organization name is required');
      isValid = false;
    }

    if (!contactPerson || !contactPerson.value.trim()) {
      showFieldError(contactPerson, 'Representative name is required');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.value.trim() || !emailRegex.test(email.value.trim())) {
      showFieldError(email, 'Please enter a valid official work email');
      isValid = false;
    }

    const cleanPhone = phone ? phone.value.replace(/\D/g, '') : '';
    if (!phone || !phone.value.trim() || cleanPhone.length < 10) {
      showFieldError(phone, 'Please enter a valid 10-digit mobile number');
      isValid = false;
    }

    if (!service || !service.value) {
      showFieldError(service, 'Please select a portfolio service category');
      isValid = false;
    }

    // Confidentiality Check: Prevent borrower loan numbers or sensitive account details
    const sensitiveKeywords = ['account number', 'card number', 'cvv', 'borrower pan', 'aadhaar', 'loan acc', 'otp', 'password'];
    const msgLower = (message && message.value ? message.value : '').toLowerCase();
    const hasSensitive = sensitiveKeywords.some(w => msgLower.includes(w));

    if (hasSensitive) {
      showFieldError(message, 'For compliance reasons, please do not include individual borrower account or card details. This form is strictly for institutional partner onboarding.');
      isValid = false;
    }

    if (!isValid) return;

    const refId = 'VE-' + Math.floor(100000 + Math.random() * 900000);
    const payload = {
      refId,
      orgName: orgName.value.trim(),
      contactPerson: contactPerson.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      service: service.value,
      region: (region && region.value) ? region.value : 'Telangana & Andhra Pradesh',
      message: (message && message.value) ? message.value.trim() : '',
      submittedAt: new Date().toISOString()
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting Enquiry...</span>`;

    try {
      try {
        await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        // Fallback for static servers
      }

      const existing = JSON.parse(localStorage.getItem('ve_enquiries') || '[]');
      existing.push(payload);
      localStorage.setItem('ve_enquiries', JSON.stringify(existing));

      showEnquirySuccessModal(payload);
      form.reset();
      showToast('Enquiry received successfully. Our corporate desk will connect shortly.', 'success');

    } catch (err) {
      showToast('Submission error. Please call directly at +91 90525 35999.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showFieldError(input, msg) {
    if (!input) return;
    input.classList.add('error');
    const errSpan = input.parentElement.querySelector('.error-msg');
    if (errSpan) {
      errSpan.textContent = msg;
    }
  }

  form.querySelectorAll('.form-control').forEach(ctrl => {
    ctrl.addEventListener('input', () => {
      ctrl.classList.remove('error');
    });
  });
}

/* --- 8. Modal Handlers & WhatsApp Pre-fill --- */
function showEnquirySuccessModal(data) {
  const modal = document.getElementById('enquirySuccessModal');
  if (!modal) return;

  const refElem = modal.querySelector('#confirmRefId');
  const orgElem = modal.querySelector('#confirmOrg');
  const serviceElem = modal.querySelector('#confirmService');
  const waBtn = modal.querySelector('#syncWhatsAppBtn');

  if (refElem) refElem.textContent = data.refId;
  if (orgElem) orgElem.textContent = data.orgName;
  if (serviceElem) serviceElem.textContent = data.service;

  if (waBtn) {
    const waText = encodeURIComponent(
      `Hello Vishwas Enterprises, I have submitted an institutional recovery enquiry.\n\n` +
      `*Reference:* ${data.refId}\n` +
      `*Institution:* ${data.orgName}\n` +
      `*Representative:* ${data.contactPerson}\n` +
      `*Service Required:* ${data.service}\n` +
      `*Region:* ${data.region}`
    );
    waBtn.href = `https://wa.me/919052535999?text=${waText}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function initModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  
  modals.forEach(modal => {
    const closeBtns = modal.querySelectorAll('.modal-close, .btn-close-modal');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

/* --- 9. Floating Action Widgets --- */
function initFloatingActions() {
  const topBtn = document.querySelector('.float-btn.back-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- 10. Helper: Select Service and Navigate --- */
window.selectServiceAndScroll = function(serviceName) {
  const select = document.getElementById('service');
  const formSection = document.getElementById('contact');

  if (select && serviceName) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) || 
          select.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.href = `contact.html?service=${encodeURIComponent(serviceName)}#contact`;
  }
};

/* --- 11. Toast Notifications --- */
function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
    </svg>
    <span>${msg}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}
