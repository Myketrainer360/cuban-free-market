# Cuban Free Market

A modern Angular marketplace application built with Angular 19 and TypeScript. This application provides a platform for free trade and entrepreneurship in Cuba.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)
- [Testing](#testing)
- [Code Style](#code-style)

## Features

- Modern Angular 19 with standalone components
- Lazy loading routes for optimal performance
- HTTP interceptors for authentication and error handling
- Responsive design with mobile-first approach
- Reusable components library
- Custom validators and utilities
- Type-safe with TypeScript
- Environment-based configuration

## Architecture

This project follows Angular best practices and a feature-based architecture:

### Core Principles

1. **Standalone Components**: Using Angular 19's standalone API for better tree-shaking and modularity
2. **Lazy Loading**: Feature modules are lazy-loaded to improve initial load time
3. **Separation of Concerns**: Clear separation between core, shared, and feature modules
4. **Type Safety**: Full TypeScript support with strict mode enabled
5. **Scalability**: Architecture designed to scale with your application

### Architecture Layers

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Components, Templates, Routing)       │
├─────────────────────────────────────────┤
│          Application Layer              │
│    (Guards, Interceptors, Services)     │
├─────────────────────────────────────────┤
│            Domain Layer                 │
│        (Models, Interfaces)             │
└─────────────────────────────────────────┘
```

## Project Structure

```
src/
├── app/
│   ├── core/                    # Singleton services, guards, interceptors
│   │   ├── guards/             # Route guards (auth.guard.ts)
│   │   ├── interceptors/       # HTTP interceptors (auth, error)
│   │   ├── models/             # Domain models (user, product)
│   │   ├── services/           # Core services (api, storage)
│   │   └── index.ts            # Barrel export
│   │
│   ├── shared/                  # Shared/reusable components
│   │   ├── components/         # Shared components (button, loading)
│   │   ├── directives/         # Shared directives (click-outside)
│   │   ├── pipes/              # Shared pipes (currency-format, time-ago)
│   │   ├── utils/              # Utility functions (validators)
│   │   └── index.ts            # Barrel export
│   │
│   ├── features/                # Feature modules
│   │   ├── home/               # Home page feature
│   │   ├── marketplace/        # Marketplace feature
│   │   └── auth/               # Authentication feature
│   │       └── login/          # Login page
│   │
│   ├── layout/                  # Layout components
│   │   ├── header/             # Header component
│   │   ├── footer/             # Footer component
│   │   ├── sidebar/            # Sidebar component
│   │   └── main-layout/        # Main layout wrapper
│   │
│   ├── app.component.ts         # Root component
│   ├── app.config.ts            # Application configuration
│   └── app.routes.ts            # Application routes
│
├── environments/                # Environment configurations
│   ├── environment.ts           # Development environment
│   └── environment.prod.ts      # Production environment
│
├── styles.css                   # Global styles with design tokens
└── index.html                   # Main HTML file
```

### Folder Descriptions

#### `/core` - Singleton Services
Contains application-wide singleton services, guards, and interceptors:
- **Guards**: Route protection (authentication, authorization)
- **Interceptors**: HTTP request/response handling (auth tokens, error handling)
- **Models**: TypeScript interfaces and types
- **Services**: API communication, storage, state management

#### `/shared` - Reusable Components
Contains components, directives, and pipes that are used across multiple features:
- **Components**: UI components (buttons, modals, loading spinners)
- **Directives**: Attribute directives for DOM manipulation
- **Pipes**: Data transformation pipes
- **Utils**: Helper functions and validators

#### `/features` - Feature Modules
Each feature is self-contained with its own components, services, and routing:
- Lazy-loaded for better performance
- Feature-specific logic and state
- Can have sub-features

#### `/layout` - Layout Components
Application shell components:
- Header, footer, sidebar
- Main layout wrapper
- Navigation components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cuban-free-market
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200/`

## Development

### Creating a New Component

```bash
ng generate component features/my-feature/my-component --standalone
```

### Creating a New Service

```bash
ng generate service core/services/my-service
```

### Creating a New Guard

```bash
ng generate guard core/guards/my-guard --functional
```

### Development Commands

```bash
npm start          # Start dev server
npm run build      # Production build
npm run watch      # Watch mode
npm test           # Run unit tests
```

## Building

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Build Optimization

The production build includes:
- Ahead-of-Time (AOT) compilation
- Tree shaking
- Minification
- Bundle optimization
- Output hashing for cache busting

## Testing

### Unit Tests

Run unit tests with Karma:
```bash
npm test
```

### Test Coverage

Generate test coverage report:
```bash
ng test --code-coverage
```

## Code Style

### TypeScript

- Use strict mode
- Prefer `const` over `let`
- Use meaningful variable names
- Add JSDoc comments for public APIs

### Angular

- Use standalone components
- Follow the official Angular style guide
- Use OnPush change detection when possible
- Keep components small and focused

### CSS

- Use CSS variables for theming
- Follow BEM naming convention for custom classes
- Use utility classes when appropriate
- Mobile-first responsive design

## Environment Variables

Configure environment-specific values in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

Available variables:
```typescript
{
  production: boolean;
  apiUrl: string;
  appName: string;
  version: string;
}
```

## HTTP Interceptors

The application includes two HTTP interceptors:

1. **Auth Interceptor**: Adds authentication token to requests
2. **Error Interceptor**: Handles HTTP errors globally

## Route Guards

- **authGuard**: Protects routes that require authentication

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)

## License

This project is licensed under the MIT License.
