# AI Workflow Architecture Diagrams

This document provides visual representations of the AI workflow automation system.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Scaffolding Templates Repository              │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Template 1  │  │  Template 2  │  │  Template N  │          │
│  │              │  │              │  │              │          │
│  │  • Source    │  │  • Source    │  │  • Source    │          │
│  │  • Tests     │  │  • Tests     │  │  • Tests     │          │
│  │  • Docs      │  │  • Docs      │  │  • Docs      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                           │                                       │
│                           ▼                                       │
│         ┌─────────────────────────────────────┐                  │
│         │    AI Workflow Automation Layer     │                  │
│         │                                     │                  │
│         │  ┌──────────────────────────────┐  │                  │
│         │  │   AI Code Review Workflow    │  │                  │
│         │  │   • Analyze changed files    │  │                  │
│         │  │   • Tag relevant agents      │  │                  │
│         │  │   • Post review comments     │  │                  │
│         │  │   Trigger: PR creation       │  │                  │
│         │  └──────────────────────────────┘  │                  │
│         │                                     │                  │
│         │  ┌──────────────────────────────┐  │                  │
│         │  │  Concept Discovery Workflow  │  │                  │
│         │  │  • Scan ecosystem            │  │                  │
│         │  │  • Identify opportunities    │  │                  │
│         │  │  • Create GitHub issues      │  │                  │
│         │  │   Trigger: Weekly (Monday)   │  │                  │
│         │  └──────────────────────────────┘  │                  │
│         │                                     │                  │
│         │  ┌──────────────────────────────┐  │                  │
│         │  │  Test Coverage Workflow      │  │                  │
│         │  │  • Run coverage analysis     │  │                  │
│         │  │  • Identify gaps             │  │                  │
│         │  │  • Create GitHub issues      │  │                  │
│         │  │   Trigger: Weekly (Monday)   │  │                  │
│         │  └──────────────────────────────┘  │                  │
│         └─────────────────────────────────────┘                  │
│                           │                                       │
│                           ▼                                       │
│         ┌─────────────────────────────────────┐                  │
│         │      Custom AI Agents Layer         │                  │
│         │                                     │                  │
│         │  SDLC Phase Agents:                 │                  │
│         │  • Requirements Analyst             │                  │
│         │  • Software Architect               │                  │
│         │  • Implementation Engineer          │                  │
│         │  • UI/UX Designer                   │                  │
│         │  • Quality Analyst                  │                  │
│         │  • Deployment Engineer              │                  │
│         │  • Maintenance Engineer             │                  │
│         │  • Production Support Engineer      │                  │
│         │                                     │                  │
│         │  Template Specialists:              │                  │
│         │  • TypeScript Library Specialist    │                  │
│         │  • Next.js SSR Specialist           │                  │
│         │  • React Router SPA Specialist      │                  │
│         │  • React Router SSR Specialist      │                  │
│         │  • TanStack Router Specialist       │                  │
│         │  • Expo React Native Specialist     │                  │
│         └─────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

## Workflow 1: AI Code Review

### Process Flow

```
Pull Request Created/Updated
           │
           ▼
    ┌─────────────┐
    │   Trigger   │
    │  Workflow   │
    └─────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Analyze Changed    │
    │      Files          │
    │                     │
    │  • Get file list    │
    │  • Identify         │
    │    templates        │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Determine Agents   │
    │                     │
    │  If tests changed:  │
    │   → @quality-       │
    │      analyst        │
    │                     │
    │  If docs changed:   │
    │   → @ui-ux-         │
    │      designer       │
    │                     │
    │  If code changed:   │
    │   → @implementation-│
    │      engineer       │
    │   → @template-      │
    │      specialist     │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Generate Review    │
    │     Context         │
    │                     │
    │  • PR details       │
    │  • Changed files    │
    │  • Relevant agents  │
    │  • Review           │
    │    guidelines       │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Post Comment to    │
    │    Pull Request     │
    │                     │
    │  • Tag agents       │
    │  • Add labels       │
    │  • Provide context  │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │   Agents Provide    │
    │  Specialized Review │
    └─────────────────────┘
```

## Workflow 2: Concept Discovery

### Process Flow

