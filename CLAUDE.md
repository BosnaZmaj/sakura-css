# Sakura CSS Framework - Project Summary

## CRITICAL INSTRUCTION
**NO MENTION OF AI ASSISTANTS**: Never mention any AI assistants in code, comments, commit messages, or documentation. All work should appear as human-generated.
**NO EMOJIS**: Never use emojis in any code, comments, commit messages, or documentation.

## BREAKING CHANGES PREVENTION PROTOCOL - MANDATORY
**CRITICAL**: Before making ANY code changes, you MUST analyze existing code to prevent breaking changes.

### Pre-Change Analysis Requirements
**MANDATORY STEPS** before modifying or adding any code:

1. **Identify All Affected Components**
   - Search for all instances of the class/component you plan to modify
   - Check all HTML files that use the component
   - Review all CSS that styles the component
   - Find all JavaScript that interacts with the component

2. **Analyze Impact**
   - Will changing this break existing functionality?
   - Are there other components that depend on this?
   - Does this component have variants that need preservation?
   - Will this affect other pages or sections?

3. **Follow Component Modifier Pattern (BEM)**
   - NEVER modify base classes (`.sakura-btn`, `.sakura-modal`, etc.)
   - ALWAYS use modifiers for variations (`.sakura-modal--import`)
   - See "Component Modifier Pattern (BEM)" section below for details

4. **Document Your Analysis**
   - List what you checked
   - Confirm no breaking changes found, OR
   - Document what will break and get user approval

### Example Analysis Process
```
Task: Add import CSV modal

Step 1: Search existing modals
- Found: .sakura-modal in dashboard.html, transactions.html
- Count: 2 existing transaction modals

Step 2: Analyze base classes
- .sakura-modal has max-width: 680px, min-height: 800px
- Used by transaction modals which need that height

Step 3: Impact assessment
- Import modal is simpler, doesn't need min-height: 800px
- Should NOT modify .sakura-modal (would break transaction modals)
- Should ADD .sakura-modal--import modifier

Step 4: Decision
- Use base .sakura-modal structure
- Add .sakura-modal--import modifier for size adjustment
- No breaking changes to existing modals
```

### Violation Consequences
- Breaking existing functionality requires rollback
- Wastes development time fixing preventable issues
- Creates frustration and loss of trust
- May corrupt git history with revert commits

**REMEMBER**: Prevention is faster than fixing. ALWAYS analyze before changing.

## GIT COMMIT PROTOCOL - MANDATORY
**CRITICAL**: These rules are non-negotiable and must be followed for every commit:

### Commit Message Requirements
1. **ALWAYS DISPLAY COMMIT MESSAGE BEFORE COMMITTING**: Show the full commit message to the user for review before executing any git commit command
2. **NEVER REFERENCE AI**: Do not include any references to AI assistants, AI tools, Claude, Claude Code, or any automated assistance
3. **NO AI ATTRIBUTION**: Never add "Generated with", "Co-Authored-By: Claude", or any similar attribution lines
4. **NO AI SIGNATURES**: Do not append any signatures, footers, or metadata mentioning AI assistance
5. **HUMAN-GENERATED APPEARANCE**: All commit messages must appear as if written by a human developer

### Prohibited Content in Commits
- ❌ "Generated with [Claude Code]"
- ❌ "Co-Authored-By: Claude"
- ❌ Any mention of AI, assistants, or automated tools
- ❌ Emojis (as per project standards)

### Correct Commit Process
1. Draft commit message following conventional commit format
2. **Show the complete message to user for review**
3. Wait for user approval or edits
4. Only then execute the git commit command
5. If user requests changes, revise and show again before committing

### Example Commit Message Format
```
Brief descriptive title

Detailed explanation of changes:
- Bullet point of change 1
- Bullet point of change 2
- Bullet point of change 3

Technical details if needed:
- Implementation notes
- File changes
- Reasoning for approach
```

**VIOLATION CONSEQUENCES**: Adding AI attribution pollutes the git history and GitHub contributor graphs. This requires force-pushing to fix and can take 24+ hours for GitHub to update cached data.

## TAILWIND V4 UPGRADE PROGRESS TRACKER
**CURRENT TASK**: Upgrading from Tailwind CSS v3.4.0 to v4.1.14
**BRANCH**: `tailwind-v4-upgrade`
**STATUS**: In Progress - Step-by-step methodical migration

### Upgrade Methodology
We are taking a careful, step-by-step approach to avoid breaking changes:

