# AnimalPedia

AnimalPedia is a comprehensive animal encyclopedia application built with React, TypeScript, Redux Toolkit, and TailwindCSS.

## Features

- Responsive header with logo, search, navigation, theme toggle, and user profile
- Dark/light mode support
- Autocomplete search functionality
- Mobile-friendly navigation
- Redux state management for theme, user, and search

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd AnimallPedia
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:
```
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:
```
npm run build
```

## Project Structure

```
src/
├── components/
│   └── Header/
│       ├── Header.tsx
│       ├── Logo.tsx
│       ├── SearchBar.tsx
│       ├── NavMenu.tsx
│       ├── ThemeToggle.tsx
│       └── UserProfile.tsx
├── store/
│   ├── index.ts
│   └── slices/
│       ├── themeSlice.ts
│       ├── userSlice.ts
│       └── searchSlice.ts
├── App.tsx
└── index.tsx
```

## Components

### Header
The main header component that combines all sub-components.

### Logo
Displays the application logo and links to the homepage.

### SearchBar
Provides search functionality with autocomplete suggestions.

### NavMenu
Navigation menu with responsive design for mobile and desktop.

### ThemeToggle
Button to switch between light and dark themes.

### UserProfile
User profile component with dropdown menu for authentication actions.

## Redux Store

The application uses Redux Toolkit for state management with three slices:

1. **themeSlice** - Manages dark/light mode
2. **userSlice** - Manages user authentication state
3. **searchSlice** - Manages search queries and suggestions

## Styling

The application uses TailwindCSS for styling with dark mode support enabled.