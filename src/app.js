// eldar.marketing - Main Application

/**
 * Performance Utilities
 */

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Service Catalog with prices and durations
 * Requirements: 2.3
 */
const SERVICE_CATALOG = {
  advertising: {
    'instagram-ads': {
      name: 'Реклама в Instagram/Facebook',
      basePrice: 35000,
      baseDuration: '5-7 дней',
      includes: [
        'Настройка рекламного кабинета',
        'Создание аудиторий',
        'Разработка креативов',
        'Запуск и оптимизация'
      ]
    },
    'yandex-direct': {
      name: 'Реклама в Яндекс.Директ',
      basePrice: 40000,
      baseDuration: '5-7 дней',
      includes: [
        'Сбор семантического ядра',
        'Настройка кампаний',
        'Создание объявлений',
        'Аналитика и оптимизация'
      ]
    },
    'google-ads': {
      name: 'Реклама в Google Ads',
      basePrice: 45000,
      baseDuration: '7-10 дней',
      includes: [
        'Настройка аккаунта',
        'Подбор ключевых слов',
        'Создание объявлений',
        'Настройка конверсий'
      ]
    },
    'smm-strategy': {
      name: 'SMM-стратегия',
      basePrice: 50000,
      baseDuration: '10-14 дней',
      includes: [
        'Анализ конкурентов',
        'Разработка контент-плана',
        'Tone of voice',
        'KPI и метрики'
      ]
    },
    'email-marketing': {
      name: 'Email-рассылка',
      basePrice: 25000,
      baseDuration: '5-7 дней',
      includes: [
        'Настройка сервиса рассылок',
        'Дизайн шаблонов',
        'Сегментация базы',
        'Автоматизация цепочек'
      ]
    }
  },
  development: {
    'landing-page': {
      name: 'Лендинг для бизнеса',
      basePrice: 60000,
      baseDuration: '7-10 дней',
      includes: [
        'Прототипирование',
        'Уникальный дизайн',
        'Адаптивная вёрстка',
        'Интеграция форм'
      ]
    },
    'ecommerce': {
      name: 'Интернет-магазин',
      basePrice: 150000,
      baseDuration: '21-30 дней',
      includes: [
        'Каталог товаров',
        'Корзина и оплата',
        'Личный кабинет',
        'Интеграция с CRM'
      ]
    },
    'corporate-website': {
      name: 'Корпоративный сайт',
      basePrice: 120000,
      baseDuration: '14-21 день',
      includes: [
        'Многостраничная структура',
        'CMS для управления',
        'SEO-оптимизация',
        'Мобильная версия'
      ]
    }
  },
  analytics: {
    'seo': {
      name: 'SEO-оптимизация',
      basePrice: 45000,
      baseDuration: '30+ дней',
      includes: [
        'Технический аудит',
        'Оптимизация контента',
        'Внешняя оптимизация',
        'Ежемесячные отчёты'
      ]
    },
    'analytics-setup': {
      name: 'Настройка аналитики',
      basePrice: 30000,
      baseDuration: '3-5 дней',
      includes: [
        'Google Analytics 4',
        'Яндекс.Метрика',
        'Настройка целей',
        'Дашборд отчётов'
      ]
    }
  },
  branding: {
    'rebranding': {
      name: 'Ребрендинг',
      basePrice: 100000,
      baseDuration: '21-30 дней',
      includes: [
        'Анализ бренда',
        'Новая айдентика',
        'Брендбук',
        'Носители фирменного стиля'
      ]
    },
    'logo-design': {
      name: 'Дизайн логотипа',
      basePrice: 35000,
      baseDuration: '7-10 дней',
      includes: [
        '3 концепции на выбор',
        'Доработка выбранной',
        'Исходники всех форматов',
        'Гайдлайн по использованию'
      ]
    }
  }
};

/**
 * Service Suggestions for Autocomplete
 * Categories: advertising, development, analytics, branding
 * Requirements: 1.4
 */
const SERVICE_SUGGESTIONS = [
  {
    id: 'instagram-ads',
    text: 'Нужна реклама в Instagram/Facebook',
    category: 'advertising',
    keywords: ['instagram', 'facebook', 'таргет', 'соцсети', 'smm']
  },
  {
    id: 'yandex-direct',
    text: 'Нужна реклама в Яндекс.Директ',
    category: 'advertising',
    keywords: ['яндекс', 'директ', 'контекст', 'поиск']
  },
  {
    id: 'google-ads',
    text: 'Нужна реклама в Google Ads',
    category: 'advertising',
    keywords: ['google', 'гугл', 'контекст', 'adwords']
  },
  {
    id: 'landing-page',
    text: 'Нужен лендинг для бизнеса',
    category: 'development',
    keywords: ['лендинг', 'сайт', 'страница', 'landing']
  },
  {
    id: 'ecommerce',
    text: 'Нужен интернет-магазин',
    category: 'development',
    keywords: ['магазин', 'ecommerce', 'shop', 'продажи', 'каталог']
  },
  {
    id: 'seo',
    text: 'Нужна SEO-оптимизация сайта',
    category: 'analytics',
    keywords: ['seo', 'оптимизация', 'поисковая', 'продвижение', 'выдача']
  },
  {
    id: 'analytics-setup',
    text: 'Нужна настройка аналитики',
    category: 'analytics',
    keywords: ['аналитика', 'метрика', 'analytics', 'отслеживание', 'конверсии']
  },
  {
    id: 'rebranding',
    text: 'Нужен ребрендинг',
    category: 'branding',
    keywords: ['ребрендинг', 'бренд', 'логотип', 'фирменный', 'стиль']
  },
  {
    id: 'smm-strategy',
    text: 'Нужна SMM-стратегия',
    category: 'advertising',
    keywords: ['smm', 'стратегия', 'соцсети', 'контент', 'план']
  },
  {
    id: 'email-marketing',
    text: 'Нужна email-рассылка',
    category: 'advertising',
    keywords: ['email', 'рассылка', 'письма', 'newsletter', 'маркетинг']
  },
  {
    id: 'corporate-website',
    text: 'Нужен корпоративный сайт',
    category: 'development',
    keywords: ['корпоративный', 'сайт', 'компания', 'бизнес']
  },
  {
    id: 'logo-design',
    text: 'Нужен дизайн логотипа',
    category: 'branding',
    keywords: ['логотип', 'дизайн', 'лого', 'айдентика']
  }
];

/**
 * Application State
 */
const AppState = {
  currentView: 'chat',
  chat: {
    query: '',
    suggestions: [],
    isTyping: false
  },
  proposal: {
    isGenerating: false,
    currentStep: 0,
    result: null
  },
  checkout: {
    isOpen: false,
    status: 'idle'
  }
};

/**
 * Chat Input State
 */
const ChatInputState = {
  value: '',
  filteredSuggestions: [],
  isOpen: false,
  selectedIndex: -1
};

/**
 * DOM Elements cache
 */
let elements = {};

/**
 * Autocomplete configuration
 */
const AutocompleteConfig = {
  maxVisible: 6,
  minChars: 1
};

/**
 * Event callbacks for testing and extensibility
 */
const callbacks = {
  onQuerySubmit: null
};

/**
 * Get service details from catalog by suggestion ID
 * Requirements: 2.3
 * @param {string} suggestionId - Service suggestion ID
 * @returns {Object|null} Service details with price and duration
 */
