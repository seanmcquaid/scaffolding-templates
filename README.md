# Scaffolding Templates

Throughout my years of working in web development, I have found myself using the same tools over and over again when starting a new project. After going through the same exercise of creating a new project and setting up the same tools time and time again, I decided to create a collection of scaffolding templates for these tools to make it easier for anyone to get started on new projects with an opinionated starter.

These templates are meant to be a starting point for new projects and are not meant to be a one-size-fits-all solution. I have created these templates to fit my needs and preferences, but I am always open to suggestions and improvements. If you have any suggestions or improvements, please feel free to open an issue on the repo!

## 🤖 AI Agent Skills

This repository includes **14 standardized agent skills** compatible with GitHub Copilot, Claude Code, Cursor, and 20+ other AI coding agents. These skills provide specialized expertise for:

- **8 SDLC Phase Skills**: Requirements analysis, architecture, implementation, UI/UX, testing, deployment, maintenance, and production support
- **6 Template-Specific Skills**: TypeScript libraries, Next.js SSR, React Router (SPA & SSR), TanStack Router, and TanStack Start SSR

**Quick Install:**
```bash
npx skills add seanmcquaid/scaffolding-templates --all -a github-copilot
```

👉 [Learn more about skills](./.agents/skills/README.md)

**Note**: Skills are stored in `/.agents/skills/` for cross-tool compatibility with multiple AI agents, not just GitHub Copilot.

## Platform Support

### Supported Platforms
- **macOS** - Full support with Homebrew package manager
- **Linux** - Full support for major distributions:
  - Ubuntu/Debian (apt-get)
  - Fedora (dnf)
  - CentOS/RHEL (yum)
  - Arch Linux (pacman)

### Windows Support
**❌ Windows is not directly supported** by the setup scripts in these templates.

**💡 Recommended Windows Setup:**
Use Windows Subsystem for Linux 2 (WSL2) with Ubuntu:
1. Install WSL2: https://docs.microsoft.com/en-us/windows/wsl/install
2. Install Ubuntu from Microsoft Store
3. Run setup scripts within the Ubuntu environment

This approach provides the full Unix-like environment that the setup scripts require while maintaining compatibility with Windows development workflows.

## Scaffolding a new project

Choose a framework starter, then select a profile when one is available:

| Starter | Profiles | Template path(s) |
| --- | --- | --- |
| React Router | SPA, SSR | `templates/react-router/spa`, `templates/react-router/ssr` |
| TanStack Start | SSR | `templates/tanstack-start-ssr` |
| TanStack Router | SPA | `templates/tanstack-router-spa` |
| Next.js | SSR | `templates/next-ssr` |
| TypeScript library | — | `templates/typescript-library` |

React Router is one framework family with two deliberately separate profiles. They share the router ecosystem but have different runtime, environment, and deployment requirements.

For example, to scaffold a React Router SPA:

```bash
npx degit https://github.com/seanmcquaid/scaffolding-templates/templates/react-router/spa <project-name>
```

For SSR, use `templates/react-router/ssr` instead. The other template paths are listed above.

After scaffolding, run the setup script to automatically configure your development environment:

```bash
cd <project-name>
chmod +x scripts/setup.sh
./scripts/setup.sh
```

## Templates

1. **React Router** - SPA and SSR profiles
2. **TanStack Start** - Full-stack server-rendered React application
3. **TanStack Router** - Client-rendered single-page application
4. **Next.js** - Server-rendered application with modern React patterns
5. **TypeScript library** - Library build, testing, and publishing setup

Each template includes:
- ✅ Automated setup script for quick start
- ✅ Modern tooling (ESLint, Prettier, Husky, testing)
- ✅ Type-safe development with TypeScript
- ✅ Environment configuration with validation
- ✅ Comprehensive documentation
- ✅ Custom AI agents for GitHub Copilot, Claude, and Cursor
- ✅ AI-powered development workflows

## AI-Assisted Development

This repository includes **two complementary AI assistance systems**:

### Skills (Standard Format)
Following [agentskills.io](https://agentskills.io) specification for broad platform compatibility:
- **14 Skills**: 8 SDLC phase skills + 6 template specialist skills
- **Location**: `/.agents/skills/` directory with `SKILL.md` files
- **Support**: Works with GitHub Copilot, Cursor, and 20+ other AI tools
- **Documentation**: [Skills README](./.agents/skills/README.md)

### Custom Agents (Enhanced Format)
Optimized for GitHub Copilot, Claude, and Cursor with detailed guidance:
- **14 Agents**: 8 SDLC phase agents + 6 template specialist agents
- **Location**: `/.agents/` directory with `.agent.md` files
- **Support**: GitHub Copilot, Claude Desktop, Cursor IDE
- **Documentation**: [Custom Agents Guide](docs/custom-agents-guide.md) (includes Quick Start)

### Understanding the Difference
- **[Skills vs Agents Guide](docs/ai-skills-vs-agents.md)** - Understand which to use and when

Both systems cover the same functional areas (requirements, architecture, implementation, testing, deployment, etc.) but use different formats optimized for different use cases. Use Skills for broad compatibility or Agents for enhanced features.


**Agents**: [Custom Agents Guide](/.agents/README.md)