1. Document current state
2. Backup existing configuration
3. Upgrade packages
4. Migrate configuration to v4 format
5. Test and fix breaking changes
6. Verify everything works
7. Merge to main when stable

### Progress Checklist

**Phase 1: Preparation & Documentation**
- [x] Document current Tailwind v3 setup
- [x] Backup tailwind.config.js
- [x] Document all custom utilities and plugins in use
- [x] List all files using @apply directives
- [x] Identify potential breaking changes

**Phase 2: Package Upgrade**
- [x] Update tailwindcss to v4.1.14
- [x] Update @tailwindcss/forms plugin
- [x] Update @tailwindcss/typography plugin
- [x] Update PostCSS if needed
- [x] Run npm install and verify no conflicts

**Phase 3: Configuration Migration**
- [x] Migrate tailwind.config.js to CSS-first configuration
- [x] Update theme customizations
- [x] Migrate custom colors
- [x] Migrate custom fonts
- [x] Migrate breakpoints
- [x] Convert plugins to v4 format

**Phase 4: CSS Migration & Testing**
- [x] Update main CSS file imports
- [x] Migrate @apply directives if deprecated
- [x] Update custom utility classes
- [x] Test all responsive utilities
- [x] Verify all animations work
- [x] Fix node_modules cache issue (v3 → v4)
- [x] Test development server
- [x] Verify CSS applying correctly

**Phase 5: Final Testing & Validation**
- [x] Test all pages visually
- [x] Verify responsive behavior on all breakpoints
- [ ] Check all interactive components
- [ ] Validate custom components (sakura-*)
- [x] Test production build
- [x] Performance check

**Phase 6: Final Steps**
- [x] Document breaking changes encountered
- [x] Update CLAUDE.md with final v4 info
- [ ] Commit final documentation
- [ ] Merge to main branch

### Current Step Details
**Step**: Phase 4 Complete - Phase 5 in Progress
**Completed**:
- Phase 1: Full v3 documentation and backup
- Phase 2: Package upgrades and PostCSS migration
- Phase 3: CSS-first theme configuration:
  * Migrated all theme config from JS to CSS @theme directive
  * Created 26 CSS color variables (--color-sakura-*)
  * Converted fonts, spacing, radius, shadows to CSS variables
  * Production build: SUCCESSFUL
  * Dev server: Running without errors
  * All 240 @apply directives: Functional
- Phase 4: Fixed critical node_modules cache issue:
  * Identified v3 packages still in node_modules despite package.json upgrade
  * Removed node_modules and package-lock.json
  * Fresh npm install with v4 packages
  * Dev server now running successfully on port 5173
  * CSS applying correctly in browser
  * User confirmed: "Looks great"

**Current Status**:
- Build working with Tailwind v4.1.14
- All custom Sakura utilities recognized
- Theme fully migrated to CSS-first approach
- Dev server running cleanly with no errors
- CSS properly applying in browser
- Ready for final validation and merge

**Next Steps**:
1. Commit the node_modules fix
2. Complete final validation testing
3. Document breaking changes encountered
4. Merge to main branch

### Important Notes
- Dev server auto-reloads when switching branches
- Browser always displays current branch code
- All changes isolated to upgrade branch
- Can switch back to main anytime with `git checkout main`

### Breaking Changes Encountered

**1. PostCSS Plugin Migration (BREAKING)**
- **v3**: `tailwindcss` plugin in postcss.config.js
- **v4**: `@tailwindcss/postcss` separate package required
- **Fix**: Install `@tailwindcss/postcss@4.1.14` and update config
```javascript
// OLD (v3)
plugins: { tailwindcss: {} }

// NEW (v4)
plugins: { '@tailwindcss/postcss': {} }
```

**2. CSS Import Syntax (BREAKING)**
- **v3**: `@tailwind base`, `@tailwind components`, `@tailwind utilities`
- **v4**: `@import "tailwindcss"`
- **Fix**: Replace all three @tailwind directives with single @import
```css
/* OLD (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* NEW (v4) */
@import "tailwindcss";
```

**3. Theme Configuration Migration (BREAKING)**
- **v3**: JavaScript-based `tailwind.config.js` with theme object
- **v4**: CSS-first configuration using `@theme` directive
- **Fix**: Migrate all theme customizations to CSS variables
```css
/* NEW (v4) */
@theme {
  --color-sakura-primary: #1e2a3b;
  --font-heading: Inter, system-ui, sans-serif;
  --spacing-18: 4.5rem;
  --radius-xl: 0.75rem;
  --shadow-subtle: 0 1px 2px 0 rgb(0 0 0 / 0.02);
}
```