function getServiceFromCatalog(suggestionId) {
  for (const category of Object.values(SERVICE_CATALOG)) {
    if (category[suggestionId]) {
      return {
        id: suggestionId,
        ...category[suggestionId]
      };
    }
  }
  return null;
}

/**
 * Find matching service for a query
 * Requirements: 2.3
 * @param {string} query - User query text
 * @returns {Object} Service details with price and duration
 */
function findServiceForQuery(query) {
  const queryLower = query.toLowerCase();
  
  // First try to find exact match in suggestions
  const matchedSuggestion = SERVICE_SUGGESTIONS.find(s => 
    s.text.toLowerCase() === queryLower ||
    s.keywords.some(k => queryLower.includes(k))
  );
  
  if (matchedSuggestion) {
    const service = getServiceFromCatalog(matchedSuggestion.id);
    if (service) return service;
  }
  
  // Fallback: find by category keywords
  const categoryKeywords = {
    advertising: ['реклама', 'таргет', 'smm', 'email', 'рассылка'],
    development: ['сайт', 'лендинг', 'магазин', 'разработка'],
    analytics: ['seo', 'аналитика', 'метрика', 'оптимизация'],
    branding: ['бренд', 'логотип', 'дизайн', 'айдентика']
  };
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(k => queryLower.includes(k))) {
      const services = SERVICE_CATALOG[category];
      const firstServiceId = Object.keys(services)[0];
      return { id: firstServiceId, ...services[firstServiceId] };
    }
  }
  
  // Default fallback to landing page
  return {
    id: 'landing-page',
    ...SERVICE_CATALOG.development['landing-page']
  };
}

/**
 * Filter suggestions based on input text
 * Uses fuzzy matching on text and keywords
 * Requirements: 1.1, 1.5
 * @param {string} input - User input text
 * @param {Array} suggestions - Array of suggestion objects
 * @returns {Array} Filtered suggestions
 */
function filterSuggestions(input, suggestions = SERVICE_SUGGESTIONS) {
  if (!input || input.trim().length < AutocompleteConfig.minChars) {
    return [];
  }
  
  const searchTerm = input.toLowerCase().trim();
  
  const filtered = suggestions.filter(suggestion => {
    // Check if text contains the search term (case-insensitive)
    const textMatch = suggestion.text.toLowerCase().includes(searchTerm);
    
    // Check if any keyword matches
    const keywordMatch = suggestion.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchTerm) || 
      searchTerm.includes(keyword.toLowerCase())
    );
    
    return textMatch || keywordMatch;
  });
  
  // Limit results to maxVisible
  return filtered.slice(0, AutocompleteConfig.maxVisible);
}

/**
 * Get all available suggestions
 * @returns {Array} All service suggestions
 */
function getAllSuggestions() {
  return SERVICE_SUGGESTIONS;
}

/**
 * Set callback for query submission (used for testing)
 * @param {Function} callback - Function to call when query is submitted
 */
function setOnQuerySubmit(callback) {
  callbacks.onQuerySubmit = callback;
}

/**
 * Get current chat input value
 * @returns {string} Current input value
 */
function getChatInputValue() {
  return ChatInputState.value;
}

/**
 * Set chat input value programmatically
 * @param {string} value - Value to set
 */
function setChatInputValue(value) {
  ChatInputState.value = value;
  if (elements.chatField) {
    elements.chatField.value = value;
  }
}

/**
 * Handle input change (internal implementation)
 * @param {Event} event - Input event
 */
function handleInputChangeInternal(event) {
  ChatInputState.value = event.target.value;
  AppState.chat.query = event.target.value;
  AppState.chat.isTyping = true;
  
  // Filter suggestions based on input
  const filtered = filterSuggestions(ChatInputState.value);
  ChatInputState.filteredSuggestions = filtered;
  
  // Update autocomplete UI
  if (filtered.length > 0) {
    renderSuggestions(filtered);
    openAutocomplete();
  } else {
    closeAutocomplete();
  }
  
  // Emit custom event for autocomplete system
  const customEvent = new CustomEvent('chatInputChange', {
    detail: { value: ChatInputState.value }
  });
  document.dispatchEvent(customEvent);
}

/**
 * Debounced input change handler for performance
 * Debounces filtering to avoid excessive computation during fast typing
 */
const debouncedFilterSuggestions = debounce((value) => {
  const filtered = filterSuggestions(value);
  ChatInputState.filteredSuggestions = filtered;
  
  if (filtered.length > 0) {
    renderSuggestions(filtered);
    openAutocomplete();
  } else {
    closeAutocomplete();
  }
}, 100);

/**
 * Handle input change with optimized debouncing
 * @param {Event} event - Input event
 */
function handleInputChange(event) {
  ChatInputState.value = event.target.value;
  AppState.chat.query = event.target.value;
  AppState.chat.isTyping = true;
  
  // Use debounced filtering for performance
  debouncedFilterSuggestions(ChatInputState.value);
  
  // Emit custom event for autocomplete system
  const customEvent = new CustomEvent('chatInputChange', {
    detail: { value: ChatInputState.value }
  });
  document.dispatchEvent(customEvent);
}

/**
 * Handle key down events
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyDown(event) {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      if (ChatInputState.isOpen && ChatInputState.selectedIndex >= 0) {
        // Select highlighted suggestion
        selectSuggestion(ChatInputState.selectedIndex);
      } else {
        // Submit query
        submitQuery();
      }
      break;
      
    case 'Escape':
      event.preventDefault();
      closeAutocomplete();
      break;
      
    case 'ArrowDown':
      event.preventDefault();
      navigateSuggestions(1);
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      navigateSuggestions(-1);
      break;
  }
}

/**
 * Navigate through suggestions
 * @param {number} direction - 1 for down, -1 for up
 */
function navigateSuggestions(direction) {
  if (!ChatInputState.isOpen || ChatInputState.filteredSuggestions.length === 0) {
    return;
  }
  
  const maxIndex = ChatInputState.filteredSuggestions.length - 1;
  let newIndex = ChatInputState.selectedIndex + direction;
  
  if (newIndex < 0) {
    newIndex = maxIndex;
  } else if (newIndex > maxIndex) {
    newIndex = 0;
  }
  
  ChatInputState.selectedIndex = newIndex;
  updateSuggestionHighlight();
}

/**
 * Update visual highlight on suggestions
 */
function updateSuggestionHighlight() {
  if (!elements.autocompleteList) return;
  
  const items = elements.autocompleteList.querySelectorAll('.autocomplete__item');
  items.forEach((item, index) => {
    if (index === ChatInputState.selectedIndex) {
      item.classList.add('autocomplete__item--active');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('autocomplete__item--active');
    }
  });
}

/**
 * Render suggestions in the autocomplete dropdown
 * Requirements: 1.2
 * @param {Array} suggestions - Array of suggestion objects to render
 */
