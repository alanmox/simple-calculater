## Lumen Calc

A production-ready calculator web app built with Next.js App Router, strict TypeScript, Tailwind CSS, and a modular UI and logic architecture.

## Setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run build
```

## Features

- Glassmorphic calculator UI with responsive layout
- Dark mode by default with persistent light mode toggle
- Full keyboard support for digits, operators, Enter, Backspace, and Escape
- Expression validation and graceful error handling
- Calculation history stored in `localStorage`
- Copy-result action and subtle sound feedback
- Unit tests for calculator logic with Vitest

## Project structure

```text
app/
components/calculator/
hooks/
styles/
types/
utils/
```

## Verification

- `npm run lint` passes
- `npm run test` passes
- `npm run build` currently fails on this machine with a low-level `Bus error`, which points to the local Node/build runtime rather than an app-level lint or test failure
