# Sakura CSS Framework - Project Summary

## CRITICAL INSTRUCTION
**NO MENTION OF AI ASSISTANTS**: Never mention any AI assistants in code, comments, commit messages, or documentation. All work should appear as human-generated.
**NO EMOJIS**: Never use emojis in any code, comments, commit messages, or documentation.

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
- [ ] Document breaking changes encountered
- [ ] Update CLAUDE.md with final v4 info
- [ ] Commit changes with detailed message
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

### Breaking Changes to Watch For
- CSS-first configuration (no more tailwind.config.js)
- Some utility class changes
- Plugin API changes
- @apply directive changes
- Build process differences

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

## Current Status - Background Enhancement Complete
**Latest Work**: Successfully enhanced the hero section background prominence through iterative opacity adjustments of floating blur effects.

### Background Enhancement Journey
1. **Initial Request**: User wanted site-wide gradient background (except footer)
2. **Implementation Challenge**: Discovered sections had independent gradients instead of continuous flow
3. **Solution**: Applied single gradient to body with `background-attachment: fixed` and transparent sections
4. **Gradient Testing Phase**: Tested multiple gradient options but user found them all either:
   - Too dark and clashing with other elements
   - Too light and depressive
5. **Final Decision**: Reverted to original hero-only background design
6. **Enhancement**: Increased opacity of floating blur effects for more prominence:
   - Blue blur (::before): Final opacity 0.55
   - Purple blur (::after): Final opacity 0.45

### Current Hero Background Implementation
```css
.sakura-hero::before {
  background: radial-gradient(circle, rgba(91, 139, 245, 0.55) 0%, transparent 60%);
  filter: blur(80px);
  animation: sakuraHeroFloat 20s ease-in-out infinite;
}

.sakura-hero::after {
  background: radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, transparent 60%);
  filter: blur(80px);
  animation: sakuraHeroFloat 25s ease-in-out infinite reverse;
}
```

## Design Philosophy & Principles

### Core Design Language
- **Japanese-inspired minimalism**: Clean, uncluttered, mindful design
- **Professional fintech standards**: Trustworthy, secure, sophisticated
- **Component-by-component development**: Building one component at a time to satisfaction
- **Iterative refinement**: No moving forward until quality standards met

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
- **Framework**: TailwindCSS v4 with custom component layer
- **Build Tool**: Vite for development and building
- **Structure**: Component-first architecture with sakura-* naming convention
- **Animations**: CSS keyframes for floating effects and smooth transitions

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
Current work is on the `Phase-1` branch.

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