# WelcomeSection Component

The WelcomeSection component is designed for the AnimalPedia homepage. It provides an engaging introduction to the site with a welcoming message and a call-to-action button.

## Features

- Responsive design for all device sizes
- Dark/light mode support
- Entrance animations for all elements
- Accessible navigation
- Modern, clean design with gradient background

## Usage

To use the WelcomeSection component in your application:

```tsx
import { WelcomeSection } from './components/WelcomeSection';

function HomePage() {
  return (
    <div>
      <WelcomeSection />
      {/* Rest of your page content */}
    </div>
  );
}
```

## Component Structure

```
WelcomeSection/
├── WelcomeSection.tsx    # Main component file
├── index.ts             # Export file
└── WelcomeSection.test.tsx  # Test file
```

## Props

The WelcomeSection component does not require any props.

## Styling

The component uses TailwindCSS classes for styling with:
- Responsive utility classes
- Dark mode variants
- Smooth transitions and animations
- Gradient backgrounds

## Animation

The component features entrance animations for:
- Heading (slides up with fade-in)
- Subtitle (slides up with fade-in, slight delay)
- Button (slides up with fade-in and scale, longer delay)

## Accessibility

The component follows accessibility best practices:
- Semantic HTML elements
- Proper contrast ratios for text
- Focus states for interactive elements
- Screen reader-friendly content