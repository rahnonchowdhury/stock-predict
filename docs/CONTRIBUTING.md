# Contributing to Stock Prediction Website

Thank you for your interest in contributing! This document provides guidelines for contributing to the Stock Prediction Website project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept that different approaches may be valid
- Help maintain a welcoming environment for all contributors

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Git
- Code editor (VS Code recommended)
- Alpha Vantage API key for testing

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/stock-prediction-website.git
   cd stock-prediction-website
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/stock-prediction-website.git
   ```

## Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Verify Setup**
   - Open http://localhost:5000
   - Test stock analysis with a sample ticker (e.g., AAPL)

## Contributing Process

### Before You Start

1. Check existing issues and pull requests
2. Create an issue to discuss major changes
3. Ensure your idea aligns with project goals

### Branch Strategy

1. **Main Branch**: Production-ready code
2. **Feature Branches**: New features and improvements
3. **Hotfix Branches**: Critical bug fixes

### Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following our standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Changes**
   ```bash
   npm run test
   npm run type-check
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for new code
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add type annotations for function parameters and returns

### Code Style

```typescript
// Good: Clear, typed function
async function analyzeStock(ticker: string): Promise<StockAnalysis> {
  const stockData = await stockService.getStockData(ticker);
  return predictionService.generatePrediction(stockData);
}

// Good: Proper error handling
try {
  const analysis = await analyzeStock(ticker);
  return analysis;
} catch (error) {
  console.error('Analysis failed:', error);
  throw new Error('Failed to analyze stock');
}
```

### File Organization

```
server/
├── services/           # Business logic
├── routes.ts          # API routes
└── storage.ts         # Data persistence

client/
├── components/        # React components
├── hooks/            # Custom hooks
├── lib/              # Utilities
└── pages/            # Route components
```

### Naming Conventions

- **Files**: kebab-case (`stock-service.ts`)
- **Variables/Functions**: camelCase (`analyzeStock`)
- **Components**: PascalCase (`StockInput`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## Testing Guidelines

### Test Coverage

- Add tests for new features
- Test error conditions
- Verify edge cases
- Maintain existing test coverage

### Testing Examples

```typescript
// Component test
describe('StockInput', () => {
  it('should validate ticker input', () => {
    render(<StockInput onSubmit={mockSubmit} />);
    const input = screen.getByTestId('input-ticker');
    
    fireEvent.change(input, { target: { value: 'INVALID123' } });
    fireEvent.click(screen.getByTestId('button-analyze'));
    
    expect(screen.getByText(/invalid ticker/i)).toBeInTheDocument();
  });
});

// API test
describe('Prediction Service', () => {
  it('should calculate prediction correctly', async () => {
    const mockStockData = { /* mock data */ };
    const prediction = await predictionService.calculatePrediction(mockStockData);
    
    expect(prediction.predictionPercentage).toBeCloseTo(-2.5, 1);
    expect(prediction.confidenceLevel).toBeGreaterThan(0);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Pull Request Process

### Before Submitting

1. **Update Documentation**
   - Update README.md if needed
   - Add API documentation for new endpoints
   - Update type definitions

2. **Test Thoroughly**
   - Test new features manually
   - Run automated tests
   - Check for TypeScript errors

3. **Review Changes**
   - Review your own code first
   - Ensure no debugging code remains
   - Check for security implications

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] New tests added

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No security issues introduced
```

### Review Process

1. **Automated Checks**
   - TypeScript compilation
   - Linting rules
   - Test suite

2. **Manual Review**
   - Code quality
   - Architecture decisions
   - Security considerations
   - Performance impact

3. **Approval and Merge**
   - At least one approval required
   - All checks must pass
   - Conflicts resolved

## Issue Reporting

### Bug Reports

Use this template for bug reports:

```markdown
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error...

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS 12.0]
- Browser: [e.g., Chrome 95]
- Node.js: [e.g., 20.0.0]

**Additional Context**
Screenshots, logs, etc.
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the proposed feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should this be implemented?

**Alternatives Considered**
Other approaches you've considered

**Additional Context**
Any other relevant information
```

## Development Guidelines

### API Development

- Use TypeScript interfaces for all data models
- Implement proper error handling
- Add input validation with Zod schemas
- Include comprehensive API documentation

### Frontend Development

- Use React functional components with hooks
- Implement proper loading states
- Handle errors gracefully
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test on multiple devices/browsers

### Database Changes

- Use migration scripts for schema changes
- Maintain backward compatibility
- Test with realistic data volumes
- Document any breaking changes

## Performance Considerations

### Frontend Performance

- Optimize bundle size
- Implement code splitting
- Use React.memo for expensive components
- Optimize images and assets

### Backend Performance

- Implement caching where appropriate
- Monitor API response times
- Optimize database queries
- Consider rate limiting impact

## Security Guidelines

### Input Validation

```typescript
// Always validate input
const stockRequestSchema = z.object({
  ticker: z.string().min(1).max(10).regex(/^[A-Z]+$/),
  analysisType: z.enum(['quick', 'standard', 'comprehensive'])
});
```

### Error Handling

```typescript
// Don't expose internal errors
try {
  // ... operation
} catch (error) {
  console.error('Internal error:', error);
  return res.status(500).json({ message: 'Analysis failed' });
}
```

### Environment Variables

- Never commit secrets to repository
- Use environment variables for all configuration
- Validate required environment variables on startup

## Documentation Standards

### Code Comments

```typescript
/**
 * Calculates weekly stock decline prediction using multiple factors
 * @param stockData - Historical and current stock data
 * @param newsArticles - Recent news articles for sentiment analysis
 * @returns Prediction object with percentage and confidence level
 */
async function generatePrediction(
  stockData: StockData,
  newsArticles: NewsArticle[]
): Promise<PredictionResult> {
  // Implementation details...
}
```

### API Documentation

- Document all endpoints in docs/API.md
- Include request/response examples
- Specify error codes and messages
- Update with each API change

## Community

### Communication

- Use GitHub issues for bug reports and feature requests
- Be constructive and specific in feedback
- Help other contributors when possible

### Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor insights

## Getting Help

If you need help:

1. Check existing documentation
2. Search GitHub issues
3. Create a new issue with clear details
4. Join community discussions

## Release Process

### Version Numbering

We follow Semantic Versioning (SemVer):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version bumped appropriately
- [ ] Change log updated
- [ ] Security review completed

Thank you for contributing to the Stock Prediction Website! Your contributions help make this tool better for everyone.