# tsprotemplate

Professional-grade TypeScript project template with modern tooling, security-first development practices, and automated workflows.

## 🚀 Features

- **Modern TypeScript**: ES2022+ syntax with strict configuration and ESM modules
- **Code Quality**: ESLint + Prettier with pre-configured rules for consistent, readable code
- **Testing**: Jest with ESM support, coverage thresholds, and watch modes
- **Git Hooks**: Husky + lint-staged for pre-commit quality checks
- **Documentation**: TypeDoc with automatic API generation and live reload
- **CLI-Ready**: Built-in argument parsing and binary distribution support
- **Node.js**: Requires Node.js 20+ with NVM support

## 📋 Prerequisites

- **Node.js**: `>=20.0.0` (managed via `.nvmrc`)
- **npm**: Comes with Node.js

## 🔧 Installation

### As a Template (Recommended)

1. Click **"Use this template"** on GitHub
2. Clone your new repository
3. Install dependencies:

```bash
npm install
```

## 📖 Usage

### Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the project
npm run build

# Run the compiled output
npm start
```

### CLI Usage

After building, use the binary:

```bash
tsprotemplate [arguments]
```

The CLI uses `simpleargumentsparser` for argument handling.

## 🛠 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Clean and compile TypeScript to `dist/` |
| `npm run dev` | Run directly with ts-node (no build needed) |
| `npm run start` | Execute compiled application |
| `npm test` | Run Jest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Validate TypeScript types |
| `npm run push` | Custom push utility (see `utils/push.js`) |
| `npm run prepare` | Install Husky git hooks |
| `npm run docs` | Generate TypeDoc API documentation |
| `npm run docs:serve` | Generate and serve docs on localhost |
| `npm run docs:watch` | Watch mode for documentation |

## 🏗 Project Structure

```
tsprotemplate/
├── src/                    # Source code
├── tests/                  # Test files
├── dist/                   # Compiled output (gitignored)
├── docs/                   # Generated documentation
├── utils/                  # Build utilities
├── .github/                # GitHub workflows (if any)
├── .husky/                 # Git hooks
├── node_modules/           # Dependencies (gitignored)
├── coverage/               # Test coverage (gitignored)
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint rules
├── jest.config.mjs         # Jest test configuration
├── typedoc.json            # Documentation settings
├── .prettierrc.json        # Code formatting rules
├── .gitignore              # Git ignore patterns
├── .nvmrc                  # Node version specification
└── LICENSE                 # License file
```

> The project includes some demo files from the Bahamut security scanner for you to test the preinstaled tools with a demo project. 

## ⚙️ Configuration Details

### TypeScript (`tsconfig.json`)

- **Target**: ES2022 with NodeNext module resolution
- **Strict mode** enabled with all strictness flags
- **Source maps** and **declaration files** generated
- **Isolated modules** for faster compilation
- Output compiled to `./dist` from `./src`

### ESLint (`eslint.config.mjs`)

Enforces:
- 2-space indentation, Unix line endings
- Single quotes, semicolons required
- No unused vars (TypeScript-aware)
- Explicit return types on functions
- Warns on `any` type and non-null assertions
- Console only allowed for `warn`/`error`
- Modern syntax: `const` over `var`, template literals

### Jest (`jest.config.mjs`)

- **ESM support** with ts-jest
- **Coverage thresholds**: 70% on all metrics
- **Test locations**: `tests/**/*.test.ts` or `__tests__/**/*.ts`
- **Timeout**: 10 seconds per test
- Collects coverage from all `src/**/*.ts` except types and index

### TypeDoc (`typedoc.json`)

- Generates API docs from `src/` to `docs/api`
- Includes README as main page
- Organizes by: CLI, Core, Modules, Utils
- Shows version and GitHub links

## 🎯 Development Workflow

### Pre-commit Hooks

Husky + lint-staged automatically runs on every commit:

1. **ESLint** - Fixes auto-fixable issues
2. **Prettier** - Formats staged files
3. **Jest** - Runs related tests (bails on first failure)

No broken commits allowed! ✅

### Recommended Workflow

```bash
# 1. Start development
npm run dev

# 2. Write code + tests
# 3. Check quality before commit
npm run lint
npm run type-check
npm test

# 4. Commit (hooks run automatically)
git add .
git commit -m "feat: add new feature"

# 5. Build and verify
npm run build
npm start

# 6. Generate docs
npm run docs
```

## 🧪 Testing

Write tests in `tests/` or `__tests__/` directories:

```typescript
// tests/example.test.ts
import { myFunction } from '../src/module.js';

describe('My Module', () => {
  it('should work correctly', () => {
    expect(myFunction()).toBeTruthy();
  });
});
```

Run tests with coverage to ensure you meet the 70% threshold.

## 📚 Documentation

Generate and view API documentation:

```bash
# One-time generation
npm run docs

# Generate and open in browser
npm run docs:serve

# Watch for changes
npm run docs:watch
```

## 👤 Author

**StringManolo**  
GitHub: [@StringManolo](https://github.com/StringManolo)  
Project Homepage: [https://github.com/StringManolo/tsprotemplate#readme](https://github.com/StringManolo/tsprotemplate#readme)

---

*Template for Professional TypeScript Projects*
