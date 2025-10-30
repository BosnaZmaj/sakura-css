// Sakura CSS Framework JavaScript
// Delightful interactions and animations for financial applications

// Utility: Convert string to consistent color index (1-40)
function stringToColorIndex(str, maxColors = 40) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % maxColors + 1;
}

class SakuraFramework {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupAnimations();
    this.setupCounters();
    this.setupFeatureModals();
    this.setupDemoModal();
    this.setupUrgencyUpdater();
    this.setupPricingToggle();
    this.setupTimelineAnimations();
    this.setupSparklineTooltips();
    this.setupUserDropdown();
    this.setupNotificationDropdown();
    this.setupNotificationsPage();
    this.setupAnalyticsCharts();
    this.initializeColoredDropdownIcons();
    this.setupEnvelopeDragDrop();
    this.setupIncomeModal();
    this.setupCalendar();
    this.setupInsightsCustomization();
  }

  // Navigation functionality
  setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.sakura-navbar-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Animation setup using Intersection Observer
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.sakura-feature-card, .sakura-dashboard-preview').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Animated counters for hero statistics
  setupCounters() {
    const counters = document.querySelectorAll('.sakura-stat-number');

    counters.forEach(counter => {
      const target = counter.innerText;
      const numericValue = parseFloat(target.replace(/[^\d.-]/g, ''));
      const suffix = target.replace(/[\d.-]/g, '');

      if (!isNaN(numericValue)) {
        let current = 0;
        const increment = numericValue / 60; // 60 frames for smooth animation

        const updateCounter = () => {
          current += increment;
          if (current < numericValue) {
            counter.innerText = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };

        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        observer.observe(counter);
      }
    });
  }

  // Enhanced dashboard preview interactions
  setupDashboardPreview() {
    const preview = document.querySelector('.sakura-dashboard-preview');
    if (preview) {
      // Add subtle hover effects and interactions
      preview.addEventListener('mouseenter', () => {
        preview.style.transform = 'perspective(1200px) rotateY(-4deg) rotateX(3deg) scale(1.02)';
      });

      preview.addEventListener('mouseleave', () => {
        preview.style.transform = 'perspective(1200px) rotateY(-8deg) rotateX(6deg) scale(1)';
      });
    }
  }

  // Progress bar animations
  animateProgressBars() {
    const progressBars = document.querySelectorAll('.sakura-progress-bar');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.style.width;
          progressBar.style.width = '0%';

          setTimeout(() => {
            progressBar.style.width = width;
          }, 300);

          observer.unobserve(progressBar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  }

  // Feature Explanation Modal System
  setupFeatureModals() {
    console.log('Setting up feature modals...');

    this.modal = document.getElementById('sakura-feature-modal');
    this.modalTitle = document.getElementById('feature-modal-title');
    this.featureVisual = document.getElementById('feature-visual');
    this.featureBenefits = document.getElementById('feature-benefits');
    this.featureSteps = document.getElementById('feature-steps');
    this.featureStory = document.getElementById('feature-story');
    this.tryDemoBtn = document.getElementById('try-demo-btn');

    console.log('Modal elements found:', {
      modal: !!this.modal,
      title: !!this.modalTitle,
      visual: !!this.featureVisual,
      benefits: !!this.featureBenefits,
      steps: !!this.featureSteps,
      story: !!this.featureStory,
      tryBtn: !!this.tryDemoBtn
    });

    // Set up event listeners
    this.setupModalEventListeners();
  }

  setupModalEventListeners() {
    // Learn More button clicks
    const learnMoreButtons = document.querySelectorAll('.sakura-feature-learn-more');
    console.log('Found Learn More buttons:', learnMoreButtons.length);

    learnMoreButtons.forEach((link, index) => {
      const featureType = link.getAttribute('data-feature');
      console.log(`Button ${index + 1} feature type:`, featureType);

      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Learn More clicked for feature:', featureType);
        this.openFeatureModal(featureType);
      });

      // Also add a test mousedown event to see if ANY events work
      link.addEventListener('mousedown', (e) => {
        console.log('Mousedown detected on:', featureType);
      });
    });

    // Modal close events
    document.getElementById('feature-modal-close')?.addEventListener('click', () => {
      this.closeFeatureModal();
    });

    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeFeatureModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('sakura-modal--active')) {
        this.closeFeatureModal();
      }
    });

    // Try Demo button
    this.tryDemoBtn?.addEventListener('click', () => {
      this.closeFeatureModal();
      this.openDemoModal();
    });

    // Goal Categories Data
    const goalCategories = [
      { value: 'financial-security', label: 'Financial Security', icon: 'shield-check' },
      { value: 'travel-leisure', label: 'Travel & Leisure', icon: 'airplane' },
      { value: 'home-purchase', label: 'Home Purchase', icon: 'house' },
      { value: 'education', label: 'Education', icon: 'mortarboard' },
      { value: 'vehicle', label: 'Vehicle Purchase', icon: 'car-front' },
      { value: 'investment', label: 'Investment', icon: 'graph-up' },
      { value: 'wedding', label: 'Wedding', icon: 'heart' },
      { value: 'debt-payoff', label: 'Debt Payoff', icon: 'credit-card' },
      { value: 'retirement', label: 'Retirement', icon: 'hourglass-split' },
      { value: 'medical', label: 'Medical/Healthcare', icon: 'hospital' },
      { value: 'business', label: 'Business/Startup', icon: 'briefcase' },
      { value: 'entertainment', label: 'Entertainment/Hobby', icon: 'controller' },
      { value: 'other', label: 'Other', icon: 'star' }
    ];

    // Goal Icons Data
    const goalIcons = [
      { value: 'currency-dollar', label: 'Dollar Sign' },
      { value: 'piggy-bank', label: 'Piggy Bank' },
      { value: 'geo-alt', label: 'Location Pin' },
      { value: 'house', label: 'House' },
      { value: 'car-front', label: 'Car' },
      { value: 'airplane', label: 'Airplane' },
      { value: 'mortarboard', label: 'Graduation Cap' },
      { value: 'heart', label: 'Heart' },
      { value: 'trophy', label: 'Trophy' },
      { value: 'star', label: 'Star' },
      { value: 'gift', label: 'Gift' },
      { value: 'briefcase', label: 'Briefcase' }
    ];

    // Create Goal Modal
    const openCreateGoalBtn = document.getElementById('openCreateGoalModal');
    const createGoalModal = document.getElementById('createGoalModal');
    const closeGoalModalBtns = createGoalModal?.querySelectorAll('[data-close-modal]');
    const createGoalForm = document.getElementById('createGoalForm');

    // Populate category dropdown with dynamic color assignment
    const categoryDropdown = document.querySelector('#goalCategorySelect .sakura-custom-select-dropdown');
    if (categoryDropdown) {
      categoryDropdown.innerHTML = goalCategories.map(cat => {
        const colorClass = `color-${stringToColorIndex(cat.value)}`;
        return `
          <div class="sakura-custom-select-option" data-value="${cat.value}">
            <i class="bi bi-${cat.icon} sakura-option-icon sakura-option-icon--colored ${colorClass}"></i>
            ${cat.label}
          </div>
        `;
      }).join('');
    }

    // Populate icon dropdown with dynamic color assignment
    const iconDropdown = document.querySelector('#goalIconSelect .sakura-custom-select-dropdown');
    if (iconDropdown) {
      iconDropdown.innerHTML = goalIcons.map(icon => {
        const colorClass = `color-${stringToColorIndex(icon.value)}`;
        return `
          <div class="sakura-custom-select-option" data-value="${icon.value}">
            <i class="bi bi-${icon.value} sakura-option-icon sakura-option-icon--colored ${colorClass}"></i>
            ${icon.label}
          </div>
        `;
      }).join('');
    }

    // Initialize Goal Target Date Picker
    const goalDatepicker = document.getElementById('goalTargetDatepicker');
    if (goalDatepicker) {
      const input = goalDatepicker.querySelector('.sakura-datepicker-input');
      const inputField = goalDatepicker.querySelector('#goalTargetDate');
      const hiddenInput = goalDatepicker.querySelector('#goalTargetDateValue');
      const dropdown = goalDatepicker.querySelector('.sakura-datepicker-dropdown');
      const daysContainer = goalDatepicker.querySelector('.sakura-datepicker-days');
      const monthDisplay = goalDatepicker.querySelector('.sakura-datepicker-month');
      const prevBtn = goalDatepicker.querySelector('.sakura-datepicker-prev');
      const nextBtn = goalDatepicker.querySelector('.sakura-datepicker-next');

      let currentDate = new Date();
      let selectedDate = null;

      // Open dropdown on icon click
      const calendarIcon = input.querySelector('i');
      if (calendarIcon) {
        calendarIcon.addEventListener('click', (e) => {
          e.stopPropagation();
          goalDatepicker.classList.add('active');
          renderGoalCalendar();
        });
      }

      // Open dropdown on input focus
      inputField.addEventListener('focus', () => {
        goalDatepicker.classList.add('active');
        renderGoalCalendar();
      });

      // Handle manual date input
      inputField.addEventListener('input', (e) => {
        const value = e.target.value;
        const dateMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

        if (dateMatch) {
          const month = parseInt(dateMatch[1]) - 1;
          const day = parseInt(dateMatch[2]);
          const year = parseInt(dateMatch[3]);
          const parsedDate = new Date(year, month, day);

          if (parsedDate.getMonth() === month && parsedDate.getDate() === day && parsedDate.getFullYear() === year) {
            selectedDate = parsedDate;
            currentDate = new Date(parsedDate);
            const yyyy = selectedDate.getFullYear();
            const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const dd = String(selectedDate.getDate()).padStart(2, '0');
            hiddenInput.value = `${yyyy}-${mm}-${dd}`;
            if (goalDatepicker.classList.contains('active')) {
              renderGoalCalendar();
            }
          }
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!goalDatepicker.contains(e.target)) {
          goalDatepicker.classList.remove('active');
        }
      });

      // Previous month
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderGoalCalendar();
      });

      // Next month
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderGoalCalendar();
      });

      function renderGoalCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthDisplay.textContent = new Date(year, month, 1).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        });

        daysContainer.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
          const day = daysInPrevMonth - i;
          const dayEl = document.createElement('div');
          dayEl.className = 'sakura-datepicker-day other-month';
          dayEl.textContent = day;
          daysContainer.appendChild(dayEl);
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
          const dayEl = document.createElement('div');
          dayEl.className = 'sakura-datepicker-day';
          dayEl.textContent = day;

          const dayDate = new Date(year, month, day);
          const today = new Date();
          if (dayDate.toDateString() === today.toDateString()) {
            dayEl.classList.add('today');
          }

          if (selectedDate && dayDate.toDateString() === selectedDate.toDateString()) {
            dayEl.classList.add('selected');
          }

          dayEl.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedDate = dayDate;
            const mm = String(month + 1).padStart(2, '0');
            const dd = String(day).padStart(2, '0');
            const yyyy = year;
            inputField.value = `${mm}/${dd}/${yyyy}`;
            hiddenInput.value = `${yyyy}-${mm}-${dd}`;
            goalDatepicker.classList.remove('active');
            renderGoalCalendar();
          });

          daysContainer.appendChild(dayEl);
        }

        // Next month days
        const totalCells = daysContainer.children.length;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let day = 1; day <= remainingCells; day++) {
          const dayEl = document.createElement('div');
          dayEl.className = 'sakura-datepicker-day other-month';
          dayEl.textContent = day;
          daysContainer.appendChild(dayEl);
        }
      }
    }

    console.log('Create Goal Modal Setup:', {
      button: !!openCreateGoalBtn,
      modal: !!createGoalModal,
      form: !!createGoalForm,
      categories: goalCategories.length,
      icons: goalIcons.length,
      datepicker: !!goalDatepicker
    });

    if (openCreateGoalBtn && createGoalModal) {
      openCreateGoalBtn.addEventListener('click', () => {
        console.log('Create Goal button clicked!');
        createGoalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeGoalModalBtns && createGoalModal) {
      closeGoalModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          console.log('Close button clicked');
          createGoalModal.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    if (createGoalModal) {
      createGoalModal.addEventListener('click', (e) => {
        if (e.target === createGoalModal) {
          console.log('Overlay clicked');
          createGoalModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && createGoalModal.classList.contains('active')) {
          console.log('ESC pressed');
          createGoalModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    if (createGoalForm && createGoalModal) {
      createGoalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
          name: document.getElementById('goalName').value,
          category: document.getElementById('goalCategory').value,
          targetAmount: document.getElementById('goalTargetAmount').value,
          targetDate: document.getElementById('goalTargetDateValue').value,
          icon: document.getElementById('goalIcon').value,
          initialAmount: document.getElementById('goalInitialAmount').value || 0,
          description: document.getElementById('goalDescription').value
        };

        console.log('Goal created:', formData);

        // Close modal and reset form
        createGoalModal.classList.remove('active');
        document.body.style.overflow = '';
        createGoalForm.reset();

        // Reset custom selects
        const customSelects = createGoalModal.querySelectorAll('.sakura-custom-select-trigger');
        customSelects.forEach(trigger => {
          trigger.textContent = trigger.classList.contains('placeholder') ?
            trigger.dataset.placeholder || 'Select...' : 'Select...';
          trigger.classList.add('placeholder');
        });

        // Show success message (you can enhance this)
        alert('Goal created successfully!');
      });
    }
  }

  openFeatureModal(featureType) {
    console.log('Opening modal for:', featureType);
    console.log('Modal element exists:', !!this.modal);

    const featureData = this.getFeatureData(featureType);
    console.log('Feature data found:', !!featureData);

    if (featureData) {
      this.populateModalContent(featureData);
      this.modal?.classList.add('sakura-modal--active');
      document.body.style.overflow = 'hidden';
      console.log('Modal should be visible now');
    } else {
      console.error('No feature data found for:', featureType);
    }
  }

  closeFeatureModal() {
    this.modal?.classList.remove('sakura-modal--active');
    document.body.style.overflow = '';
  }

  populateModalContent(data) {
    // Update title
    if (this.modalTitle) {
      this.modalTitle.textContent = data.title;
    }

    // Update visual section
    if (this.featureVisual) {
      this.featureVisual.innerHTML = `
        <div class="sakura-visual-content">
          ${data.visual}
        </div>
      `;
    }

    // Update benefits section
    if (this.featureBenefits) {
      this.featureBenefits.innerHTML = data.benefits.map(benefit => `
        <div class="sakura-benefit-item">
          <div class="sakura-benefit-icon">
            <i class="${benefit.icon}"></i>
          </div>
          <div class="sakura-benefit-title">${benefit.title}</div>
          <div class="sakura-benefit-description">${benefit.description}</div>
        </div>
      `).join('');
    }

    // Update process steps
    if (this.featureSteps) {
      this.featureSteps.innerHTML = data.steps.map((step, index) => `
        <div class="sakura-process-step">
          <div class="sakura-step-number">${index + 1}</div>
          <div class="sakura-step-title">${step.title}</div>
          <div class="sakura-step-description">${step.description}</div>
        </div>
      `).join('');
    }

    // Update user story
    if (this.featureStory) {
      this.featureStory.innerHTML = `
        <div class="sakura-story-avatar">${data.story.avatar}</div>
        <div class="sakura-story-quote">${data.story.quote}</div>
        <div class="sakura-story-attribution">— ${data.story.name}, ${data.story.title}</div>
        <div class="sakura-story-results">
          ${data.story.metrics.map(metric => `
            <div class="sakura-story-metric">
              <span class="sakura-story-number">${metric.value}</span>
              <span class="sakura-story-label">${metric.label}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  getFeatureData(featureType) {
    const featureData = {
      'smart-envelopes': {
        title: 'Smart Envelopes',
        visual: `
          <div style="font-size: 4rem; color: #5B8BF5;">
            <i class="bi bi-collection" style="margin-right: 1rem;"></i>
            <i class="bi bi-arrow-right" style="font-size: 2rem; vertical-align: middle; margin: 0 1rem; color: #8B5CF6;"></i>
            <i class="bi bi-wallet2" style="color: #10B981;"></i>
          </div>
          <p style="font-size: 1.125rem; color: #6b7280; margin-top: 1rem;">Your money, organized into smart digital envelopes</p>
        `,
        benefits: [
          {
            icon: 'bi-shield-check',
            title: 'Never Overspend',
            description: 'Each envelope has a limit - when it\'s empty, you know to stop spending'
          },
          {
            icon: 'bi-eye',
            title: 'Clear Visibility',
            description: 'See exactly where your money goes with colorful, intuitive categories'
          },
          {
            icon: 'bi-lightning',
            title: 'Instant Updates',
            description: 'Every purchase automatically updates the right envelope in real-time'
          }
        ],
        steps: [
          {
            title: 'Create Categories',
            description: 'Set up envelopes for dining, entertainment, bills, and more'
          },
          {
            title: 'Allocate Money',
            description: 'Put a specific amount in each envelope every month'
          },
          {
            title: 'Spend Wisely',
            description: 'Watch your envelope balances as you make purchases'
          }
        ],
        story: {
          avatar: 'S',
          name: 'Sarah Johnson',
          title: 'Marketing Manager',
          quote: 'I used to wonder where my money went every month. Now with smart envelopes, I put $300 in my "Dining Out" envelope and I know exactly how much I can spend. It\'s like having cash envelopes, but digital and automatic!',
          metrics: [
            { value: '$450', label: 'Monthly Savings' },
            { value: '40%', label: 'Spending Reduction' },
            { value: '3 months', label: 'To Build Habit' }
          ]
        }
      },

      'automatic-allocation': {
        title: 'Automatic Allocation',
        visual: `
          <div style="font-size: 4rem; color: #7c3aed;">
            <i class="bi bi-currency-dollar" style="margin-right: 1rem;"></i>
            <i class="bi bi-magic" style="font-size: 3rem; vertical-align: middle; margin: 0 1rem; color: #8B5CF6;"></i>
            <i class="bi bi-distribute-vertical" style="color: #10B981;"></i>
          </div>
          <p style="font-size: 1.125rem; color: #6b7280; margin-top: 1rem;">Your paycheck automatically flows to the right places</p>
        `,
        benefits: [
          {
            icon: 'bi-clock',
            title: 'Save Time',
            description: 'Set it once, and your budget runs itself every payday'
          },
          {
            icon: 'bi-gear',
            title: 'No Manual Work',
            description: 'No more moving money around or forgetting to budget'
          },
          {
            icon: 'bi-graph-up',
            title: 'Consistent Habits',
            description: 'Build strong financial habits without thinking about it'
          }
        ],
        steps: [
          {
            title: 'Set Percentages',
            description: 'Decide what percentage goes to savings, bills, fun money, etc.'
          },
          {
            title: 'Connect Payroll',
            description: 'Link your bank account and set up automatic transfers'
          },
          {
            title: 'Relax & Prosper',
            description: 'Every paycheck automatically goes where it should'
          }
        ],
        story: {
          avatar: 'J',
          name: 'John Martinez',
          title: 'Software Developer',
          quote: 'Before automation, I\'d get paid and forget to budget for weeks. Now 20% automatically goes to savings, 30% to bills, and I never have to think about it. It\'s like having a financial assistant!',
          metrics: [
            { value: '$1,200', label: 'Auto-Saved Monthly' },
            { value: '0 minutes', label: 'Manual Budget Time' },
            { value: '6 months', label: 'Emergency Fund Built' }
          ]
        }
      },

      'visual-insights': {
        title: 'Visual Insights',
        visual: `
          <div style="font-size: 4rem; color: #059669;">
            <i class="bi bi-pie-chart" style="margin-right: 1rem;"></i>
            <i class="bi bi-bar-chart-line" style="margin: 0 1rem;"></i>
            <i class="bi bi-graph-up-arrow" style="color: #10B981;"></i>
          </div>
          <p style="font-size: 1.125rem; color: #6b7280; margin-top: 1rem;">Beautiful charts that make your money story clear</p>
        `,
        benefits: [
          {
            icon: 'bi-lightbulb',
            title: 'Spot Patterns',
            description: 'Discover spending habits you never knew you had'
          },
          {
            icon: 'bi-target',
            title: 'Make Better Decisions',
            description: 'See where cuts will have the biggest impact'
          },
          {
            icon: 'bi-trending-up',
            title: 'Track Progress',
            description: 'Watch your financial health improve over time'
          }
        ],
        steps: [
          {
            title: 'Connect Accounts',
            description: 'Link your bank and credit cards for complete visibility'
          },
          {
            title: 'View Insights',
            description: 'See beautiful charts showing where your money goes'
          },
          {
            title: 'Take Action',
            description: 'Use insights to optimize your spending and saving'
          }
        ],
        story: {
          avatar: 'L',
          name: 'Lisa Chen',
          title: 'Teacher',
          quote: 'The spending breakdown chart showed me I was spending $400 a month on coffee shops and takeout! I had no idea. Now I see exactly where every dollar goes and I\'ve cut my food spending by 50%.',
          metrics: [
            { value: '$200', label: 'Monthly Savings Found' },
            { value: '15 min', label: 'Weekly Review Time' },
            { value: '12 insights', label: 'Money-Saving Discoveries' }
          ]
        }
      },

      'goal-tracking': {
        title: 'Goal Tracking',
        visual: `
          <div style="font-size: 4rem; color: #d97706;">
            <i class="bi bi-flag" style="margin-right: 1rem;"></i>
            <i class="bi bi-arrow-right" style="font-size: 2rem; vertical-align: middle; margin: 0 1rem; color: #8B5CF6;"></i>
            <i class="bi bi-trophy" style="color: #10B981;"></i>
          </div>
          <p style="font-size: 1.125rem; color: #6b7280; margin-top: 1rem;">Turn your financial dreams into achievable milestones</p>
        `,
        benefits: [
          {
            icon: 'bi-bullseye',
            title: 'Stay Motivated',
            description: 'See your progress towards each goal with visual progress bars'
          },
          {
            icon: 'bi-calendar-check',
            title: 'Smart Timelines',
            description: 'Get realistic timelines for reaching each financial goal'
          },
          {
            icon: 'bi-trophy',
            title: 'Celebrate Wins',
            description: 'Get notifications and celebrations when you hit milestones'
          }
        ],
        steps: [
          {
            title: 'Set Goals',
            description: 'Define your emergency fund, vacation, or house down payment'
          },
          {
            title: 'Plan Contributions',
            description: 'Decide how much to save monthly for each goal'
          },
          {
            title: 'Watch Progress',
            description: 'See your goals grow closer with every contribution'
          }
        ],
        story: {
          avatar: 'M',
          name: 'Mike Thompson',
          title: 'Nurse',
          quote: 'I always wanted a $5,000 emergency fund but it felt impossible. The goal tracker showed me I could do it in 10 months by saving $500 monthly. Seeing that progress bar fill up kept me motivated every month!',
          metrics: [
            { value: '$5,000', label: 'Emergency Fund Built' },
            { value: '10 months', label: 'Time to Goal' },
            { value: '3 goals', label: 'Active Savings Goals' }
          ]
        }
      },

      'bank-sync': {
        title: 'Bank Sync',
        visual: `
          <div style="font-size: 4rem; color: #db2777;">
            <i class="bi bi-bank" style="margin-right: 1rem;"></i>
            <i class="bi bi-arrow-left-right" style="font-size: 2rem; vertical-align: middle; margin: 0 1rem; color: #8B5CF6;"></i>
            <i class="bi bi-phone" style="color: #10B981;"></i>
          </div>
          <p style="font-size: 1.125rem; color: #6b7280; margin-top: 1rem;">Your budget stays current automatically</p>
        `,
        benefits: [
          {
            icon: 'bi-clock-history',
            title: 'Real-Time Updates',
            description: 'Every transaction updates your budget within minutes'
          },
          {
            icon: 'bi-shield-lock',
            title: 'Bank-Level Security',
            description: 'Your data is protected with the same security banks use'
          },
          {
            icon: 'bi-check-circle',
            title: 'Always Accurate',
            description: 'No more manual entry errors or forgotten transactions'
          }
        ],
        steps: [
          {
            title: 'Connect Securely',
            description: 'Link your bank accounts with military-grade encryption'
          },
          {
            title: 'Categorize Automatically',
            description: 'Transactions are automatically sorted into the right envelopes'
          },
          {
            title: 'Stay Updated',
            description: 'Your budget reflects reality in real-time, 24/7'
          }
        ],
        story: {
          avatar: 'E',
          name: 'Emma Davis',
          title: 'Freelancer',
          quote: 'As a freelancer with irregular income, tracking expenses was a nightmare. Now every coffee purchase, client payment, and bill automatically updates my budget. I finally have a clear picture of my finances!',
          metrics: [
            { value: '2 minutes', label: 'Setup Time' },
            { value: '100%', label: 'Transaction Accuracy' },
            { value: '5 accounts', label: 'Connected Banks' }
          ]
        }
      },

      'smart-alerts': {
        title: 'Smart Alerts',
        visual: `
          <div style="font-size: 4rem; color: #1f2937;">
            <i class="bi bi-bell" style="margin-right: 1rem;"></i>
            <i class="bi bi-chat-heart" style="font-size: 2rem; vertical-align: middle; margin: 0 1rem; color: #8B5CF6;"></i>
            <i class="bi bi-shield-check" style="color: #10B981;"></i>
          </div>
          <p style="font-size: 1.125rem; color: #6b7280; margin-top: 1rem;">Gentle nudges that keep you on track</p>
        `,
        benefits: [
          {
            icon: 'bi-heart',
            title: 'Gentle Guidance',
            description: 'Helpful reminders, not annoying nagging or shame'
          },
          {
            icon: 'bi-sliders',
            title: 'Fully Customizable',
            description: 'Choose what alerts you want and when you want them'
          },
          {
            icon: 'bi-graph-up',
            title: 'Stay On Track',
            description: 'Prevent overspending before it becomes a problem'
          }
        ],
        steps: [
          {
            title: 'Set Preferences',
            description: 'Choose which alerts you want and when to receive them'
          },
          {
            title: 'Get Notified',
            description: 'Receive gentle reminders when approaching limits'
          },
          {
            title: 'Make Adjustments',
            description: 'Use alerts as opportunities to make better choices'
          }
        ],
        story: {
          avatar: 'D',
          name: 'David Wilson',
          title: 'Sales Representative',
          quote: 'The gentle nudge when I\'m close to my entertainment budget limit has saved me hundreds. Instead of guilt-tripping me, it just says "You have $40 left for entertainment this month" - so helpful and positive!',
          metrics: [
            { value: '$300', label: 'Monthly Overspend Prevented' },
            { value: '85%', label: 'Budget Adherence Rate' },
            { value: '0 stress', label: 'Financial Anxiety Level' }
          ]
        }
      }
    };

    return featureData[featureType] || null;
  }

  // Interactive Demo Modal System
  setupDemoModal() {
    this.demoModal = document.getElementById('sakura-demo-modal');
    this.demoSetup = document.getElementById('demo-setup');
    this.demoDashboard = document.getElementById('demo-dashboard');

    // Form elements
    this.demoIncomeInput = document.getElementById('demo-income');
    this.demoHousingInput = document.getElementById('demo-housing');
    this.demoFoodInput = document.getElementById('demo-food');
    this.demoEntertainmentInput = document.getElementById('demo-entertainment');
    this.demoSavingsInput = document.getElementById('demo-savings');

    // Dashboard elements
    this.demoIncomeDisplay = document.getElementById('demo-income-display');
    this.demoBudgetedDisplay = document.getElementById('demo-budgeted-display');
    this.demoAvailableDisplay = document.getElementById('demo-available-display');
    this.demoEnvelopesGrid = document.getElementById('demo-envelopes-grid');

    this.setupDemoEventListeners();
  }

  setupDemoEventListeners() {
    // Main Watch Demo button
    const watchDemoBtn = document.querySelector('a[href="#demo"]');
    watchDemoBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openDemoModal();
    });

    // Demo modal close events
    document.getElementById('demo-modal-close')?.addEventListener('click', () => {
      this.closeDemoModal();
    });

    this.demoModal?.addEventListener('click', (e) => {
      if (e.target === this.demoModal) {
        this.closeDemoModal();
      }
    });

    // Create demo button
    document.getElementById('create-demo-btn')?.addEventListener('click', () => {
      this.createDemoBudget();
    });

    // Reset demo button
    document.getElementById('demo-reset-btn')?.addEventListener('click', () => {
      this.resetDemo();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.demoModal?.classList.contains('sakura-modal--active')) {
        this.closeDemoModal();
      }
    });
  }

  openDemoModal() {
    this.demoModal?.classList.add('sakura-modal--active');
    document.body.style.overflow = 'hidden';
    this.resetDemo();
  }

  closeDemoModal() {
    this.demoModal?.classList.remove('sakura-modal--active');
    document.body.style.overflow = '';
  }

  resetDemo() {
    // Show setup form, hide dashboard
    this.demoSetup.style.display = 'block';
    this.demoDashboard.style.display = 'none';

    // Reset form values to defaults
    if (this.demoIncomeInput) this.demoIncomeInput.value = '5000';
    if (this.demoHousingInput) this.demoHousingInput.value = '1500';
    if (this.demoFoodInput) this.demoFoodInput.value = '600';
    if (this.demoEntertainmentInput) this.demoEntertainmentInput.value = '300';
    if (this.demoSavingsInput) this.demoSavingsInput.value = '800';
  }

  createDemoBudget() {
    // Get form values
    const income = parseInt(this.demoIncomeInput?.value || '5000');
    const housing = parseInt(this.demoHousingInput?.value || '1500');
    const food = parseInt(this.demoFoodInput?.value || '600');
    const entertainment = parseInt(this.demoEntertainmentInput?.value || '300');
    const savings = parseInt(this.demoSavingsInput?.value || '800');

    const totalBudgeted = housing + food + entertainment + savings;
    const available = income - totalBudgeted;

    // Update summary displays
    if (this.demoIncomeDisplay) {
      this.demoIncomeDisplay.textContent = `$${income.toLocaleString()}`;
    }
    if (this.demoBudgetedDisplay) {
      this.demoBudgetedDisplay.textContent = `$${totalBudgeted.toLocaleString()}`;
    }
    if (this.demoAvailableDisplay) {
      this.demoAvailableDisplay.textContent = `$${available.toLocaleString()}`;
    }

    // Create envelope data
    const envelopes = [
      {
        category: 'Housing',
        budget: housing,
        spent: Math.floor(housing * 0.65), // 65% spent
        icon: 'bi-house-door',
        color: '#10B981'
      },
      {
        category: 'Food & Dining',
        budget: food,
        spent: Math.floor(food * 0.80), // 80% spent
        icon: 'bi-shop',
        color: '#F59E0B'
      },
      {
        category: 'Entertainment',
        budget: entertainment,
        spent: Math.floor(entertainment * 0.45), // 45% spent
        icon: 'bi-controller',
        color: '#8B5CF6'
      },
      {
        category: 'Savings Goal',
        budget: savings,
        spent: Math.floor(savings * 0.90), // 90% saved
        icon: 'bi-piggy-bank',
        color: '#5B8BF5'
      }
    ];

    // Generate envelope cards
    this.generateEnvelopeCards(envelopes);

    // Switch to dashboard view
    this.demoSetup.style.display = 'none';
    this.demoDashboard.style.display = 'block';
  }

  generateEnvelopeCards(envelopes) {
    const envelopesHTML = envelopes.map(envelope => {
      const remaining = envelope.budget - envelope.spent;
      const percentSpent = (envelope.spent / envelope.budget) * 100;
      const percentRemaining = 100 - percentSpent;

      return `
        <div class="sakura-envelope-card">
          <div class="sakura-envelope-header">
            <div>
              <div class="sakura-envelope-category">${envelope.category}</div>
              <div class="sakura-envelope-budget">Budget: $${envelope.budget.toLocaleString()}</div>
            </div>
            <div class="sakura-envelope-icon" style="background: linear-gradient(135deg, ${envelope.color} 0%, ${envelope.color}CC 100%);">
              <i class="${envelope.icon}"></i>
            </div>
          </div>

          <div class="sakura-envelope-progress">
            <div class="sakura-progress-bar-bg">
              <div class="sakura-progress-bar"
                   style="width: ${percentSpent}%; background: linear-gradient(90deg, ${envelope.color} 0%, ${envelope.color}CC 100%);"></div>
            </div>
          </div>

          <div class="sakura-envelope-remaining">
            <span class="sakura-remaining-label">${envelope.category === 'Savings Goal' ? 'Saved' : 'Remaining'}</span>
            <span class="sakura-remaining-amount">$${(envelope.category === 'Savings Goal' ? envelope.spent : remaining).toLocaleString()}</span>
          </div>

          <div class="sakura-envelope-actions">
            <button class="sakura-btn sakura-btn--outline sakura-btn--envelope" onclick="sakuraFramework.simulateSpend('${envelope.category}', this)" ${remaining <= 0 && envelope.category !== 'Savings Goal' ? 'disabled' : ''}>
              <i class="bi bi-${envelope.category === 'Savings Goal' ? 'plus' : 'dash'}-circle"></i>
              ${envelope.category === 'Savings Goal' ? 'Save $50' : 'Spend $50'}
            </button>
            <button class="sakura-btn sakura-btn--primary sakura-btn--envelope" onclick="sakuraFramework.viewEnvelopeDetails('${envelope.category}')">
              <i class="bi bi-eye"></i>
              Details
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (this.demoEnvelopesGrid) {
      this.demoEnvelopesGrid.innerHTML = envelopesHTML;
    }
  }

  simulateSpend(category, buttonElement) {
    // Find the envelope card
    const card = buttonElement.closest('.sakura-envelope-card');
    const remainingElement = card.querySelector('.sakura-remaining-amount');
    const progressBar = card.querySelector('.sakura-progress-bar');

    // Get current remaining amount
    let currentRemaining = parseInt(remainingElement.textContent.replace(/[$,]/g, ''));

    if (category === 'Savings Goal') {
      // Add to savings
      currentRemaining += 50;
      remainingElement.textContent = `$${currentRemaining.toLocaleString()}`;

      // Update progress bar (for savings, we show how much is saved)
      const budgetText = card.querySelector('.sakura-envelope-budget').textContent;
      const budget = parseInt(budgetText.replace(/[^\d]/g, ''));
      const percentSaved = Math.min((currentRemaining / budget) * 100, 100);
      progressBar.style.width = `${percentSaved}%`;

      if (percentSaved >= 100) {
        buttonElement.disabled = true;
        buttonElement.innerHTML = '<i class="bi bi-check-circle"></i> Goal Reached!';

        // Add celebration effect
        setTimeout(() => {
          card.style.transform = 'scale(1.02)';
          setTimeout(() => {
            card.style.transform = '';
          }, 200);
        }, 100);
      }
    } else {
      // Spend from envelope
      if (currentRemaining >= 50) {
        currentRemaining -= 50;
        remainingElement.textContent = `$${currentRemaining.toLocaleString()}`;

        // Update progress bar
        const budgetText = card.querySelector('.sakura-envelope-budget').textContent;
        const budget = parseInt(budgetText.replace(/[^\d]/g, ''));
        const spent = budget - currentRemaining;
        const percentSpent = (spent / budget) * 100;
        progressBar.style.width = `${percentSpent}%`;

        // Disable button if no money left
        if (currentRemaining < 50) {
          buttonElement.disabled = true;
          buttonElement.innerHTML = '<i class="bi bi-exclamation-triangle"></i> Low Funds';
        }

        // Change color if running low (less than 20% remaining)
        if (currentRemaining / budget < 0.2) {
          progressBar.style.background = 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)';
        }
      }
    }

    // Update total budgeted display
    this.updateDemoSummary();
  }

  viewEnvelopeDetails(category) {
    // Simple alert for demo purposes
    alert(`In the full app, you'd see detailed transaction history and spending patterns for ${category}. This is just a preview of the budgeting experience!`);
  }

  updateDemoSummary() {
    // Recalculate totals from current envelope states
    const envelopeCards = this.demoEnvelopesGrid?.querySelectorAll('.sakura-envelope-card');
    let totalSpent = 0;
    let totalBudget = 0;

    envelopeCards?.forEach(card => {
      const budgetText = card.querySelector('.sakura-envelope-budget').textContent;
      const budget = parseInt(budgetText.replace(/[^\d]/g, ''));
      const remainingText = card.querySelector('.sakura-remaining-amount').textContent;
      const remaining = parseInt(remainingText.replace(/[$,]/g, ''));

      totalBudget += budget;

      const category = card.querySelector('.sakura-envelope-category').textContent;
      if (category === 'Savings Goal') {
        totalSpent += remaining; // For savings, "remaining" is actually saved amount
      } else {
        totalSpent += (budget - remaining);
      }
    });

    // Update displays
    if (this.demoBudgetedDisplay) {
      this.demoBudgetedDisplay.textContent = `$${totalBudget.toLocaleString()}`;
    }

    const income = parseInt(this.demoIncomeDisplay?.textContent.replace(/[$,]/g, '') || '5000');
    const available = income - totalSpent;

    if (this.demoAvailableDisplay) {
      this.demoAvailableDisplay.textContent = `$${available.toLocaleString()}`;
    }
  }

  // Urgency number updater - updates every Monday with a random number
  setupUrgencyUpdater() {
    const urgencyElement = document.querySelector('.sakura-urgency-badge span');
    if (!urgencyElement) return;

    // Check if we need to update the number
    this.updateUrgencyNumber();

    // Set up weekly update check (check every hour)
    setInterval(() => {
      this.updateUrgencyNumber();
    }, 60 * 60 * 1000); // Check every hour
  }

  updateUrgencyNumber() {
    const urgencyElement = document.querySelector('.sakura-urgency-badge span');
    if (!urgencyElement) return;

    const now = new Date();
    const lastUpdate = localStorage.getItem('sakura-urgency-last-update');
    const storedNumber = localStorage.getItem('sakura-urgency-number');

    // Check if it's Monday and we haven't updated this week
    const isMonday = now.getDay() === 1;
    const lastUpdateDate = lastUpdate ? new Date(lastUpdate) : null;
    const isNewWeek = !lastUpdateDate ||
      (now.getTime() - lastUpdateDate.getTime()) > (7 * 24 * 60 * 60 * 1000) ||
      (isMonday && lastUpdateDate && lastUpdateDate.getDay() !== 1);

    if (isNewWeek || !storedNumber) {
      // Generate new random number between 100 and 1000
      const randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

      // Update the display
      urgencyElement.textContent = `Join ${randomNumber} families who started this week`;

      // Store the new number and update date
      localStorage.setItem('sakura-urgency-number', randomNumber.toString());
      localStorage.setItem('sakura-urgency-last-update', now.toISOString());
    } else if (storedNumber) {
      // Use stored number if no update needed
      urgencyElement.textContent = `Join ${storedNumber} families who started this week`;
    }
  }

  // Pricing toggle functionality
  setupPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle');
    if (!pricingToggle) return;

    pricingToggle.addEventListener('change', () => {
      this.togglePricing(pricingToggle.checked);
    });

    // Initialize with monthly pricing
    this.togglePricing(false);
  }

  togglePricing(isAnnual) {
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    const billingDisclaimers = document.querySelectorAll('.sakura-billing-disclaimer');

    if (isAnnual) {
      // Show annual prices and disclaimers
      monthlyPrices.forEach(price => price.style.display = 'none');
      annualPrices.forEach(price => price.style.display = 'inline');
      billingDisclaimers.forEach(disclaimer => disclaimer.style.display = 'block');
    } else {
      // Show monthly prices, hide disclaimers
      monthlyPrices.forEach(price => price.style.display = 'inline');
      annualPrices.forEach(price => price.style.display = 'none');
      billingDisclaimers.forEach(disclaimer => disclaimer.style.display = 'none');
    }
  }

  // Sparkline hover functionality
  setupSparklineTooltips() {
    const charts = document.querySelectorAll('.sakura-account-sparkline-chart, .sakura-summary-sparkline-chart, .sakura-envelope-sparkline-chart');

    charts.forEach((chart, index) => {
      const hoverArea = chart.querySelector('.sakura-account-sparkline-hover-area, .sakura-summary-sparkline-hover-area, .sakura-envelope-sparkline-hover-area');
      const hoverDot = chart.querySelector('.sakura-account-sparkline-hover-dot, .sakura-summary-sparkline-hover-dot, .sakura-envelope-sparkline-hover-dot');
      const svg = chart.querySelector('svg');

      if (!hoverArea || !hoverDot || !svg) return;

      // Sample data points - in real app this would come from API
      let dataPoints;

      // Different data for envelope sparkline vs account/summary sparklines
      if (chart.classList.contains('sakura-envelope-sparkline-chart')) {
        // Available balance data (matching 1.5k to 1.8k range)
        dataPoints = [
          { x: 0, y: 35, value: '$1,500.00', date: 'Dec 15', change: '+$50.00', transaction: 'Paycheck allocated' },
          { x: 40, y: 32, value: '$1,550.00', date: 'Dec 20', change: '+$50.00', transaction: 'Income received' },
          { x: 80, y: 30, value: '$1,600.00', date: 'Dec 25', change: '+$50.00', transaction: 'Bonus deposited' },
          { x: 120, y: 28, value: '$1,650.00', date: 'Jan 5', change: '+$50.00', transaction: 'Paycheck received' },
          { x: 160, y: 25, value: '$1,715.00', date: 'Jan 15', change: '+$65.00', transaction: 'Freelance income' },
          { x: 200, y: 22, value: '$1,765.00', date: 'Jan 20', change: '+$50.00', transaction: 'Weekly income' },
          { x: 240, y: 20, value: '$1,800.00', date: 'Jan 23', change: '+$35.00', transaction: 'Side project' },
          { x: 280, y: 18, value: '$1,834.00', date: 'Jan 25', change: '+$34.00', transaction: 'Cash back rewards' }
        ];
      } else if (chart.classList.contains('sakura-account-sparkline-chart')) {
        // Account balance data (8k range)
        dataPoints = [
          { x: 0, y: 32, value: '$7,950.00', date: 'Dec 15', change: '+$200.00', transaction: 'Deposit' },
          { x: 40, y: 28, value: '$8,100.00', date: 'Dec 20', change: '+$150.00', transaction: 'Transfer in' },
          { x: 80, y: 25, value: '$8,100.00', date: 'Dec 25', change: '-$50.00', transaction: 'Utility bill' },
          { x: 120, y: 20, value: '$8,250.00', date: 'Jan 5', change: '+$150.00', transaction: 'Freelance' },
          { x: 160, y: 15, value: '$8,400.00', date: 'Jan 15', change: '+$150.00', transaction: 'Bonus' },
          { x: 200, y: 13, value: '$8,480.00', date: 'Jan 20', change: '+$80.00', transaction: 'Refund' },
          { x: 240, y: 12, value: '$8,520.00', date: 'Jan 23', change: '+$40.00', transaction: 'Interest' },
          { x: 280, y: 10, value: '$8,547.00', date: 'Jan 25', change: '+$27.00', transaction: 'Cash back' }
        ];
      } else {
        // Summary card sparklines - determine which card by ID
        const sparklineId = chart.getAttribute('data-sparkline-id');

        if (sparklineId === 'available-summary') {
          // First summary card (Available) - upward trend
          dataPoints = [
            { x: 0, y: 35, value: '$1,700.00', date: 'Dec 15', change: '+$50.00', transaction: 'Paycheck allocated' },
            { x: 40, y: 32, value: '$1,734.00', date: 'Dec 20', change: '+$34.00', transaction: 'Income received' },
            { x: 80, y: 30, value: '$1,750.00', date: 'Dec 25', change: '+$16.00', transaction: 'Bonus deposited' },
            { x: 120, y: 28, value: '$1,766.00', date: 'Jan 5', change: '+$16.00', transaction: 'Paycheck received' },
            { x: 160, y: 25, value: '$1,784.00', date: 'Jan 15', change: '+$18.00', transaction: 'Freelance income' },
            { x: 200, y: 22, value: '$1,800.00', date: 'Jan 20', change: '+$16.00', transaction: 'Weekly income' },
            { x: 240, y: 20, value: '$1,817.00', date: 'Jan 23', change: '+$17.00', transaction: 'Side project' },
            { x: 280, y: 18, value: '$1,834.00', date: 'Jan 25', change: '+$17.00', transaction: 'Cash back rewards' }
          ];
        } else if (sparklineId === 'top-envelope-summary') {
          // Second summary card (Top Envelope) - downward trend
          dataPoints = [
            { x: 0, y: 15, value: '$900.00', date: 'Dec 15', change: '-$10.00', transaction: 'Grocery purchase' },
            { x: 40, y: 18, value: '$890.00', date: 'Dec 20', change: '-$10.00', transaction: 'Shopping' },
            { x: 80, y: 20, value: '$880.00', date: 'Dec 25', change: '-$10.00', transaction: 'Groceries' },
            { x: 120, y: 22, value: '$870.00', date: 'Jan 5', change: '-$10.00', transaction: 'Market trip' },
            { x: 160, y: 25, value: '$860.00', date: 'Jan 15', change: '-$10.00', transaction: 'Weekly shop' },
            { x: 200, y: 28, value: '$850.00', date: 'Jan 20', change: '-$10.00', transaction: 'Supermarket' },
            { x: 240, y: 30, value: '$848.00', date: 'Jan 23', change: '-$2.00', transaction: 'Convenience store' },
            { x: 280, y: 32, value: '$847.00', date: 'Jan 25', change: '-$1.00', transaction: 'Snacks' }
          ];
        } else {
          // Third summary card (Envelope Balance) - flat trend
          dataPoints = [
            { x: 0, y: 20, value: '$2,650.00', date: 'Dec 15' },
            { x: 40, y: 20, value: '$2,650.00', date: 'Dec 20' },
            { x: 80, y: 20, value: '$2,650.00', date: 'Dec 25' },
            { x: 120, y: 20, value: '$2,650.00', date: 'Jan 5' },
            { x: 160, y: 20, value: '$2,650.00', date: 'Jan 15' },
            { x: 200, y: 20, value: '$2,650.00', date: 'Jan 20' },
            { x: 240, y: 20, value: '$2,650.00', date: 'Jan 23' },
            { x: 280, y: 20, value: '$2,650.00', date: 'Jan 25' }
          ];
        }
      }

      let tooltip = null;

      hoverArea.addEventListener('mousemove', (e) => {
        const rect = svg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 280;

        // Find closest data point
        let closest = dataPoints[0];
        let minDistance = Math.abs(x - closest.x);

        dataPoints.forEach(point => {
          const distance = Math.abs(x - point.x);
          if (distance < minDistance) {
            minDistance = distance;
            closest = point;
          }
        });

        // Update hover dot position
        hoverDot.setAttribute('cx', closest.x);
        hoverDot.setAttribute('cy', closest.y);
        hoverDot.classList.add('active');

        // Create or update tooltip
        if (!tooltip) {
          tooltip = document.createElement('div');
          if (chart.classList.contains('sakura-account-sparkline-chart')) {
            tooltip.className = 'sakura-account-sparkline-tooltip';
          } else if (chart.classList.contains('sakura-envelope-sparkline-chart')) {
            tooltip.className = 'sakura-envelope-sparkline-tooltip';
          } else {
            tooltip.className = 'sakura-summary-sparkline-tooltip';
          }
          chart.appendChild(tooltip);
        }

        let changeIcon = '';
        let changeColor = '';
        if (closest.change && closest.change.startsWith('+')) {
          changeIcon = '↑';
          changeColor = 'color: #10b981;';
        } else if (closest.change && closest.change.startsWith('-')) {
          changeIcon = '↓';
          changeColor = 'color: #ef4444;';
        }

        tooltip.innerHTML = `
          <div style="font-weight: 600; margin-bottom: 2px;">${closest.date}</div>
          <div style="margin-bottom: 2px;">${closest.value}</div>
          ${closest.change ? `<div style="${changeColor}"><span>${changeIcon}</span> ${closest.change}</div>` : ''}
          ${closest.transaction ? `<div style="color: #9ca3af; font-size: 11px; margin-top: 2px;">${closest.transaction}</div>` : ''}
        `;

        tooltip.style.opacity = '1';

        const chartRect = chart.getBoundingClientRect();
        let left = e.clientX - chartRect.left - (tooltip.offsetWidth / 2);
        const top = e.clientY - chartRect.top - tooltip.offsetHeight - 10;

        // Keep tooltip within bounds
        if (left + tooltip.offsetWidth > chartRect.width) {
          left = chartRect.width - tooltip.offsetWidth - 10;
        }
        if (left < 0) {
          left = 10;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
      });

      hoverArea.addEventListener('mouseleave', () => {
        hoverDot.classList.remove('active');
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
      });
    });
  }

  // Timeline scroll animations
  setupTimelineAnimations() {
    const timelineCards = document.querySelectorAll('.sakura-timeline-card');
    const closingCard = document.querySelector('.sakura-closing-card');

    if (timelineCards.length === 0 && !closingCard) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sakura-timeline-card--visible');
          entry.target.classList.add('sakura-closing-card--visible');
        }
      });
    }, observerOptions);

    // Observe all timeline cards
    timelineCards.forEach(card => {
      observer.observe(card);
    });

    // Observe closing card
    if (closingCard) {
      observer.observe(closingCard);
    }
  }

  // User dropdown menu functionality
  setupUserDropdown() {
    const userMenu = document.querySelector('.sakura-user-menu');
    const userMenuToggle = document.querySelector('.sakura-user-menu-toggle');
    const dropdown = document.querySelector('.sakura-user-dropdown');

    if (!userMenu || !userMenuToggle) return;

    // Toggle dropdown when clicking anywhere on the user menu (except dropdown items)
    userMenu.addEventListener('click', (e) => {
      // Don't toggle if clicking on dropdown items
      if (dropdown && dropdown.contains(e.target)) {
        return;
      }

      e.stopPropagation();
      userMenu.classList.toggle('active');
      userMenuToggle.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!userMenu.contains(e.target)) {
        userMenu.classList.remove('active');
        userMenuToggle.classList.remove('active');
      }
    });

    // Close dropdown when clicking on a menu item
    const dropdownItems = document.querySelectorAll('.sakura-dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        userMenu.classList.remove('active');
        userMenuToggle.classList.remove('active');
      });
    });
  }

  // Notification dropdown functionality
  setupNotificationDropdown() {
    const notificationContainer = document.querySelector('.sakura-notification-container');
    const notificationBtn = document.querySelector('.sakura-notification-btn');
    const notificationDropdown = document.querySelector('.sakura-notification-dropdown');
    const notificationBadge = document.querySelector('.sakura-notification-badge');
    const markAllBtn = document.querySelector('.sakura-notification-mark-all');

    if (!notificationContainer || !notificationBtn) return;

    // Toggle dropdown when clicking notification button
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      // Check if there are any unread notifications
      const unreadCount = document.querySelectorAll('.sakura-notification-item.unread').length;

      // If no unread notifications, go to notifications page
      if (unreadCount === 0) {
        window.location.href = 'notifications.html';
        return;
      }

      // Otherwise, toggle the dropdown
      notificationContainer.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!notificationContainer.contains(e.target)) {
        notificationContainer.classList.remove('active');
      }
    });

    // Prevent dropdown from closing when clicking inside it
    if (notificationDropdown) {
      notificationDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Mark all as read functionality
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        const unreadItems = document.querySelectorAll('.sakura-notification-item.unread');
        unreadItems.forEach(item => {
          // Add fade out animation
          item.style.opacity = '0';
          item.style.transform = 'translateX(20px)';

          // Remove from DOM after animation
          setTimeout(() => {
            item.remove();
            this.updateNotificationBadge();
          }, 200);
        });

        // Update badge immediately
        this.updateNotificationBadge();
      });
    }

    // Individual mark as read functionality
    const markReadButtons = document.querySelectorAll('.sakura-notification-mark-read');
    markReadButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const notificationItem = button.closest('.sakura-notification-item');
        if (notificationItem) {
          // Add fade out animation
          notificationItem.style.opacity = '0';
          notificationItem.style.transform = 'translateX(20px)';

          // Remove from DOM after animation
          setTimeout(() => {
            notificationItem.remove();
            this.updateNotificationBadge();
          }, 200);
        }
      });
    });

    // Update badge count
    this.updateNotificationBadge();
  }

  // Update notification badge count
  updateNotificationBadge() {
    const notificationBadge = document.querySelector('.sakura-notification-badge');
    const unreadItems = document.querySelectorAll('.sakura-notification-item.unread');

    if (notificationBadge) {
      const count = unreadItems.length;
      notificationBadge.textContent = count.toString();

      if (count === 0) {
        notificationBadge.style.display = 'none';
      } else {
        notificationBadge.style.display = 'block';
      }
    }
  }

  // Notifications Page functionality
  setupNotificationsPage() {
    // Check if we're on the notifications page
    const notificationsPage = document.querySelector('.sakura-notifications-page-list');
    if (!notificationsPage) return;

    const filterTabs = document.querySelectorAll('.sakura-filter-tab');
    const pageNotifications = document.querySelectorAll('.sakura-notification-page-item');
    const markAllReadBtn = document.getElementById('mark-all-read-page');
    const deleteAllBtn = document.getElementById('delete-all-page');
    const markReadButtons = document.querySelectorAll('.sakura-notification-page-item .sakura-notification-mark-read');
    const deleteButtons = document.querySelectorAll('.sakura-notification-page-item .sakura-notification-delete');

    // Filter functionality
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');

        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter notifications
        pageNotifications.forEach(notification => {
          const type = notification.getAttribute('data-type');
          const isUnread = notification.classList.contains('unread');

          if (filter === 'all') {
            notification.style.display = 'flex';
          } else if (filter === 'unread') {
            notification.style.display = isUnread ? 'flex' : 'none';
          } else {
            notification.style.display = type === filter ? 'flex' : 'none';
          }
        });

        // Update date group visibility
        this.updateDateGroupVisibility();
      });
    });

    // Mark all as read on page
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', () => {
        const unreadPageItems = document.querySelectorAll('.sakura-notification-page-item.unread');
        unreadPageItems.forEach(item => {
          item.style.opacity = '0';
          item.style.transform = 'translateX(20px)';

          setTimeout(() => {
            item.classList.remove('unread');
            item.style.opacity = '';
            item.style.transform = '';
          }, 200);
        });

        // Update filter counts
        this.updateNotificationFilterCounts();
        this.updateNotificationBadge();
      });
    }

    // Delete all notifications on page
    if (deleteAllBtn) {
      deleteAllBtn.addEventListener('click', () => {
        const allPageItems = document.querySelectorAll('.sakura-notification-page-item');
        allPageItems.forEach((item, index) => {
          // Stagger the animation slightly for visual effect
          setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(30px)';

            // Remove from DOM after animation
            setTimeout(() => {
              item.remove();
              // Update counts after last item is removed
              if (index === allPageItems.length - 1) {
                this.updateNotificationFilterCounts();
                this.updateNotificationBadge();
                this.updateDateGroupVisibility();
              }
            }, 200);
          }, index * 50); // 50ms delay between each item
        });
      });
    }

    // Individual mark as read on page
    markReadButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const notificationItem = button.closest('.sakura-notification-page-item');
        if (notificationItem && notificationItem.classList.contains('unread')) {
          notificationItem.style.opacity = '0';
          notificationItem.style.transform = 'translateX(20px)';

          setTimeout(() => {
            notificationItem.classList.remove('unread');
            notificationItem.style.opacity = '';
            notificationItem.style.transform = '';
            this.updateNotificationFilterCounts();
            this.updateNotificationBadge();
          }, 200);
        }
      });
    });

    // Delete button functionality
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const notificationItem = button.closest('.sakura-notification-page-item');
        if (notificationItem) {
          // Animate out
          notificationItem.style.opacity = '0';
          notificationItem.style.transform = 'translateX(30px)';

          // Remove from DOM after animation
          setTimeout(() => {
            notificationItem.remove();
            this.updateNotificationFilterCounts();
            this.updateNotificationBadge();
            this.updateDateGroupVisibility();
          }, 200);
        }
      });
    });

    // Initialize counts
    this.updateNotificationFilterCounts();
  }

  // Update date group visibility based on filtered notifications
  updateDateGroupVisibility() {
    const dateGroups = document.querySelectorAll('.sakura-notification-date-group');

    dateGroups.forEach(group => {
      const visibleNotifications = Array.from(group.querySelectorAll('.sakura-notification-page-item'))
        .filter(item => item.style.display !== 'none');

      group.style.display = visibleNotifications.length > 0 ? 'flex' : 'none';
    });
  }

  // Update notification filter counts
  updateNotificationFilterCounts() {
    const allCount = document.querySelectorAll('.sakura-notification-page-item').length;
    const unreadCount = document.querySelectorAll('.sakura-notification-page-item.unread').length;

    // Update All filter count
    const allTab = document.querySelector('[data-filter="all"] .sakura-filter-count');
    if (allTab) allTab.textContent = allCount.toString();

    // Update Unread filter count
    const unreadTab = document.querySelector('[data-filter="unread"] .sakura-filter-count');
    if (unreadTab) unreadTab.textContent = unreadCount.toString();
  }

  // Analytics charts setup with Chart.js
  setupAnalyticsCharts() {
    const spendingTrendsCanvas = document.getElementById('spendingTrendsChart');
    const envelopeBreakdownCanvas = document.getElementById('envelopeBreakdownChart');
    const topMerchantsCanvas = document.getElementById('topMerchantsChart');
    const budgetVsActualCanvas = document.getElementById('budgetVsActualChart');

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded. Charts will not be rendered.');
      return;
    }

    // Initialize Spending Trends Chart
    if (spendingTrendsCanvas) {
      this.initSpendingTrendsChart(spendingTrendsCanvas);
    }

    // Initialize Envelope Breakdown Chart
    if (envelopeBreakdownCanvas) {
      this.initEnvelopeBreakdownChart(envelopeBreakdownCanvas);
    }

    // Initialize Top Merchants Chart
    if (topMerchantsCanvas) {
      this.initTopMerchantsChart(topMerchantsCanvas);
    }

    // Initialize Budget vs Actual Chart
    if (budgetVsActualCanvas) {
      this.initBudgetVsActualChart(budgetVsActualCanvas);
    }
  }

  // Spending Trends Line Chart
  initSpendingTrendsChart(canvas) {

    // Spending Trends Chart Data
    const spendingData = {
      labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      datasets: [
        {
          label: 'Total Expenses',
          data: [2850, 3100, 2980, 3210, 3075, 3287],
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: '#ef4444',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: '#ef4444',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#ef4444',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3
        },
        {
          label: 'Average',
          data: [3180, 3180, 3180, 3180, 3180, 3180],
          backgroundColor: 'transparent',
          borderColor: '#8b5cf6',
          borderWidth: 2,
          borderDash: [10, 5],
          fill: false,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 0
        }
      ]
    };

    // Chart configuration
    const config = {
      type: 'line',
      data: spendingData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                family: 'Poppins, sans-serif',
                size: 13,
                weight: '500'
              },
              color: '#6b7280'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            titleColor: '#1f2937',
            bodyColor: '#6b7280',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            titleFont: {
              family: 'Poppins, sans-serif',
              size: 14,
              weight: '600'
            },
            bodyFont: {
              family: 'Poppins, sans-serif',
              size: 13,
              weight: '500'
            },
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '$' + context.parsed.y.toLocaleString();
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 2500,
            max: 3500,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              },
              font: {
                family: 'Poppins, sans-serif',
                size: 12
              },
              color: '#9ca3af',
              padding: 8
            },
            grid: {
              color: 'rgba(229, 231, 235, 0.5)',
              drawBorder: false
            },
            border: {
              display: false
            }
          },
          x: {
            ticks: {
              font: {
                family: 'Poppins, sans-serif',
                size: 12,
                weight: '500'
              },
              color: '#6b7280',
              padding: 8
            },
            grid: {
              display: false
            },
            border: {
              display: false
            }
          }
        }
      }
    };

    // Create the chart
    new Chart(canvas, config);
  }

  // Envelope Breakdown Donut Chart
  initEnvelopeBreakdownChart(canvas) {
    // Envelope data
    const envelopeData = {
      labels: ['Groceries', 'Shopping', 'Transportation', 'Dining Out', 'Utilities', 'Entertainment'],
      datasets: [{
        data: [645.80, 543.00, 420.15, 285.50, 215.00, 178.00],
        backgroundColor: [
          '#10b981',
          '#8b5cf6',
          '#3b82f6',
          '#f59e0b',
          '#06b6d4',
          '#ec4899'
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 8
      }]
    };

    // Chart configuration
    const config = {
      type: 'doughnut',
      data: envelopeData,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.2,
        cutout: '65%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 16,
              font: {
                family: 'Poppins, sans-serif',
                size: 13,
                weight: '500'
              },
              color: '#6b7280',
              generateLabels: function(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const value = data.datasets[0].data[i];
                    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return {
                      text: `${label} (${percentage}%)`,
                      fillStyle: data.datasets[0].backgroundColor[i],
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            titleColor: '#1f2937',
            bodyColor: '#6b7280',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            titleFont: {
              family: 'Poppins, sans-serif',
              size: 14,
              weight: '600'
            },
            bodyFont: {
              family: 'Poppins, sans-serif',
              size: 13,
              weight: '500'
            },
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: $${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    };

    // Create the chart
    new Chart(canvas, config);
  }

  // Top Merchants Bar Chart
  initTopMerchantsChart(canvas) {
    // Merchant data
    const merchantData = {
      labels: ['Whole Foods', 'Amazon', 'Shell', 'Starbucks', 'Netflix'],
      datasets: [{
        label: 'Total Spent',
        data: [487.25, 325.50, 280.00, 156.25, 15.99],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          '#10b981',
          '#8b5cf6',
          '#3b82f6',
          '#f59e0b',
          '#ec4899'
        ],
        borderWidth: 2,
        borderRadius: 6
      }]
    };

    // Chart configuration
    const config = {
      type: 'bar',
      data: merchantData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.2,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            titleColor: '#1f2937',
            bodyColor: '#6b7280',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            titleFont: {
              family: 'Poppins, sans-serif',
              size: 14,
              weight: '600'
            },
            bodyFont: {
              family: 'Poppins, sans-serif',
              size: 13,
              weight: '500'
            },
            callbacks: {
              label: function(context) {
                return 'Total: $' + context.parsed.x.toLocaleString();
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              },
              font: {
                family: 'Poppins, sans-serif',
                size: 12
              },
              color: '#9ca3af',
              padding: 8
            },
            grid: {
              color: 'rgba(229, 231, 235, 0.5)',
              drawBorder: false
            },
            border: {
              display: false
            }
          },
          y: {
            ticks: {
              font: {
                family: 'Poppins, sans-serif',
                size: 12,
                weight: '500'
              },
              color: '#6b7280',
              padding: 8
            },
            grid: {
              display: false
            },
            border: {
              display: false
            }
          }
        }
      }
    };

    // Create the chart
    new Chart(canvas, config);
  }

  // Budget vs Actual Grouped Bar Chart
  initBudgetVsActualChart(canvas) {
    // Budget comparison data
    const budgetData = {
      labels: ['Groceries', 'Shopping', 'Transportation', 'Dining Out', 'Utilities', 'Entertainment'],
      datasets: [
        {
          label: 'Budget',
          data: [700, 600, 500, 300, 250, 200],
          backgroundColor: 'rgba(203, 213, 225, 0.8)',
          borderColor: '#cbd5e1',
          borderWidth: 2,
          borderRadius: 6
        },
        {
          label: 'Actual',
          data: [645.80, 543.00, 420.15, 285.50, 215.00, 178.00],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          borderRadius: 6
        }
      ]
    };

    // Chart configuration
    const config = {
      type: 'bar',
      data: budgetData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                family: 'Poppins, sans-serif',
                size: 13,
                weight: '500'
              },
              color: '#6b7280'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            titleColor: '#1f2937',
            bodyColor: '#6b7280',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            titleFont: {
              family: 'Poppins, sans-serif',
              size: 14,
              weight: '600'
            },
            bodyFont: {
              family: 'Poppins, sans-serif',
              size: 13,
              weight: '500'
            },
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '$' + context.parsed.y.toLocaleString();
                }
                return label;
              },
              afterLabel: function(context) {
                if (context.datasetIndex === 1) {
                  const budgetValue = context.chart.data.datasets[0].data[context.dataIndex];
                  const actualValue = context.parsed.y;
                  const difference = actualValue - budgetValue;
                  const percentage = ((difference / budgetValue) * 100).toFixed(1);
                  if (difference < 0) {
                    return 'Under budget by $' + Math.abs(difference).toLocaleString() + ' (' + Math.abs(percentage) + '%)';
                  } else if (difference > 0) {
                    return 'Over budget by $' + difference.toLocaleString() + ' (' + percentage + '%)';
                  } else {
                    return 'On budget';
                  }
                }
                return '';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              },
              font: {
                family: 'Poppins, sans-serif',
                size: 12
              },
              color: '#9ca3af',
              padding: 8
            },
            grid: {
              color: 'rgba(229, 231, 235, 0.5)',
              drawBorder: false
            },
            border: {
              display: false
            }
          },
          x: {
            ticks: {
              font: {
                family: 'Poppins, sans-serif',
                size: 12,
                weight: '500'
              },
              color: '#6b7280',
              padding: 8
            },
            grid: {
              display: false
            },
            border: {
              display: false
            }
          }
        }
      }
    };

    // Create the chart
    new Chart(canvas, config);
  }

  // Initialize colored dropdown icons automatically
  initializeColoredDropdownIcons() {
    // Find all dropdown option icons that don't already have the colored class
    const optionIcons = document.querySelectorAll('.sakura-custom-select-option .sakura-option-icon:not(.sakura-option-icon--colored)');

    optionIcons.forEach(icon => {
      // Get the parent option element
      const option = icon.closest('.sakura-custom-select-option');
      if (!option) return;

      // Get the data-value attribute
      const dataValue = option.dataset.value;
      if (!dataValue) return;

      // Calculate color index based on data-value
      const colorIndex = stringToColorIndex(dataValue);

      // Add the colored modifier and color class
      icon.classList.add('sakura-option-icon--colored', `color-${colorIndex}`);
    });

    console.log(`Initialized ${optionIcons.length} colored dropdown icons`);
  }

  // Envelope drag and drop functionality
  setupEnvelopeDragDrop() {
    console.log('setupEnvelopeDragDrop called');

    const envelopesGrid = document.querySelector('.sakura-envelopes-grid');
    if (!envelopesGrid) {
      console.log('No envelopes grid found');
      return;
    }

    const draggableEnvelopes = envelopesGrid.querySelectorAll('.sakura-envelope-card[draggable="true"]');
    console.log('Found draggable envelopes:', draggableEnvelopes.length);

    if (draggableEnvelopes.length === 0) {
      console.warn('No draggable envelopes found!');
      return;
    }

    let draggedElement = null;
    let draggedOverElement = null;
    let isDragging = false;
    let dragJustEnded = false;

    // Load saved order from localStorage
    this.loadEnvelopeOrder();

    // Add drag event listeners to each draggable envelope
    draggableEnvelopes.forEach(envelope => {
      // Prevent click navigation on anchor tags during and after drag
      if (envelope.tagName === 'A') {
        envelope.addEventListener('click', function(e) {
          if (isDragging || dragJustEnded) {
            e.preventDefault();
            return false;
          }
        });
      }

      // Drag start
      envelope.addEventListener('dragstart', (e) => {
        isDragging = true;
        dragJustEnded = false;
        draggedElement = envelope;
        envelope.classList.add('sakura-envelope-card--dragging');
        envelopesGrid.classList.add('sakura-envelopes-grid--dragging');

        // For anchor tags, temporarily remove href to prevent browser link drag behavior
        if (envelope.tagName === 'A' && envelope.href) {
          envelope.dataset.originalHref = envelope.href;
          envelope.removeAttribute('href');
        }

        // Prevent browser link drag/split-screen behavior
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/x-envelope-card', envelope.dataset.envelopeId);

        console.log('Drag started:', envelope.dataset.envelopeId);
      });

      // Drag end
      envelope.addEventListener('dragend', (e) => {
        isDragging = false;
        dragJustEnded = true;

        envelope.classList.remove('sakura-envelope-card--dragging');
        envelopesGrid.classList.remove('sakura-envelopes-grid--dragging');

        // Restore href for anchor tags
        if (envelope.tagName === 'A' && envelope.dataset.originalHref) {
          envelope.setAttribute('href', envelope.dataset.originalHref);
          delete envelope.dataset.originalHref;
        }

        // Remove all drag-over classes
        document.querySelectorAll('.sakura-envelope-card--drag-over-before, .sakura-envelope-card--drag-over-after').forEach(el => {
          el.classList.remove('sakura-envelope-card--drag-over-before', 'sakura-envelope-card--drag-over-after');
        });

        draggedElement = null;
        draggedOverElement = null;

        // Save the new order
        this.saveEnvelopeOrder();

        // Reset dragJustEnded flag after a short delay
        setTimeout(() => {
          dragJustEnded = false;
        }, 100);
      });

      // Drag over
      envelope.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (!draggedElement || draggedElement === envelope) return;

        // Don't allow dropping before the featured "Available" card
        const featuredCard = envelopesGrid.querySelector('.sakura-envelope-card--featured');
        if (envelope === featuredCard) return;

        // Remove previous drag-over classes
        document.querySelectorAll('.sakura-envelope-card--drag-over-before, .sakura-envelope-card--drag-over-after').forEach(el => {
          el.classList.remove('sakura-envelope-card--drag-over-before', 'sakura-envelope-card--drag-over-after');
        });

        // Determine if we should insert before or after
        // For grid layouts, use horizontal (X) position instead of vertical (Y)
        const rect = envelope.getBoundingClientRect();
        const mouseX = e.clientX;
        const envelopeMiddle = rect.left + rect.width / 2;

        // Show insertion line AND move the element in real-time
        if (mouseX < envelopeMiddle) {
          envelope.classList.add('sakura-envelope-card--drag-over-before');
          // Insert before
          if (envelope !== draggedElement.nextSibling) {
            envelopesGrid.insertBefore(draggedElement, envelope);
          }
        } else {
          envelope.classList.add('sakura-envelope-card--drag-over-after');
          // Insert after
          if (envelope !== draggedElement.previousSibling) {
            envelopesGrid.insertBefore(draggedElement, envelope.nextSibling);
          }
        }

        draggedOverElement = envelope;
      });

      // Drag leave
      envelope.addEventListener('dragleave', (e) => {
        envelope.classList.remove('sakura-envelope-card--drag-over-before', 'sakura-envelope-card--drag-over-after');
      });

      // Drop
      envelope.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // The reordering already happened in dragover, just clean up visual indicators
        envelope.classList.remove('sakura-envelope-card--drag-over-before', 'sakura-envelope-card--drag-over-after');
      });
    });

    console.log(`Initialized drag-and-drop for ${draggableEnvelopes.length} envelopes`);
  }

  // Save envelope order to localStorage
  saveEnvelopeOrder() {
    const envelopesGrid = document.querySelector('.sakura-envelopes-grid');
    if (!envelopesGrid) return;

    const envelopes = envelopesGrid.querySelectorAll('.sakura-envelope-card[data-envelope-id]');
    const order = Array.from(envelopes).map(env => env.dataset.envelopeId);

    localStorage.setItem('sakura-envelope-order', JSON.stringify(order));
    console.log('Saved envelope order:', order);
  }

  // Load and apply saved envelope order
  loadEnvelopeOrder() {
    const envelopesGrid = document.querySelector('.sakura-envelopes-grid');
    if (!envelopesGrid) return;

    const savedOrder = localStorage.getItem('sakura-envelope-order');
    if (!savedOrder) return;

    try {
      const order = JSON.parse(savedOrder);
      const featuredCard = envelopesGrid.querySelector('.sakura-envelope-card--featured');

      // Reorder envelopes based on saved order
      order.forEach(envelopeId => {
        const envelope = envelopesGrid.querySelector(`[data-envelope-id="${envelopeId}"]`);
        if (envelope) {
          envelopesGrid.appendChild(envelope);
        }
      });

      console.log('Loaded envelope order:', order);
    } catch (e) {
      console.error('Failed to load envelope order:', e);
    }
  }

  // Income modal functionality
  setupIncomeModal() {
    console.log('setupIncomeModal called');

    const openModalBtn = document.getElementById('openAddIncomeModal');
    const modal = document.getElementById('addIncomeModal');
    const modalOverlay = modal?.querySelector('.sakura-modal-overlay');
    const closeModalBtns = modal?.querySelectorAll('[data-close-modal]');
    const form = document.getElementById('addIncomeForm');

    console.log('Modal elements found:', {
      openModalBtn: !!openModalBtn,
      modal: !!modal,
      modalOverlay: !!modalOverlay,
      closeModalBtns: closeModalBtns?.length,
      form: !!form
    });

    if (!modal) {
      console.log('No income modal found on this page');
      return; // Modal doesn't exist on this page
    }

    // Initialize custom select dropdowns in the modal
    const customSelects = modal.querySelectorAll('.sakura-custom-select');
    customSelects.forEach(selectElement => {
      const trigger = selectElement.querySelector('.sakura-custom-select-trigger');
      const dropdown = selectElement.querySelector('.sakura-custom-select-dropdown');
      const options = selectElement.querySelectorAll('.sakura-custom-select-option');
      const hiddenInput = selectElement.querySelector('input[type="hidden"]');

      if (!trigger || !dropdown || !options.length || !hiddenInput) return;

      // Toggle dropdown
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement.classList.toggle('active');
      });

      // Select option
      options.forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();

          // Remove selected from all options
          options.forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');

          // Update trigger text with icon
          const icon = option.querySelector('.sakura-option-icon, .sakura-bank-logo');
          if (icon) {
            const iconClone = icon.cloneNode(true);
            trigger.innerHTML = '';
            trigger.appendChild(iconClone);
            const textNode = document.createTextNode(' ' + option.textContent.trim());
            trigger.appendChild(textNode);
          } else {
            trigger.textContent = option.textContent.trim();
          }

          trigger.classList.remove('placeholder');

          // Update hidden input
          hiddenInput.value = option.dataset.value;

          // Close dropdown
          selectElement.classList.remove('active');
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!selectElement.contains(e.target)) {
          selectElement.classList.remove('active');
        }
      });
    });

    console.log(`Initialized ${customSelects.length} custom selects`);

    // Open modal
    if (openModalBtn) {
      openModalBtn.addEventListener('click', () => {
        console.log('Add Income Source button clicked');
        modal.classList.add('sakura-modal--active');
        document.body.style.overflow = 'hidden';
        console.log('Modal should now be active');
      });
    } else {
      console.warn('openAddIncomeModal button not found');
    }

    // Close modal function
    const closeModal = () => {
      modal.classList.remove('sakura-modal--active');
      document.body.style.overflow = '';

      // Reset form
      if (form) {
        form.reset();

        // Reset custom selects
        const customSelects = modal.querySelectorAll('.sakura-custom-select');
        customSelects.forEach(select => {
          const trigger = select.querySelector('.sakura-custom-select-trigger');
          const hiddenInput = select.querySelector('input[type="hidden"]');
          if (trigger && hiddenInput) {
            trigger.textContent = trigger.classList.contains('placeholder') ?
              trigger.getAttribute('data-placeholder') || 'Select...' :
              'Select...';
            trigger.classList.add('placeholder');
            hiddenInput.value = '';
          }
        });
      }
    };

    // Close modal - Click close buttons
    if (closeModalBtns) {
      closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
      });
    }

    // Close modal - Click overlay
    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal - Press Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('sakura-modal--active')) {
        closeModal();
      }
    });

    // Handle form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const incomeName = document.getElementById('incomeName')?.value;
        const incomeCompany = document.getElementById('incomeCompany')?.value;
        const incomeAmount = document.getElementById('incomeAmount')?.value;
        const incomeFrequency = document.getElementById('incomeFrequency')?.value;
        const incomeAccount = document.getElementById('incomeAccount')?.value;
        const incomeNotes = document.getElementById('incomeNotes')?.value;

        // Validation
        if (!incomeName || !incomeAmount || !incomeFrequency || !incomeAccount) {
          alert('Please fill in all required fields.');
          return;
        }

        // Log the data (In production, this would send to API)
        console.log('New income source:', {
          name: incomeName,
          company: incomeCompany,
          amount: parseFloat(incomeAmount),
          frequency: incomeFrequency,
          account: incomeAccount,
          notes: incomeNotes
        });

        // Close modal and show success
        closeModal();
        alert('Income source added successfully!');

        // In production, this would:
        // 1. Send POST request to API
        // 2. Receive new income source ID
        // 3. Dynamically add new card to the grid
        // 4. Show success notification
      });
    }

    console.log('Income modal setup complete');
  }

  // Calendar setup - populate calendar with transactions
  setupCalendar() {
    const calendarDays = document.querySelector('.sakura-calendar-days');
    if (!calendarDays) return;

    // Load transactions from demo data
    if (typeof getDemoTransactions !== 'function') {
      console.warn('Calendar: getDemoTransactions not available');
      return;
    }

    const transactions = getDemoTransactions();
    if (!transactions || transactions.length === 0) {
      console.warn('Calendar: No transactions available');
      return;
    }

    // Group transactions by date
    const transactionsByDate = {};
    transactions.forEach(transaction => {
      const dateKey = this.formatDateKey(transaction.date);
      if (!transactionsByDate[dateKey]) {
        transactionsByDate[dateKey] = [];
      }
      transactionsByDate[dateKey].push(transaction);
    });

    // Clear existing calendar days
    calendarDays.innerHTML = '';

    // Get current month/year (hardcoded to January 2025 for now)
    const year = 2025;
    const month = 0; // January (0-indexed)
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = lastDay.getDate();

    // Add previous month days (faded)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const dayElement = this.createCalendarDay(dayNum, 'other-month', null);
      calendarDays.appendChild(dayElement);
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dateKey = this.formatDateKey(currentDate);
      const dayTransactions = transactionsByDate[dateKey] || [];
      const isToday = this.isSameDay(currentDate, today);

      const dayElement = this.createCalendarDay(day, isToday ? 'today' : '', dayTransactions);
      calendarDays.appendChild(dayElement);
    }

    // Add next month days to fill the grid (35 total cells = 5 weeks)
    const totalCells = firstDayOfWeek + daysInMonth;
    const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      const dayElement = this.createCalendarDay(day, 'other-month', null);
      calendarDays.appendChild(dayElement);
    }

    console.log('Calendar populated with', transactions.length, 'transactions');
  }

  // Helper: Create a calendar day element
  createCalendarDay(dayNumber, extraClass, transactions) {
    const dayDiv = document.createElement('div');
    dayDiv.className = `sakura-calendar-day ${extraClass}`.trim();

    const dayNumberSpan = document.createElement('span');
    dayNumberSpan.className = 'sakura-calendar-day-number';
    dayNumberSpan.textContent = dayNumber;
    dayDiv.appendChild(dayNumberSpan);

    // Add transactions if any
    if (transactions && transactions.length > 0) {
      const transactionsDiv = document.createElement('div');
      transactionsDiv.className = 'sakura-calendar-transactions';

      // Show up to 3 transactions
      const displayTransactions = transactions.slice(0, 3);
      displayTransactions.forEach(transaction => {
        const transactionDiv = this.createCalendarTransaction(transaction);
        transactionsDiv.appendChild(transactionDiv);
      });

      // Show "more" indicator if there are more than 3
      if (transactions.length > 3) {
        const moreDiv = document.createElement('div');
        moreDiv.className = 'sakura-calendar-more';
        moreDiv.textContent = `+${transactions.length - 3} more`;
        transactionsDiv.appendChild(moreDiv);
      }

      dayDiv.appendChild(transactionsDiv);
    }

    return dayDiv;
  }

  // Helper: Create a calendar transaction element
  createCalendarTransaction(transaction) {
    const transactionDiv = document.createElement('div');
    transactionDiv.className = `sakura-calendar-transaction ${transaction.type}`;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'sakura-calendar-transaction-name';
    nameSpan.textContent = transaction.name;

    const amountSpan = document.createElement('span');
    amountSpan.className = 'sakura-calendar-transaction-amount';
    const prefix = transaction.amount >= 0 ? '+' : '';
    amountSpan.textContent = `${prefix}$${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    transactionDiv.appendChild(nameSpan);
    transactionDiv.appendChild(amountSpan);

    return transactionDiv;
  }

  // Helper: Format date as YYYY-MM-DD key
  formatDateKey(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Helper: Check if two dates are the same day
  isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  // ========================================
  // ANALYTICS INSIGHTS CUSTOMIZATION
  // ========================================

  setupInsightsCustomization() {
    const customizeBtn = document.getElementById('customizeInsightsBtn');
    const emptyStateBtn = document.getElementById('emptyStateCustomizeBtn');
    const modal = document.getElementById('customizeInsightsModal');
    const closeBtn = document.getElementById('closeCustomizeModal');
    const saveBtn = document.getElementById('saveInsights');
    const resetBtn = document.getElementById('resetInsights');
    const modalOverlay = modal?.querySelector('.sakura-modal-overlay');

    if (!customizeBtn || !modal) return;

    // Load saved preferences on page load
    this.loadInsightPreferences();

    // Open modal
    customizeBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Open modal from empty state button
    emptyStateBtn?.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close modal handlers
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);

    // Save preferences
    saveBtn?.addEventListener('click', () => {
      this.saveInsightPreferences();
      closeModal();
    });

    // Reset to defaults
    resetBtn?.addEventListener('click', () => {
      if (confirm('Reset all insights to default visibility?')) {
        localStorage.removeItem('sakura-insight-preferences');
        // Check all toggles
        const toggles = modal.querySelectorAll('input[type="checkbox"]');
        toggles.forEach(toggle => {
          toggle.checked = true;
        });
        // Show all insights
        document.querySelectorAll('.sakura-insight-module').forEach(module => {
          module.classList.remove('hidden');
        });
        // Update empty state (should hide it since all are visible)
        this.updateEmptyState();
      }
    });
  }

  loadInsightPreferences() {
    const preferences = localStorage.getItem('sakura-insight-preferences');
    if (!preferences) return;

    try {
      const prefs = JSON.parse(preferences);

      // Apply preferences to page
      Object.keys(prefs).forEach(insightId => {
        const isVisible = prefs[insightId];
        const module = document.querySelector(`[data-insight-id="${insightId}"]`);
        const toggle = document.querySelector(`[data-insight="${insightId}"]`);

        if (module) {
          if (isVisible) {
            module.classList.remove('hidden');
          } else {
            module.classList.add('hidden');
          }
        }

        if (toggle) {
          toggle.checked = isVisible;
        }
      });

      // Handle the analytics row visibility
      this.updateAnalyticsRowVisibility(prefs);

      // Update empty state visibility
      this.updateEmptyState();
    } catch (e) {
      console.error('Failed to load insight preferences:', e);
    }
  }

  saveInsightPreferences() {
    const modal = document.getElementById('customizeInsightsModal');
    if (!modal) return;

    const toggles = modal.querySelectorAll('input[type="checkbox"][data-insight]');
    const preferences = {};

    toggles.forEach(toggle => {
      const insightId = toggle.getAttribute('data-insight');
      const isChecked = toggle.checked;
      preferences[insightId] = isChecked;

      // Apply visibility immediately
      const module = document.querySelector(`[data-insight-id="${insightId}"]`);
      if (module) {
        if (isChecked) {
          module.classList.remove('hidden');
        } else {
          module.classList.add('hidden');
        }
      }
    });

    // Handle the analytics row that contains envelope-breakdown and top-merchants
    this.updateAnalyticsRowVisibility(preferences);

    // Update empty state visibility
    this.updateEmptyState();

    // Save to localStorage
    localStorage.setItem('sakura-insight-preferences', JSON.stringify(preferences));
  }

  updateAnalyticsRowVisibility(preferences) {
    const analyticsRow = document.querySelector('.sakura-analytics-row');
    if (!analyticsRow) return;

    const envelopeModule = analyticsRow.querySelector('[data-insight-id="envelope-breakdown"]');
    const merchantsModule = analyticsRow.querySelector('[data-insight-id="top-merchants"]');

    // If both are hidden, hide the parent row
    const envelopeHidden = envelopeModule && envelopeModule.classList.contains('hidden');
    const merchantsHidden = merchantsModule && merchantsModule.classList.contains('hidden');

    if (envelopeHidden && merchantsHidden) {
      analyticsRow.classList.add('hidden');
    } else {
      analyticsRow.classList.remove('hidden');
    }
  }

  updateEmptyState() {
    const emptyState = document.getElementById('analyticsEmptyState');
    if (!emptyState) return;

    // Get all insight modules
    const insightModules = document.querySelectorAll('.sakura-insight-module');

    // Check if all modules are hidden
    const allHidden = Array.from(insightModules).every(module =>
      module.classList.contains('hidden')
    );

    // Show empty state if all insights are hidden, hide it otherwise
    if (allHidden) {
      emptyState.classList.add('visible');
    } else {
      emptyState.classList.remove('visible');
    }
  }

}

// Initialize framework when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.sakuraFramework = new SakuraFramework();
});

// Export for modular usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SakuraFramework;
}