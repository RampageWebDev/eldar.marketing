/**
 * Property-Based Tests for Chat Input and Autocomplete Components
 * Feature: eldar-marketing-landing
 */

import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';

// Mock DOM environment
function setupDOM() {
  document.body.innerHTML = `
    <div class="chat-input" id="chat-input">
      <input type="text" id="chat-field" />
      <button id="chat-submit"></button>
      <div id="autocomplete" hidden>
        <ul id="autocomplete-list"></ul>
      </div>
    </div>
  `;
}

// Service Suggestions for testing (mirrors app.js)
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

const AutocompleteConfig = {
  maxVisible: 6,
  minChars: 1
};

/**
 * Filter suggestions based on input text (mirrors app.js implementation)
 */
function filterSuggestions(input, suggestions = SERVICE_SUGGESTIONS) {
  if (!input || input.trim().length < AutocompleteConfig.minChars) {
    return [];
  }
  
  const searchTerm = input.toLowerCase().trim();
  
  const filtered = suggestions.filter(suggestion => {
    const textMatch = suggestion.text.toLowerCase().includes(searchTerm);
    const keywordMatch = suggestion.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchTerm) || 
      searchTerm.includes(keyword.toLowerCase())
    );
    return textMatch || keywordMatch;
  });
  
  return filtered.slice(0, AutocompleteConfig.maxVisible);
}

// Chat Input State for testing
const ChatInputState = {
  value: '',
  filteredSuggestions: [],
  isOpen: false,
  selectedIndex: -1
};

const AppState = {
  chat: {
    query: '',
    isTyping: false
  },
  proposal: {
    isGenerating: false
  }
};

const callbacks = {
  onQuerySubmit: null
};

function setOnQuerySubmit(callback) {
  callbacks.onQuerySubmit = callback;
}

function setChatInputValue(value) {
  ChatInputState.value = value;
  const field = document.getElementById('chat-field');
  if (field) {
    field.value = value;
  }
}

function submitQuery() {
  const query = ChatInputState.value.trim();
  
  if (!query) {
    return;
  }
  
  AppState.chat.query = query;
  AppState.chat.isTyping = false;
  
  if (typeof callbacks.onQuerySubmit === 'function') {
    callbacks.onQuerySubmit(query);
  }
  
  AppState.proposal.isGenerating = true;
}

/**
 * Select a suggestion and populate input field
 */
function selectSuggestion(index, suggestions) {
  if (index >= 0 && index < suggestions.length) {
    const suggestion = suggestions[index];
    const text = typeof suggestion === 'string' ? suggestion : suggestion.text;
    ChatInputState.value = text;
    return text;
  }
  return null;
}

function resetState() {
  ChatInputState.value = '';
  ChatInputState.filteredSuggestions = [];
  ChatInputState.isOpen = false;
  ChatInputState.selectedIndex = -1;
  AppState.chat.query = '';
  AppState.chat.isTyping = false;
  AppState.proposal.isGenerating = false;
  callbacks.onQuerySubmit = null;
}

