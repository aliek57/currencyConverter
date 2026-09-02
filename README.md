# Currency Converter Application 

This Currency Converter was developed to reflect the high standards of modern fintech applications, prioritizing robust data handling and a distraction-free, solid design.

Beyond basic conversions, this project explores advanced React patterns such as state elevation, input debouncing 
and custom hooks combined with Framer Motion mechanics to deliver a production-ready user experience.

### Key Features:

* **Global Exchange Rates:** Fetches live currency data from the Frankfurter API, ensuring accurate cross-rates and strict floating-point formatting.
* **Interactive Data Visualization:** Features a 30-day historical trend chart built with Recharts. It includes a custom physics-based "Drag to Reveal" sliding overlay, crafted from scratch with Framer Motion to avoid interaction fatigue.
* **Intelligent Currency Selection:** Custom searchable dropdowns that cleverly leverage the native JavaScript `Intl.NumberFormat` API to dynamically extract and display proper currency symbols worldwide.
* **Bilingual & Theme-Aware:** Seamlessly switches between English/Portuguese (via `react-i18next`) and Light/Dark modes, with deep integration into the chart's color scheme.

## Tech Stack

* React + TypeScript + Vite
* Tailwind CSS v4
* TanStack React Query (Data Fetching & Caching)
* Framer Motion (Animations & Drag Interactions)
* Lucide React (Icons)
* React-i18next (Internationalization)
* Recharts (Data Visualization)

## How to Run 

The following instructions will help you set up a copy of the project on your local machine for development and testing purposes.

Before starting, make sure you have Node.js installed on your machine. Use the IDE of your preference to open the project.

When you are ready, open your terminal and clone the repository:

```
git clone https://github.com/aliek57/currencyConverter.git
```

## Initial Configuration

This application does not require any API Keys or *.env* files to run. It uses the free, 
open-source Frankfurter API making it incredibly easy to set up.

Follow these steps to set up your development environment:

1. Navigate to the project folder:

```
cd YOUR_FOLDER_NAME
```

2. Install all necessary dependencies:

```
npm install
```

3. After installation, start the development server:

```
npm run dev
```

You are all set! The Currency Converter is now running on your local machine.

---

**Live Demo:** You can also view and interact with the live application here [Currency Converter Live Demo](https://currency-converter-theta-five-27.vercel.app/)
