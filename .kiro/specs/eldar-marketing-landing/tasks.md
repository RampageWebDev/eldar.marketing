# Implementation Plan: eldar.marketing Landing Page

## Overview

Реализация современного минималистичного лендинга с интерактивным чатом-автокомплитом, генерацией предложений в реальном времени и быстрым путём к оплате. Стек: Vanilla JS + HTML5 + CSS3.

## Tasks

- [x] 1. Настройка проекта и базовая структура
  - [x] 1.1 Создать структуру директорий (src/, styles/, assets/)
    - index.html, styles/main.css, src/app.js
    - _Requirements: 6.1, 6.2_
  - [x] 1.2 Настроить базовые CSS-переменные и цветовую палитру
    - Чёрный (#0a0a0a), графит (#1a1a1a), синий (#2563eb)
    - Шрифт Inter из Google Fonts
    - _Requirements: 5.1, 5.2_
  - [x] 1.3 Создать HTML-структуру страницы
    - Header, Hero, Proposal, Metrics, Footer секции
    - SEO meta-теги
    - _Requirements: 6.4_

- [x] 2. Реализация Chat Input компонента
  - [x] 2.1 Создать HTML-разметку поля ввода с иконкой
    - Стилизация под премиальный минимализм
    - _Requirements: 1.1_
  - [x] 2.2 Реализовать логику ввода и состояния
    - Фокус при загрузке, обработка Enter/Escape
    - _Requirements: 1.3_
  - [x] 2.3 Написать property-тест для отправки запроса
    - **Property 3: Query submission triggers proposal generation**
    - **Validates: Requirements 1.3**

- [x] 3. Реализация Autocomplete системы
  - [x] 3.1 Создать массив из 10+ популярных запросов
    - Категории: advertising, development, analytics, branding
    - _Requirements: 1.4_
  - [x] 3.2 Реализовать функцию фильтрации подсказок
    - Fuzzy match по тексту и ключевым словам
    - _Requirements: 1.1, 1.5_
  - [x] 3.3 Создать UI выпадающего списка подсказок
    - Навигация стрелками, выбор по клику/Enter
    - _Requirements: 1.2_
  - [x] 3.4 Написать property-тест для фильтрации
    - **Property 1: Autocomplete filtering returns relevant suggestions**
    - **Validates: Requirements 1.1, 1.5**
  - [x] 3.5 Написать property-тест для выбора подсказки
    - **Property 2: Suggestion selection populates input field**
    - **Validates: Requirements 1.2**

- [x] 4. Checkpoint - Проверка чата и автокомплита
  - Убедиться что все тесты проходят, спросить пользователя если есть вопросы.

- [x] 5. Реализация Proposal Generator
  - [x] 5.1 Создать каталог услуг с ценами и сроками
    - Базовые цены для каждой категории услуг
    - _Requirements: 2.3_
  - [x] 5.2 Реализовать пошаговую генерацию с анимацией
    - 3 шага: анализ → подбор → расчёт
    - Эффект печати текста
    - _Requirements: 2.1_
  - [x] 5.3 Реализовать отображение результата
    - Цена, сроки, что включено
    - _Requirements: 2.3_
  - [x] 5.4 Написать property-тест для результата предложения
    - **Property 4: Completed proposal contains price and duration**
    - **Validates: Requirements 2.3**

- [x] 6. Реализация Metrics Dashboard
  - [x] 6.1 Создать компонент метрик
    - 4 карточки: проекты, ROI, время старта, возврат клиентов
    - _Requirements: 3.1_
  - [x] 6.2 Добавить анимацию появления
    - Плавное появление при загрузке страницы
    - _Requirements: 3.2_

- [x] 7. Реализация Quick Checkout
  - [x] 7.1 Создать кнопку оплаты
    - Текст: "Мы уже знаем что вам нужно — Оплатить"
    - Появляется после формирования предложения
    - _Requirements: 4.1_
  - [x] 7.2 Реализовать модальное окно оплаты
    - Выбор способа оплаты (карта/счёт)
    - _Requirements: 4.2, 4.3_
  - [x] 7.3 Реализовать экран успешной оплаты
    - Подтверждение и следующие шаги
    - _Requirements: 4.4_
  - [x] 7.4 Написать property-тест для переходов состояний
    - **Property 5: Checkout state transitions correctly**
    - **Validates: Requirements 4.1, 4.2, 4.4**

- [x] 8. Checkpoint - Проверка полного флоу
  - Убедиться что все тесты проходят, спросить пользователя если есть вопросы.

- [x] 9. Адаптивная вёрстка и финальная полировка
  - [x] 9.1 Реализовать мобильную версию
    - Breakpoints: 768px, 480px
    - _Requirements: 5.3_
  - [x] 9.2 Оптимизировать производительность
    - Минификация, lazy loading
    - _Requirements: 5.4_
  - [x] 9.3 Добавить логотип eldar.marketing
    - SVG для масштабируемости
    - _Requirements: 5.5_

- [x] 10. Финальный checkpoint
  - Убедиться что все тесты проходят, спросить пользователя если есть вопросы.

## Notes

- Все задачи обязательны для полноценной реализации
- Каждая задача ссылается на конкретные требования
- Property-тесты используют fast-check библиотеку
- Checkpoints обеспечивают инкрементальную валидацию
