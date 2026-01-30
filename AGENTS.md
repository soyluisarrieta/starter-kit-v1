# AGENTS.md

This file contains information for agentic coding agents working in this Laravel 12 + React Inertia.js project.

## Project Overview

- **Backend**: Laravel 12 with PHP 8.2+
- **Frontend**: React 19 with TypeScript, Inertia.js, and Tailwind CSS v4
- **Authentication**: Laravel Fortify + Socialite
- **UI Components**: Radix UI + custom shadcn/ui components
- **State Management**: Zustand for data tables, React hooks for local state
- **Testing**: PHPUnit for backend, no frontend testing framework configured

## Essential Commands

### Development

```bash
# Start full development stack (server + queue + vite)
composer run dev

# Start with SSR
composer run dev:ssr

# Start only Laravel development server
php artisan serve

# Start only Vite development server
npm run dev
```

### Building

```bash
# Build frontend assets
npm run build

# Build with SSR
npm run build:ssr
```

### Code Quality

```bash
# PHP code formatting (Laravel Pint)
composer run lint
# or
pint --parallel

# Test PHP code style
composer run test:lint

# Frontend linting and fixing
npm run lint

# Frontend type checking
npm run types

# Frontend formatting
npm run format

# Check frontend formatting
npm run format:check
```

### Testing

```bash
# Run all tests (includes linting)
composer run test

# Run only PHPUnit tests
php artisan test

# Run specific test file
php artisan test tests/Feature/DashboardTest.php

# Run specific test method
php artisan test --filter test_authenticated_users_can_visit_the_dashboard

# Run with coverage
php artisan test --coverage
```

### Database

```bash
# Run migrations
php artisan migrate

# Fresh migration with seeding
php artisan migrate:fresh --seed

# Create new migration
php artisan make:migration create_table_name

# Create factory
php artisan make:factory ModelFactory

# Create seeder
php artisan make:seeder SeederName
```

## Code Style Guidelines

### PHP (Laravel)

- **Formatter**: Laravel Pint with "laravel" preset
- **Naming**:
    - Classes: PascalCase (UserController, ProfileService)
    - Methods: camelCase (getUserProfile, createNewUser)
    - Variables: snake_case for database columns, camelCase for PHP variables
    - Constants: UPPER_SNAKE_CASE
- **File Structure**:
    - Controllers: `app/Http/Controllers/`
    - Models: `app/Models/`
    - Requests: `app/Http/Requests/`
    - Enums: `app/Enums/`
    - Actions: `app/Actions/`
- **Documentation**: Use PHPDoc blocks for methods and properties
- **Type Hints**: Always use strict types and declare return types
- **Models**: Use mass assignment carefully (prefer `$guarded` over `$fillable`)

### TypeScript/React

- **Formatter**: Prettier with Tailwind CSS plugin
- **Linter**: ESLint with TypeScript, React, and Import plugins
- **Imports**:
    - Order: builtin → external → internal → parent → sibling → index
    - Use consistent type imports: `import type { ... }`
    - Separate type imports from value imports
- **Naming**:
    - Components: PascalCase (DataTable, UserButton)
    - Functions: camelCase (useResponsiveColumns, cn)
    - Constants: UPPER_SNAKE_CASE for static values
    - Files: kebab-case for utilities, PascalCase for components
- **TypeScript**: Always use strict mode, prefer explicit typing
- **Components**:
    - Use forwardRef when needed
    - Prefer function components with hooks
    - Use Radix UI patterns for accessibility
- **Styling**:
    - Use Tailwind CSS v4 classes
    - Use `cn()` utility for conditional classes
    - Prefer component variants with class-variance-authority

### File Organization

```
resources/js/
├── components/
│   ├── ui/          # Reusable UI components
│   ├── data-table/  # Data table related components
│   └── user/        # User-specific components
├── pages/           # Inertia page components
├── layouts/         # Layout components
├── hooks/           # Custom React hooks
├── stores/          # Zustand stores
├── types/           # TypeScript type definitions
├── actions/         # Laravel action bindings
└── lib/             # Utility functions
```

## Testing Guidelines

### Backend (PHPUnit)

- **Structure**: Feature tests for HTTP behavior, Unit tests for business logic
- **Setup**: Use `RefreshDatabase` trait for database isolation
- **Naming**: `test_[what_should_happen]` format
- **Assertions**: Use Laravel's fluent assertion methods
- **Factories**: Use model factories for test data
- **Authentication**: Use `actingAs($user)` for authenticated tests

## Key Patterns

### Inertia.js Pages

- Use `usePage<SharedData>()` for typed page props
- Define breadcrumbs array for navigation
- Use `<Head>` component for page titles
- Wrap content in appropriate layout component

### UI Components

- Follow shadcn/ui patterns with Radix UI primitives
- Use `class-variance-authority` for component variants
- Export both component and variant definitions
- Use `data-slot` attributes for styling hooks

### Laravel Controllers

- Extend base `App\Http\Controllers\Controller`
- Use Form Request classes for validation
- Return Inertia responses for frontend pages
- Follow RESTful conventions

### Database

- Use Eloquent relationships extensively
- Implement proper casting for attributes
- Use Laravel's built-in authentication system
- Leverage Spatie Permission for role-based access

## Environment Setup

The project uses:

- Node.js (prefer latest LTS)
- PHP 8.2+
- Composer for PHP dependencies
- Bun or npm for frontend dependencies
- SQLite for testing (in-memory)

## Notes for Agents

1. Always run type checking (`npm run types`) and linting before committing
2. Use the existing component patterns - don't reinvent UI patterns
3. Follow the established import order and formatting rules
4. Test both backend and frontend changes thoroughly
5. Use Inertia.js patterns for data flow between frontend and backend
6. Respect the existing file organization and naming conventions
7. When creating new components, check if similar ones already exist in the `ui` folder
8. Use the established wayfinder integration for route generation in TypeScript