```
Weekly Schedule (Monday 9 AM UTC)
           │
           ▼
    ┌─────────────┐
    │   Trigger   │
    │  Workflow   │
    └─────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Scan Ecosystem     │
    │                     │
    │  • Framework        │
    │    versions         │
    │  • New features     │
    │  • Best practices   │
    │  • Community trends │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Analyze Templates  │
    │                     │
    │  For each template: │
    │  • Check deps       │
    │  • Review patterns  │
    │  • Identify gaps    │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │   Identify          │
    │  Opportunities      │
    │                     │
    │  Categories:        │
    │  • Framework        │
    │    updates          │
    │  • New patterns     │
    │  • DX improvements  │
    │  • Testing          │
    │    enhancements     │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Filter & Prioritize│
    │                     │
    │  • Remove           │
    │    duplicates       │
    │  • Check existing   │
    │    issues           │
    │  • Assess relevance │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Create GitHub      │
    │      Issues         │
    │                     │
    │  For each concept:  │
    │  • Issue title      │
    │  • Description      │
    │  • Context          │
    │  • Next steps       │
    │  • Tag agents       │
    │  • Add labels       │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Generate Summary   │
    │      Report         │
    └─────────────────────┘
```

## Workflow 3: Test Coverage Analysis

### Process Flow

```
Weekly Schedule (Monday 10 AM UTC)
           │
           ▼
    ┌─────────────┐
    │   Trigger   │
    │  Workflow   │
    └─────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Run Coverage       │
    │     Analysis        │
    │                     │
    │  For each template: │
    │  • pnpm test:       │
    │    coverage         │
    │  • Generate         │
    │    reports          │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Identify Coverage  │
    │       Gaps          │
    │                     │
    │  Check:             │
    │  • Line coverage    │
    │  • Branch coverage  │
    │  • Function         │
    │    coverage         │
    │  • Statement        │
    │    coverage         │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Identify Missing   │
    │    Test Types       │
    │                     │
    │  Check for:         │
    │  • Unit tests       │
    │  • Integration      │
    │    tests            │
    │  • E2E tests        │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Compare Against    │
    │     Threshold       │
    │                     │
    │  Threshold: 80%     │
    │  Flag templates     │
    │  below threshold    │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Create GitHub      │
    │      Issues         │
    │                     │
    │  For each gap:      │
    │  • Issue title      │
    │  • Coverage stats   │
    │  • Missing tests    │
    │  • Recommendations  │
    │  • Tag @quality-    │
    │    analyst          │
    │  • Tag template     │
    │    specialist       │
    │  • Add labels       │
    └─────────────────────┘
           │
           ▼
    ┌─────────────────────┐
    │  Generate Summary   │
    │      Report         │
    └─────────────────────┘
```

## Agent Interaction Pattern: "Ralph is a Loop"

The "Ralph is a loop" concept emphasizes iterative, plan-first development:

```
┌──────────────────────────────────────────────────────────┐
│                     Ralph is a Loop                       │
│                                                            │
│   ┌────────────┐                                         │
│   │   START    │                                         │
│   │ (Receive   │                                         │
│   │  Task)     │                                         │
│   └─────┬──────┘                                         │
│         │                                                 │
│         ▼                                                 │
│   ┌────────────┐                                         │
│   │  PLAN MODE │◄────────────────────┐                  │
│   │            │                     │                  │
│   │ • Analyze  │                     │                  │
│   │ • Design   │                     │                  │
│   │ • Break    │                     │                  │
│   │   down     │                     │                  │
│   └─────┬──────┘                     │                  │
│         │                            │                  │
│         ▼                            │                  │
│   ┌────────────┐                     │                  │
│   │  EXECUTE   │                     │                  │
│   │            │                     │                  │
│   │ • Implement│                     │                  │
│   │ • Test     │                     │                  │
│   │ • Validate │                     │                  │
│   └─────┬──────┘                     │                  │
│         │                            │                  │
│         ▼                            │                  │
│   ┌────────────┐                     │                  │
│   │   REVIEW   │                     │                  │
│   │            │                     │                  │
│   │ • Check    │                     │                  │
│   │   results  │                     │                  │
│   │ • Gather   │                     │                  │
│   │   feedback │                     │                  │
│   └─────┬──────┘                     │                  │
│         │                            │                  │
│         ▼                            │                  │
│   ┌────────────┐    Need refinement?│                  │
│   │  Complete? │────────────────────┘                  │
│   │   Yes/No   │                                        │
│   └─────┬──────┘                                        │
│         │                                                │
│         │ Yes                                            │
│         ▼                                                │
│   ┌────────────┐                                        │
│   │    END     │                                        │
│   │ (Task Done)│                                        │
│   └────────────┘                                        │
│                                                           │
│  Key Principles:                                         │
│  • Always start with planning                            │
│  • Iterate based on feedback                             │
│  • Break complex tasks into smaller loops                │
│  • Use specialized agents at each phase                  │
└───────────────────────────────────────────────────────────┘
```

