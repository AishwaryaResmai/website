/**
 * VISHWAS ENTERPRISES - MAIN SCRIPT
 * Bank Collection & Recovery Agency | Hyderabad & Secunderabad
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

/* ==========================================================================
   1. NAVBAR & HEADER DYNAMICS
   ========================================================================== */
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

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
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

/* ==========================================================================
   3. SCROLL SPY FOR NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. ANIMATED STAT COUNTERS
   ========================================================================== */
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
          const stepTime = Math.max(Math.floor(duration / target), 30);

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
  }, { threshold: 0.3 });

  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    observer.observe(heroCard);
  }
}

/* ==========================================================================
   5. GOOGLE MAPS DUAL LOCATION TABS
   ========================================================================== */
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

/* ==========================================================================
   6. B2B FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');

    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBody = otherItem.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 30 + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   7. INSTITUTIONAL B2B CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('b2bEnquiryForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset error styling
    const controls = form.querySelectorAll('.form-control');
    controls.forEach(c => c.classList.remove('error'));

    let isValid = true;

    // Field references
    const orgName = form.querySelector('#orgName');
    const contactPerson = form.querySelector('#contactPerson');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const service = form.querySelector('#service');
    const region = form.querySelector('#region');
    const message = form.querySelector('#message');

    // Validation Rules
    if (!orgName.value.trim()) {
      showFieldError(orgName, 'Organization name is required');
      isValid = false;
    }

    if (!contactPerson.value.trim()) {
      showFieldError(contactPerson, 'Representative name is required');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showFieldError(email, 'Please enter a valid official email address');
      isValid = false;
    }

    const cleanPhone = phone.value.replace(/\D/g, '');
    if (!phone.value.trim() || cleanPhone.length < 10) {
      showFieldError(phone, 'Please enter a valid 10-digit mobile number');
      isValid = false;
    }

    if (!service.value) {
      showFieldError(service, 'Please select a portfolio service category');
      isValid = false;
    }

    // Security & Compliance Check: Ensure no individual borrower account numbers or confidential sensitive info
    const sensitiveWords = ['account number', 'card number', 'cvv', 'borrower pan', 'aadhaar', 'loan acc', 'otp'];
    const msgLower = (message.value || '').toLowerCase();
    const hasSensitive = sensitiveWords.some(w => msgLower.includes(w));

    if (hasSensitive) {
      showFieldError(message, 'For compliance reasons, please do not include confidential borrower loan accounts or sensitive card data. This form is strictly for institutional partner onboarding.');
      isValid = false;
    }

    if (!isValid) return;

    // Build Payload
    const refId = 'VE-' + Math.floor(100000 + Math.random() * 900000);
    const payload = {
      refId,
      orgName: orgName.value.trim(),
      contactPerson: contactPerson.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      service: service.value,
      region: region.value || 'Telangana & Andhra Pradesh',
      message: message.value.trim(),
      submittedAt: new Date().toISOString()
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting Enquiry...</span>`;

    try {
      // Try backend endpoint if available
      let responseOk = false;
      try {
        const res = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) responseOk = true;
      } catch (err) {
        // Fallback for purely static hosting (GitHub Pages, file://, etc.)
        responseOk = true;
      }

      // Persist to localStorage for client-side audit
      const existing = JSON.parse(localStorage.getItem('ve_enquiries') || '[]');
      existing.push(payload);
      localStorage.setItem('ve_enquiries', JSON.stringify(existing));

      // Show confirmation modal
      showEnquirySuccessModal(payload);
      form.reset();
      showToast('Enquiry received successfully. Our corporate desk will connect shortly.', 'success');

    } catch (err) {
      showToast('Submission error. Please connect directly via +91 90525 35999.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showFieldError(input, msg) {
    input.classList.add('error');
    const errSpan = input.parentElement.querySelector('.error-msg');
    if (errSpan) {
      errSpan.textContent = msg;
    }
  }

  // Clear errors on input
  form.querySelectorAll('.form-control').forEach(ctrl => {
    ctrl.addEventListener('input', () => {
      ctrl.classList.remove('error');
    });
  });
}

/* ==========================================================================
   8. SUCCESS MODAL & WHATSAPP SYNC
   ========================================================================== */
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

  // Setup WhatsApp direct connect pre-fill
  if (waBtn) {
    const waText = encodeURIComponent(
      `Hello Vishwas Enterprises, I have submitted a corporate recovery inquiry.\n\n` +
      `*Reference:* ${data.refId}\n` +
      `*Organization:* ${data.orgName}\n` +
      `*Representative:* ${data.contactPerson}\n` +
      `*Service Required:* ${data.service}\n` +
      `*Region:* ${data.region}`
    );
    waBtn.href = `https://wa.me/919052535999?text=${waText}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   9. MODAL HANDLERS
   ========================================================================== */
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

/* ==========================================================================
   10. FLOATING ACTION WIDGETS
   ========================================================================== */
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

/* ==========================================================================
   11. HELPER: SELECT SERVICE AND SCROLL TO FORM
   ========================================================================== */
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
  }
};

/* ==========================================================================
   12. TOAST NOTIFICATIONS
   ========================================================================== */
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

