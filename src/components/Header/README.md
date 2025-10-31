# Header Component

The Header component is a fixed-position navigation bar for the AnimalPedia application. It includes all necessary elements for site navigation and user interaction.

## Features

- Fixed positioning at the top of the viewport
- Responsive design for mobile and desktop
- Dark/light mode support
- Search with autocomplete functionality
- User profile dropdown
- Modular component structure

## Component Structure

```
Header/
├── Header.tsx          # Main container component
├── Logo.tsx            # Application logo with link to homepage
├── SearchBar.tsx       # Search input with autocomplete suggestions
├── NavMenu.tsx         # Navigation links with mobile menu
├── ThemeToggle.tsx     # Dark/light mode toggle button
├── UserProfile.tsx     # User profile with dropdown menu
└── index.ts            # Export file for easy imports
```

## Usage

To use the Header component in your application:

```tsx
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './components/Header';

function App() {
  return (
    <Provider store={store}>
      <Header />
      {/* Rest of your application */}
    </Provider>
  );
}
```

## Dependencies

The Header component requires the following Redux slices to be included in your store:
- `theme` (from `./store/slices/themeSlice`)
- `user` (from `./store/slices/userSlice`)
- `search` (from `./store/slices/searchSlice`)

## Customization

### Styling

The component uses TailwindCSS classes for styling. You can customize the appearance by:
1. Modifying the existing Tailwind classes
2. Adding additional classes for specific styling
3. Updating your Tailwind configuration

### Functionality

To extend functionality:
1. Add new actions to the existing Redux slices
2. Create new slices for additional state management
3. Modify component behavior as needed

## Sub-components

### Logo
Displays the application logo and links to the homepage.

### SearchBar
Provides search functionality with autocomplete suggestions. Uses mock data by default but can be connected to a real API.

### NavMenu
Navigation menu with responsive design. Converts to a hamburger menu on mobile devices.

### ThemeToggle
Button to switch between light and dark themes. Uses Redux to manage theme state.

### UserProfile
User profile component with dropdown menu. Shows different options based on authentication status.

## Testing

Each component includes unit tests. To run tests:

```bash
npm test
```

## Accessibility

The Header component follows accessibility best practices:
- Proper semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast