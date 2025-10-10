# Tailwind v3.4.0 Configuration Backup

**Date**: October 10, 2025
**Branch**: tailwind-v4-upgrade
**Purpose**: Document current Tailwind v3 setup before upgrading to v4.1.14

## Current Package Versions

```json
{
  "tailwindcss": "^3.4.0",
  "@tailwindcss/forms": "^0.5.7",
  "@tailwindcss/typography": "^0.5.10",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32",
  "vite": "^5.0.10"
}
```

## Configuration File Structure

### tailwind.config.js
- **Content paths**: `*.html`, `src/**/*.{js,ts,jsx,tsx,vue,html}`, `pages/**/*.html`
- **Plugins**: @tailwindcss/forms, @tailwindcss/typography
- **Theme customizations**: Extensive (see details below)

### postcss.config.js
- Standard configuration with tailwindcss and autoprefixer

## Theme Customizations

### Custom Colors (Sakura Brand)
```javascript
colors: {
  sakura: {
    primary: '#1e2a3b',
    'primary-light': '#2d3f5a',
    'primary-dark': '#0f1419',
    secondary: '#5b8bf5',
    'secondary-light': '#7ba5ff',
    accent: '#10b981',
    'accent-light': '#34d399',
    warning: '#f59e0b',
    danger: '#ef4444',
    success: '#10b981',
    purple: '#8b5cf6',
    'purple-light': '#a78bfa',
    pink: '#ec4899',
    'pink-light': '#f472b6',
    white: '#ffffff',
    gray: { /* 50-900 scale */ }
  }
}
```

### Custom Fonts
```javascript
fontFamily: {
  'heading': ['Inter', 'system-ui', 'sans-serif'],
  'body': ['Poppins', 'system-ui', 'sans-serif']
}
```

### Custom Spacing
```javascript
spacing: {
  '18': '4.5rem',
  '88': '22rem'
}
```

### Custom Border Radius
```javascript
borderRadius: {
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.25rem',
  '4xl': '1.75rem',
  '5xl': '2rem',
  '6xl': '2.5rem'
}
```

### Custom Box Shadows
```javascript
boxShadow: {
  'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.02)',
  'soft': '0 2px 4px 0 rgb(0 0 0 / 0.03), 0 1px 2px 0 rgb(0 0 0 / 0.02)',
  'medium': '0 4px 8px -2px rgb(0 0 0 / 0.04), 0 2px 4px -1px rgb(0 0 0 / 0.03)',
  'elevated': '0 10px 20px -5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.04)',
  'high': '0 20px 30px -10px rgb(0 0 0 / 0.08), 0 8px 12px -4px rgb(0 0 0 / 0.05)'
}
```

## Main CSS File (src/sakura.css)

### Structure
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Base styles */
}

@layer components {
  /* Custom Sakura components */
}
```

### Usage Statistics
- **@apply directives**: 240 instances throughout the file
- **@layer base**: Custom HTML/body defaults, forced transparency rules, heading fonts
- **@layer components**: All sakura-* component classes
- **Custom CSS**: Extensive component styling with backdrop-filter, animations, gradients

### Key Base Layer Rules
1. Default font: Poppins for body
2. Heading font: Inter for h1-h6
3. Transparency enforcement for non-sakura elements
4. Box-sizing: border-box for all elements

## Files Using Tailwind Classes

### HTML Files (9 total)
- index.html
- about.html
- pricing.html
- help.html
- help-first-budget.html
- blog.html
- blog-envelope-budgeting.html
- terms.html
- privacy.html

### CSS Files
- src/sakura.css (main framework file)
- src/bootstrap-icons.css (icons)

## Critical Features to Preserve

1. **Sakura brand color system**: All custom colors must remain
2. **Typography hierarchy**: Inter for headings, Poppins for body
3. **Custom spacing**: 18 and 88 values are used throughout
4. **Extended border radius**: 3xl through 6xl are actively used
5. **Custom shadows**: All 5 shadow variants are in use
6. **@apply usage**: 240 instances need to be compatible with v4
7. **Layer system**: @layer base and @layer components organization

## Known Dependencies

### External Services
- Google Fonts: Inter, Poppins
- Bootstrap Icons: via bootstrap-icons.css

### Build System
- Vite: Development and production builds
- PostCSS: CSS processing pipeline
- Autoprefixer: Vendor prefix handling

## Potential V4 Migration Concerns

1. **@apply directive**: May have changes in v4
2. **@layer syntax**: Need to verify v4 compatibility
3. **Plugin format**: @tailwindcss/forms and @tailwindcss/typography may need updates
4. **Config migration**: Move from tailwind.config.js to CSS-first approach
5. **Import syntax**: @tailwind directives may change to @import

## Next Steps

1. Backup this configuration (DONE)
2. Research v4 breaking changes
3. Create migration plan
4. Update packages
5. Migrate configuration
6. Test thoroughly
