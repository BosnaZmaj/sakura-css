// Transactions Manager - Full-featured transaction management system for Sakura CSS
// Adapted from original implementation with Sakura CSS naming conventions

// Custom Dropdown Component
class CustomSelect {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.sakura-custom-select-trigger');
    this.dropdown = element.querySelector('.sakura-custom-select-dropdown');
    this.options = element.querySelectorAll('.sakura-custom-select-option');
    this.hiddenInput = element.querySelector('input[type="hidden"]');
    this.icon = element.querySelector('.sakura-input-icon');

    this.selectedValue = '';
    this.selectedText = '';

    this.init();
  }

  init() {
    // Toggle dropdown on trigger click
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Select option on click
    this.options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectOption(option);
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.close();
      }
    });

    // Keyboard navigation
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  toggle() {
    this.element.classList.toggle('active');

    if (this.element.classList.contains('active')) {
      // Focus on selected option or first option
      const selectedOption = this.dropdown.querySelector('.sakura-custom-select-option.selected');
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  open() {
    this.element.classList.add('active');
  }

  close() {
    this.element.classList.remove('active');
  }

  selectOption(option) {
    // Remove selected class from all options
    this.options.forEach(opt => opt.classList.remove('selected'));

    // Add selected class to clicked option
    option.classList.add('selected');

    // Update trigger with icon and text
    this.selectedValue = option.dataset.value;

    // Get the icon from the option if it exists
    const optionIcon = option.querySelector('.sakura-option-icon');
    if (optionIcon) {
      const iconClone = optionIcon.cloneNode(true);
      this.trigger.innerHTML = '';
      this.trigger.appendChild(iconClone);

      const textNode = document.createTextNode(option.textContent.trim());
      this.trigger.appendChild(textNode);
    } else {
      this.trigger.textContent = option.textContent.trim();
    }

    this.trigger.classList.remove('placeholder');

    // Update hidden input
    if (this.hiddenInput) {
      this.hiddenInput.value = this.selectedValue;
    }

    // Update icon color
    if (this.icon) {
      this.icon.style.color = '#5b8bf5';
      this.icon.style.transform = 'translateY(-50%) scale(1.1)';
    }

    // Close dropdown
    this.close();

    // Trigger change event
    const event = new Event('change', { bubbles: true });
    this.element.dispatchEvent(event);
  }

  getValue() {
    return this.selectedValue;
  }

  setValue(value) {
    const option = Array.from(this.options).find(opt => opt.dataset.value === value);
    if (option) {
      this.selectOption(option);
    }
  }
}

class TransactionsManager {
  constructor() {
    this.currentView = 'list';
    this.selectedTransactions = new Set();
    this.allTransactions = this.getMockTransactions();
    this.filteredTransactions = [...this.allTransactions];
    this.displayedCount = 15; // Start with 15 transactions
    this.pageSize = 15; // Load 15 more each time
    this.init();
  }

  init() {
    this.setupSearch();
    this.setupFilters();
    this.setupViewToggle();
    this.setupBulkActions();
    this.setupTransactionSelection();
    this.setupCalendar();
    this.setupTableSorting();
    this.setupLoadMore();
    this.renderTransactions();
  }

  getMockTransactions() {
    // Base transactions (14 transactions)
    const baseTransactions = [
      {
        id: 1,
        date: new Date('2025-01-15'),
        name: 'Whole Foods Market',
        merchant: 'Store #1247 - Downtown',
        amount: -127.43,
        type: 'expense',
        envelope: 'Groceries',
        method: 'Debit Card',
        bankAccount: 'Chase Bank',
        tags: ['Organic'],
        category: 'Groceries',
        logo: 'https://logo.clearbit.com/wholefoodsmarket.com'
      },
      {
        id: 2,
        date: new Date('2025-01-14'),
        name: 'Netflix Subscription',
        merchant: 'Monthly Premium Plan',
        amount: -15.99,
        type: 'expense',
        envelope: 'Entertainment',
        method: 'Credit Card',
        bankAccount: 'Chase Bank',
        tags: ['Recurring', 'Subscription'],
        category: 'Entertainment',
        logo: 'https://logo.clearbit.com/netflix.com'
      },
      {
        id: 3,
        date: new Date('2025-01-15'),
        name: 'Salary Deposit',
        merchant: 'TechCorp Inc.',
        amount: 3500.00,
        type: 'income',
        envelope: 'Income',
        method: 'Direct Deposit',
        bankAccount: 'Chase Bank',
        tags: ['Recurring', 'Verified'],
        category: 'Income',
        icon: 'bi-cash-coin',
        iconClass: 'income-icon'
      },
      {
        id: 4,
        date: new Date('2025-01-12'),
        name: 'Electric Bill',
        merchant: 'City Power & Light',
        amount: -65.00,
        type: 'expense',
        envelope: 'Utilities',
        method: 'Auto Pay',
        bankAccount: 'Chase Bank',
        tags: ['Recurring'],
        category: 'Utilities',
        icon: 'bi-lightning-charge',
        iconClass: 'utilities-icon'
      },
      {
        id: 5,
        date: new Date('2025-01-15'),
        name: 'Shell Gas Station',
        merchant: 'Station #4429 - Highway 101',
        amount: -89.25,
        type: 'expense',
        envelope: 'Transportation',
        method: 'Credit Card',
        bankAccount: 'Chase Bank',
        tags: ['Gas'],
        category: 'Transportation',
        logo: 'https://logo.clearbit.com/shell.com'
      },
      {
        id: 6,
        date: new Date('2025-01-13'),
        name: 'Starbucks',
        merchant: 'Main Street Location',
        amount: -6.45,
        type: 'expense',
        envelope: 'Dining',
        method: 'Debit Card',
        bankAccount: 'Chase Bank',
        tags: ['Coffee'],
        category: 'Dining',
        logo: 'https://logo.clearbit.com/starbucks.com'
      },
      {
        id: 7,
        date: new Date('2025-01-13'),
        name: 'Target',
        merchant: 'Store #0847',
        amount: -82.33,
        type: 'expense',
        envelope: 'Groceries',
        method: 'Debit Card',
        bankAccount: 'Chase Bank',
        tags: ['Household'],
        category: 'Groceries',
        logo: 'https://logo.clearbit.com/target.com'
      },
      {
        id: 8,
        date: new Date('2025-01-11'),
        name: 'Pizza Palace',
        merchant: 'Main Street',
        amount: -32.50,
        type: 'expense',
        envelope: 'Dining',
        method: 'Credit Card',
        bankAccount: 'Chase Bank',
        tags: ['Takeout'],
        category: 'Dining',
        icon: 'bi-egg-fried',
        iconClass: 'dining-icon'
      },
      {
        id: 9,
        date: new Date('2025-01-13'),
        name: 'Amazon Purchase',
        merchant: 'Online Shopping',
        amount: -156.89,
        type: 'expense',
        envelope: 'Shopping',
        method: 'Credit Card',
        bankAccount: 'Chase Bank',
        tags: ['Online'],
        category: 'Shopping',
        logo: 'https://logo.clearbit.com/amazon.com'
      },
      {
        id: 10,
        date: new Date('2025-01-10'),
        name: 'Gym Membership',
        merchant: 'FitLife Gym',
        amount: -45.00,
        type: 'expense',
        envelope: 'Health',
        method: 'Auto Pay',
        bankAccount: 'Chase Bank',
        tags: ['Recurring', 'Health'],
        category: 'Health',
        icon: 'bi-heart-pulse',
        iconClass: 'health-icon'
      },
      {
        id: 11,
        date: new Date('2025-01-14'),
        name: 'Subway',
        merchant: 'Downtown Location',
        amount: -12.99,
        type: 'expense',
        envelope: 'Dining',
        method: 'Credit Card',
        bankAccount: 'Chase Bank',
        tags: ['Lunch'],
        category: 'Dining',
        logo: 'https://logo.clearbit.com/subway.com'
      },
      {
        id: 12,
        date: new Date('2025-01-12'),
        name: 'Pharmacy Copay',
        merchant: 'CVS Pharmacy',
        amount: -10.24,
        type: 'expense',
        envelope: 'Healthcare',
        method: 'Credit Card',
        bankAccount: 'Chase Bank',
        tags: ['Medical'],
        category: 'Healthcare',
        icon: 'bi-heart-pulse',
        iconClass: 'health-icon'
      },
      {
        id: 13,
        date: new Date('2025-01-09'),
        name: 'Coffee Shop',
        merchant: 'Local Cafe',
        amount: -4.50,
        type: 'expense',
        envelope: 'Dining',
        method: 'Credit Card',
        bankAccount: 'Chase Bank',
        tags: ['Coffee'],
        category: 'Dining',
        icon: 'bi-cup-hot',
        iconClass: 'dining-icon'
      },
      {
        id: 14,
        date: new Date('2025-01-08'),
        name: 'Gas Station',
        merchant: 'Quick Fill',
        amount: -38.75,
        type: 'expense',
        envelope: 'Transportation',
        method: 'Debit Card',
        bankAccount: 'Chase Bank',
        tags: ['Gas'],
        category: 'Transportation',
        logo: 'https://logo.clearbit.com/shell.com'
      },
      {
        id: 101,
        date: new Date('2025-01-15'),
        name: 'Chipotle',
        merchant: 'Downtown',
        amount: -18.50,
        type: 'expense',
        envelope: 'Dining',
        method: 'Credit Card',
        bankAccount: 'Chase Bank',
        tags: ['Lunch'],
        category: 'Dining',
        icon: 'bi-egg-fried',
        iconClass: 'dining-icon'
      },
      {
        id: 102,
        date: new Date('2025-01-15'),
        name: 'CVS Pharmacy',
        merchant: 'Store #2341',
        amount: -24.99,
        type: 'expense',
        envelope: 'Healthcare',
        method: 'Debit Card',
        bankAccount: 'Chase Bank',
        tags: ['Medical'],
        category: 'Healthcare',
        logo: 'https://logo.clearbit.com/cvs.com'
      }
    ];

    // Generate 86 more transactions to reach 100 total
    const additionalTransactions = [];
    const merchants = [
      { name: 'Safeway', category: 'Groceries', logo: 'https://logo.clearbit.com/safeway.com' },
      { name: 'Uber', category: 'Transportation', logo: 'https://logo.clearbit.com/uber.com' },
      { name: 'Spotify', category: 'Entertainment', logo: 'https://logo.clearbit.com/spotify.com' },
      { name: 'Best Buy', category: 'Shopping', logo: 'https://logo.clearbit.com/bestbuy.com' },
      { name: 'Chipotle', category: 'Dining', icon: 'bi-egg-fried', iconClass: 'dining-icon' },
      { name: 'CVS Pharmacy', category: 'Healthcare', logo: 'https://logo.clearbit.com/cvs.com' },
      { name: 'Water Bill', category: 'Utilities', icon: 'bi-droplet', iconClass: 'utilities-icon' },
      { name: 'Internet Service', category: 'Utilities', icon: 'bi-wifi', iconClass: 'utilities-icon' },
      { name: 'Freelance Payment', category: 'Income', icon: 'bi-cash-coin', iconClass: 'income-icon' },
      { name: 'Home Depot', category: 'Shopping', logo: 'https://logo.clearbit.com/homedepot.com' },
      { name: 'Panda Express', category: 'Dining', logo: 'https://logo.clearbit.com/pandaexpress.com' },
      { name: 'Costco', category: 'Groceries', logo: 'https://logo.clearbit.com/costco.com' },
      { name: 'Apple Store', category: 'Shopping', logo: 'https://logo.clearbit.com/apple.com' },
      { name: 'Walgreens', category: 'Healthcare', logo: 'https://logo.clearbit.com/walgreens.com' },
      { name: 'Gas Company', category: 'Utilities', icon: 'bi-fire', iconClass: 'utilities-icon' },
      { name: 'Lyft', category: 'Transportation', logo: 'https://logo.clearbit.com/lyft.com' },
      { name: 'Trader Joes', category: 'Groceries', logo: 'https://logo.clearbit.com/traderjoes.com' },
      { name: 'Bonus Payment', category: 'Income', icon: 'bi-cash-coin', iconClass: 'income-icon' }
    ];

    let currentDate = new Date('2025-01-07');

    for (let i = 15; i <= 100; i++) {
      const merchant = merchants[Math.floor(Math.random() * merchants.length)];
      const isIncome = merchant.category === 'Income';
      const amount = isIncome
        ? Math.floor(Math.random() * 2000) + 500
        : -(Math.floor(Math.random() * 250) + 5);

      additionalTransactions.push({
        id: i,
        date: new Date(currentDate),
        name: merchant.name,
        merchant: merchant.category === 'Income' ? 'Payment Received' : `Location #${Math.floor(Math.random() * 9000) + 1000}`,
        amount: amount,
        type: isIncome ? 'income' : 'expense',
        envelope: merchant.category,
        method: isIncome ? 'Direct Deposit' : (Math.random() > 0.5 ? 'Credit Card' : 'Debit Card'),
        bankAccount: 'Chase Bank',
        tags: isIncome ? ['Income'] : [merchant.category],
        category: merchant.category,
        logo: merchant.logo,
        icon: merchant.icon,
        iconClass: merchant.iconClass
      });

      // Move date backwards
      currentDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 2) - 1);
    }

    return [...baseTransactions, ...additionalTransactions];
  }

  setupLoadMore() {
    const loadMoreBtn = document.querySelector('.sakura-load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.displayedCount += this.pageSize;
        this.renderTransactions();
      });
    }
  }

  setupSearch() {
    const searchInput = document.getElementById('transactionSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.displayedCount = 15; // Reset to first page when filtering
        this.filterTransactions();
      });
    }
  }

  setupFilters() {
    const filters = ['typeFilter', 'envelopeFilter', 'dateFilter', 'amountFilter'];

    filters.forEach(filterId => {
      const filter = document.getElementById(filterId);
      if (filter) {
        filter.addEventListener('change', () => {
          this.displayedCount = 15; // Reset to first page when filtering
          this.filterTransactions();
        });
      }
    });

    const clearButton = document.getElementById('clearFilters');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        this.clearAllFilters();
      });
    }

    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
      sortBy.addEventListener('change', () => {
        this.sortTransactions();
        this.renderTransactions();
      });
    }
  }

  filterTransactions() {
    const searchTerm = document.getElementById('transactionSearch')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const envelopeFilter = document.getElementById('envelopeFilter')?.value || '';
    const dateFilter = document.getElementById('dateFilter')?.value || '';
    const amountFilter = document.getElementById('amountFilter')?.value || '';

    this.filteredTransactions = this.allTransactions.filter(transaction => {
      const matchesSearch = !searchTerm ||
        transaction.name.toLowerCase().includes(searchTerm) ||
        transaction.merchant.toLowerCase().includes(searchTerm);

      const matchesType = !typeFilter || transaction.type === typeFilter;

      const matchesEnvelope = !envelopeFilter ||
        transaction.envelope.toLowerCase() === envelopeFilter;

      const matchesDate = this.matchesDateFilter(transaction.date, dateFilter);

      const matchesAmount = this.matchesAmountFilter(Math.abs(transaction.amount), amountFilter);

      return matchesSearch && matchesType && matchesEnvelope && matchesDate && matchesAmount;
    });

    this.sortTransactions();
    this.renderTransactions();
    this.updateResultsCount();
  }

  matchesDateFilter(date, filter) {
    if (!filter || filter === 'all') return true;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (filter) {
      case 'today':
        return date >= today;
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return date >= weekAgo;
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return date >= monthAgo;
      case 'quarter':
        const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        return date >= quarterAgo;
      case 'year':
        const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
        return date >= yearAgo;
      default:
        return true;
    }
  }

  matchesAmountFilter(amount, filter) {
    if (!filter) return true;

    switch (filter) {
      case '0-25':
        return amount >= 0 && amount <= 25;
      case '25-100':
        return amount > 25 && amount <= 100;
      case '100-500':
        return amount > 100 && amount <= 500;
      case '500+':
        return amount > 500;
      default:
        return true;
    }
  }

  sortTransactions() {
    const sortBy = document.getElementById('sortBy')?.value || 'date-desc';

    this.filteredTransactions.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return b.date.getTime() - a.date.getTime();
        case 'date-asc':
          return a.date.getTime() - b.date.getTime();
        case 'amount-desc':
          return Math.abs(b.amount) - Math.abs(a.amount);
        case 'amount-asc':
          return Math.abs(a.amount) - Math.abs(b.amount);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }

  clearAllFilters() {
    document.getElementById('transactionSearch').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('envelopeFilter').value = '';
    document.getElementById('dateFilter').value = 'month';
    document.getElementById('amountFilter').value = '';

    this.displayedCount = 15;
    this.filterTransactions();
  }

  setupViewToggle() {
    const viewButtons = document.querySelectorAll('.sakura-view-btn');

    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);

        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  switchView(view) {
    this.currentView = view;

    document.querySelectorAll('.sakura-transaction-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`${view}View`);
    if (targetView) {
      targetView.classList.add('active');
    }

    if (view === 'calendar') {
      this.renderCalendar();
    } else if (view === 'table') {
      // Table view already has static content
    }
  }

  setupBulkActions() {
    const selectAllBtn = document.getElementById('selectAll');
    const bulkEditBtn = document.getElementById('bulkEdit');
    const bulkDeleteBtn = document.getElementById('bulkDelete');

    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        this.toggleSelectAll();
      });
    }
  }

  setupTransactionSelection() {
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('sakura-transaction-select')) {
        const transactionId = e.target.closest('.sakura-transaction-item')?.dataset.id;
        if (transactionId) {
          if (e.target.checked) {
            this.selectedTransactions.add(transactionId);
          } else {
            this.selectedTransactions.delete(transactionId);
          }
          this.updateBulkActions();
        }
      }
    });
  }

  toggleSelectAll() {
    const checkboxes = document.querySelectorAll('.sakura-transaction-select');
    const allSelected = this.selectedTransactions.size === checkboxes.length;

    if (allSelected) {
      this.selectedTransactions.clear();
      checkboxes.forEach(cb => cb.checked = false);
    } else {
      checkboxes.forEach(cb => {
        cb.checked = true;
        const transactionId = cb.closest('.sakura-transaction-item')?.dataset.id;
        if (transactionId) {
          this.selectedTransactions.add(transactionId);
        }
      });
    }

    this.updateBulkActions();
  }

  updateBulkActions() {
    const bulkEditBtn = document.getElementById('bulkEdit');
    const bulkDeleteBtn = document.getElementById('bulkDelete');
    const hasSelection = this.selectedTransactions.size > 0;

    if (bulkEditBtn) bulkEditBtn.disabled = !hasSelection;
    if (bulkDeleteBtn) bulkDeleteBtn.disabled = !hasSelection;
  }

  setupCalendar() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        // Month navigation not implemented in mockup
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        // Month navigation not implemented in mockup
      });
    }
  }

  setupTableSorting() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.sortable')) {
        const header = e.target.closest('.sortable');
        const sortKey = header.dataset.sort;
        // Table sorting UI update would go here
      }
    });
  }

  renderTransactions() {
    const listView = document.querySelector('.sakura-transaction-list.sakura-transaction-timeline');
    if (!listView) return;

    // Get transactions to display
    const transactionsToDisplay = this.filteredTransactions.slice(0, this.displayedCount);

    // Group transactions by date
    const groupedTransactions = this.groupTransactionsByDate(transactionsToDisplay);

    // Clear existing date groups (keep load more button)
    const existingGroups = listView.querySelectorAll('.sakura-date-group');
    existingGroups.forEach(group => group.remove());

    // Render each date group
    const loadMoreContainer = listView.querySelector('.sakura-load-more-container');
    groupedTransactions.forEach(group => {
      const groupElement = this.createTimelineGroupElement(group);
      if (loadMoreContainer) {
        listView.insertBefore(groupElement, loadMoreContainer);
      } else {
        listView.appendChild(groupElement);
      }
    });

    // Update load more button
    this.updateLoadMoreButton();
    this.updateResultsCount();
  }

  groupTransactionsByDate(transactions) {
    const groups = {};

    transactions.forEach(transaction => {
      const dateKey = transaction.date.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: transaction.date,
          transactions: []
        };
      }
      groups[dateKey].transactions.push(transaction);
    });

    // Convert to array and sort by date (newest first)
    return Object.values(groups).sort((a, b) => b.date - a.date);
  }

  createTimelineGroupElement(group) {
    const div = document.createElement('div');
    div.className = 'sakura-date-group';

    // Format date for timeline
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateLabel, dateBubble;
    if (group.date.toDateString() === today.toDateString()) {
      dateLabel = 'Today';
      dateBubble = 'T';
    } else if (group.date.toDateString() === yesterday.toDateString()) {
      dateLabel = 'Yesterday';
      dateBubble = 'Y';
    } else {
      dateLabel = group.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      dateBubble = group.date.getDate().toString();
    }

    // Calculate total
    const total = group.transactions.reduce((sum, t) => sum + t.amount, 0);
    const totalClass = total >= 0 ? 'positive' : 'negative';
    const totalPrefix = total >= 0 ? '+' : '';

    div.innerHTML = `
      <div class="sakura-date-group-header">
        <div class="sakura-date-bubble">${dateBubble}</div>
        <div class="sakura-date-group-title">
          <span class="sakura-date-group-date">${dateLabel}</span>
          <span class="sakura-date-group-count">${group.transactions.length} transaction${group.transactions.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="sakura-date-group-summary">
          <span class="sakura-date-group-total ${totalClass}">${totalPrefix}$${Math.abs(total).toFixed(2)}</span>
        </div>
      </div>
      <div class="sakura-date-group-transactions">
      </div>
    `;

    // Add transactions to the group
    const transactionsContainer = div.querySelector('.sakura-date-group-transactions');
    group.transactions.forEach(transaction => {
      const transactionElement = this.createTransactionElement(transaction);
      transactionsContainer.appendChild(transactionElement);
    });

    return div;
  }

  createTransactionElement(transaction) {
    const div = document.createElement('div');
    div.className = `sakura-transaction-item selectable`;
    div.dataset.type = transaction.type;
    div.dataset.id = transaction.id;

    const amountClass = transaction.type === 'income' ? 'income' :
                       transaction.type === 'transfer' ? 'transfer' : 'expense';
    const amountPrefix = transaction.type === 'income' ? '+' :
                        transaction.type === 'transfer' ? '' : '';

    const dateStr = transaction.date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Determine if we should use logo or icon
    const iconContent = transaction.logo
      ? `<img src="${transaction.logo}" alt="${transaction.name}">`
      : `<i class="bi ${transaction.icon}"></i>`;

    const iconClass = transaction.logo ? '' : transaction.iconClass || '';

    const envelopeClass = `envelope-${transaction.envelope.toLowerCase().replace(/\s+/g, '-')}`;

    div.innerHTML = `
      <div class="sakura-transaction-checkbox">
        <input type="checkbox" class="sakura-transaction-select">
      </div>
      <div class="sakura-transaction-icon ${iconClass}">
        ${iconContent}
      </div>
      <div class="sakura-transaction-details">
        <div class="sakura-transaction-main">
          <div class="sakura-transaction-name">${transaction.name}</div>
          <div class="sakura-transaction-merchant">${transaction.merchant}</div>
        </div>
        <div class="sakura-transaction-meta">
          <span class="sakura-transaction-bank-account">
            <img src="https://logo.clearbit.com/chase.com" alt="Chase Bank" class="sakura-bank-logo">
            ${transaction.bankAccount}
          </span>
          <span class="sakura-transaction-envelope ${envelopeClass}">${transaction.envelope}</span>
          <span class="sakura-transaction-method">${transaction.method}</span>
          <span class="sakura-transaction-tags">
            ${transaction.tags.map(tag => `<span class="sakura-tag${tag.toLowerCase() === 'recurring' ? ' recurring' : ''}">${tag}</span>`).join('')}
          </span>
        </div>
      </div>
      <div class="sakura-transaction-amount ${amountClass}">
        ${amountPrefix}$${Math.abs(transaction.amount).toFixed(2)}
        <div class="sakura-transaction-date">${dateStr}</div>
      </div>
      <div class="sakura-transaction-actions">
        <button class="sakura-action-btn">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="sakura-action-btn">
          <i class="bi bi-files"></i>
        </button>
        <button class="sakura-action-btn danger">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    return div;
  }

  updateLoadMoreButton() {
    const loadMoreContainer = document.querySelector('.sakura-load-more-container');
    const loadMoreBtn = document.querySelector('.sakura-load-more-btn');
    const loadMoreInfo = document.querySelector('.sakura-load-more-info');

    if (loadMoreContainer && loadMoreBtn && loadMoreInfo) {
      const hasMore = this.displayedCount < this.filteredTransactions.length;

      if (hasMore) {
        loadMoreBtn.style.display = 'block';
        loadMoreInfo.textContent = `Showing ${this.displayedCount} of ${this.filteredTransactions.length} transactions`;
      } else {
        loadMoreBtn.style.display = 'none';
        loadMoreInfo.textContent = `Showing all ${this.filteredTransactions.length} transactions`;
      }
    }
  }

  renderCalendar() {
    const calendarDays = document.querySelector('.sakura-calendar-days');
    if (!calendarDays) return;

    calendarDays.innerHTML = '';

    const year = 2025;
    const month = 0; // January
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dayElement = document.createElement('div');
      dayElement.className = 'sakura-calendar-day';
      dayElement.dataset.date = currentDate.toDateString();
      dayElement.dataset.expanded = 'false';

      if (currentDate.getMonth() !== month) {
        dayElement.classList.add('other-month');
      }

      if (currentDate.toDateString() === new Date().toDateString()) {
        dayElement.classList.add('today');
      }

      const dayTransactions = this.filteredTransactions.filter(t =>
        t.date.toDateString() === currentDate.toDateString()
      );

      // Show only first 3 transactions initially
      const maxVisible = 3;
      const visibleTransactions = dayTransactions.slice(0, maxVisible);
      const remainingCount = dayTransactions.length - maxVisible;

      const transactionsHTML = visibleTransactions.map(t => `
        <div class="sakura-calendar-transaction ${t.type}">
          <span class="sakura-calendar-transaction-name">${t.name}</span>
          <span class="sakura-calendar-transaction-amount">${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}</span>
        </div>
      `).join('');

      // Add "X more" indicator if there are more transactions
      const moreIndicator = remainingCount > 0
        ? `<div class="sakura-calendar-more" data-action="expand">+${remainingCount} more</div>`
        : '';

      dayElement.innerHTML = `
        <div class="sakura-calendar-day-number">${currentDate.getDate()}</div>
        <div class="sakura-calendar-transactions">
          ${transactionsHTML}
          ${moreIndicator}
        </div>
      `;

      // Add click handler for "+X more" indicator
      if (remainingCount > 0) {
        const moreBtn = dayElement.querySelector('.sakura-calendar-more');
        moreBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleCalendarDay(dayElement, dayTransactions);
        });
      }

      calendarDays.appendChild(dayElement);
    }
  }

  toggleCalendarDay(dayElement, allTransactions) {
    const isExpanded = dayElement.dataset.expanded === 'true';
    const transactionsContainer = dayElement.querySelector('.sakura-calendar-transactions');

    if (isExpanded) {
      // Collapse: show only first 3
      const maxVisible = 3;
      const visibleTransactions = allTransactions.slice(0, maxVisible);
      const remainingCount = allTransactions.length - maxVisible;

      const transactionsHTML = visibleTransactions.map(t => `
        <div class="sakura-calendar-transaction ${t.type}">
          <span class="sakura-calendar-transaction-name">${t.name}</span>
          <span class="sakura-calendar-transaction-amount">${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}</span>
        </div>
      `).join('');

      const moreIndicator = `<div class="sakura-calendar-more" data-action="expand">+${remainingCount} more</div>`;

      transactionsContainer.innerHTML = transactionsHTML + moreIndicator;

      // Re-attach click handler
      const moreBtn = transactionsContainer.querySelector('.sakura-calendar-more');
      moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleCalendarDay(dayElement, allTransactions);
      });

      dayElement.dataset.expanded = 'false';
    } else {
      // Expand: show all transactions
      const transactionsHTML = allTransactions.map(t => `
        <div class="sakura-calendar-transaction ${t.type}">
          <span class="sakura-calendar-transaction-name">${t.name}</span>
          <span class="sakura-calendar-transaction-amount">${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}</span>
        </div>
      `).join('');

      const showLess = `<div class="sakura-calendar-more" data-action="collapse">Show less</div>`;

      transactionsContainer.innerHTML = transactionsHTML + showLess;

      // Re-attach click handler
      const moreBtn = transactionsContainer.querySelector('.sakura-calendar-more');
      moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleCalendarDay(dayElement, allTransactions);
      });

      dayElement.dataset.expanded = 'true';
    }
  }

  updateResultsCount() {
    const countElement = document.querySelector('.sakura-results-count');
    const totalElement = document.querySelector('.sakura-results-total strong');

    if (countElement) {
      countElement.textContent = `${this.filteredTransactions.length} transactions`;
    }

    if (totalElement) {
      const total = this.filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
      totalElement.textContent = `$${total.toFixed(2)}`;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.transactionsManager = new TransactionsManager();

  // Initialize all custom dropdowns
  const customSelects = document.querySelectorAll('.sakura-custom-select');
  customSelects.forEach(select => {
    new CustomSelect(select);
  });

  // Modal functionality
  const modal = document.getElementById('addTransactionModal');
  const openModalBtn = document.getElementById('openAddTransactionModal');
  const closeModalBtn = document.getElementById('closeAddTransactionModal');
  const modalOverlay = modal?.querySelector('.sakura-modal-overlay');

  // Open modal
  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    });
  }

  // Close modal functions
  const closeModal = () => {
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restore body scroll
    }
  };

  // Close on close button click
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Close on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('show')) {
      closeModal();
    }
  });
});

// Initialize Modal Datepicker
function initializeModalDatepicker() {
  const datepicker = document.getElementById('modalDatepicker');
  if (!datepicker) return;

  const input = datepicker.querySelector('.sakura-datepicker-input');
  const inputField = datepicker.querySelector('#transactionDate');
  const hiddenInput = datepicker.querySelector('#transactionDateValue');
  const dropdown = datepicker.querySelector('.sakura-datepicker-dropdown');
  const daysContainer = datepicker.querySelector('.sakura-datepicker-days');
  const monthDisplay = datepicker.querySelector('.sakura-datepicker-month');
  const prevBtn = datepicker.querySelector('.sakura-datepicker-prev');
  const nextBtn = datepicker.querySelector('.sakura-datepicker-next');

  let currentDate = new Date();
  let selectedDate = null;

  // Open dropdown when clicking on calendar icon
  const calendarIcon = input.querySelector('i');
  if (calendarIcon) {
    calendarIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      datepicker.classList.add('active');
      renderCalendar();
    });
  }

  // Open dropdown when clicking on input field (but allow typing)
  inputField.addEventListener('focus', () => {
    datepicker.classList.add('active');
    renderCalendar();
  });

  // Handle manual date input
  inputField.addEventListener('input', (e) => {
    const value = e.target.value;
    // Try to parse the date (MM/DD/YYYY format)
    const dateMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (dateMatch) {
      const month = parseInt(dateMatch[1]) - 1; // Month is 0-indexed
      const day = parseInt(dateMatch[2]);
      const year = parseInt(dateMatch[3]);

      const parsedDate = new Date(year, month, day);

      // Validate the date is real
      if (parsedDate.getMonth() === month &&
          parsedDate.getDate() === day &&
          parsedDate.getFullYear() === year) {
        selectedDate = parsedDate;
        currentDate = new Date(parsedDate);

        // Update hidden input
        const yyyy = selectedDate.getFullYear();
        const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const dd = String(selectedDate.getDate()).padStart(2, '0');
        hiddenInput.value = `${yyyy}-${mm}-${dd}`;

        // Update calendar if open
        if (datepicker.classList.contains('active')) {
          renderCalendar();
        }
      }
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!datepicker.contains(e.target)) {
      datepicker.classList.remove('active');
    }
  });

  // Previous month
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  // Next month
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month display
    monthDisplay.textContent = new Date(year, month, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    // Clear days
    daysContainer.innerHTML = '';

    // Get first day of month and calculate start date
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);

      const dayElement = document.createElement('div');
      dayElement.className = 'sakura-datepicker-day';
      dayElement.textContent = day.getDate();

      // Add classes
      if (day.getMonth() !== month) {
        dayElement.classList.add('other-month');
      }

      const today = new Date();
      if (day.toDateString() === today.toDateString()) {
        dayElement.classList.add('today');
      }

      if (selectedDate && day.toDateString() === selectedDate.toDateString()) {
        dayElement.classList.add('selected');
      }

      // Click handler
      dayElement.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedDate = new Date(day);

        // Update input display
        inputField.value = selectedDate.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });

        // Update hidden input (YYYY-MM-DD format)
        const yyyy = selectedDate.getFullYear();
        const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const dd = String(selectedDate.getDate()).padStart(2, '0');
        hiddenInput.value = `${yyyy}-${mm}-${dd}`;

        // Close dropdown
        datepicker.classList.remove('active');

        // Re-render to update selected state
        renderCalendar();
      });

      daysContainer.appendChild(dayElement);
    }
  }

  // Initial render
  renderCalendar();
}

// Add Transaction Modal Management
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('addTransactionModal');
  const openButton = document.getElementById('openAddTransactionModal');
  const closeButton = document.getElementById('closeAddTransactionModal');
  const cancelButton = document.getElementById('cancelTransactionModal');
  const overlay = modal?.querySelector('.sakura-modal-overlay');
  const form = modal?.querySelector('.sakura-transaction-form');

  // Initialize modal datepicker
  initializeModalDatepicker();

  // Open modal
  if (openButton && modal) {
    openButton.addEventListener('click', function() {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  // Close modal function
  function closeModal() {
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restore scrolling
      // Reset form
      if (form) {
        form.reset();
      }
    }
  }

  // Close button
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Cancel button
  if (cancelButton) {
    cancelButton.addEventListener('click', closeModal);
  }

  // Close when clicking overlay
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal?.classList.contains('show')) {
      closeModal();
    }
  });

  // Handle form submission (placeholder for now)
  const submitButton = document.getElementById('submitTransaction');
  if (submitButton) {
    submitButton.addEventListener('click', function(e) {
      e.preventDefault();

      // Get form values
      const formData = {
        date: document.getElementById('transactionDate')?.value,
        merchant: document.getElementById('merchantName')?.value,
        amount: document.getElementById('transactionAmount')?.value,
        type: document.getElementById('transactionType')?.value,
        envelope: document.getElementById('transactionEnvelope')?.value,
        paymentMethod: document.getElementById('paymentMethod')?.value,
        merchantDescription: document.getElementById('merchantDescription')?.value,
        notes: document.getElementById('transactionNotes')?.value
      };

      // Validate required fields
      if (!formData.date || !formData.merchant || !formData.amount || !formData.type || !formData.envelope || !formData.paymentMethod) {
        alert('Please fill in all required fields');
        return;
      }

      // TODO: Add transaction to the list
      console.log('Transaction data:', formData);

      // Close modal
      closeModal();

      // Show success message (placeholder)
      alert('Transaction added successfully!');
    });
  }
});

// Import CSV Modal Management
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('importCSVModal');
  const openButton = document.getElementById('openImportCSVModal');
  const closeButton = document.getElementById('closeImportCSVModal');
  const cancelButton = document.getElementById('cancelImportCSVModal');
  const overlay = modal?.querySelector('.sakura-modal-overlay');
  const form = modal?.querySelector('.sakura-import-form');
  const fileInput = document.getElementById('csvFile');
  const fileNameDisplay = document.getElementById('csvFileName');

  // File upload handling
  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        fileNameDisplay.textContent = file.name;
        fileNameDisplay.style.fontStyle = 'normal';
        fileNameDisplay.style.color = 'var(--gray-900)';
      } else {
        fileNameDisplay.textContent = 'No file selected';
        fileNameDisplay.style.fontStyle = 'italic';
        fileNameDisplay.style.color = 'var(--gray-600)';
      }
    });
  }

  // Open modal
  if (openButton && modal) {
    openButton.addEventListener('click', function() {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close modal function
  function closeModal() {
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      // Reset form and file display
      if (form) {
        form.reset();
      }
      if (fileNameDisplay) {
        fileNameDisplay.textContent = 'No file selected';
        fileNameDisplay.style.fontStyle = 'italic';
        fileNameDisplay.style.color = 'var(--gray-600)';
      }
    }
  }

  // Close button
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Cancel button
  if (cancelButton) {
    cancelButton.addEventListener('click', closeModal);
  }

  // Close when clicking overlay
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal?.classList.contains('show')) {
      closeModal();
    }
  });

  // Handle form submission
  const submitButton = document.getElementById('submitImportCSV');
  if (submitButton) {
    submitButton.addEventListener('click', function(e) {
      e.preventDefault();

      // Get form values
      const file = fileInput?.files[0];
      const account = document.getElementById('importAccount')?.value;
      const dateFormat = document.getElementById('dateFormat')?.value;
      const skipDuplicates = document.getElementById('skipDuplicates')?.checked;

      // Validate required fields
      if (!file) {
        alert('Please select a CSV file');
        return;
      }
      if (!account) {
        alert('Please select an account');
        return;
      }
      if (!dateFormat) {
        alert('Please select a date format');
        return;
      }

      // TODO: Process CSV file
      console.log('Import data:', {
        fileName: file.name,
        account: account,
        dateFormat: dateFormat,
        skipDuplicates: skipDuplicates
      });

      // Close modal
      closeModal();

      // Show success message (placeholder)
      alert('CSV import started! This would process ' + file.name);
    });
  }
});
