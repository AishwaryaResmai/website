/**
 * VISHWAS ENTERPRISES - CORE SCRIPTS (js/script.js)
 * Master Corporate Script for Banking Recovery Agency
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollSpy();
  initStatCounters();
  initJourneyTimeline();
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

/* --- 5. Interactive Recovery Growth Timeline (2019 - 2025) --- */
function initJourneyTimeline() {
  const milestones = [
    {
      year: '2019',
      amount: '₹1 Crore',
      tag: 'Inception & Foundation',
      badge: 'Founding Year Milestone',
      title: 'Our journey started back in 2019',
      desc: 'Vishwas Enterprises commenced operations in Suchitra, Hyderabad under the visionary leadership of Mr. R. Srinivas. Establishing rigorous ethical compliance and standardized operating workflows, our foundational team achieved ₹1 Crore in initial retail portfolio resolutions.',
      scale: '20 Seats &bull; Suchitra Head Office',
      award: 'Inaugural Operations',
      highlights: [
        '<strong>Headquarters Established:</strong> Operational registered office opened at Suchitra, Hyderabad with 20 seats.',
        '<strong>Foundational Governance:</strong> Standardized collection calling protocols and 100% adherence to RBI Fair Practices Code.',
        '<strong>Early Delinquency Resolution:</strong> Successful recovery benchmarks in early bucket retail personal loans and credit cards.'
      ]
    },
    {
      year: '2021',
      amount: '₹4 Crores',
      tag: 'Statewide Expansion',
      badge: 'Regional Growth Milestone',
      title: 'Regional expansion & 4x portfolio growth in 2021',
      desc: 'Quadrupled annual recovery volume to ₹4 Crores by scaling our field tracing network across all districts of Telangana and Andhra Pradesh. Deployed multilingual calling teams and structured skip-tracing workflows.',
      scale: 'Expanded Field Network',
      award: 'Regional Empanelments',
      highlights: [
        '<strong>₹4 Crores Resolved:</strong> 400% growth in annual debt resolution volume across retail banking products.',
        '<strong>Dual-State Network:</strong> Ground coverage established across key urban and semi-urban clusters in Telangana and AP.',
        '<strong>Specialized Skip Tracing:</strong> Advanced debtor tracing protocols to locate untraceable borrowers ethically.'
      ]
    },
    {
      year: '2022',
      amount: '₹12 Crores',
      tag: 'Multi-Bank Scale Up',
      badge: 'Institutional Trust Milestone',
      title: 'Tripled portfolio recoveries to ₹12 Crores in 2022',
      desc: 'Secured primary collection panel empanelments with leading scheduled commercial banks and premier NBFCs, tripling recovered debt to ₹12 Crores and commissioning our strategic Secunderabad branch at Navakethan Complex.',
      scale: 'Navakethan Branch Added (80 Seats)',
      award: 'First Platinum Citations',
      highlights: [
        '<strong>₹12 Crores Recoveries:</strong> Massive surge in hard bucket and written-off loan resolution throughput.',
        '<strong>Secunderabad Branch Opened:</strong> Commissioned high-capacity operations center at Navakethan Complex.',
        '<strong>Top Vendor Recognition:</strong> Awarded inaugural bank performance trophies for settlement speed and zero-complaint compliance.'
      ]
    },
    {
      year: '2025',
      amount: '₹70+ Crores',
      tag: 'Enterprise Scale Benchmark',
      badge: 'Landmark Milestone',
      title: 'Our journey reached landmark ₹70+ Crores in 2025',
      desc: 'Surpassed ₹70 Crores in collections and recoveries across consumer loans, credit cards, business loans, and outstation portfolios. Backed by 100 seats and 53 supervised personnel, Vishwas Enterprises stands as an industry leader in Southern India.',
      scale: '100 Seats &bull; 53 Staff',
      award: '11 Plat &bull; 6 Gold &bull; Premier League',
      highlights: [
        '<strong>₹70+ Crores Landmark:</strong> Proven ability to supervise and resolve large-scale delinquent portfolios with high velocity.',
        '<strong>100-Seat Infrastructure:</strong> Dual hubs operating seamlessly in Suchitra (20 seats) and Navakethan Complex (80 seats).',
        '<strong>53 Industry Experts:</strong> 2 supervisors, 2 back-office analysts, 45 telecallers, and 4 dedicated field recovery executives.'
      ]
    }
  ];

  const nodes = document.querySelectorAll('.journey-node');
  const progressLine = document.getElementById('timelineProgress');
  const prevBtn = document.getElementById('timelinePrev');
  const nextBtn = document.getElementById('timelineNext');

  const badgeElem = document.getElementById('journeyBadge');
  const amountHero = document.getElementById('journeyAmountHero');
  const yearMeta = document.getElementById('journeyYearMeta');
  const scaleMeta = document.getElementById('journeyScaleMeta');
  const awardMeta = document.getElementById('journeyAwardMeta');
  const tagElem = document.getElementById('journeyTag');
  const titleElem = document.getElementById('journeyTitle');
  const descElem = document.getElementById('journeyDesc');
  const highlightsElem = document.getElementById('journeyHighlights');

  if (!nodes.length) return;

  let currentIndex = 3; // Default to 2025 (latest milestone)

  function updateMilestone(index) {
    if (index < 0 || index >= milestones.length) return;
    currentIndex = index;

    // Update active node
    nodes.forEach((n, idx) => {
      if (idx === index) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });

    // Update progress bar width
    const percentage = (index / (milestones.length - 1)) * 100;
    if (progressLine) {
      progressLine.style.width = `${percentage}%`;
    }

    const data = milestones[index];

    // Fade effect and update display
    const displayCard = document.getElementById('journeyDisplay');
    if (displayCard) {
      displayCard.style.opacity = '0.4';
      displayCard.style.transform = 'translateY(4px)';
    }

    setTimeout(() => {
      if (badgeElem) badgeElem.textContent = data.badge;
      if (amountHero) amountHero.textContent = data.amount;
      if (yearMeta) yearMeta.textContent = data.year;
      if (scaleMeta) scaleMeta.innerHTML = data.scale;
      if (awardMeta) awardMeta.innerHTML = data.award;
      if (tagElem) tagElem.textContent = data.tag;
      if (titleElem) titleElem.textContent = data.title;
      if (descElem) descElem.textContent = data.desc;

      if (highlightsElem) {
        highlightsElem.innerHTML = data.highlights.map(h => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${h}</span>
          </li>
        `).join('');
      }

      if (displayCard) {
        displayCard.style.opacity = '1';
        displayCard.style.transform = 'translateY(0)';
      }
    }, 150);
  }

  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => updateMilestone(idx));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIdx = currentIndex > 0 ? currentIndex - 1 : milestones.length - 1;
      updateMilestone(newIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIdx = currentIndex < milestones.length - 1 ? currentIndex + 1 : 0;
      updateMilestone(newIdx);
    });
  }

  // Initialize with latest
  updateMilestone(currentIndex);
}

/* --- 6. Google Maps Tabs (Suchitra vs Navakethan Secunderabad) --- */
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

  // Auto pre-select service from URL parameter (e.g. ?service=Personal+Loan+Collections)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      const serviceSelect = form.querySelector('#service');
      if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.toLowerCase() === serviceParam.toLowerCase() ||
              serviceSelect.options[i].text.toLowerCase() === serviceParam.toLowerCase()) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  } catch (err) {}

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

