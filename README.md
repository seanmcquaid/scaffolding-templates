# Scaffolding Templates

Throughout my years of working in web development, I have found myself using the same tools over and over again when starting a new project. After going through the same exercise of creating a new project and setting up the same tools time and time again, I decided to create a collection of scaffolding templates for these tools to make it easier for anyone to get started on new projects with an opinionated starter.

These templates are meant to be a starting point for new projects and are not meant to be a one-size-fits-all solution. I have created these templates to fit my needs and preferences, but I am always open to suggestions and improvements. If you have any suggestions or improvements, please feel free to open an issue on the repo!

## Scaffolding a new project

```bash
npx degit https://github.com/seanmcquaid/scaffolding-templates/templates/<template-name> <project-name>
```

## Templates

1. **TypeScript Libraries** - Production-ready TypeScript library template
2. **React Router V7 SPA** - Single-page application with React Router v7
3. **React Router V7 SSR** - Server-side rendered application with React Router v7
4. **React Router V7 RSC (Experimental)** - ⚠️ Experimental template exploring React Server Components patterns
5. **Next SSR** - Server-side rendered application with Next.js
6. **TanStack Router SPA** - Single-page application with TanStack Router

### 📋 Template Status

| Template | Status | Use Case | RSC Support |
|----------|--------|----------|-------------|
| `typescript-library` | ✅ Production Ready | Library development | N/A |
| `react-router-v7-spa` | ✅ Production Ready | Client-side apps | ❌ |
| `react-router-v7-ssr` | ✅ Production Ready | SEO-friendly apps | ❌ |
| `react-router-v7-rsc` | ⚠️ Experimental | RSC exploration | 🔬 Patterns only |
| `next-ssr` | ✅ Production Ready | Full-stack apps | ✅ Native support |
| `tanstack-router-spa` | ✅ Production Ready | Type-safe routing | ❌ |

### 🔬 React Server Components Investigation

We have conducted a comprehensive investigation into React Server Components (RSC) support across our templates. Key findings:

- **React Router v7**: Does not yet support RSC natively (as of v7.7.0)
- **Next.js**: Has mature RSC support
- **Experimental Template**: `react-router-v7-rsc` explores RSC patterns for future use

📖 **See [RSC Investigation Summary](docs/rsc-investigation-summary.md) for detailed findings and roadmap.**