function renderSuggestions(suggestions) {
  if (!elements.autocompleteList) return;
  
  // Clear existing suggestions
  elements.autocompleteList.innerHTML = '';
  
  // Create suggestion items
  suggestions.forEach((suggestion, index) => {
    const item = document.createElement('li');
    item.className = 'autocomplete__item';
    item.setAttribute('role', 'option');
    item.setAttribute('data-index', index);
    
    // Add category icon based on category
    const iconSvg = getCategoryIcon(suggestion.category);
    
    item.innerHTML = `
      <span class="autocomplete__item-icon" aria-hidden="true">${iconSvg}</span>
      <span class="autocomplete__item-text">${suggestion.text}</span>
    `;
    
    // Click handler for selection
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectSuggestion(index);
    });
    
    // Hover handler for highlighting
    item.addEventListener('mouseenter', () => {
      ChatInputState.selectedIndex = index;
      updateSuggestionHighlight();
    });
    
    elements.autocompleteList.appendChild(item);
  });
}

/**
 * Get SVG icon for category
 * @param {string} category - Category name
 * @returns {string} SVG icon markup
 */
function getCategoryIcon(category) {
  const icons = {
    advertising: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    development: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    analytics: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    branding: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
  };
  return icons[category] || icons.advertising;
}

/**
 * Select a suggestion by index
 * @param {number} index - Suggestion index
 */
function selectSuggestion(index) {
  // Save suggestions before any state changes
  const suggestions = [...ChatInputState.filteredSuggestions];
  
  if (index >= 0 && index < suggestions.length) {
    const suggestion = suggestions[index];
    const text = typeof suggestion === 'string' ? suggestion : suggestion.text;
    setChatInputValue(text);
    closeAutocomplete();
    elements.chatField?.focus();
  }
}

/**
 * Open autocomplete dropdown
 */
function openAutocomplete() {
  ChatInputState.isOpen = true;
  ChatInputState.selectedIndex = -1;
  if (elements.autocomplete) {
    elements.autocomplete.hidden = false;
  }
}

/**
 * Close autocomplete dropdown
 */
function closeAutocomplete() {
  ChatInputState.isOpen = false;
  ChatInputState.selectedIndex = -1;
  if (elements.autocomplete) {
    elements.autocomplete.hidden = true;
  }
}

/**
 * Submit the current query
 */
function submitQuery() {
  // Sync value from DOM in case it was changed externally (e.g., by browser autofill)
  if (elements.chatField) {
    ChatInputState.value = elements.chatField.value;
  }
  
  const query = ChatInputState.value.trim();
  
  if (!query) {
    // Don't submit empty queries
    return;
  }
  
  AppState.chat.query = query;
  AppState.chat.isTyping = false;
  
  // Close autocomplete
  closeAutocomplete();
  
  // Call registered callback if exists
  if (typeof callbacks.onQuerySubmit === 'function') {
    callbacks.onQuerySubmit(query);
  }
  
  // Emit custom event for proposal generator
  const customEvent = new CustomEvent('querySubmit', {
    detail: { query }
  });
  document.dispatchEvent(customEvent);
  
  // Start proposal generation (will be implemented in task 5)
  startProposalGeneration(query);
}

/**
 * Proposal generation steps configuration
 * Requirements: 2.1
 */
const PROPOSAL_STEPS = [
  { id: 'analyze', text: 'Анализируем ваш запрос', duration: 2000 },
  { id: 'select', text: 'Подбираем оптимальное решение', duration: 3000 },
  { id: 'calculate', text: 'Рассчитываем стоимость', duration: 2000 }
];

/**
 * Current proposal state
 */
let currentProposal = {
  query: '',
  steps: [],
  result: null
};

/**
 * Render proposal steps in the DOM
 * Requirements: 2.1
 */
function renderProposalSteps() {
  const stepsContainer = document.getElementById('proposal-steps');
  if (!stepsContainer) return;
  
  stepsContainer.innerHTML = '';
  
  currentProposal.steps.forEach((step, index) => {
    const stepEl = document.createElement('div');
    stepEl.className = `proposal-step proposal-step--${step.status}`;
    stepEl.id = `step-${step.id}`;
    
    let iconSvg;
    if (step.status === 'complete') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (step.status === 'active') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-pulse"><circle cx="12" cy="12" r="3"></circle></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>';
    }
    
    stepEl.innerHTML = `
      <span class="proposal-step__icon">${iconSvg}</span>
      <span class="proposal-step__text">${step.text}${step.status === 'active' ? '...' : ''}</span>
    `;
    
    stepsContainer.appendChild(stepEl);
  });
}

/**
 * Type text animation effect
 * Requirements: 2.1
 * @param {HTMLElement} element - Element to animate
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in ms
 * @returns {Promise} Resolves when animation completes
 */
function typeText(element, text, speed = 50) {
  return new Promise(resolve => {
    let index = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

/**
 * Process a single proposal step
 * Requirements: 2.1
 * @param {number} stepIndex - Index of the step to process
 * @returns {Promise} Resolves when step completes
 */
function processProposalStep(stepIndex) {
  return new Promise(resolve => {
    if (stepIndex >= currentProposal.steps.length) {
      resolve();
      return;
    }
    
    // Mark current step as active
    currentProposal.steps[stepIndex].status = 'active';
    renderProposalSteps();
    
    // Wait for step duration
    setTimeout(() => {
      // Mark step as complete
      currentProposal.steps[stepIndex].status = 'complete';
      renderProposalSteps();
      resolve();
    }, currentProposal.steps[stepIndex].duration);
  });
}

/**
 * Run all proposal generation steps sequentially
 * Requirements: 2.1
 * @returns {Promise} Resolves when all steps complete
 */
async function runProposalSteps() {
  for (let i = 0; i < currentProposal.steps.length; i++) {
    await processProposalStep(i);
  }
}

/**
 * Start proposal generation
 * Requirements: 2.1, 2.3
 * @param {string} query - User query
 */
async function startProposalGeneration(query) {
  if (!query || query.trim() === '') return;
  
  AppState.proposal.isGenerating = true;
  AppState.proposal.currentStep = 0;
  
  // Initialize proposal
  currentProposal = {
    query: query,
    steps: PROPOSAL_STEPS.map(step => ({
      ...step,
      status: 'pending'
    })),
    result: null
  };
  
  // Show proposal section
  const proposalSection = document.getElementById('proposal');
  const proposalResult = document.getElementById('proposal-result');
  
  if (proposalSection) {
    proposalSection.hidden = false;
    proposalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  if (proposalResult) {
    proposalResult.hidden = true;
  }
  
  // Render initial steps
  renderProposalSteps();
  
  // Run steps sequentially
  await runProposalSteps();
  
  // Generate result
  const service = findServiceForQuery(query);
  currentProposal.result = {
    price: service.basePrice,
    duration: service.baseDuration,
    includes: service.includes,
    serviceName: service.name
  };
  
  AppState.proposal.result = currentProposal.result;
  AppState.proposal.isGenerating = false;
  
  // Show result
  renderProposalResult();
  
  // Emit event for checkout
  const customEvent = new CustomEvent('proposalComplete', {
    detail: { proposal: currentProposal }
  });
  document.dispatchEvent(customEvent);
}

/**
 * Get current proposal result (for testing)
 * @returns {Object|null} Current proposal result
 */
function getProposalResult() {
  return currentProposal.result;
}

/**
 * Format price with Russian locale
 * @param {number} price - Price in rubles
 * @returns {string} Formatted price string
 */
function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

/**
 * Render proposal result in the DOM
 * Requirements: 2.3
 */
function renderProposalResult() {
  const resultContainer = document.getElementById('proposal-result');
  if (!resultContainer || !currentProposal.result) return;
  
  const { price, duration, includes, serviceName } = currentProposal.result;
  
  // Build includes list HTML
  const includesHtml = includes.map(item => 
    `<li class="proposal__includes-item">${item}</li>`
  ).join('');
  
  resultContainer.innerHTML = `
    <div class="proposal__service-name">${serviceName}</div>
    <div class="proposal__price">${formatPrice(price)}</div>
    <div class="proposal__duration">Срок: ${duration}</div>
    <div class="proposal__includes">
      <div class="proposal__includes-title">Что включено:</div>
      <ul class="proposal__includes-list">
        ${includesHtml}
      </ul>
    </div>
    <button class="btn btn--primary btn--large btn--full" id="checkout-btn">
      Мы уже знаем что вам нужно — Оплатить
    </button>
  `;
  
  resultContainer.hidden = false;
  resultContainer.classList.add('animate-fade-in');
  
  // Add checkout button handler
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckoutClick);
  }
}

/**
 * Checkout State Management
 * Requirements: 4.1, 4.2, 4.4
 */
const CheckoutState = {
  step: 'review', // 'review' | 'payment' | 'success'
  paymentMethod: null, // 'card' | 'invoice'
  proposal: null,
  isProcessing: false
};

/**
 * Get current checkout state (for testing)
 * @returns {Object} Current checkout state
 */
function getCheckoutState() {
  return { ...CheckoutState };
}

/**
 * Reset checkout state
 */
function resetCheckoutState() {
  CheckoutState.step = 'review';
  CheckoutState.paymentMethod = null;
  CheckoutState.proposal = null;
  CheckoutState.isProcessing = false;
}

/**
 * Transition checkout state
 * Requirements: 4.1, 4.2, 4.4
 * @param {string} newStep - New step to transition to
 * @returns {boolean} Whether transition was successful
 */
function transitionCheckoutState(newStep) {
  const validTransitions = {
    'review': ['payment'],
    'payment': ['success', 'review'],
    'success': ['review']
  };
  
  const currentStep = CheckoutState.step;
  const allowedNextSteps = validTransitions[currentStep] || [];
  
  if (allowedNextSteps.includes(newStep)) {
    CheckoutState.step = newStep;
    return true;
  }
  
  return false;
}

/**
 * Open checkout modal
 * Requirements: 4.1
 * @param {Object} proposal - Proposal data
 */
function openCheckoutModal(proposal) {
  CheckoutState.proposal = proposal;
  CheckoutState.step = 'review';
  AppState.checkout.isOpen = true;
  
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.hidden = false;
    renderCheckoutContent();
  }
}

/**
 * Close checkout modal
 */
function closeCheckoutModal() {
  AppState.checkout.isOpen = false;
  resetCheckoutState();
  
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.hidden = true;
  }
}