## Agent Orchestration for Complex Features

Example: Adding authentication to a template

```
┌─────────────────────────────────────────────────────────────┐
│              Feature Development Workflow                    │
│                                                              │
│  1. Requirements Phase                                       │
│     ┌──────────────────────────┐                           │
│     │  @requirements-analyst   │                           │
│     │  • Gather requirements   │                           │
│     │  • Define user stories   │                           │
│     │  • Acceptance criteria   │                           │
│     └────────────┬─────────────┘                           │
│                  │                                           │
│                  ▼                                           │
│  2. Design Phase                                            │
│     ┌──────────────────────────┐                           │
│     │  @software-architect     │                           │
│     │  • System design         │                           │
│     │  • Component structure   │                           │
│     │  • Create ADR            │                           │
│     └────────────┬─────────────┘                           │
│                  │                                           │
│                  ▼                                           │
│  3. UI/UX Design                                            │
│     ┌──────────────────────────┐                           │
│     │  @ui-ux-designer         │                           │
│     │  • Interface design      │                           │
│     │  • Wireframes            │                           │
│     │  • Accessibility         │                           │
│     └────────────┬─────────────┘                           │
│                  │                                           │
│                  ▼                                           │
│  4. Implementation                                           │
│     ┌──────────────────────────┐                           │
│     │  @template-specialist    │                           │
│     │  • Write code            │                           │
│     │  • Follow patterns       │                           │
│     │  • Implement i18n        │                           │
│     └────────────┬─────────────┘                           │
│                  │                                           │
│                  ▼                                           │
│  5. Testing                                                  │
│     ┌──────────────────────────┐                           │
│     │  @quality-analyst        │                           │
│     │  • Unit tests            │                           │
│     │  • Integration tests     │                           │
│     │  • E2E tests             │                           │
│     └────────────┬─────────────┘                           │
│                  │                                           │
│                  ▼                                           │
│  6. Code Review                                             │
│     ┌──────────────────────────┐                           │
│     │  AI Code Review          │                           │
│     │  + Tagged agents         │                           │
│     │  • Validate quality      │                           │
│     │  • Check patterns        │                           │
│     └────────────┬─────────────┘                           │
│                  │                                           │
│                  ▼                                           │
│  7. Deployment                                              │
│     ┌──────────────────────────┐                           │
│     │  @deployment-engineer    │                           │
│     │  • Build config          │                           │
│     │  • Environment setup     │                           │
│     │  • Deploy docs           │                           │
│     └────────────┬─────────────┘                           │
│                  │                                           │
│                  ▼                                           │
│  8. Monitoring                                              │
│     ┌──────────────────────────┐                           │
│     │  @production-support     │                           │
│     │  • Set up monitoring     │                           │
│     │  • Error tracking        │                           │
│     │  • Performance metrics   │                           │
│     └──────────────────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: Issue Creation

```
┌──────────────────────────────────────────────────────────────┐
│                   Issue Creation Flow                         │
│                                                               │
│  GitHub Actions Workflow                                      │
│  ┌──────────────────┐                                        │
│  │  Scheduled Run   │                                        │
│  │  (Weekly)        │                                        │
│  └────────┬─────────┘                                        │
│           │                                                   │
│           ▼                                                   │
│  ┌──────────────────┐                                        │
│  │  Analysis Script │                                        │
│  │  • Scan codebase │                                        │
│  │  • Run tests     │                                        │
│  │  • Collect data  │                                        │
│  └────────┬─────────┘                                        │
│           │                                                   │
│           ▼                                                   │
│  ┌──────────────────┐                                        │
│  │  Generate Report │                                        │
│  │  • Findings      │                                        │
│  │  • Metrics       │                                        │
│  │  • Priorities    │                                        │
│  └────────┬─────────┘                                        │
│           │                                                   │
│           ▼                                                   │
│  ┌──────────────────┐                                        │
│  │  Create Issues   │───────┐                               │
│  │  via GitHub API  │       │                               │
│  └────────┬─────────┘       │                               │
│           │                 │                               │
│           │                 ▼                               │
│           │        GitHub Repository                        │
│           │        ┌────────────────┐                       │
│           │        │  New Issue     │                       │
│           │        │  • Title       │                       │
│           │        │  • Description │                       │
│           │        │  • Labels      │                       │
│           │        │  • Agent tags  │                       │
│           │        └────────┬───────┘                       │
│           │                 │                               │
│           ▼                 ▼                               │
│  ┌──────────────────────────────────┐                       │
│  │      Notifications               │                       │
│  │  • Email                         │                       │
│  │  • GitHub notifications          │                       │
│  │  • Activity feed                 │                       │
│  └──────────────────────────────────┘                       │
│           │                                                   │
│           ▼                                                   │
│  ┌──────────────────┐                                        │
│  │  Human Review    │                                        │
│  │  • Validate      │                                        │
│  │  • Prioritize    │                                        │
│  │  • Assign        │                                        │
│  └──────────────────┘                                        │
└──────────────────────────────────────────────────────────────┘
```

## Labels and Organization

```
┌────────────────────────────────────────────────────┐
│              Issue/PR Label System                  │
│                                                     │
│  AI-Generated Content                              │
│  ┌───────────────┐                                 │
│  │ ai-generated  │ - Created by AI workflow        │
│  └───────────────┘                                 │
│  ┌───────────────┐                                 │
│  │ ai-review     │ - Has AI code review            │
│  └───────────────┘                                 │
│                                                     │
│  Issue Types                                        │
│  ┌─────────────────┐                               │
│  │ concept-proposal│ - New concept suggestion      │
│  └─────────────────┘                               │
│  ┌─────────────────┐                               │
│  │ coverage-gap    │ - Test coverage needed        │
│  └─────────────────┘                               │
│  ┌─────────────────┐                               │
│  │ enhancement     │ - Feature request             │
│  └─────────────────┘                               │
│  ┌─────────────────┐                               │
│  │ testing         │ - Test-related                │
│  └─────────────────┘                               │
│                                                     │
│  Template-Specific                                  │
│  ┌──────────────────────────┐                      │
│  │ template:typescript-     │                      │
│  │         library          │                      │
│  └──────────────────────────┘                      │
│  ┌──────────────────────────┐                      │
│  │ template:next-ssr        │                      │
│  └──────────────────────────┘                      │
│  ┌──────────────────────────┐                      │
│  │ template:react-router-   │                      │
│  │         v7-spa           │                      │
│  └──────────────────────────┘                      │
│  ┌──────────────────────────┐                      │
│  │ template:react-router-   │                      │
│  │         v7-ssr           │                      │
│  └──────────────────────────┘                      │
│  ┌──────────────────────────┐                      │
│  │ template:tanstack-       │                      │
│  │         router-spa       │                      │
│  └──────────────────────────┘                      │
│  ┌──────────────────────────┐                      │
│  │ template:expo-react-     │                      │
│  │         native           │                      │
│  └──────────────────────────┘                      │
└────────────────────────────────────────────────────┘
```

## Summary

These diagrams illustrate the three core AI workflows:

1. **AI Code Review** - Automated PR review with agent tagging
2. **Concept Discovery** - Weekly ecosystem scanning for improvements
3. **Test Coverage** - Weekly analysis of test gaps

All workflows follow the "Ralph is a loop" principle: plan first, execute, review, and iterate.

For more details, see:
- [AI Workflows README](/docs/ai-workflows/README.md)
- [Quick Start Guide](/docs/ai-workflows/quick-start.md)
- [Usage Examples](/docs/ai-workflows/examples.md)