**4. Node Modules Cache Issue (CRITICAL)**
- **Issue**: Upgrading package.json alone doesn't update node_modules
- **Symptom**: PostCSS errors about `@tailwind base` directive despite using v4 syntax
- **Root Cause**: node_modules contained Tailwind v3 even after package.json upgrade
- **Fix**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**5. Package Updates Required**
- `tailwindcss`: 3.4.0 → 4.1.14
- `@tailwindcss/postcss`: New package (4.1.14)
- `@tailwindcss/forms`: 0.5.7 → 0.5.10
- `@tailwindcss/typography`: 0.5.10 → 0.5.19

**Non-Breaking Changes:**
- ✅ `@apply` directive: Still works (240 instances tested)
- ✅ `@layer base/components`: Still functional
- ✅ Custom components: All sakura-* classes working
- ✅ Responsive utilities: No changes needed
- ✅ Animations: All working correctly
- ✅ Build process: Same Vite configuration works

## CRITICAL PROJECT CONTEXT
**IMPORTANT**: We are recreating the complete Sakura Budget web application from `/Users/indy/Projects/HTML/sakura-website/` as a TailwindCSS-based framework called sakura-css. This is NOT building from scratch - we're converting an existing, sophisticated financial application into a reusable framework.

## Source Material Analysis
**Reference Location**: `/Users/indy/Projects/HTML/sakura-website/`

### Complete Application Structure
The source contains a full-featured financial dashboard application with:

1. **Multiple Pages**:
   - `index.html` - Marketing landing page
   - `dashboard.html` - Main dashboard overview
   - `envelope-detail.html` - Envelope budget management
   - `transactions.html` - Transaction management
   - `goals.html` - Goal tracking system
   - `login.html` / `signup.html` - Authentication pages

2. **Sophisticated CSS Architecture**:
   - `budgetflow.css` - Main design system with CSS custom properties
   - `components.css` - Complex financial components (envelope cards, account cards, charts)
   - `dashboard.css` - Dashboard-specific layouts
   - `auth.css`, `envelope-detail.css`, `goals.css`, `transactions.css` - Page-specific styles

3. **Financial Components We Must Recreate**:
   - **Envelope Cards**: Budget tracking cards with progress bars and custom theming
   - **Account Cards**: Bank account display with sparkline charts
   - **Summary Cards**: Financial overview cards with animated counters
   - **Goal Cards**: Savings goal tracking with progress visualization
   - **Transaction Lists**: Sophisticated transaction display with filtering
   - **Dashboard Layout**: Complete sidebar navigation + header + main content
   - **Charts**: Donut charts, sparklines, progress bars
   - **Modals**: Complex forms for creating/editing financial data

### Critical Design System Details from Source
- **CSS Custom Properties**: Extensive use of `--primary`, `--secondary`, `--envelope-color` variables
- **Class Naming Conversion**: Source uses simple names (`envelope-card`, `btn btn-primary`) → We convert to `sakura-envelope-card`, `sakura-btn sakura-btn--primary` for branding
- **Advanced CSS**: Backdrop blur, complex pseudo-elements, CSS animations, theming system
- **Responsive Design**: Mobile-first approach with comprehensive breakpoints

## Current Status - Dashboard & Transactions Pages Complete
**Latest Work**: Successfully completed transactions page with advanced timeline, table, and calendar views.
**Branch**: `dashboard`
**Status**: Dashboard Phase 7 of 10 completed + Transactions Page 99% complete

### Dashboard Implementation Progress

**Completed Phases (Phases 1-7)**:
1. **Phase 1**: Base dashboard structure and layout - COMPLETE
2. **Phase 2**: Dashboard header with navigation - COMPLETE
3. **Phase 3**: Dashboard sidebar - COMPLETE
4. **Phase 4**: Welcome section component - COMPLETE
5. **Phase 5**: Budget summary cards with sparklines - COMPLETE
6. **Phase 6**: Envelope card component - COMPLETE
   - 4 envelope cards with dynamic color theming
   - Progress bars with animated shimmer effects
   - Status badges with colored backgrounds (green/orange/red)
   - Hover effects with lift and scale animations
   - Responsive grid layout
7. **Phase 7**: Goal card component - COMPLETE
   - 2 savings goal cards with progress tracking
   - Green gradient theme for success/savings
   - Animated progress bars with sparkle effect
   - Action buttons for adding funds and viewing details
   - Fully responsive design