describe('Autocomplete System', () => {
  beforeEach(() => {
    setupDOM();
    resetState();
  });

  /**
   * Feature: eldar-marketing-landing, Property 1: Autocomplete filtering returns relevant suggestions
   * Validates: Requirements 1.1, 1.5
   * 
   * For any input string entered by the user, the filtered suggestions returned by the 
   * Autocomplete_System should be a subset of all available suggestions, and each returned 
   * suggestion should contain the input string (case-insensitive match) or match by keywords.
   */
  describe('Property 1: Autocomplete filtering returns relevant suggestions', () => {
    it('should return subset of suggestions where each matches input by text or keywords', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }),
          (input) => {
            const filtered = filterSuggestions(input, SERVICE_SUGGESTIONS);
            const searchTerm = input.toLowerCase().trim();
            
            // Property 1: Result is a subset of all suggestions
            const allIds = SERVICE_SUGGESTIONS.map(s => s.id);
            const filteredIds = filtered.map(s => s.id);
            const isSubset = filteredIds.every(id => allIds.includes(id));
            expect(isSubset).toBe(true);
            
            // Property 2: Each result matches by text or keywords
            if (searchTerm.length >= AutocompleteConfig.minChars) {
              filtered.forEach(suggestion => {
                const textMatch = suggestion.text.toLowerCase().includes(searchTerm);
                const keywordMatch = suggestion.keywords.some(keyword => 
                  keyword.toLowerCase().includes(searchTerm) || 
                  searchTerm.includes(keyword.toLowerCase())
                );
                expect(textMatch || keywordMatch).toBe(true);
              });
            }
            
            // Property 3: Result length is bounded by maxVisible
            expect(filtered.length).toBeLessThanOrEqual(AutocompleteConfig.maxVisible);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return empty array for empty or whitespace-only input', () => {
      fc.assert(
        fc.property(
          fc.stringOf(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 0, maxLength: 10 }),
          (whitespaceInput) => {
            const filtered = filterSuggestions(whitespaceInput, SERVICE_SUGGESTIONS);
            expect(filtered).toEqual([]);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should filter case-insensitively', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('INSTAGRAM', 'instagram', 'Instagram', 'InStAgRaM'),
          (caseVariant) => {
            const filtered = filterSuggestions(caseVariant, SERVICE_SUGGESTIONS);
            // Should find Instagram-related suggestion regardless of case
            expect(filtered.length).toBeGreaterThan(0);
            expect(filtered.some(s => s.id === 'instagram-ads')).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});

describe('Suggestion Selection', () => {
  beforeEach(() => {
    setupDOM();
    resetState();
  });

  /**
   * Feature: eldar-marketing-landing, Property 2: Suggestion selection populates input field
   * Validates: Requirements 1.2
   * 
   * For any suggestion selected from the autocomplete list, the Chat_Input field value 
   * should exactly equal the selected suggestion text.
   */
  describe('Property 2: Suggestion selection populates input field', () => {
    it('should populate input field with exact suggestion text when selected', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: SERVICE_SUGGESTIONS.length - 1 }),
          (index) => {
            resetState();
            
            const suggestions = SERVICE_SUGGESTIONS;
            const expectedText = suggestions[index].text;
            
            // Select the suggestion
            const resultText = selectSuggestion(index, suggestions);
            
            // Verify input value equals suggestion text exactly
            expect(resultText).toBe(expectedText);
            expect(ChatInputState.value).toBe(expectedText);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle selection from filtered results correctly', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('реклама', 'сайт', 'seo', 'бренд'),
          (searchTerm) => {
            resetState();
            
            const filtered = filterSuggestions(searchTerm, SERVICE_SUGGESTIONS);
            
            if (filtered.length > 0) {
              // Select random index from filtered results
              const randomIndex = Math.floor(Math.random() * filtered.length);
              const expectedText = filtered[randomIndex].text;
              
              const resultText = selectSuggestion(randomIndex, filtered);
              
              expect(resultText).toBe(expectedText);
              expect(ChatInputState.value).toBe(expectedText);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});

describe('Chat Input Component', () => {
  beforeEach(() => {
    setupDOM();
    resetState();
  });

  /**
   * Feature: eldar-marketing-landing, Property 3: Query submission triggers proposal generation
   * Validates: Requirements 1.3
   * 
   * For any non-empty query submitted via Enter or button click, 
   * the Proposal_Generator should be invoked with that exact query string.
   */
  describe('Property 3: Query submission triggers proposal generation', () => {
    it('should trigger proposal generation with exact query string for any non-empty input', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          (query) => {
            resetState();
            
            let receivedQuery = null;
            setOnQuerySubmit((q) => {
              receivedQuery = q;
            });
            
            setChatInputValue(query);
            submitQuery();
            
            expect(receivedQuery).toBe(query.trim());
            expect(AppState.proposal.isGenerating).toBe(true);
            expect(AppState.chat.query).toBe(query.trim());
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not trigger proposal generation for empty or whitespace-only queries', () => {
      fc.assert(
        fc.property(
          fc.stringOf(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 0, maxLength: 10 }),
          (whitespaceQuery) => {
            resetState();
            
            let callbackCalled = false;
            setOnQuerySubmit(() => {
              callbackCalled = true;
            });
            
            setChatInputValue(whitespaceQuery);
            submitQuery();
            
            expect(callbackCalled).toBe(false);
            expect(AppState.proposal.isGenerating).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});

// Service Catalog for testing (mirrors app.js)
const SERVICE_CATALOG = {
  advertising: {
    'instagram-ads': {
      name: 'Реклама в Instagram/Facebook',
      basePrice: 35000,
      baseDuration: '5-7 дней',
      includes: ['Настройка рекламного кабинета', 'Создание аудиторий', 'Разработка креативов', 'Запуск и оптимизация']
    },
    'yandex-direct': {
      name: 'Реклама в Яндекс.Директ',
      basePrice: 40000,
      baseDuration: '5-7 дней',
      includes: ['Сбор семантического ядра', 'Настройка кампаний', 'Создание объявлений', 'Аналитика и оптимизация']
    },
    'google-ads': {
      name: 'Реклама в Google Ads',
      basePrice: 45000,
      baseDuration: '7-10 дней',
      includes: ['Настройка аккаунта', 'Подбор ключевых слов', 'Создание объявлений', 'Настройка конверсий']
    },
    'smm-strategy': {
      name: 'SMM-стратегия',
      basePrice: 50000,
      baseDuration: '10-14 дней',
      includes: ['Анализ конкурентов', 'Разработка контент-плана', 'Tone of voice', 'KPI и метрики']
    },
    'email-marketing': {
      name: 'Email-рассылка',
      basePrice: 25000,
      baseDuration: '5-7 дней',
      includes: ['Настройка сервиса рассылок', 'Дизайн шаблонов', 'Сегментация базы', 'Автоматизация цепочек']
    }
  },
  development: {
    'landing-page': {
      name: 'Лендинг для бизнеса',
      basePrice: 60000,
      baseDuration: '7-10 дней',
      includes: ['Прототипирование', 'Уникальный дизайн', 'Адаптивная вёрстка', 'Интеграция форм']
    },
    'ecommerce': {
      name: 'Интернет-магазин',
      basePrice: 150000,
      baseDuration: '21-30 дней',
      includes: ['Каталог товаров', 'Корзина и оплата', 'Личный кабинет', 'Интеграция с CRM']
    },
    'corporate-website': {
      name: 'Корпоративный сайт',
      basePrice: 120000,
      baseDuration: '14-21 день',
      includes: ['Многостраничная структура', 'CMS для управления', 'SEO-оптимизация', 'Мобильная версия']
    }
  },
  analytics: {
    'seo': {
      name: 'SEO-оптимизация',
      basePrice: 45000,
      baseDuration: '30+ дней',
      includes: ['Технический аудит', 'Оптимизация контента', 'Внешняя оптимизация', 'Ежемесячные отчёты']
    },
    'analytics-setup': {
      name: 'Настройка аналитики',
      basePrice: 30000,
      baseDuration: '3-5 дней',
      includes: ['Google Analytics 4', 'Яндекс.Метрика', 'Настройка целей', 'Дашборд отчётов']
    }
  },
  branding: {
    'rebranding': {
      name: 'Ребрендинг',
      basePrice: 100000,
      baseDuration: '21-30 дней',
      includes: ['Анализ бренда', 'Новая айдентика', 'Брендбук', 'Носители фирменного стиля']
    },
    'logo-design': {
      name: 'Дизайн логотипа',
      basePrice: 35000,
      baseDuration: '7-10 дней',
      includes: ['3 концепции на выбор', 'Доработка выбранной', 'Исходники всех форматов', 'Гайдлайн по использованию']
    }
  }
};

/**
 * Get service details from catalog by suggestion ID (mirrors app.js)
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
 * Find matching service for a query (mirrors app.js)
 */
function findServiceForQuery(query) {
  const queryLower = query.toLowerCase();
  
  const matchedSuggestion = SERVICE_SUGGESTIONS.find(s => 
    s.text.toLowerCase() === queryLower ||
    s.keywords.some(k => queryLower.includes(k))
  );
  
  if (matchedSuggestion) {
    const service = getServiceFromCatalog(matchedSuggestion.id);
    if (service) return service;
  }
  
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
  
  return {
    id: 'landing-page',
    ...SERVICE_CATALOG.development['landing-page']
  };
}

/**
 * Generate proposal result for a query (simulates completed proposal)
 */
function generateProposalResult(query) {
  const service = findServiceForQuery(query);
  return {
    price: service.basePrice,
    duration: service.baseDuration,
    includes: service.includes,
    serviceName: service.name
  };
}

describe('Proposal Generator', () => {
  beforeEach(() => {
    setupDOM();
    resetState();
  });

  /**
   * Feature: eldar-marketing-landing, Property 4: Completed proposal contains price and duration
   * Validates: Requirements 2.3
   * 
   * For any completed proposal generation, the result object should contain 
   * a valid price (number > 0) and a non-empty duration string.
   */
  describe('Property 4: Completed proposal contains price and duration', () => {
    it('should generate proposal with valid price (> 0) and non-empty duration for any query', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          (query) => {
            const result = generateProposalResult(query);
            
            // Property: price must be a positive number
            expect(typeof result.price).toBe('number');
            expect(result.price).toBeGreaterThan(0);
            
            // Property: duration must be a non-empty string
            expect(typeof result.duration).toBe('string');
            expect(result.duration.length).toBeGreaterThan(0);
            
            // Property: includes must be a non-empty array
            expect(Array.isArray(result.includes)).toBe(true);
            expect(result.includes.length).toBeGreaterThan(0);
            
            // Property: serviceName must be a non-empty string
            expect(typeof result.serviceName).toBe('string');
            expect(result.serviceName.length).toBeGreaterThan(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return matching service for known keywords', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            'instagram', 'facebook', 'яндекс', 'директ', 'google',
            'лендинг', 'сайт', 'магазин', 'seo', 'аналитика',
            'бренд', 'логотип', 'smm', 'email', 'рассылка'
          ),
          (keyword) => {
            const query = `Нужна услуга ${keyword}`;
            const result = generateProposalResult(query);
            
            // All results must have valid structure
            expect(result.price).toBeGreaterThan(0);
            expect(result.duration.length).toBeGreaterThan(0);
            expect(result.includes.length).toBeGreaterThan(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should always return fallback service for unknown queries', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => {
            const lower = s.toLowerCase();
            // Filter out strings that might match known keywords
            const knownKeywords = ['instagram', 'facebook', 'яндекс', 'google', 'лендинг', 
              'сайт', 'магазин', 'seo', 'аналитика', 'бренд', 'логотип', 'smm', 'email',
              'реклама', 'таргет', 'рассылка', 'разработка', 'дизайн', 'айдентика', 'метрика'];
            return s.trim().length > 0 && !knownKeywords.some(k => lower.includes(k));
          }),
          (randomQuery) => {
            const result = generateProposalResult(randomQuery);
            
            // Even for unknown queries, must return valid result
            expect(result.price).toBeGreaterThan(0);
            expect(result.duration.length).toBeGreaterThan(0);
            expect(result.includes.length).toBeGreaterThan(0);
            
            // Should fallback to landing-page service
            expect(result.serviceName).toBe('Лендинг для бизнеса');
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});


// Checkout State for testing (mirrors app.js)
const CheckoutState = {
  step: 'review',
  paymentMethod: null,
  proposal: null,
  isProcessing: false
};

/**
 * Reset checkout state for testing
 */
function resetCheckoutState() {
  CheckoutState.step = 'review';
  CheckoutState.paymentMethod = null;
  CheckoutState.proposal = null;
  CheckoutState.isProcessing = false;
}

/**
 * Transition checkout state (mirrors app.js)
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
 * Get current checkout state
 * @returns {Object} Current checkout state
 */
function getCheckoutState() {
  return { ...CheckoutState };
}

/**
 * Simulate opening checkout modal with proposal
 * @param {Object} proposal - Proposal data
 */
function openCheckoutModal(proposal) {
  CheckoutState.proposal = proposal;
  CheckoutState.step = 'review';
}

/**
 * Simulate payment method selection
 * @param {string} method - Payment method ('card' or 'invoice')
 */
function selectPaymentMethod(method) {
  if (method === 'card' || method === 'invoice') {
    CheckoutState.paymentMethod = method;
  }
}

/**
 * Simulate complete payment flow
 * @returns {boolean} Whether payment was successful
 */
function completePayment() {
  if (!CheckoutState.paymentMethod) return false;
  if (CheckoutState.step !== 'payment') return false;
  
  CheckoutState.isProcessing = true;
  
  // Simulate successful payment
  const success = transitionCheckoutState('success');
  CheckoutState.isProcessing = false;
  
  return success;
}

describe('Quick Checkout', () => {
  beforeEach(() => {
    setupDOM();
    resetState();
    resetCheckoutState();
  });

  /**
   * Feature: eldar-marketing-landing, Property 5: Checkout state transitions correctly
   * Validates: Requirements 4.1, 4.2, 4.4
   * 
   * For any formed proposal, clicking the payment button should transition the checkout 
   * state from 'review' to 'payment', and successful payment should transition to 'success' state.
   */
  describe('Property 5: Checkout state transitions correctly', () => {
    it('should transition from review to payment when proceeding to payment', () => {
      fc.assert(
        fc.property(
          fc.record({
            query: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
            price: fc.integer({ min: 1000, max: 500000 }),
            duration: fc.constantFrom('3-5 дней', '5-7 дней', '7-10 дней', '14-21 день', '21-30 дней'),
            serviceName: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0)
          }),
          (proposalData) => {
            resetCheckoutState();
            
            const proposal = {
              query: proposalData.query,
              result: {
                price: proposalData.price,
                duration: proposalData.duration,
                serviceName: proposalData.serviceName,
                includes: ['Item 1', 'Item 2']
              }
            };
            
            // Open checkout with proposal
            openCheckoutModal(proposal);
            expect(getCheckoutState().step).toBe('review');
            expect(getCheckoutState().proposal).toEqual(proposal);
            
            // Transition to payment
            const transitioned = transitionCheckoutState('payment');
            expect(transitioned).toBe(true);
            expect(getCheckoutState().step).toBe('payment');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should transition from payment to success after successful payment', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('card', 'invoice'),
          (paymentMethod) => {
            resetCheckoutState();
            
            const proposal = {
              query: 'Test query',
              result: {
                price: 50000,
                duration: '5-7 дней',
                serviceName: 'Test Service',
                includes: ['Item 1']
              }
            };
            
            // Setup: open checkout and go to payment
            openCheckoutModal(proposal);
            transitionCheckoutState('payment');
            expect(getCheckoutState().step).toBe('payment');
            
            // Select payment method
            selectPaymentMethod(paymentMethod);
            expect(getCheckoutState().paymentMethod).toBe(paymentMethod);
            
            // Complete payment
            const success = completePayment();
            expect(success).toBe(true);
            expect(getCheckoutState().step).toBe('success');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not allow invalid state transitions', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('review', 'payment', 'success'),
          fc.constantFrom('review', 'payment', 'success'),
          (startStep, targetStep) => {
            resetCheckoutState();
            
            // Set initial state
            CheckoutState.step = startStep;
            
            const validTransitions = {
              'review': ['payment'],
              'payment': ['success', 'review'],
              'success': ['review']
            };
            
            const shouldSucceed = validTransitions[startStep]?.includes(targetStep) || false;
            const result = transitionCheckoutState(targetStep);
            
            expect(result).toBe(shouldSucceed);
            
            if (shouldSucceed) {
              expect(getCheckoutState().step).toBe(targetStep);
            } else {
              expect(getCheckoutState().step).toBe(startStep);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not complete payment without selecting payment method', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10 }),
          () => {
            resetCheckoutState();
            
            const proposal = {
              query: 'Test',
              result: {
                price: 50000,
                duration: '5-7 дней',
                serviceName: 'Test',
                includes: ['Item']
              }
            };
            
            openCheckoutModal(proposal);
            transitionCheckoutState('payment');
            
            // Try to complete without selecting payment method
            const success = completePayment();
            expect(success).toBe(false);
            expect(getCheckoutState().step).toBe('payment');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain proposal data throughout checkout flow', () => {
      fc.assert(
        fc.property(
          fc.record({
            price: fc.integer({ min: 1000, max: 500000 }),
            duration: fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0),
            serviceName: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0)
          }),
          (proposalData) => {
            resetCheckoutState();
            
            const proposal = {
              query: 'Test query',
              result: {
                price: proposalData.price,
                duration: proposalData.duration,
                serviceName: proposalData.serviceName,
                includes: ['Item 1', 'Item 2']
              }
            };
            
            // Open checkout
            openCheckoutModal(proposal);
            const stateAfterOpen = getCheckoutState();
            expect(stateAfterOpen.proposal.result.price).toBe(proposalData.price);
            expect(stateAfterOpen.proposal.result.duration).toBe(proposalData.duration);
            expect(stateAfterOpen.proposal.result.serviceName).toBe(proposalData.serviceName);
            
            // Go to payment
            transitionCheckoutState('payment');
            const stateAfterPayment = getCheckoutState();
            expect(stateAfterPayment.proposal.result.price).toBe(proposalData.price);
            
            // Complete payment
            selectPaymentMethod('card');
            completePayment();
            const stateAfterSuccess = getCheckoutState();
            expect(stateAfterSuccess.proposal.result.price).toBe(proposalData.price);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