/**
 * Render checkout content based on current step
 * Requirements: 4.2, 4.3, 4.4
 */
function renderCheckoutContent() {
  const content = document.getElementById('modal-content');
  if (!content) return;
  
  switch (CheckoutState.step) {
    case 'review':
      renderCheckoutReview(content);
      break;
    case 'payment':
      renderCheckoutPayment(content);
      break;
    case 'success':
      renderCheckoutSuccess(content);
      break;
  }
}

/**
 * Render checkout review step
 * @param {HTMLElement} container - Container element
 */
function renderCheckoutReview(container) {
  const proposal = CheckoutState.proposal;
  if (!proposal || !proposal.result) return;
  
  const { price, duration, serviceName, includes } = proposal.result;
  
  const includesHtml = includes.map(item => 
    `<li class="checkout__includes-item">${item}</li>`
  ).join('');
  
  container.innerHTML = `
    <div class="checkout">
      <button class="checkout__close" id="checkout-close" aria-label="Закрыть">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <h2 class="checkout__title">Ваш заказ</h2>
      
      <div class="checkout__summary">
        <div class="checkout__service">${serviceName}</div>
        <div class="checkout__price">${formatPrice(price)}</div>
        <div class="checkout__duration">Срок выполнения: ${duration}</div>
        
        <div class="checkout__includes">
          <div class="checkout__includes-title">Что включено:</div>
          <ul class="checkout__includes-list">
            ${includesHtml}
          </ul>
        </div>
      </div>
      
      <button class="btn btn--primary btn--large btn--full" id="proceed-to-payment">
        Перейти к оплате
      </button>
    </div>
  `;
  
  // Add event listeners
  document.getElementById('checkout-close')?.addEventListener('click', closeCheckoutModal);
  document.getElementById('proceed-to-payment')?.addEventListener('click', handleProceedToPayment);
}

/**
 * Render checkout payment step
 * Requirements: 4.2, 4.3
 * @param {HTMLElement} container - Container element
 */
function renderCheckoutPayment(container) {
  const proposal = CheckoutState.proposal;
  if (!proposal || !proposal.result) return;
  
  const { price } = proposal.result;
  
  container.innerHTML = `
    <div class="checkout">
      <button class="checkout__close" id="checkout-close" aria-label="Закрыть">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <button class="checkout__back" id="checkout-back" aria-label="Назад">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Назад
      </button>
      
      <h2 class="checkout__title">Способ оплаты</h2>
      
      <div class="checkout__amount">
        <span class="checkout__amount-label">К оплате:</span>
        <span class="checkout__amount-value">${formatPrice(price)}</span>
      </div>
      
      <div class="checkout__methods">
        <label class="checkout__method">
          <input type="radio" name="payment-method" value="card" class="checkout__method-input">
          <span class="checkout__method-content">
            <span class="checkout__method-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </span>
            <span class="checkout__method-text">
              <span class="checkout__method-title">Банковская карта</span>
              <span class="checkout__method-desc">Visa, Mastercard, МИР</span>
            </span>
          </span>
        </label>
        
        <label class="checkout__method">
          <input type="radio" name="payment-method" value="invoice" class="checkout__method-input">
          <span class="checkout__method-content">
            <span class="checkout__method-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <span class="checkout__method-text">
              <span class="checkout__method-title">Счёт для юр. лиц</span>
              <span class="checkout__method-desc">Безналичный расчёт</span>
            </span>
          </span>
        </label>
      </div>
      
      <button class="btn btn--primary btn--large btn--full" id="complete-payment" disabled>
        Оплатить ${formatPrice(price)}
      </button>
    </div>
  `;
  
  // Add event listeners
  document.getElementById('checkout-close')?.addEventListener('click', closeCheckoutModal);
  document.getElementById('checkout-back')?.addEventListener('click', handleBackToReview);
  document.getElementById('complete-payment')?.addEventListener('click', handleCompletePayment);
  
  // Payment method selection
  const methodInputs = container.querySelectorAll('input[name="payment-method"]');
  methodInputs.forEach(input => {
    input.addEventListener('change', handlePaymentMethodChange);
  });
}

/**
 * Render checkout success step
 * Requirements: 4.4
 * @param {HTMLElement} container - Container element
 */