**Remaining Phases (Phases 8-10)**:
8. **Phase 8**: Transaction list component - COMPLETE (implemented in transactions.html)
9. **Phase 9**: Alerts and interactive elements - PENDING
10. **Phase 10**: Test and refine dashboard page - PENDING

### Transactions Page Implementation - COMPLETE (99%)

**Full-Featured Transactions Page** (`transactions.html`):
- **Page Header**: Title, description, and action buttons (Import CSV, Export, Add Transaction)
- **Transaction Summary Cards**: 4-card grid showing Total Income, Total Expenses, Net Flow, and Total Transactions
- **Advanced Search & Filters**:
  - Large search box with icon
  - Filter by Type (Income/Expense/Transfer)
  - Filter by Envelope (Groceries, Entertainment, Transportation, etc.)
  - Filter by Date Range (Today, Week, Month, Quarter, Year, Custom)
  - Filter by Amount ranges
  - Clear filters button
- **View Toggle System**: Three distinct view modes
  - **Timeline List View** (default):
    - Vertical timeline with date bubbles
    - Date groups with transaction counts and daily totals
    - Individual transaction cards with icons, details, envelopes, and amounts
    - Timeline connection lines and hover effects
    - Color-coded envelope badges
    - Recurring transaction tags
  - **Table View**:
    - Sortable columns (Date, Description, Envelope, Amount)
    - Checkbox selection for bulk actions
    - Color-coded envelope and amount badges
    - Edit/Delete action buttons per row
  - **Calendar View**:
    - Month grid with navigation
    - Weekday headers
    - Calendar day cells (ready for transaction indicators)
- **Bulk Actions**: Select All, Edit Selected, Delete Selected
- **Results Header**: Transaction count and total display
- **Load More Pagination**: Button with count display
- **Full Responsive Design**: Mobile, tablet, and desktop breakpoints

**Components Converted to Sakura Framework**:
- `sakura-page-header` - Page title and actions
- `sakura-transaction-summary` - Summary cards grid
- `sakura-transaction-controls` - Search and filter system
- `sakura-search-box-large` - Large search input
- `sakura-filter-controls` - Filter group grid
- `sakura-filter-group` / `sakura-filter-select` - Individual filters
- `sakura-view-toggle` - View mode buttons
- `sakura-transaction-timeline` - Timeline layout system
- `sakura-date-group` - Date grouping with bubble
- `sakura-transaction-item` - Individual transaction card
- `sakura-transaction-icon` - Transaction type icon
- `sakura-transaction-envelope` - Color-coded category badges
- `sakura-transaction-table` - Data table view
- `sakura-calendar-view` - Calendar grid view
- `sakura-load-more-container` - Pagination controls

**CSS Styles**: All transaction page styles converted with sakura- prefix and added to `src/sakura.css`

### Recent Fixes and Enhancements
- Fixed button hover states for proper color inversion
  - Primary buttons: dark background to white on hover
  - Outline buttons: white background to dark on hover
- Added colored backgrounds to all envelope status badges
  - status-good: Green tinted background
  - status-warning: Orange tinted background
  - status-danger: Red tinted background
- Implemented comprehensive responsive design
  - 2-column grid on tablets (max-width: 768px)
  - Single column on mobile (max-width: 480px)

### Files Modified
- `dashboard.html`: Complete dashboard structure with envelope and goal sections
- `transactions.html`: Full transactions page with timeline, table, and calendar views
- `src/sakura.css`: Added 1000+ lines of transaction page styles

### Next Session
Continue with Phase 9: Implement alerts and interactive elements for dashboard

## Design Philosophy & Principles

### Core Design Language
- **Japanese-inspired minimalism**: Clean, uncluttered, mindful design
- **Professional fintech standards**: Trustworthy, secure, sophisticated
- **Component-by-component development**: Building one component at a time to satisfaction
- **Iterative refinement**: No moving forward until quality standards met

### CRITICAL: Component Modifier Pattern (BEM)
**MANDATORY RULE**: Never modify base component classes directly. Always use modifiers for variations.

**The Pattern:**
When you need to change an existing component's appearance or behavior, DO NOT edit the base class. Instead, create a modifier using the `--modifier` naming convention:

```css
/* Base component - NEVER MODIFY THIS */
.sakura-cta-wave {
  /* Base styles that apply to all instances */
}

/* Modifier for specific variant - ADD THIS INSTEAD */
.sakura-cta-wave--top {
  /* Only the differences for this variant */
}
```

