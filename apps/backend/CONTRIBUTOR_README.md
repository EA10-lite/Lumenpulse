# Contributor Guide - Lumenpulse Backend

Welcome to the Lumenpulse Backend contributor guide! This document will help you get started with contributing to our Next.js backend service.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Familiarity with TypeScript, Next.js, and REST APIs
- Git installed and configured

### Development Setup

1. **Fork the repository** and clone your fork:
   ```bash
   git clone https://github.com/your-username/Lumenpulse-web.git
   cd Lumenpulse-web/app/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🌿 Branching Strategy

We use a simplified Git flow with the following branch naming conventions:

### Branch Types

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### Branch Naming

```
feat/your-feature-name
fix/bug-description
docs/api-documentation-update
refactor/improve-error-handling
test/add-health-route-tests
chore/update-dependencies
```

### Workflow

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** with frequent, small commits

3. **Test thoroughly** before creating a PR

4. **Create a Pull Request** to `main`

## 📝 Commit Message Convention

We follow conventional commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(api): add user authentication endpoint
fix(health): resolve timestamp formatting issue
docs(readme): update installation instructions
test(health): add unit tests for health route
refactor(middleware): improve error handling
```

## 🧪 Testing Requirements

### Before Submitting

1. **Run all tests:**
   ```bash
   npm test
   ```

2. **Check code coverage:**
   ```bash
   npm run test:coverage
   ```

3. **Run linting:**
   ```bash
   npm run lint
   ```

4. **Check formatting:**
   ```bash
   npm run format:check
   ```

5. **Type checking:**
   ```bash
   npm run type-check
   ```

### Test Structure

```
src/
├── __tests__/
│   ├── api/
│   │   └── health.test.ts    # API route tests
│   ├── lib/
│   │   └── utils.test.ts     # Utility function tests
│   └── setup.ts              # Test setup
```

### Writing Tests

- Use Jest for unit and integration tests
- Test both success and error scenarios
- Mock external dependencies
- Aim for high code coverage (>80%)

## 🔍 Code Quality Standards

### ESLint & Prettier

- All code must pass ESLint checks
- Use Prettier for consistent formatting
- Configure your editor to format on save

### TypeScript

- Use strict TypeScript settings
- Provide proper type annotations
- Avoid `any` types when possible
- Use interfaces for object shapes

### Code Style

- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions
- Follow Next.js best practices

## 🚀 Pull Request Process

### PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated for new functionality
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] Commit messages follow convention
- [ ] No merge conflicts

### PR Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated

## Issues
Closes #issue_number
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by at least one maintainer
3. **Testing verification** by reviewer
4. **Approval** and merge to main

## 📁 Project Structure

### Adding New API Routes

1. Create route file: `src/app/api/your-endpoint/route.ts`
2. Add corresponding tests: `src/__tests__/api/your-endpoint.test.ts`
3. Update API documentation if needed

### Adding Utilities

1. Create utility file: `src/lib/your-util.ts`
2. Add tests: `src/__tests__/lib/your-util.test.ts`
3. Export from index if needed: `src/lib/index.ts`

### Adding Types

1. Create type file: `src/types/your-types.ts`
2. Export types for reuse
3. Document complex types with JSDoc

## 🔧 Development Tools

### Recommended VS Code Extensions

- TypeScript Importer
- ESLint
- Prettier
- Jest
- GitLens
- Thunder Client (for API testing)

### Environment Setup

1. **Install VS Code extensions**
2. **Configure settings:**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "typescript.preferences.importModuleSpecifier": "relative"
   }
   ```

3. **Set up pre-commit hooks** (recommended):
   ```bash
   npx husky install
   npx husky add .husky/pre-commit "npm run lint && npm run test"
   ```

## 🚨 Common Issues & Solutions

### Port Conflicts

```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill
```

### Dependency Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check for type errors
npm run type-check
```

### Test Failures

```bash
# Run tests in verbose mode
npm test -- --verbose

# Run specific test file
npm test health.test.ts
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/options.html)

## 🤝 Getting Help

### Communication Channels

- **GitHub Issues** - For bug reports and feature requests
- **Discord/Slack** - For real-time discussions
- **Code Reviews** - For technical feedback

### Asking Questions

1. Check existing documentation and issues
2. Provide clear context and code examples
3. Include error messages and steps to reproduce
4. Be patient and respectful

## 🎯 Contribution Ideas

Looking for ways to contribute? Consider:

- Adding unit tests for existing code
- Improving documentation
- Fixing reported bugs
- Implementing new features from the roadmap
- Code refactoring and optimization
- Adding CI/CD improvements

## 📋 Release Process

### Version Management

We follow semantic versioning:
- `MAJOR.MINOR.PATCH`
- Breaking changes increment MAJOR
- New features increment MINOR
- Bug fixes increment PATCH

### Release Checklist

1. Update version in `package.json`
2. Update changelog
3. Tag the release
4. Deploy to staging for testing
5. Deploy to production

## 🏆 Recognition

Contributors are recognized through:

- GitHub contributor statistics
- Release notes acknowledgments
- Team meetings and announcements
- Annual contributor awards

Thank you for contributing to Lumenpulse Backend! 🎉

---

**Questions?** Feel free to open an issue or reach out to the maintainers.
