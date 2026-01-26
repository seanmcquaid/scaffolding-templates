# Scaffolding Templates

Throughout my years of working in web development, I have found myself using the same tools over and over again when starting a new project. After going through the same exercise of creating a new project and setting up the same tools time and time again, I decided to create a collection of scaffolding templates for these tools to make it easier for anyone to get started on new projects with an opinionated starter.

These templates are meant to be a starting point for new projects and are not meant to be a one-size-fits-all solution. I have created these templates to fit my needs and preferences, but I am always open to suggestions and improvements. If you have any suggestions or improvements, please feel free to open an issue on the repo!

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
- ✅ AI-powered development workflows

## AI-Powered Development Workflows

This repository uses automated AI workflows to maintain code quality and accelerate development:

### Local Development with Ralph

**Ralph** is a simple bash script (`./scripts/ralph`) for working with AI workflows locally - no CLI tools or installation required:

```bash
# Create a structured plan for your task
./scripts/ralph plan "Add authentication to next-ssr"

# Execute, review, and iterate through the plan
./scripts/ralph execute auth-next-ssr.md
./scripts/ralph review auth-next-ssr.md
./scripts/ralph iterate auth-next-ssr.md
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