**Real Example from CTA Component:**
```html
<!-- Base class + modifier for variation -->
<div class="sakura-cta-wave sakura-cta-wave--top">
```

**Why This Matters:**
- Changing the base class breaks ALL instances across the entire site
- Modifiers keep components reusable and maintainable
- Each component can have multiple variants without conflicts
- Other developers (or future you) can safely use base components

**Common Modifier Patterns:**
- Position: `--top`, `--bottom`, `--left`, `--right`
- Size: `--sm`, `--md`, `--lg`, `--xl`
- Style: `--primary`, `--secondary`, `--outline`, `--ghost`
- State: `--active`, `--disabled`, `--loading`, `--error`
- Theme: `--dark`, `--light`, `--compact`, `--expanded`

**Button Example:**
```css
.sakura-btn { /* Base button */ }
.sakura-btn--primary { /* Blue primary button */ }
.sakura-btn--outline { /* Outlined button */ }
.sakura-btn--sm { /* Small size */ }
.sakura-btn--lg { /* Large size */ }
```

**Usage:**
```html
<button class="sakura-btn sakura-btn--primary sakura-btn--lg">
  Large Primary Button
</button>
```

**VIOLATION EXAMPLE - NEVER DO THIS:**
```css
/* WRONG - Modifying base class breaks all buttons */
.sakura-btn {
  background: red; /* This affects EVERY button on the site! */
}
```

**CORRECT APPROACH:**
```css
/* RIGHT - Create a new modifier */
.sakura-btn--danger {
  background: red; /* Only danger buttons are affected */
}
```

### Typography Hierarchy
- **Brand Elements**: Playfair Display (elegant serif, brand identity only)
- **H1 & H2 Headings**: Inter (modern sans-serif, main headings)
- **All Other Text**: Poppins (UI, body text, code, data)

