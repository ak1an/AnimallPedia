# Redux Store

The Redux store for AnimalPedia manages application state using Redux Toolkit.

## Store Structure

```
store/
├── index.ts              # Store configuration
├── slices/
│   ├── themeSlice.ts     # Theme (dark/light mode) state
│   ├── userSlice.ts      # User authentication state
│   └── searchSlice.ts    # Search functionality state
```

## Slices

### themeSlice

Manages the application's theme state (light/dark mode).

**State:**
```ts
interface ThemeState {
  isDarkMode: boolean;
}
```

**Actions:**
- `toggleTheme()` - Toggles between light and dark mode
- `setTheme(boolean)` - Sets the theme to a specific mode

### userSlice

Manages user authentication state.

**State:**
```ts
interface UserState {
  isAuthenticated: boolean;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
}
```

**Actions:**
- `setUser({ name, email, avatarUrl })` - Sets user information
- `clearUser()` - Clears user information (logout)

### searchSlice

Manages search functionality state.

**State:**
```ts
interface SearchState {
  query: string;
  suggestions: string[];
  isSearching: boolean;
}
```

**Actions:**
- `setQuery(string)` - Sets the current search query
- `setSuggestions(string[])` - Sets search suggestions
- `setIsSearching(boolean)` - Sets the searching state
- `clearSearch()` - Clears all search state

## Usage

To use the store in your application:

```tsx
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      {/* Your application components */}
    </Provider>
  );
}
```

## Accessing State

To access state in your components:

```tsx
import { useSelector } from 'react-redux';
import { RootState } from './store';

function MyComponent() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  
  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      {/* Component content */}
    </div>
  );
}
```

## Dispatching Actions

To dispatch actions in your components:

```tsx
import { useDispatch } from 'react-redux';
import { toggleTheme } from './store/slices/themeSlice';

function ThemeButton() {
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(toggleTheme())}>
      Toggle Theme
    </button>
  );
}
```

## Testing

Each slice includes unit tests. To run tests:

```bash
npm test
```

## Extending the Store

To add new functionality to the store:

1. Create a new slice using Redux Toolkit's `createSlice`
2. Add the new reducer to the store configuration in `index.ts`
3. Export the new types in `index.ts` if needed