# AnimalPedia Setup Guide

This guide will help you set up and run the AnimalPedia project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (usually comes with Node.js) or yarn

## Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd path/to/AnimallPedia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   or with yarn:
   ```bash
   yarn start
   ```

4. **Open your browser:**
   Visit `http://localhost:3000` to see the application running.

## Project Structure

```
AnimallPedia/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Header/
│   │       ├── Header.tsx
│   │       ├── Logo.tsx
│   │       ├── SearchBar.tsx
│   │       ├── NavMenu.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── UserProfile.tsx
│   │       └── index.ts
│   ├── store/
│   │   ├── index.ts
│   │   └── slices/
│   │       ├── themeSlice.ts
│   │       ├── userSlice.ts
│   │       └── searchSlice.ts
│   ├── examples/
│   │   └── HeaderExample.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

## Using the Header Component

To use the Header component in your own project:

1. Copy the `src/components/Header` directory to your project
2. Copy the Redux slices from `src/store/slices` to your project
3. Update the import paths in the Header components to match your project structure
4. Ensure your Redux store includes the theme, user, and search slices
5. Wrap your application with the Redux Provider
6. Import and use the Header component:

```tsx
import { Header } from './components/Header';

function App() {
  return (
    <div>
      <Header />
      {/* Rest of your application */}
    </div>
  );
}
```

## Customization

### Styling
The Header component uses TailwindCSS for styling. You can customize the appearance by:
1. Modifying the Tailwind classes directly in the components
2. Updating your Tailwind configuration
3. Adding custom CSS classes

### Functionality
To extend the functionality:
1. Add new reducers to the existing Redux slices
2. Create new slices for additional state
3. Modify the component logic as needed

## Troubleshooting

### Common Issues

1. **"Module not found" errors:**
   Make sure all dependencies are installed by running `npm install`.

2. **TypeScript errors:**
   Ensure you have TypeScript and the necessary type definitions installed.

3. **Styling issues:**
   Verify that TailwindCSS is properly configured and the directives are included in your CSS file.

### Need Help?

If you encounter any issues not covered in this guide, please check the README.md file for additional information or open an issue in the repository.