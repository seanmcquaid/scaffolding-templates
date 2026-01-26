---
name: deployment-engineering
description: Handles deployment, infrastructure, and DevOps concerns. Expert in CI/CD, build optimization, and production deployments for scaffolding templates.
---

# Deployment Engineering

Manage deployment strategies, CI/CD pipelines, and production infrastructure for scaffolding templates.

## When to Use

Use this skill when you need to:
- Set up CI/CD pipelines
- Configure deployment infrastructure
- Optimize build processes
- Manage environment variables
- Set up monitoring and error tracking
- Handle production deployments

## Deployment Patterns

### Client-Side Rendering (CSR)
```
Domain → DNS → CDN → WAF → S3 (or similar static hosting)
```

**Components:**
- **CDN**: CloudFront, Fastly for static assets
- **Storage**: S3, Netlify, Vercel for hosting
- **WAF**: Cloudflare, AWS WAF for security
- **DNS**: Route53, Cloudflare for DNS

**Build Configuration:**
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Server-Side Rendering (SSR)
```
Domain → DNS → CDN (static) → WAF → Server (SSR)
```

**Components:**
- **CDN**: For static assets only
- **Server**: Kubernetes, ECS, Vercel for SSR
- **Database**: Connection pooling required
- **WAF**: Application-level firewall
- **DNS**: With health checks

**Build Configuration:**
```json
{
  "scripts": {
    "build": "react-router build",
    "start": "react-router-serve ./build/server/index.js"
  }
}
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Lint
        run: pnpm lint
      
      - name: Type check
        run: pnpm type-check
      
      - name: Unit tests
        run: pnpm test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage/coverage-final.json

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm build
      
      - name: Check bundle size
        run: pnpm bundlesize
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/

  e2e:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps
      
      - name: Run E2E tests
        run: pnpm playwright:run-e2e
      
      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/

  deploy-staging:
    needs: [build, e2e]
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build
          path: dist/
      
      - name: Deploy to staging
        run: |
          # Deploy to staging environment
          echo "Deploying to staging..."

  deploy-production:
    needs: [build, e2e]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com
    steps:
      - uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build
          path: dist/
      
      - name: Deploy to production
        run: |
          # Deploy to production environment
          echo "Deploying to production..."
```

## Build Optimization

### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }),
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'query': ['@tanstack/react-query'],
        },
      },
    },
  },
});
```

### Bundle Size Monitoring
```json
// bundlesize.config.json
{
  "files": [
    {
      "path": "./dist/**/*.js",
      "maxSize": "200 kB"
    },
    {
      "path": "./dist/**/*.css",
      "maxSize": "50 kB"
    }
  ]
}
```

## Environment Variables

### Validation with Zod
```typescript
// env.client.ts
import { z } from 'zod';

const clientEnvSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']),
});

export const clientEnv = clientEnvSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
});

// env.server.ts
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string().min(32),
  NODE_ENV: z.enum(['development', 'staging', 'production']),
});

export const serverEnv = serverEnvSchema.parse(process.env);
```

### Environment Files
```bash
# .env.example (committed to repo)
VITE_API_URL=https://api.example.com
VITE_APP_ENV=production

# .env.local (not committed)
VITE_API_URL=http://localhost:3000
VITE_APP_ENV=development
DATABASE_URL=postgresql://localhost/mydb
SECRET_KEY=your-secret-key-here
```

## Docker Configuration

### Multi-Stage Dockerfile
```dockerfile
# Dockerfile
FROM node:22-alpine AS base
RUN corepack enable pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["pnpm", "start"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Performance Monitoring

### Web Vitals Tracking
```typescript
// utils/webVitals.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

export function reportWebVitals() {
  onCLS((metric) => {
    console.log('CLS:', metric.value);
    // Send to analytics
  });

  onFID((metric) => {
    console.log('FID:', metric.value);
  });

  onFCP((metric) => {
    console.log('FCP:', metric.value);
  });

  onLCP((metric) => {
    console.log('LCP:', metric.value);
  });

  onTTFB((metric) => {
    console.log('TTFB:', metric.value);
  });
}

// main.tsx
import { reportWebVitals } from './utils/webVitals';

if (import.meta.env.PROD) {
  reportWebVitals();
}
```

### Error Tracking
```typescript
// utils/errorTracking.ts
import * as Sentry from '@sentry/react';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_ENV,
    tracesSampleRate: 0.1,
  });
}

// ErrorBoundary with Sentry
export const ErrorBoundary = Sentry.withErrorBoundary(Component, {
  fallback: <ErrorFallback />,
  showDialog: true,
});
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Bundle size within limits
- [ ] Security vulnerabilities checked
- [ ] Documentation updated
- [ ] Rollback plan prepared

### During Deployment
- [ ] Monitor build logs
- [ ] Verify deployment status
- [ ] Check health endpoints
- [ ] Monitor error rates
- [ ] Verify Core Web Vitals
- [ ] Test critical user flows

### Post-Deployment
- [ ] Smoke tests passed
- [ ] Monitor error tracking
- [ ] Check performance metrics
- [ ] Verify analytics tracking
- [ ] Update deployment documentation
- [ ] Notify stakeholders

## Infrastructure as Code

### Terraform Example
```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "static_site" {
  bucket = "my-static-site"
}

resource "aws_s3_bucket_website_configuration" "static_site" {
  bucket = aws_s3_bucket.static_site.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.static_site.bucket_regional_domain_name
    origin_id   = "S3-static-site"
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-static-site"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }
}
```

## Deployment Strategies

### Blue-Green Deployment
- Deploy new version to "green" environment
- Test green environment
- Switch traffic from "blue" to "green"
- Keep blue as rollback option

### Canary Deployment
- Deploy to small percentage of users
- Monitor metrics and errors
- Gradually increase percentage
- Roll back if issues detected

### Rolling Deployment
- Deploy to servers one at a time
- Verify each deployment
- Continue rolling if successful
- Minimize downtime

## Next Steps

After deployment:
1. Monitor application performance
2. Track error rates and logs
3. Verify Core Web Vitals
4. Collaborate with Production Support for monitoring
5. Plan for scaling if needed
6. Schedule performance reviews