function renderCheckoutSuccess(container) {
  const proposal = CheckoutState.proposal;
  if (!proposal || !proposal.result) return;
  
  const { serviceName } = proposal.result;
  
  container.innerHTML = `
    <div class="checkout checkout--success">
      <div class="checkout__success-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      
      <h2 class="checkout__title">Оплата прошла успешно!</h2>
      
      <p class="checkout__success-message">
        Спасибо за заказ! Мы уже начали работу над вашим проектом.
      </p>
      
      <div class="checkout__success-details">
        <div class="checkout__success-service">${serviceName}</div>
      </div>
      
      <div class="checkout__next-steps">
        <h3 class="checkout__next-steps-title">Что дальше:</h3>
        <ol class="checkout__next-steps-list">
          <li>В течение 30 минут с вами свяжется менеджер</li>
          <li>Обсудим детали и уточним требования</li>
          <li>Приступим к работе в течение 48 часов</li>
        </ol>
      </div>
      
      <button class="btn btn--primary btn--large btn--full" id="checkout-done">
        Отлично!
      </button>
    </div>
  `;
  
  // Add event listener
  document.getElementById('checkout-done')?.addEventListener('click', handleCheckoutDone);
}

/**
 * Handle proceed to payment button click
 */
function handleProceedToPayment() {
  if (transitionCheckoutState('payment')) {
    renderCheckoutContent();
  }
}

/**
 * Handle back to review button click
 */
function handleBackToReview() {
  if (transitionCheckoutState('review')) {
    renderCheckoutContent();
  }
}

/**
 * Handle payment method change
 * @param {Event} event - Change event
 */
function handlePaymentMethodChange(event) {
  CheckoutState.paymentMethod = event.target.value;
  
  const payButton = document.getElementById('complete-payment');
  if (payButton) {
    payButton.disabled = false;
  }
}

/**
 * Handle complete payment button click
 * Requirements: 4.4
 */
function handleCompletePayment() {
  if (!CheckoutState.paymentMethod) return;
  
  CheckoutState.isProcessing = true;
  AppState.checkout.status = 'processing';
  
  const payButton = document.getElementById('complete-payment');
  if (payButton) {
    payButton.disabled = true;
    payButton.textContent = 'Обработка...';
  }
  
  // Simulate payment processing
  setTimeout(() => {
    CheckoutState.isProcessing = false;
    AppState.checkout.status = 'success';
    
    if (transitionCheckoutState('success')) {
      renderCheckoutContent();
      
      // Emit success event
      const customEvent = new CustomEvent('paymentSuccess', {
        detail: { 
          proposal: CheckoutState.proposal,
          paymentMethod: CheckoutState.paymentMethod
        }
      });
      document.dispatchEvent(customEvent);
    }
  }, 1500);
}

/**
 * Handle checkout done button click
 */
function handleCheckoutDone() {
  closeCheckoutModal();
  
  // Reset the page state for new order
  const proposalSection = document.getElementById('proposal');
  const proposalResult = document.getElementById('proposal-result');
  
  if (proposalSection) {
    proposalSection.hidden = true;
  }
  if (proposalResult) {
    proposalResult.hidden = true;
  }
  
  // Clear chat input
  setChatInputValue('');
  elements.chatField?.focus();
}

/**
 * Handle checkout button click
 * Requirements: 4.1
 * @param {Event} event - Click event
 */
function handleCheckoutClick(event) {
  event.preventDefault();
  
  // Open checkout modal with current proposal
  openCheckoutModal(currentProposal);
  
  // Emit event for checkout
  const customEvent = new CustomEvent('checkoutStart', {
    detail: { proposal: currentProposal }
  });
  document.dispatchEvent(customEvent);
}

/**
 * Metrics Dashboard Configuration
 * Requirements: 3.1
 */
const METRICS_DATA = [
  {
    id: 'projects',
    value: '150+',
    label: 'проектов',
    icon: 'briefcase'
  },
  {
    id: 'roi',
    value: '3.2x',
    label: 'средний ROI',
    icon: 'trending-up'
  },
  {
    id: 'start-time',
    value: '48ч',
    label: 'до старта',
    icon: 'clock'
  },
  {
    id: 'return-rate',
    value: '98%',
    label: 'возвращаются',
    icon: 'users'
  }
];

/**
 * Get SVG icon for metric
 * @param {string} iconName - Icon name
 * @returns {string} SVG icon markup
 */
function getMetricIcon(iconName) {
  const icons = {
    'briefcase': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    'trending-up': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
    'clock': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    'users': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
  };
  return icons[iconName] || '';
}

/**
 * Get all metrics data
 * @returns {Array} Array of metric objects
 */
function getMetricsData() {
  return METRICS_DATA;
}

/**
 * Create a single metric card element
 * Requirements: 3.1
 * @param {Object} metric - Metric data object
 * @param {number} index - Index for animation delay
 * @returns {HTMLElement} Metric card element
 */
function createMetricCard(metric, index) {
  const card = document.createElement('div');
  card.className = 'metric-card';
  card.setAttribute('data-metric-id', metric.id);
  card.style.animationDelay = `${index * 100}ms`;
  
  const iconHtml = metric.icon ? `<span class="metric-card__icon">${getMetricIcon(metric.icon)}</span>` : '';
  
  card.innerHTML = `
    ${iconHtml}
    <span class="metric-card__value">${metric.value}</span>
    <span class="metric-card__label">${metric.label}</span>
  `;
  
  return card;
}

/**
 * Render all metrics in the dashboard
 * Requirements: 3.1
 * @param {HTMLElement} container - Container element for metrics
 * @param {Array} metrics - Array of metric data objects
 */
function renderMetrics(container, metrics = METRICS_DATA) {
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create and append metric cards
  metrics.forEach((metric, index) => {
    const card = createMetricCard(metric, index);
    container.appendChild(card);
  });
}

/**
 * Initialize Metrics Dashboard
 * Requirements: 3.1, 3.2
 */
function initMetricsDashboard() {
  const metricsGrid = document.querySelector('.metrics__grid');
  if (metricsGrid) {
    // Render metrics cards dynamically
    renderMetrics(metricsGrid, METRICS_DATA);
    
    // Trigger appearance animation on page load
    // Small delay to ensure DOM is ready and CSS transitions work
    requestAnimationFrame(() => {
      animateMetricsOnLoad(metricsGrid);
    });
  }
}

/**
 * Animate metrics cards on page load
 * Requirements: 3.2
 * @param {HTMLElement} container - Metrics grid container
 */
function animateMetricsOnLoad(container) {
  if (!container) return;
  
  const cards = container.querySelectorAll('.metric-card');
  
  // Check if metrics section is already visible on page load
  const isVisibleOnLoad = isElementInViewport(container);
  
  if (isVisibleOnLoad) {
    // Animate immediately with staggered delay
    triggerMetricsAnimation(cards);
  } else {
    // Use Intersection Observer for scroll-based animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerMetricsAnimation(cards);
          // Stop observing after animation triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });
    
    observer.observe(container);
  }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is visible in viewport
 */
function isElementInViewport(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}

/**
 * Trigger staggered animation for metric cards
 * Requirements: 3.2
 * @param {NodeList} cards - Collection of metric card elements
 */
function triggerMetricsAnimation(cards) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('metric-card--visible');
    }, index * 150); // 150ms stagger for smoother effect
  });
}

/**
 * Handle submit button click
 * @param {Event} event - Click event
 */
function handleSubmitClick(event) {
  event.preventDefault();
  submitQuery();
}

