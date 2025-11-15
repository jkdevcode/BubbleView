# 🫧 BubbleView

A smooth scroll-based animation where images expand from small bubbles to fullscreen reveals, built with **React**, **Vite**, **Framer Motion**, and **Tailwind CSS**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-%23000000?style=for-the-badge&logo=vercel&logoColor=white)](https://bubble-view.vercel.app)

![BubbleView Demo](https://img.shields.io/badge/status-active-brightgreen)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- 🎬 **Cinematic Carousel** - Smooth animations with blur and saturation effects
- 🌓 **Dark/Light Mode** - Beautiful gradient text that adapts to theme
- 🌍 **Multi-language Support** - English, Spanish, and French (i18n with react-i18next)
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ♿ **Accessible** - Keyboard navigation (Arrow keys) and wheel scroll support
- 🎨 **Modern UI** - Gradient indicators, 3D thumbnail effects, glowing elements
- ⚡ **Performance Optimized** - Lazy loading, will-change CSS, AnimatePresence for smooth transitions
- 🎯 **Interactive Thumbnails** - 3D rotation effect with hover states

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jkdevcode/BubbleView.git
cd BubbleView

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Your app will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
BubbleView/
├── src/
│   ├── components/
│   │   ├── Carousel.tsx          # Main carousel component
│   │   └── Footer.tsx            # Footer with translations
│   ├── mocks/
│   │   └── mock-carousel.tsx     # Carousel data (image paths & translation keys)
│   ├── locales/
│   │   └── base/
│   │       ├── en-US.json        # English translations
│   │       ├── es-ES.json        # Spanish translations
│   │       └── fr-FR.json        # French translations
│   ├── utils/
│   │   └── motion.ts             # Framer Motion utilities
│   └── App.tsx                   # Main app component
├── public/
│   └── imgs/                     # Image assets
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🎮 Usage

### Keyboard Navigation
- **→ Arrow Right** - Next slide
- **← Arrow Left** - Previous slide

### Mouse Wheel
- **Scroll Up** - Previous slide
- **Scroll Down** - Next slide

### Thumbnails
- **Click** on any thumbnail to jump to that slide

---

## 🛠️ Technologies

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite** | Fast build tool & dev server |
| **Framer Motion** | Advanced animations |
| **Tailwind CSS** | Utility-first styling |
| **react-i18next** | Internationalization (i18n) |
| **TypeScript** | Type safety |
| **HeroUI** | Component library |

---

## 🎨 Customization

### Add New Slides

Edit `src/mocks/mock-carousel.tsx`:

```typescript
export const slideImages = [
  "imgs/your-image-1.jpg",
  "imgs/your-image-2.jpg",
  // Add more images...
];

export const slideInfo = [
  {
    titleKey: "carousel-slide1-title",
    descKey: "carousel-slide1-desc",
  },
  // Add more slides...
];
```

### Add Translations

Edit the locale files (e.g., `src/locales/base/en-US.json`):

```json
{
  "carousel-slide1-title": "My Custom Title",
  "carousel-slide1-desc": "My custom description"
}
```

### Customize Colors

Modify the Tailwind classes in `src/components/Carousel.tsx`:

```tsx
// Title gradient (light mode)
from-stone-800 via-stone-600 to-stone-800

// Title gradient (dark mode)
dark:from-blue-300 dark:via-purple-300 dark:to-pink-300
```

---

## 📊 Performance

- ✅ **Image Preloading** - Images load ahead of time
- ✅ **Optimized Animations** - Uses CSS transforms and will-change
- ✅ **Code Splitting** - Vite handles automatic code splitting
- ✅ **Light Bundle** - ~150KB gzipped

---

## 🌐 Internationalization (i18n)

The project supports 3 languages by default:
- **English** (en-US)
- **Spanish** (es-ES)
- **French** (fr-FR)

To add a new language, create a new JSON file in `src/locales/base/` following the existing structure.

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Format code (ESLint)
npx eslint . --ext .js,.jsx,.ts,.tsx --fix
```

Deploy to Vercel, Netlify, or any static host that supports Vite projects.

---

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) - Beautiful animations
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [HeroUI](https://heroui.com/) - Modern React components
- [react-i18next](https://react.i18next.com/) - Internationalization library
- [Pexels](https://www.pexels.com/) - Free stock images

---

## 📞 Support

For questions or support, reach out through:
- 📧 Email: dajozavargas@gmail.com
- 🐙 GitHub Issues: [Create an issue](https://github.com/jkdevcode/BubbleView/issues)


---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Created by **Jos** | [Portfolio](https://josedvargas.vercel.app)

---

**Made with ❤️ by Jos**
