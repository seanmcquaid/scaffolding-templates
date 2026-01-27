# Scaffolding Templates

Throughout my years of working in web development, I have found myself using the same tools over and over again when starting a new project. After going through the same exercise of creating a new project and setting up the same tools time and time again, I decided to create a collection of scaffolding templates for these tools to make it easier for anyone to get started on new projects with an opinionated starter.

These templates are meant to be a starting point for new projects and are not meant to be a one-size-fits-all solution. I have created these templates to fit my needs and preferences, but I am always open to suggestions and improvements. If you have any suggestions or improvements, please feel free to open an issue on the repo!

## 🤖 AI Agent Skills

This repository includes **14 standardized agent skills** compatible with GitHub Copilot, Claude Code, Cursor, and 20+ other AI coding agents. These skills provide specialized expertise for:

- **8 SDLC Phase Skills**: Requirements analysis, architecture, implementation, UI/UX, testing, deployment, maintenance, and production support
- **6 Template-Specific Skills**: TypeScript libraries, Next.js SSR, React Router (SPA & SSR), TanStack Router, and Expo React Native

**Quick Install:**
```bash
npx skills add seanmcquaid/scaffolding-templates --all -a github-copilot
```

👉 [Learn more about skills](./skills/README.md)

**Note**: Skills are stored in `/skills/` for cross-tool compatibility with multiple AI agents, not just GitHub Copilot.

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

```bash
npx degit https://github.com/seanmcquaid/scaffolding-templates/templates/<template-name> <project-name>
```

After scaffolding, run the setup script to automatically configure your development environment:

```bash
cd <project-name>
chmod +x setup.sh
./setup.sh
```

## Templates

1. **TypeScript Libraries** - Modern TypeScript library with build tools, testing, and publishing setup
2. **React Router V7 SPA** - Single-page application using React Router v7
3. **React Router V7 SSR** - Server-side rendered application using React Router v7  
4. **Next SSR** - Next.js server-side rendered application with modern React patterns
5. **TanStack Router SPA** - Single-page application using TanStack Router
6. **Expo React Native** - Cross-platform mobile application using Expo and React Native

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
- **Location**: `/skills/` directory with `SKILL.md` files
- **Support**: Works with GitHub Copilot, Cursor, and 20+ other AI tools
- **Documentation**: [Skills README](skills/README.md)

### Custom Agents (Enhanced Format)
Optimized for GitHub Copilot, Claude, and Cursor with detailed guidance:
- **14 Agents**: 8 SDLC phase agents + 6 template specialist agents
- **Location**: `/agents/` directory with `.agent.md` files
- **Support**: GitHub Copilot, Claude Desktop, Cursor IDE
- **Documentation**: [Custom Agents Guide](docs/custom-agents-guide.md) (includes Quick Start)

### Understanding the Difference
- **[Skills vs Agents Guide](docs/ai-skills-vs-agents.md)** - Understand which to use and when

Both systems cover the same functional areas (requirements, architecture, implementation, testing, deployment, etc.) but use different formats optimized for different use cases. Use Skills for broad compatibility or Agents for enhanced features.

## AI-Powered Development Workflows

This repository uses automated AI workflows to maintain code quality and accelerate development:

### Local Development with Ralph

**Ralph** is a simple bash script (`./scripts/ralph.sh`) for working with AI workflows locally - no CLI tools or installation required:

```bash
# Create a structured plan for your task
./scripts/ralph.sh plan "Add authentication to next-ssr"

# Execute, review, and iterate through the plan
./scripts/ralph.sh execute auth-next-ssr.md
./scripts/ralph.sh review auth-next-ssr.md
./scripts/ralph.sh iterate auth-next-ssr.md
```

**It's just a script:** No dependencies, no installation - runs with standard bash and git. Copy it to any project.

**Features:** Task classification, agent suggestions, template detection, progress tracking, local or shared team plans

### Automated GitHub Workflows

- 🤖 **Automated Code Reviews** - AI agents automatically review PRs and tag relevant specialists
- 🔍 **Proactive Concept Discovery** - Weekly scans for new technologies and best practices
- 🧪 **Test Coverage Analysis** - Automated identification of test coverage gaps
- 📋 **Issue Processing** - Daily Ralph workflow analysis of open issues
- 🛠️ **Runnable Scripts** - All workflows use scripts that can be run locally for testing

**Documentation**: [Complete AI Workflows Guide](/docs/ai-workflows.md)

**Scripts**: [AI Workflow Scripts](/scripts/README.md)

**Agents**: [Custom Agents Guide](/agents/README.md)