### Color Palette
- **Primary Body Background**: #F5F8FA (light blue-gray)
- **Card/Section Backgrounds**: Pure white (#ffffff)
- **Primary Brand Color**: #1E2A3B (deep navy)
- **Accent Colors**: Blue (#5B8BF5) and Purple (#8B5CF6) for subtle effects

## Technical Foundation
- **Framework**: TailwindCSS v4.1.14 with CSS-first configuration
- **Build Tool**: Vite for development and building
- **Structure**: Component-first architecture with sakura-* naming convention
- **Animations**: CSS keyframes for floating effects and smooth transitions
- **Theme System**: CSS @theme directive with custom properties
- **Plugins**: @tailwindcss/forms, @tailwindcss/typography (v4 compatible)

## Key Files
- `/src/sakura.css`: Main CSS framework with all component styles
- `/index.html`: Landing page showcasing the design system
- `/src/sakura.js`: JavaScript for interactive components

## CRITICAL DEVELOPMENT METHODOLOGY

### Component-by-Component Recreation Process
**MANDATORY APPROACH**: We work ONE component at a time through two phases:

**Phase 1 - Exact Recreation** (Required First):
1. **Select Single Component** from source material (`sakura-website`)
2. **Analyze Original Implementation** (CSS custom properties, HTML structure, animations)
3. **Convert to TailwindCSS Framework** while maintaining identical visual appearance
4. **Test with Working Mockup** to ensure functionality matches original exactly
5. **User Approval Required** - NO progression until component matches source perfectly

**Phase 2 - Enhancement (Optional)**:
6. **Evaluate Enhancement Opportunities** - Identify potential improvements
7. **Implement Upgrades** - Design/UX/functional improvements beyond original
8. **User Approval for Enhancements** - Confirm improvements meet vision

**Then Repeat for Next Component** - systematic recreation and enhancement of entire application

### Framework Conversion Requirements
**Converting CSS Custom Properties to TailwindCSS**:
- Original uses `--primary`, `--secondary` variables → Convert to TailwindCSS utilities + CSS custom properties
- Original uses simple classes (`envelope-card`) → Convert to branded `sakura-envelope-card` for recognition/marketing
- Preserve all animations, hover effects, and micro-interactions exactly
- Maintain responsive breakpoints and mobile-first approach
- Convert backdrop blur, complex pseudo-elements, and gradient systems

### Component Recreation Priority
**Phase 1 - Core Landing Page Components**:
1. Navigation system (`sakura-navbar` with mobile toggle)
2. Hero section with dashboard preview (`sakura-hero`)
3. Feature cards grid (`sakura-feature-card`)
4. CTA section and footer (`sakura-cta`, `sakura-footer`)

**Phase 2 - Financial Dashboard Components**:
1. Dashboard layout (`sakura-dashboard-header`, `sakura-sidebar`, etc.)
2. Envelope cards (`sakura-envelope-card`) with progress tracking
3. Account cards (`sakura-account-card`) with sparkline charts
4. Summary cards (`sakura-summary-card`) with animated counters
5. Transaction list (`sakura-transaction-list`) with filtering
6. Goal tracking cards (`sakura-goal-card`)
7. Chart components (`sakura-donut-chart`, `sakura-progress-bar`)
8. Modal systems (`sakura-modal`) for editing

### Quality Standards
**Phase 1 - Exact Recreation**:
- **Exact Visual Recreation**: Must match source pixel-perfect
- **Functional Completeness**: All interactions and animations working identical to source
- **Code Quality**: Clean TailwindCSS implementation
- **Responsive Design**: Mobile-first matching original breakpoints exactly
- **Performance**: Optimized animations and transitions

**Phase 2 - Enhancement Flexibility** (After exact recreation):
- **Design Upgrades**: May enhance/modernize visual design beyond original
- **Functional Improvements**: May add new features or improve existing ones
- **UX Enhancements**: May optimize user experience and interactions
- **Performance Optimization**: May improve beyond original implementation

## User Preferences Learned
- **Gradient Colors**: Prefers subtle, light backgrounds over bold colorful gradients
- **Visual Prominence**: Likes effects to be noticeable but not overwhelming
- **Design Aesthetic**: Values clean, professional appearance over decorative elements
- **Incremental Changes**: Prefers step-by-step adjustments with immediate feedback

## CURRENT STATUS & CRITICAL GAP ANALYSIS

### What We Have vs. What We Need
**Current Implementation Status**:
1. **Correct Class Naming**: Already using `sakura-` prefix correctly for branding/recognition
2. **Missing Components**: Need financial dashboard components (envelope cards, account cards, etc.)
3. **Incomplete Design System**: Missing CSS custom properties system from source
4. **Basic Structure Only**: Landing page exists but needs enhancement to match original sophistication
5. **No Dashboard Pages**: Missing dashboard.html, envelope-detail.html, goals.html, etc.

### Immediate Next Steps
**ENHANCEMENT REQUIRED**: We need to expand our current foundation:

1. **Keep Current Naming** - `sakura-` prefix is correct for branding purposes
2. **Implement CSS Custom Properties** - Add `:root` variables system from source
3. **Choose First Component** - Select single component for exact recreation
4. **Create Working Mockup** - Build testable version to validate accuracy

### Component Selection for Next Phase
**Recommended Starting Point**: Choose ONE component to perfect:
- Navigation system (good foundation, needs refinement)
- Hero section dashboard preview (needs complete rebuild)
- Envelope card component (financial core feature)
- Dashboard layout structure (application foundation)

### Framework Architecture Needs
**Convert from Source**:
- `budgetflow.css` design tokens → TailwindCSS configuration
- `components.css` financial components → Framework components
- Multiple CSS files → Unified framework approach
- CSS animations and interactions → TailwindCSS utilities

## Next Development Focus
**DECISION REQUIRED**: User must select which single component to recreate first from the sakura-website source material. All subsequent work depends on this choice.

## Git Branch
Current work is on the `dashboard` branch.

## Development Server
Uses `npm run dev` for local development with hot reloading.

## About Page Story - COMPLETED
**STATUS**: Company story successfully implemented in about.html

### Implemented Content
The About page now features a comprehensive timeline design showing the 16-year journey from 2009 to 2026:

**Timeline Milestones**:
- **2009 - The Discovery**: Indy discovers envelope budgeting through a desktop program
- **2022 - The Search**: After 13 years, searches for modern replacement (YNAB, Monarch, Copilot, Goodbudget)
- **2023 - The Decision**: Decides to build it himself as cybersecurity expert and Senior Software Engineer at FIS Global
- **2025 - The Alpha Stage**: Three years of development culminate in final alpha testing
- **2026 - Beta & Beyond**: Preparing for beta testing with security-first design

**Additional Sections**:
- "Why Sakura?" explanation with cherry blossom symbolism (beauty, calm, perfect timing)
- Values section (Simplicity, Trust, Empowerment, Innovation)
- Founder profile for Indy Subašić (cybersecurity background, 16 years envelope budgeting experience)
- Mission statement emphasizing security-first, intuitive simplicity, and stress-free finances
- Alpha status messaging throughout explaining the deliberate development approach