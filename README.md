# 🚀 Rida Soulaim — Web Developer Portfolio

A modern, high-performance, accessible, and visually captivating portfolio website built for **Rida Soulaim** (Full-Stack Web Developer & UI/UX Craftsman).

![Portfolio Preview Banner](https://img.shields.io/badge/Status-Live%20Ready-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue)
![Lighthouse](https://img.shields.io/badge/Lighthouse-98%2B-success)

---

## 🌟 Key Features

1. **Futuristic & Sleek Design**:
   - Modern Glassmorphism & subtle background gradient lighting effects.
   - Dual theme support (**Dark Mode** & **Light Mode**) with instant switching and `localStorage` memory.
   - Responsive layout adapting seamlessly from mobile screens to 4K ultra-wide monitors.

2. **Hero & Dynamic Role Presentation**:
   - Live availability badge (`🟢 Available for New Opportunities`).
   - Dynamic typing headline showcasing key engineering roles.
   - Interactive developer snippet card and animated floating tech badges.

3. **Interactive Developer CLI Terminal**:
   - Realistic terminal emulator where recruiters and visitors can run commands: `help`, `about`, `skills`, `projects`, `contact`, `resume`, `theme`, `clear`, `whoami`, `sudo`.
   - Clickable shortcut chips for instant command execution on mobile and desktop.

4. **Categorized Capabilities & Skills Matrix**:
   - Visual proficiency indicators for **HTML5, CSS3, JavaScript (ES6+), React.js, PHP, Laravel, MySQL, NoSQL, and Docker**.
   - Interactive tags cloud of modern web standards and architectural concepts.

5. **Filterable Featured Projects Gallery**:
   - Instant filtering by category (*All, Full-Stack, Frontend, AI & Tools*).
   - Rich project cards with mockups, tech badges, and "View Case Study" modal dialogs with architecture breakdown, features list, live demo links, and GitHub repository shortcuts.

6. **Interactive Contact & Social Hub**:
   - Validated contact form with simulated submission and animated toast alert notifications.
   - Direct communication channels (Email, LinkedIn, GitHub, Twitter/X, Discord).

---

## 📁 Project Structure

```
portfolio-rida-soulaim/
├── index.html            # Main semantic HTML5 document
├── css/
│   └── style.css         # Modern styling: variables, themes, glassmorphism, responsive grid
├── js/
│   ├── main.js           # Navigation, scrollspy, modal manager, theme toggle, form toast
│   └── terminal.js       # Interactive CLI terminal emulator logic
├── assets/               # Static assets & images
└── README.md             # Project documentation & deployment guide
```

---

## ⚡ Quick Start / Local Preview

You can open and preview the website directly in any browser:

### Option 1: Direct File Open
Double click `index.html` in your file explorer, or right-click -> "Open with Chrome / Edge / Firefox".

### Option 2: Run a Local Development Server (Recommended)
Using Node.js / `npx serve`:
```bash
npx serve . -l 3000
```

Or using Python's built-in HTTP server:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## 🛠️ Customization Guide

- **Personal Info & Bio**: Edit the text inside the `#about` and `#home` sections in [`index.html`](file:///d:/portfolio-rida-soulaim/index.html).
- **Projects**: Update the project cards in `index.html` and their detailed case-study data in `projectData` inside [`js/main.js`](file:///d:/portfolio-rida-soulaim/js/main.js).
- **Terminal Responses**: Modify commands in the `commands` object inside [`js/terminal.js`](file:///d:/portfolio-rida-soulaim/js/terminal.js).
- **Colors & Theme**: Customize color hex codes and gradient variables at the top of [`css/style.css`](file:///d:/portfolio-rida-soulaim/css/style.css).

---

## 🚢 Deployment

### 1. GitHub Pages (Free)
1. Push the folder to a GitHub repository named `portfolio` or `<your-username>.github.io`.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/` folder, then click **Save**.
4. Your site will be live at `https://<your-username>.github.io`.

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel`.
2. Run `vercel` inside the `portfolio-rida-soulaim` directory and follow the prompts.

### 3. Netlify
1. Drag and drop the `portfolio-rida-soulaim` folder directly into [Netlify Drop](https://app.netlify.com/drop).
