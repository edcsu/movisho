# 🎬 Movie Showcase Website

A responsive and modern movie showcase web application built with **React.js**, **TypeScript**, **Tailwind CSS**, and **React Router**. This project fetches real movie data from **TMDB API**, features dark/light mode support, and leverages performance optimizations like lazy loading and code splitting.

## 🚀 Features

- ✅ Browse **trending** and **top-rated** movies via **TMDB API**  
- ✅ Individual movie detail pages with cast, synopsis, poster, and ratings  
- ✅ **Responsive UI** — mobile-first and works on all devices  
- ✅ **Dark/Light Mode Toggle** using Tailwind's dark variant  
- ✅ **Client-side routing** with **React Router v6**  
- ✅ **TypeScript** support for robust, type-safe development  
- ✅ **Lazy loading** components and **code splitting** for performance  
- ✅ Scalable and clean codebase, ideal for further fullstack integration  

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS  
- **Routing:** React Router v6  
- **API:** [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api)  
- **State Management:** React Hooks  
- **Dark Mode:** Tailwind CSS dark mode support  
- **Performance:** Lazy loading with `React.lazy` and `Suspense`  
- **Deployment:** *(e.g., Vercel, Netlify — add yours here)*

## 📸 Screenshots


## 📂 Folder Structure

```
├── public/
├── src/
│   ├── assets/          # application assets
│   ├── components/      # Reusable UI components
│   ├── context/         # App Context
│   ├── pages/           # Route-based pages
│   ├── layouts/         # App layouts
│   ├── types/           # Custom TypeScript interfaces
│   ├── hooks/           # Custom React hooks
│   ├── routes/          # App routes
│   ├── utils/           # Dark mode toggle logic
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
└── package.json
```

## 🔧 Installation

1. **Clone the repo**

```bash
git clone https://github.com/edscu/movisho.git
cd movisho
```

2. **Install dependencies**

```bash
npm install
```

3. **Add your TMDB API key**

Create a `.env` file in the root:

```
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w500
VITE_BEARER_TOKEN=your_tmdb_bearer_token_here
```

4. **Run the app**

```bash
npm run dev
```

## 🔗 Live Demo

[👉 View Live Site](https://movisho.vercel.app)

## 📦 Performance Highlights

- ⚡ Lazy-loaded pages and components using `React.lazy` and `Suspense`  
- ⚙️ Code-splitting with dynamic imports  
- 🌙 Dark mode powered by Tailwind's `dark` class strategy  

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

<a href="https://www.buymeacoffee.com/skeda" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
</a>