# 🔍 Detect-Fraud

A full-stack **fraud detection simulation platform** built with **Next.js, React, and TailwindCSS**.  
It allows you to define fraud detection rules, simulate transactions, and visualize suspicious activity in real time.

---

## ✨ Features

- **Rule Engine**  
  Define custom rules in JSON (e.g. `"amount > 500"`) to flag suspicious transactions.

- **Transaction Viewer**  
  Browse all transactions with details like `Time | User | Amount | Merchant | Device | Status | Score`.

- **Simulator**  
  Generate **fake/random transactions** that are automatically evaluated against your rules.

- **Dashboard & Analytics**  
  Get insights into:
  - Total transactions
  - Number of alerts
  - Alert rate (%)
  - Charts & graphs to track fraud trends


## Getting Started

First, run the development server:

```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



PROJECT STRUCTURE :-

src/
  app/
    dashboard/       # Dashboard UI
    transactions/    # Transaction table
    rules/           # Rule management
    simulator/       # Transaction simulator
  pages/api/         # API routes for rules & transactions
  components/        # Reusable UI components

