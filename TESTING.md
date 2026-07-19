# Testing Guide

## Overview
This guide provides comprehensive testing strategies for the ContentPulse system.

## 1. Backend Testing

### Unit Testing Setup

#### Installation
```bash
cd backend
npm install --save-dev jest @types/jest ts-jest
```

#### Jest Configuration (jest.config.js)
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Test Examples

#### Helper Functions Test (src/utils/__tests__/helpers.test.ts)
```typescript
import { 
  generateId, 
  getLengthBracket, 
  calculateConversionRate,
  calculateGrowthRate 
} from '../helpers';

describe('Helper Functions', () => {
  describe('generateId', () => {
    it('should generate a unique ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toEqual(id2);
      expect(id1).toHaveLength(36); // UUID length
    });
  });

  describe('getLengthBracket', () => {
    it('should return correct bracket for word count', () => {
      expect(getLengthBracket(300)).toBe('0-500');
      expect(getLengthBracket(750)).toBe('500-1000');
      expect(getLengthBracket(2500)).toBe('2000+');
    });
  });

  describe('calculateConversionRate', () => {
    it('should calculate conversion rate correctly', () => {
      expect(calculateConversionRate(10, 100)).toBe(0.1);
      expect(calculateConversionRate(0, 100)).toBe(0);
      expect(calculateConversionRate(10, 0)).toBe(0); // Division by zero
    });
  });

  describe('calculateGrowthRate', () => {
    it('should calculate growth rate percentage', () => {
      expect(calculateGrowthRate(150, 100)).toBe(50);
      expect(calculateGrowthRate(50, 100)).toBe(-50);
      expect(calculateGrowthRate(100, 0)).toBe(100);
    });
  });
});
```

#### Validation Test (src/utils/__tests__/validation.test.ts)
```typescript
import { RequestValidator, ValidationError } from '../validation';

describe('RequestValidator', () => {
  describe('requireString', () => {
    it('should accept valid string', () => {
      expect(RequestValidator.requireString('hello', 'name')).toBe('hello');
    });

    it('should throw on empty string', () => {
      expect(() => {
        RequestValidator.requireString('', 'name');
      }).toThrow(ValidationError);
    });

    it('should throw on non-string', () => {
      expect(() => {
        RequestValidator.requireString(123 as any, 'name');
      }).toThrow(ValidationError);
    });
  });

  describe('requireNumber', () => {
    it('should accept valid number', () => {
      expect(RequestValidator.requireNumber(42, 'count')).toBe(42);
    });

    it('should throw on number out of range', () => {
      expect(() => {
        RequestValidator.requireNumber(150, 'value', 0, 100);
      }).toThrow(ValidationError);
    });
  });

  describe('requireEnum', () => {
    it('should accept valid enum value', () => {
      expect(RequestValidator.requireEnum('article', 'format', [
        'article', 'video', 'newsletter'
      ])).toBe('article');
    });

    it('should throw on invalid enum value', () => {
      expect(() => {
        RequestValidator.requireEnum('invalid', 'format', [
          'article', 'video'
        ]);
      }).toThrow(ValidationError);
    });
  });
});
```

#### Service Test (src/services/__tests__/PerformanceAnalysisService.test.ts)
```typescript
import { PerformanceAnalysisService } from '../PerformanceAnalysisService';
import { ContentModel, AnalyticsModel } from '../../models';

jest.mock('../../models');

describe('PerformanceAnalysisService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('analyzePeriod', () => {
    it('should analyze performance for a given period', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');

      const mockContents = [
        { id: '1', topic: 'AI', format: 'article', length: 1500 },
        { id: '2', topic: 'AI', format: 'video', length: 2000 },
      ];

      const mockAnalytics = [
        { contentId: '1', views: 5000, engagement: 250, conversions: 50 },
        { contentId: '2', views: 8000, engagement: 400, conversions: 100 },
      ];

      (ContentModel.find as jest.Mock).mockResolvedValue(mockContents);
      (AnalyticsModel.find as jest.Mock).mockResolvedValue(mockAnalytics);

      // Call would be to database, mocked here
      expect(mockContents).toHaveLength(2);
      expect(mockAnalytics).toHaveLength(2);
    });
  });
});
```

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- helpers.test.ts

# Watch mode
npm test -- --watch
```

## 2. Integration Testing

### API Integration Tests

#### Content API Test (src/routes/__tests__/content.integration.test.ts)
```typescript
import request from 'supertest';
import App from '../../index';
import { ContentModel } from '../../models';

