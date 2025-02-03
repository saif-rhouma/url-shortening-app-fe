# React TypeScript Documentation For URL SHORTENED SERVICE App

## Project Overview

This project is a **React TypeScript** application structured by _Saifeddine RHOUMA_ to ensure maintainability and scalability. It utilizes **Vite** as the build tool and integrates TypeScript, ESLint, Prettier, and Vitest for code quality and testing.

---

## Directory Structure

```
react-ts-skeleton
├── .env.development       # Environment variables for development
├── .env.production        # Environment variables for production
├── .git                   # Git repository metadata
├── .gitignore             # Files to ignore in Git
├── .husky                 # Pre-commit hooks configuration
├── .nvmrc                 # Node.js version management
├── .prettierrc            # Prettier formatting configuration
├── README.md              # Project documentation
├── doc                    # Additional documentation
│   └── readme.md          # Additional documentation file
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── node_modules           # Project dependencies
├── package-lock.json      # Dependency lock file
├── package.json           # Project metadata and scripts
├── public                 # Static assets
│   └── vite.svg           # Vite logo
├── src                    # Source code
│   ├── assets             # Static assets (CSS, images, etc.)
│   │   └── css
│   │       └── index.css  # Global styles
│   ├── common             # Shared utilities and types
│   │   ├── constants
│   │   │   └── .gitkeep   # Placeholder for constants
│   │   ├── helpers
│   │   │   └── .gitkeep   # Placeholder for helper functions
│   │   ├── types
│   │   │   ├── types.ts   # Type definitions
│   │   │   └── url.ts     # URL-related types
│   │   └── utils
│   │       └── axios.ts   # Axios instance for API calls
│   ├── components         # UI components
│   │   ├── MainForm.tsx   # Main form component
│   │   ├── Redirect.tsx   # Redirect component
│   │   └── ui             # Reusable UI components
│   │       ├── ConfirmDialog.tsx
│   │       ├── Form.tsx
│   │       ├── LoadingAnimation.tsx
│   │       ├── LoadingButton.tsx
│   │       ├── ToastDanger.tsx
│   │       └── ToastSuccess.tsx
│   ├── configs            # Configuration files
│   │   └── config-global.ts # Global configuration settings
│   ├── contexts           # React contexts (state management)
│   │   └── .gitkeep       # Placeholder for context files
│   ├── hooks              # Custom React hooks
│   │   └── use-boolean.ts # Hook for managing boolean state
│   ├── layouts            # Layout components
│   ├── main.tsx           # Application entry point
│   ├── pages              # Page components
│   │   └── Home.tsx       # Home page
│   ├── services           # API service layer
│   │   └── shortened.service.ts # API service for URL shortening
│   └── vite-env.d.ts      # TypeScript definitions for Vite
├── test                   # Test files
│   ├── components
│   │   ├── MainForm.test.tsx
│   │   └── Redirect.test.tsx
│   └── main.test.ts       # Main application test
├── tsconfig.app.json      # TypeScript configuration for the app
├── tsconfig.json          # TypeScript base configuration
├── tsconfig.node.json     # TypeScript configuration for Node.js
├── vite.config.ts         # Vite configuration
└── vitest.config.ts       # Vitest testing framework configuration
```

---

## Installation

Ensure you have **Node.js** installed. Use the specified version in `.nvmrc`:

```sh
nvm use
```

Then install dependencies:

```sh
npm install
```

---

## Running the Project

To start the development server:

```sh
npm run dev
```

To build for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run preview
```

---

## Linting and Formatting

To run ESLint:

```sh
npm run lint
```

To format code with Prettier:

```sh
npm run format
```

---

## Testing

Run unit tests using **Vitest**:

```sh
npm run test
```

---

## Project Structure Explanation

- **`src/assets`**: Stores static assets such as stylesheets.
- **`src/common`**: Contains constants, helpers, and utility functions.
- **`src/components`**: Houses reusable UI components.
- **`src/configs`**: Stores global configurations.
- **`src/hooks`**: Includes custom React hooks.
- **`src/pages`**: Defines the different application pages.
- **`src/services`**: Contains API service files.
- **`test`**: Stores test files for components and main logic.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a Pull Request.

---

## License

This project is licensed under the **MIT License**.

---

## Contact

For any issues or suggestions, open an issue on the repository.

---

### Happy Coding! 🚀