/**
 * Handle click outside autocomplete to close it
 * @param {Event} event - Click event
 */
function handleDocumentClick(event) {
  // Don't close if clicking on autocomplete item (let the item's click handler work)
  if (event.target.closest('.autocomplete__item')) {
    return;
  }
  
  if (!elements.chatInput?.contains(event.target)) {
    closeAutocomplete();
  }
}

/**
 * Initialize Chat Input component
 */
function initChatInput() {
  elements.chatField = document.getElementById('chat-field');
  elements.chatSubmit = document.getElementById('chat-submit');
  elements.chatInput = document.getElementById('chat-input');
  elements.autocomplete = document.getElementById('autocomplete');
  elements.autocompleteList = document.getElementById('autocomplete-list');
  
  if (elements.chatField) {
    // Focus on load
    elements.chatField.focus();
    
    // Event listeners
    elements.chatField.addEventListener('input', handleInputChange);
    elements.chatField.addEventListener('keydown', handleKeyDown);
    elements.chatField.addEventListener('focus', () => {
      if (ChatInputState.filteredSuggestions.length > 0) {
        openAutocomplete();
      }
    });
  }
  
  if (elements.chatSubmit) {
    elements.chatSubmit.addEventListener('click', handleSubmitClick);
  }
  
  // Event delegation for autocomplete items (handles dynamically created items)
  if (elements.autocompleteList) {
    elements.autocompleteList.addEventListener('click', (event) => {
      const item = event.target.closest('.autocomplete__item');
      if (item) {
        event.preventDefault();
        event.stopPropagation();
        const index = parseInt(item.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          selectSuggestion(index);
        }
      }
    });
  }
  
  // Close autocomplete on outside click
  document.addEventListener('click', handleDocumentClick);
}

/**
 * Initialize Checkout Modal
 * Requirements: 4.1, 4.2
 */
function initCheckoutModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeCheckoutModal);
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && AppState.checkout.isOpen) {
      closeCheckoutModal();
    }
  });
  
  // Event delegation for dynamically created buttons
  document.addEventListener('click', (event) => {
    const target = event.target;
    
    // Handle checkout button click (from proposal result)
    if (target.id === 'checkout-btn' || target.closest('#checkout-btn')) {
      event.preventDefault();
      openCheckoutModal(currentProposal);
    }
    
    // Handle proceed to payment button
    if (target.id === 'proceed-to-payment' || target.closest('#proceed-to-payment')) {
      event.preventDefault();
      handleProceedToPayment();
    }
    
    // Handle complete payment button
    if (target.id === 'complete-payment' || target.closest('#complete-payment')) {
      event.preventDefault();
      handleCompletePayment();
    }
    
    // Handle checkout close button
    if (target.id === 'checkout-close' || target.closest('#checkout-close')) {
      event.preventDefault();
      closeCheckoutModal();
    }
    
    // Handle back to review button
    if (target.id === 'checkout-back' || target.closest('#checkout-back')) {
      event.preventDefault();
      handleBackToReview();
    }
  });
}

/**
 * LIDAR Module - BEAST MODE
 * iPhone Pro style scanner with intense effects
 */

const LidarState = {
  isActive: false,
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2,
  targetX: 0,
  targetY: 0,
  currentRotateX: 0,
  currentRotateY: 0,
  beamAngle: 0,
  animationFrame: null
};

/**
 * Initialize LIDAR module with all effects
 */