describe('Content API Integration', () => {
  let app: any;

  beforeAll(async () => {
    // Initialize app
  });

  afterAll(async () => {
    // Cleanup
    await ContentModel.deleteMany({});
  });

  describe('POST /api/content', () => {
    it('should create new content', async () => {
      const response = await request(app)
        .post('/api/content')
        .send({
          title: 'Test Article',
          url: 'https://example.com/test',
          format: 'article',
          topic: 'AI',
          length: 1500,
          publishedAt: new Date(),
          channels: ['blog'],
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBeDefined();
    });

    it('should reject invalid content', async () => {
      const response = await request(app)
        .post('/api/content')
        .send({
          title: '', // Invalid: empty title
          url: 'invalid-url',
          format: 'article',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/content', () => {
    it('should list content with pagination', async () => {
      // Create test content
      await ContentModel.create({
        id: '1',
        title: 'Test',
        url: 'https://example.com',
        format: 'article',
        topic: 'AI',
        length: 1000,
        publishedAt: new Date(),
        channels: ['blog'],
      });

      const response = await request(app)
        .get('/api/content?page=1&limit=10');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/content/:id/performance', () => {
    it('should return content performance', async () => {
      const contentId = 'test-123';
      
      // Create content and analytics
      await ContentModel.create({
        id: contentId,
        title: 'Test',
        url: 'https://example.com',
        format: 'article',
        topic: 'AI',
        length: 1000,
        publishedAt: new Date(),
        channels: ['blog'],
      });

      const response = await request(app)
        .get(`/api/content/${contentId}/performance`);

      expect(response.status).toBe(200);
      expect(response.body.data.summary).toBeDefined();
    });
  });
});
```

### Service Integration Tests

#### Analytics Service Test
```typescript
import { AnalyticsAggregationService } from '../AnalyticsAggregationService';
import { AnalyticsModel } from '../../models';

describe('AnalyticsAggregationService Integration', () => {
  it('should store analytics data', async () => {
    const analyticsData = [
      {
        contentId: 'content-1',
        channel: 'google_analytics',
        date: new Date(),
        metrics: {
          views: 1000,
          engagement: 50,
          timeOnPage: 180,
          conversions: 10,
          clickThroughRate: 0.05,
        },
      },
    ];

    await AnalyticsAggregationService.storeAnalytics(analyticsData);

    const stored = await AnalyticsModel.findOne({ contentId: 'content-1' });
    expect(stored).toBeDefined();
    expect(stored.views).toBe(1000);
  });
});
```

## 3. Frontend Testing

### Setup

#### Installation
```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
npm install --save-dev happy-dom
```

#### Vitest Configuration (vitest.config.ts)
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/__tests__/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Component Tests

#### MetricCard Test
```typescript
import { render, screen } from '@testing-library/react';
import { MetricCard } from '../components/Charts';

describe('MetricCard', () => {
  it('should render metric card', () => {
    render(
      <MetricCard
        title="Total Views"
        value={1250}
        change={15}
        unit="views"
      />
    );

    expect(screen.getByText('Total Views')).toBeInTheDocument();
    expect(screen.getByText(/1250/)).toBeInTheDocument();
  });

  it('should display positive trend', () => {
    const { container } = render(
      <MetricCard title="Views" value={1000} change={10} />
    );
    
    const trendIcon = container.querySelector('.text-green-600');
    expect(trendIcon).toBeInTheDocument();
  });

  it('should display negative trend', () => {
    const { container } = render(
      <MetricCard title="Views" value={1000} change={-10} />
    );
    
    const trendIcon = container.querySelector('.text-red-600');
    expect(trendIcon).toBeInTheDocument();
  });
});
```

#### Alert Component Test
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from '../components/Common';

describe('Alert', () => {
  it('should render alert with correct type styling', () => {
    render(
      <Alert
        type="success"
        title="Success"
        message="Operation completed"
      />
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
  });

  it('should call onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(
      <Alert
        type="error"
        title="Error"
        message="Something went wrong"
        onClose={onClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
```

#### Hook Test (useFetch)
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../hooks/useFetch';

describe('useFetch Hook', () => {
  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const fetchFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetch(fetchFn));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const error = new Error('Fetch failed');
    const fetchFn = jest.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useFetch(fetchFn));

    await waitFor(() => {
      expect(result.current.error).toEqual(error);
    });

    expect(result.current.data).toBeNull();
  });
});
```

#### WebSocket Hook Test
```typescript
import { renderHook, act, waitFor } from '@testing-library/react';
import { useWebSocket } from '../hooks/useWebSocket';

describe('useWebSocket Hook', () => {
  it('should connect to WebSocket', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3001'));

    // Mock WebSocket connection
    await waitFor(() => {
      expect(result.current.isConnected).toBeDefined();
    });
  });

  it('should send message', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3001'));

    act(() => {
      result.current.send({ type: 'test', data: 'hello' });
    });

    expect(result.current).toBeDefined();
  });
});
```

### Page Tests

#### Dashboard Page Test
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from '../pages/Dashboard';
import * as api from '../services/api';

jest.mock('../services/api');

describe('Dashboard Page', () => {
  beforeEach(() => {
    (api.default.getAnalyticsSummary as jest.Mock).mockResolvedValue({
      data: {
        totalContent: 50,
        totalViews: 100000,
        totalEngagement: 5000,
        avgTimeOnPage: 180,
        topTopics: [],
        topFormats: [],
      },
    });
  });

  it('should render dashboard with metrics', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
    });
  });

  it('should display metric cards', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Total Content/)).toBeInTheDocument();
      expect(screen.getByText(/50/)).toBeInTheDocument();
    });
  });
});
```

### Running Frontend Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# Specific test file
npm test -- Dashboard.test.tsx
```

## 4. E2E Testing

### Setup with Playwright

#### Installation
```bash
cd frontend
npm install --save-dev @playwright/test
npx playwright install
```

#### Configuration (playwright.config.ts)
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

#### Dashboard Navigation Test (e2e/dashboard.spec.ts)
```typescript
import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should navigate to dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ContentPulse/);
  });

  test('should display metrics', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Total Views')).toBeVisible();
    await expect(page.locator('text=Total Engagement')).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Analytics")');
    await expect(page).toHaveURL(/\/analytics/);
  });
});
```

#### Report Generation Test (e2e/reports.spec.ts)
```typescript
import { test, expect } from '@playwright/test';

