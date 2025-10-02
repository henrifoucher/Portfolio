# Portfolio

🌐 **[View Live Portfolio](https://henrifoucher.github.io/Portfolio)**

A modern portfolio website built with React Router v7, WebGL, and modern web technologies.

## Features

- Interactive WebGL-based project showcase
- Responsive design
- Performance optimized
- React Router v7 for routing
- TypeScript support ready
- ESLint configuration

## Project Structure

```
Portfolio/
├── public/                 # Static assets
│   ├── projects.json      # Project data
│   └── favicon.svg        # Site icon
├── app/                   # Application source
│   ├── routes/           # Route components
│   │   ├── _index.jsx    # Home page (exports home.jsx)
│   │   ├── home.jsx      # Main portfolio component
│   │   └── projectDetail.jsx # Project detail page
│   ├── components/       # Reusable components
│   │   ├── Border.jsx
│   │   ├── InnerBorder.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ProjectList.jsx
│   │   └── ScrambleText.jsx
│   ├── styles/          # CSS files
│   │   ├── app.css
│   │   ├── reset.css
│   │   ├── font.css
│   │   ├── home.css
│   │   ├── projectDetail.css
│   │   ├── border.css
│   │   └── loadingscreen.css
│   ├── utils/           # Utility functions
│   │   ├── performanceUtils.js
│   │   ├── textScramble.js
│   │   └── debugVideoTextures.js
│   ├── assets/          # Asset files
│   ├── root.jsx         # Root component
│   └── routes.js        # Route definitions
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── react-router.config.js # React Router configuration
├── eslint.config.js     # ESLint configuration
└── index.html          # Entry HTML file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the project:
```bash
npm run build
```

The built files will be in the `build/` directory.

### Testing

Run tests:
```bash
npm run test:chrome    # Run tests in Chrome
npm run test:ui        # Run tests with UI
npm run test:all       # Run all tests
```

## Deployment

This project is configured for deployment with:

1. **Vite** for modern build tooling
2. **React Router v7** for client-side routing
3. **GitHub Pages compatible** build output

### GitHub Pages Deployment

The project is set up for GitHub Pages deployment with the base path `/Portfolio/` configured in `vite.config.js`.

To deploy:
1. Build the project: `npm run build`
2. Deploy the `build/client` directory to your hosting service
3. For GitHub Pages, the repository should be configured to serve from the build output

### Environment Variables

The project supports standard Vite environment variables. Create a `.env` file for local development if needed.

## Dependencies

### Main Dependencies
- **React 19.1.0** - UI library
- **React Router 7.6.0** - Routing
- **GSAP 3.13.0** - Animations
- **gl-matrix** - WebGL matrix operations

### Dev Dependencies
- **Vite 6.3.5** - Build tool
- **ESLint 9.26.0** - Code linting
- **Playwright** - Testing

## Performance Optimizations

The project includes several performance optimizations:
- Resource management utilities
- Performance monitoring
- Visibility management for WebGL content
- Optimized asset loading

## Browser Support

- Modern browsers with WebGL support
- ES2020+ features
- CSS Grid and Flexbox support

## Contributing

1. Follow the existing code style
2. Use meaningful commit messages
3. Test your changes before submitting
4. Update documentation as needed