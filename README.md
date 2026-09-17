# FDA (Fractal Domain Architecture)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-5.x-FF3E00?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)

Документация по архитектуре фрактальных доменов для масштабируемых приложений.

## 📚 Документация

Полная документация доступна по адресу: **https://fda-docs.vercel.app**

### Содержание

1. [Введение](https://fda-docs.vercel.app/docs/01-introduction) — основы FDA
2. [Основные концепции](https://fda-docs.vercel.app/docs/02-core-concepts) — фрактальность, слои, контракты
3. [Структура проекта](https://fda-docs.vercel.app/docs/03-project-structure) — организация файлов
4. [Домены и подмодули](https://fda-docs.vercel.app/docs/04-domains-submodules) — фрактальная организация
5. [Контракты файлов](https://fda-docs.vercel.app/docs/05-file-contracts) — роли и экспорт
6. [FAQ и Checklist](https://fda-docs.vercel.app/docs/06-faq-checklist) — частые вопросы

## 🧪 Рабочие примеры

Полные рабочие примеры в папке `examples/`:

| Пример | Описание | Размер | Статус |
|--------|----------|--------|--------|
| `minimal/` | Минимальный пример | 🟢 Малый | 🟢 Готов |
| `base/` | Базовая структура | 🟡 Средний | 🟠 В работе |
| `e-commerce/` | интернет-магазин | 🔴 Большой | 🔴 Планируется |
| `auth/` | авторизация | 🔴 Большой | 🔴 Планируется |
| `dashboard/` | дашборд | 🔴 Большой | 🔴 Планируется |

## 🎯 Основные принципы

- **Фрактальность** — одинаковая структура на всех уровнях: компоненты → подмодули → домены → приложения
- **Разделение на слои** — чёткое разделение: репозитории → модель → контроллер → UI
- **Явные контракты** — строгие правила экспорта каждого файла
- **Framework-agnostic** — архитектура независима от фреймворка (Astro/SvelteKit/React/Vue)

## 🛠️ Технологии

- **Astro 5.x** — статическая генерация
- **Starlight** — документация
- **Drizzle ORM** — работа с базой данных
- **TypeScript** — строгая типизация
- **Svelte 5** — UI фреймворк

## 📝 Лцензия

MIT License