test.describe('Report Generation', () => {
  test('should generate new report', async ({ page }) => {
    await page.goto('/reports');
    
    const generateButton = page.locator('button:has-text("Generate Report")');
    await generateButton.click();
    
    // Wait for confirmation
    await expect(page.locator('text=Report generation started')).toBeVisible();
  });

  test('should view report details', async ({ page }) => {
    await page.goto('/reports');
    
    // Click on first report in list
    const firstReport = page.locator('table tbody tr').first();
    await firstReport.click();
    
    // Check report details are displayed
    await expect(page.locator('text=Recommendations')).toBeVisible();
  });
});
```

### Running E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run specific test file
npm run test:e2e -- e2e/dashboard.spec.ts

# Run with UI
npm run test:e2e -- --ui

# Debug mode
npm run test:e2e -- --debug
```

## 5. Performance Testing

### Load Testing with Artillery

#### Installation
```bash
npm install -g artillery
```

#### Configuration (load-test.yml)
```yaml
config:
  target: 'http://localhost:3001'
  phases:
    - duration: 60
      arrivalRate: 10
      name: 'Warm up'
    - duration: 120
      arrivalRate: 50
      name: 'Ramp up'
    - duration: 60
      arrivalRate: 100
      name: 'Stress'

scenarios:
  - name: 'Content API'
    flow:
      - get:
          url: '/api/content'
      - think: 5
      - post:
          url: '/api/content'
          json:
            title: 'Load Test Article'
            url: 'https://example.com/load-test'
            format: 'article'
            topic: 'Testing'
            length: 1500
            publishedAt: '{{ now }}'
            channels:
              - 'blog'
      - think: 3
      - get:
          url: '/api/analytics/summary'
```

#### Running Load Tests
```bash
artillery run load-test.yml
artillery run load-test.yml --target http://staging.example.com
```

## 6. Coverage Reports

### Generate Coverage
```bash
# Backend
cd backend
npm test -- --coverage

# Frontend
cd frontend
npm test -- --coverage
```

### Coverage Targets
- **Lines**: > 80%
- **Functions**: > 80%
- **Branches**: > 70%
- **Statements**: > 80%

## 7. Testing Checklist

- [ ] Unit tests for services (>80% coverage)
- [ ] Unit tests for utilities (>90% coverage)
- [ ] Integration tests for APIs
- [ ] Component tests for React components
- [ ] Hook tests for custom hooks
- [ ] E2E tests for critical flows
- [ ] Load testing for performance
- [ ] Security testing
- [ ] Database transaction tests
- [ ] Error scenario tests
- [ ] Authentication tests
- [ ] Validation tests

## 8. CI/CD Testing

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:6
        options: >-
          --health-cmd "mongosh --eval 'db.adminCommand(\"ping\")'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run backend tests
        run: npm run test:backend
      
      - name: Run frontend tests
        run: npm run test:frontend
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Recommended Test Structure

```
backend/
├── src/
│   ├── utils/
│   │   ├── __tests__/
│   │   │   ├── helpers.test.ts
│   │   │   └── validation.test.ts
│   │   ├── helpers.ts
│   │   └── validation.ts
│   └── services/
│       ├── __tests__/
│       │   └── PerformanceAnalysisService.test.ts
│       └── PerformanceAnalysisService.ts

frontend/
├── src/
│   ├── components/
│   │   ├── __tests__/
│   │   │   └── Charts.test.tsx
│   │   └── Charts.tsx
│   ├── pages/
│   │   ├── __tests__/
│   │   │   └── Dashboard.test.tsx
│   │   └── Dashboard.tsx
│   └── hooks/
│       ├── __tests__/
│       │   └── useFetch.test.ts
│       └── useFetch.ts
└── e2e/
    ├── dashboard.spec.ts
    └── reports.spec.ts
```

This comprehensive testing guide ensures high code quality and reliability across the entire ContentPulse system.