function initLidarModule() {
  const lidarModule = document.getElementById('lidar-module');
  const lidarBody = lidarModule?.querySelector('.lidar-module__body');
  const lidarPupil = document.getElementById('lidar-pupil');
  const beamGroup = document.getElementById('beam-group');
  const particlesContainer = document.getElementById('lidar-particles');
  const flash1 = document.getElementById('lidar-flash-1');
  const flash2 = document.getElementById('lidar-flash-2');
  
  if (!lidarModule || !lidarBody) return;
  
  // Generate beam lines
  function generateBeams() {
    if (!beamGroup) return;
    beamGroup.innerHTML = '';
    
    const numBeams = 12;
    const centerX = 200;
    const centerY = 200;
    
    for (let i = 0; i < numBeams; i++) {
      const angle = (i / numBeams) * Math.PI * 2 + LidarState.beamAngle;
      const length = 150 + Math.sin(Date.now() / 200 + i) * 30;
      const endX = centerX + Math.cos(angle) * length;
      const endY = centerY + Math.sin(angle) * length;
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', centerX);
      line.setAttribute('y1', centerY);
      line.setAttribute('x2', endX);
      line.setAttribute('y2', endY);
      line.setAttribute('stroke', 'url(#beamGradient)');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-linecap', 'round');
      line.style.opacity = 0.6 + Math.sin(Date.now() / 100 + i * 0.5) * 0.4;
      
      beamGroup.appendChild(line);
      
      // Add dot at end
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', endX);
      circle.setAttribute('cy', endY);
      circle.setAttribute('r', '3');
      circle.setAttribute('fill', '#3b82f6');
      circle.style.opacity = line.style.opacity;
      beamGroup.appendChild(circle);
    }
  }
  
  // Spawn particle
  function spawnParticle(x, y, angle) {
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'lidar-particle';
    
    const distance = 50 + Math.random() * 100;
    const spread = (Math.random() - 0.5) * 0.5;
    const tx = Math.cos(angle + spread) * distance;
    const ty = Math.sin(angle + spread) * distance;
    
    particle.style.left = `${x + 100}px`;
    particle.style.top = `${y + 100}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    
    particlesContainer.appendChild(particle);
    
    requestAnimationFrame(() => {
      particle.classList.add('lidar-particle--active');
    });
    
    setTimeout(() => particle.remove(), 1000);
  }
  
  // Strobe flash
  function triggerStrobe(intense = false) {
    [flash1, flash2].forEach((flash, i) => {
      if (!flash) return;
      setTimeout(() => {
        flash.classList.add('lidar-flash--active');
        setTimeout(() => flash.classList.remove('lidar-flash--active'), 50);
      }, intense ? i * 30 : i * 50);
    });
    
    if (intense) {
      // Spawn particles on intense flash
      const rect = lidarModule.getBoundingClientRect();
      const angle = Math.atan2(
        LidarState.mouseY - (rect.top + rect.height / 2),
        LidarState.mouseX - (rect.left + rect.width / 2)
      );
      for (let i = 0; i < 8; i++) {
        setTimeout(() => spawnParticle(36, 36, angle), i * 20);
      }
    }
  }
  
  // Animation loop
  function animate() {
    const rect = lidarModule.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate target rotation
    const deltaX = LidarState.mouseX - centerX;
    const deltaY = LidarState.mouseY - centerY;
    
    const maxRotation = 20;
    LidarState.targetX = Math.max(-maxRotation, Math.min(maxRotation, -deltaY / 20));
    LidarState.targetY = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 20));
    
    // Smooth interpolation
    LidarState.currentRotateX += (LidarState.targetX - LidarState.currentRotateX) * 0.15;
    LidarState.currentRotateY += (LidarState.targetY - LidarState.currentRotateY) * 0.15;
    
    // Apply 3D transform
    lidarBody.style.transform = `
      perspective(500px)
      rotateX(${LidarState.currentRotateX}deg) 
      rotateY(${LidarState.currentRotateY}deg)
    `;
    
    // Move pupil to track cursor
    if (lidarPupil) {
      const pupilOffsetX = Math.max(-4, Math.min(4, deltaX / 50));
      const pupilOffsetY = Math.max(-4, Math.min(4, deltaY / 50));
      lidarPupil.style.transform = `translate(calc(-50% + ${pupilOffsetX}px), calc(-50% + ${pupilOffsetY}px))`;
    }
    
    // Rotate beams toward cursor
    if (LidarState.isActive) {
      LidarState.beamAngle = Math.atan2(deltaY, deltaX);
      generateBeams();
    }
    
    LidarState.animationFrame = requestAnimationFrame(animate);
  }
  
  // Start animation loop
  animate();
  
  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    LidarState.mouseX = e.clientX;
    LidarState.mouseY = e.clientY;
  });
  
  // Hover effects
  lidarModule.addEventListener('mouseenter', () => {
    LidarState.isActive = true;
    triggerStrobe(true);
  });
  
  lidarModule.addEventListener('mouseleave', () => {
    LidarState.isActive = false;
  });
  
  // Click - intense burst
  lidarModule.addEventListener('click', (e) => {
    e.preventDefault();
    triggerStrobe(true);
    setTimeout(() => triggerStrobe(true), 100);
    setTimeout(() => triggerStrobe(true), 200);
  });
  
  // Random ambient strobes
  function randomStrobe() {
    if (!LidarState.isActive && Math.random() > 0.7) {
      triggerStrobe(false);
    }
    setTimeout(randomStrobe, 2000 + Math.random() * 4000);
  }
  randomStrobe();
}

/**
 * HERO LIDAR - Main showcase element in center
 */
const HeroLidarState = {
  isActive: false,
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2,
  currentRotateX: 0,
  currentRotateY: 0,
  beamAngle: 0
};

function initHeroLidar() {
  const heroLidar = document.getElementById('hero-lidar');
  const heroBody = heroLidar?.querySelector('.hero-lidar__body');
  const heroPupil = document.getElementById('hero-lidar-pupil');
  const heroBeamGroup = document.getElementById('hero-beam-group');
  const heroParticles = document.getElementById('hero-lidar-particles');
  const heroFlash1 = document.getElementById('hero-flash-1');
  const heroFlash2 = document.getElementById('hero-flash-2');
  
  if (!heroLidar || !heroBody) return;
  
  // Generate beams
  function generateBeams() {
    if (!heroBeamGroup) return;
    heroBeamGroup.innerHTML = '';
    
    const numBeams = 16;
    const centerX = 300;
    const centerY = 300;
    
    for (let i = 0; i < numBeams; i++) {
      const angle = (i / numBeams) * Math.PI * 2 + HeroLidarState.beamAngle;
      const length = 200 + Math.sin(Date.now() / 200 + i) * 50;
      const endX = centerX + Math.cos(angle) * length;
      const endY = centerY + Math.sin(angle) * length;
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', centerX);
      line.setAttribute('y1', centerY);
      line.setAttribute('x2', endX);
      line.setAttribute('y2', endY);
      line.setAttribute('stroke', 'url(#heroBeamGradient)');
      line.setAttribute('stroke-width', '3');
      line.setAttribute('stroke-linecap', 'round');
      line.style.opacity = 0.5 + Math.sin(Date.now() / 100 + i * 0.5) * 0.5;
      
      heroBeamGroup.appendChild(line);
      
      // Dot at end
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', endX);
      circle.setAttribute('cy', endY);
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#3b82f6');
      circle.style.opacity = line.style.opacity;
      heroBeamGroup.appendChild(circle);
    }
  }
  
  // Spawn particle
  function spawnParticle(x, y, angle) {
    if (!heroParticles) return;
    
    const particle = document.createElement('div');
    particle.className = 'hero-lidar-particle';
    
    const distance = 80 + Math.random() * 150;
    const spread = (Math.random() - 0.5) * 0.6;
    const tx = Math.cos(angle + spread) * distance;
    const ty = Math.sin(angle + spread) * distance;
    
    particle.style.left = `${x + 150}px`;
    particle.style.top = `${y + 150}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.setProperty('--duration', `${0.8 + Math.random() * 0.4}s`);
    
    heroParticles.appendChild(particle);
    
    requestAnimationFrame(() => {
      particle.classList.add('hero-lidar-particle--active');
    });
    
    setTimeout(() => particle.remove(), 1200);
  }
  
  // Strobe
  function triggerStrobe(intense = false) {
    [heroFlash1, heroFlash2].forEach((flash, i) => {
      if (!flash) return;
      setTimeout(() => {
        flash.classList.add('hero-lidar__flash--active');
        setTimeout(() => flash.classList.remove('hero-lidar__flash--active'), 60);
      }, intense ? i * 40 : i * 60);
    });
    
    if (intense && heroParticles) {
      const rect = heroLidar.getBoundingClientRect();
      const angle = Math.atan2(
        HeroLidarState.mouseY - (rect.top + rect.height / 2),
        HeroLidarState.mouseX - (rect.left + rect.width / 2)
      );
      for (let i = 0; i < 12; i++) {
        setTimeout(() => spawnParticle(100, 100, angle + (Math.random() - 0.5)), i * 25);
      }
    }
  }
  
  // Animation loop
  function animate() {
    const rect = heroLidar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = HeroLidarState.mouseX - centerX;
    const deltaY = HeroLidarState.mouseY - centerY;
    
    const maxRotation = 15;
    const targetX = Math.max(-maxRotation, Math.min(maxRotation, -deltaY / 30));
    const targetY = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 30));
    
    HeroLidarState.currentRotateX += (targetX - HeroLidarState.currentRotateX) * 0.1;
    HeroLidarState.currentRotateY += (targetY - HeroLidarState.currentRotateY) * 0.1;
    
    heroBody.style.transform = `
      perspective(800px)
      rotateX(${HeroLidarState.currentRotateX}deg) 
      rotateY(${HeroLidarState.currentRotateY}deg)
    `;
    
    // Pupil tracking
    if (heroPupil) {
      const pupilOffsetX = Math.max(-8, Math.min(8, deltaX / 40));
      const pupilOffsetY = Math.max(-8, Math.min(8, deltaY / 40));
      heroPupil.style.transform = `translate(calc(-50% + ${pupilOffsetX}px), calc(-50% + ${pupilOffsetY}px))`;
    }
    
    // Beams
    if (HeroLidarState.isActive) {
      HeroLidarState.beamAngle = Math.atan2(deltaY, deltaX);
      generateBeams();
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    HeroLidarState.mouseX = e.clientX;
    HeroLidarState.mouseY = e.clientY;
  });
  
  // Hover
  heroLidar.addEventListener('mouseenter', () => {
    HeroLidarState.isActive = true;
    triggerStrobe(true);
  });
  
  heroLidar.addEventListener('mouseleave', () => {
    HeroLidarState.isActive = false;
  });
  
  // Click
  heroLidar.addEventListener('click', (e) => {
    e.preventDefault();
    triggerStrobe(true);
    setTimeout(() => triggerStrobe(true), 120);
    setTimeout(() => triggerStrobe(true), 240);
  });
  
  // Random strobes
  function randomStrobe() {
    if (!HeroLidarState.isActive && Math.random() > 0.6) {
      triggerStrobe(false);
    }
    setTimeout(randomStrobe, 3000 + Math.random() * 5000);
  }
  randomStrobe();
}

