# AnimalPedia Documentation

This document provides an overview of the AnimalPedia project structure and how its components work together.

## Project Overview

AnimalPedia is a comprehensive animal encyclopedia application built with modern web technologies:
- React for the user interface
- TypeScript for type safety
- Redux Toolkit for state management
- TailwindCSS for styling

## Architecture

The application follows a component-based architecture with a clear separation of concerns:
- Components handle UI rendering
- Redux manages application state
- Services handle data fetching (when implemented)

## Directory Structure

```
src/
├── components/
│   └── Header/              # Header component and sub-components
├── store/
│   ├── slices/              # Redux slices for state management
│   └── index.ts             # Store configuration
├── examples/                # Example implementations
└── App.tsx                  # Main application component
```

## Header Component

The Header component is the primary navigation element of the application.

### Features
- Fixed positioning at the top of the viewport
- Responsive design for all device sizes
- Dark/light mode support
- Search functionality with autocomplete
- User authentication UI
- Navigation menu

### Sub-components
1. **Logo** - Application branding and link to homepage
2. **SearchBar** - Search input with suggestions
3. **NavMenu** - Site navigation links
4. **ThemeToggle** - Dark/light mode switcher
5. **UserProfile** - User authentication UI

## State Management

The application uses Redux Toolkit for state management with three primary slices:

### Theme State
Manages the application's color scheme (light/dark mode).

### User State
Manages user authentication status and profile information.

### Search State
Manages search queries and autocomplete suggestions.

## Styling

The application uses TailwindCSS for styling with:
- Responsive utility classes
- Dark mode variants
- Consistent design system

## Testing

The application includes unit tests for:
- Redux slices
- React components
- Store functionality

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Run tests: `npm test`
4. Build for production: `npm run build`

## Customization

### Adding New Navigation Items
1. Update the `navItems` array in `NavMenu.tsx`
2. Add corresponding routes in your router configuration

### Extending User Profile Options
1. Modify the dropdown content in `UserProfile.tsx`
2. Add new actions to `userSlice.ts` if needed

### Modifying Search Functionality
1. Update the mock data in `SearchBar.tsx`
2. Connect to a real API by modifying the search logic
3. Add new fields to `searchSlice.ts` if needed

## Best Practices

1. **Component Reusability** - Each component is designed to be reusable
2. **State Management** - Use Redux for shared state, component state for local state
3. **Type Safety** - Leverage TypeScript for better code reliability
4. **Responsive Design** - Ensure components work on all device sizes
5. **Accessibility** - Follow WCAG guidelines for inclusive design

## Future Enhancements

1. **API Integration** - Connect to a real animal database
2. **Advanced Search** - Implement filtering and sorting
3. **User Authentication** - Integrate with Firebase or Supabase
4. **Performance Optimization** - Implement code splitting and lazy loading
5. **Internationalization** - Add support for multiple languages

## Troubleshooting

### Common Issues

1. **Missing Dependencies** - Run `npm install` to install all required packages
2. **TypeScript Errors** - Ensure all types are properly defined
3. **Styling Issues** - Check that TailwindCSS is properly configured
4. **State Issues** - Verify Redux store configuration and slice integration

### Getting Help

For additional help:
1. Check the component-specific README files
2. Review the example implementations
3. Run the unit tests to verify functionality
4. Consult the official documentation for React, Redux Toolkit, and TailwindCSS