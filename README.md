# N-Back PWA

## Project Description
The N-Back PWA is a Progressive Web App designed to implement an n-back task for memory training. It features a user-friendly interface optimized for mobile screens, specifically for the iPhone 16 Pro. Users can select the value of N for the dual N-back task and switch between letter and shape modes. The current letter or shape is displayed prominently in the center of the screen, with controls for starting, stopping, and tracking progress.

## Proposed Technologies
1. **React**: For building the user interface components.
2. **TypeScript**: For type safety and better development experience.
3. **Vite**: As the build tool for fast development and optimized production builds.
4. **Tailwind CSS**: For styling the application with a responsive design.
5. **ESLint**: For maintaining code quality and consistency.
6. **PostCSS**: For processing CSS with plugins.
7. **PWA Features**: Implementing service workers and a web manifest for offline capabilities and installation on mobile devices.

## Project Structure
```
n-back-pwa
├── public
│   └── manifest.webmanifest
├── src
│   ├── components
│   │   ├── Controls.tsx
│   │   ├── Display.tsx
│   │   ├── ModeToggle.tsx
│   │   ├── NSelector.tsx
│   │   └── StatsBar.tsx
│   ├── game
│   │   ├── engine.ts
│   │   ├── sequences.ts
│   │   └── types.ts
│   ├── hooks
│   │   └── useNBack.ts
│   ├── utils
│   │   ├── audio.ts
│   │   └── storage.ts
│   ├── styles
│   │   └── index.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.cjs
├── tailwind.config.ts
├── eslint.config.cjs
├── .prettierrc
├── .editorconfig
└── README.md
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd n-back-pwa
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

## Usage
- Select the value of N for the n-back task using the NSelector component.
- Toggle between letter and shape modes using the ModeToggle component.
- The current letter or shape will be displayed in the center of the screen.
- Use the Controls component to start and stop the game, and track your performance with the StatsBar component.

## License
This project is licensed under the MIT License.