/**
 * LASER SHOW - iMessage style green lasers on page load
 */
function initLaserShow() {
  const laserShow = document.getElementById('laser-show');
  const beamsGroup = document.getElementById('laser-beams');
  const flashEl = document.getElementById('laser-flash');
  const particlesEl = document.getElementById('laser-particles');
  
  if (!laserShow || !beamsGroup) return;
  
  const centerX = 50;
  const centerY = 50;
  const duration = 3500;
  
  function createBeam(angle, delay, length = 150) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const endX = centerX + Math.cos(angle) * length;
    const endY = centerY + Math.sin(angle) * length;
    
    line.setAttribute('x1', centerX);
    line.setAttribute('y1', centerY);
    line.setAttribute('x2', centerX);
    line.setAttribute('y2', centerY);
    line.setAttribute('stroke', Math.random() > 0.3 ? '#00ff00' : '#22c55e');
    line.setAttribute('stroke-width', (0.3 + Math.random() * 0.4).toString());
    line.setAttribute('stroke-linecap', 'round');
    line.style.opacity = '0';
    
    beamsGroup.appendChild(line);
    
    setTimeout(() => {
      line.style.opacity = '1';
      
      let progress = 0;
      const beamDuration = 200 + Math.random() * 300;
      const beamStart = performance.now();
      
      function animateBeam() {
        const elapsed = performance.now() - beamStart;
        progress = Math.min(1, elapsed / beamDuration);
        
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentX = centerX + Math.cos(angle) * length * eased;
        const currentY = centerY + Math.sin(angle) * length * eased;
        
        line.setAttribute('x2', currentX.toString());
        line.setAttribute('y2', currentY.toString());
        
        if (progress < 1) {
          requestAnimationFrame(animateBeam);
        } else {
          spawnParticle(
            (currentX / 100) * window.innerWidth,
            (currentY / 100) * window.innerHeight,
            angle
          );
          
          setTimeout(() => {
            line.style.transition = 'opacity 0.5s ease';
            line.style.opacity = '0';
            setTimeout(() => line.remove(), 500);
          }, 100 + Math.random() * 200);
        }
      }
      
      animateBeam();
    }, delay);
  }
  
  function spawnParticle(x, y, angle) {
    if (!particlesEl) return;
    
    const particle = document.createElement('div');
    particle.className = 'laser-particle';
    
    const distance = 30 + Math.random() * 80;
    const spread = (Math.random() - 0.5) * 1;
    const tx = Math.cos(angle + spread) * distance;
    const ty = Math.sin(angle + spread) * distance;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.setProperty('--duration', `${0.5 + Math.random() * 0.5}s`);
    
    particlesEl.appendChild(particle);
    
    requestAnimationFrame(() => {
      particle.classList.add('laser-particle--animate');
    });
    
    setTimeout(() => particle.remove(), 1000);
  }
  
  function triggerFlash() {
    if (!flashEl) return;
    flashEl.classList.remove('laser-show__flash--active');
    void flashEl.offsetWidth;
    flashEl.classList.add('laser-show__flash--active');
  }
  
  function createScanLine(delay) {
    const scanline = document.createElement('div');
    scanline.className = 'laser-scanline';
    laserShow.appendChild(scanline);
    
    setTimeout(() => {
      scanline.classList.add('laser-scanline--animate');
      setTimeout(() => scanline.remove(), 1000);
    }, delay);
  }
  
  // Run the show
  function runLaserShow() {
    // Phase 1: Initial burst
    const initialBeams = 24;
    for (let i = 0; i < initialBeams; i++) {
      const angle = (i / initialBeams) * Math.PI * 2;
      createBeam(angle, i * 15, 120);
    }
    triggerFlash();
    
    // Phase 2: Scan lines
    createScanLine(300);
    createScanLine(500);
    
    // Phase 3: Random bursts
    for (let i = 0; i < 40; i++) {
      const delay = 600 + Math.random() * 1400;
      const angle = Math.random() * Math.PI * 2;
      createBeam(angle, delay, 80 + Math.random() * 70);
      
      if (Math.random() > 0.7) {
        setTimeout(triggerFlash, delay);
      }
    }
    
    // Phase 4: Spiral
    const spiralBeams = 36;
    for (let i = 0; i < spiralBeams; i++) {
      const angle = (i / spiralBeams) * Math.PI * 4;
      const delay = 1500 + i * 25;
      createBeam(angle, delay, 100 + Math.sin(i * 0.3) * 40);
    }
    
    // Phase 5: Finale
    setTimeout(() => {
      triggerFlash();
      createScanLine(0);
      createScanLine(100);
    }, 2500);
    
    setTimeout(() => {
      const finalBeams = 48;
      for (let i = 0; i < finalBeams; i++) {
        const angle = (i / finalBeams) * Math.PI * 2;
        createBeam(angle, i * 5, 150);
      }
      triggerFlash();
    }, 2800);
    
    // Hide
    setTimeout(() => {
      laserShow.style.transition = 'opacity 0.5s ease';
      laserShow.style.opacity = '0';
      setTimeout(() => {
        laserShow.classList.add('laser-show--hidden');
      }, 500);
    }, duration);
  }
  
  runLaserShow();
}

/**
 * Initialize application
 */
function init() {
  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize Chat Input
  initChatInput();
  
  // Initialize Metrics Dashboard
  initMetricsDashboard();
  
  // Initialize Checkout Modal
  initCheckoutModal();
  
  // Initialize LIDAR Module (header)
  initLidarModule();
  
  // Initialize Hero LIDAR (main showcase)
  initHeroLidar();
  
  // Initialize Laser Show on page load
  initLaserShow();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SERVICE_SUGGESTIONS,
    SERVICE_CATALOG,
    PROPOSAL_STEPS,
    METRICS_DATA,
    AutocompleteConfig,
    AppState,
    ChatInputState,
    CheckoutState,
    // Performance utilities
    debounce,
    throttle,
    filterSuggestions,
    getAllSuggestions,
    submitQuery,
    setOnQuerySubmit,
    getChatInputValue,
    setChatInputValue,
    handleInputChange,
    handleKeyDown,
    openAutocomplete,
    closeAutocomplete,
    selectSuggestion,
    navigateSuggestions,
    renderSuggestions,
    getCategoryIcon,
    initChatInput,
    getServiceFromCatalog,
    findServiceForQuery,
    startProposalGeneration,
    getProposalResult,
    formatPrice,
    renderProposalResult,
    processProposalStep,
    runProposalSteps,
    getMetricsData,
    getMetricIcon,
    createMetricCard,
    renderMetrics,
    initMetricsDashboard,
    animateMetricsOnLoad,
    isElementInViewport,
    triggerMetricsAnimation,
    // Checkout exports
    getCheckoutState,
    resetCheckoutState,
    transitionCheckoutState,
    openCheckoutModal,
    closeCheckoutModal,
    renderCheckoutContent,
    handleProceedToPayment,
    handleBackToReview,
    handlePaymentMethodChange,
    handleCompletePayment,
    handleCheckoutDone,
    initCheckoutModal
  };
}
