# Custom Agent Template

Use this template when creating new custom agents for the repository.

## Agent File Structure

### File Naming Convention

**Format:** `agent-name.agent.md`

**Examples:**
- `requirements-analyst.agent.md`
- `software-architect.agent.md`
- `nextjs-ssr-specialist.agent.md`

**Rules:**
- Use lowercase with hyphens
- End with `.agent.md`
- Use descriptive, role-based names

### Basic Template

```markdown
---
name: agent-name
description: Brief description of the agent's role and expertise (1-2 sentences, max 150 characters)
tools: ["read", "search", "edit", "create", "bash", "grep", "glob"]
---

# Agent Title

You are a **[Role/Title]** for the scaffolding-templates repository. [Brief description of the agent's purpose and expertise]

## Your Role

- **Key Responsibility 1**: Clear description
- **Key Responsibility 2**: Clear description  
- **Key Responsibility 3**: Clear description

## Core Principles

### Principle Category 1

Explain the first set of principles this agent should follow.

- **Guideline 1**: Specific instruction
- **Guideline 2**: Specific instruction
- **Guideline 3**: Specific instruction

### Principle Category 2

Explain the second set of principles.

- **Guideline 1**: Specific instruction
- **Guideline 2**: Specific instruction

## Process

1. **Step 1**: Description of first step in agent's workflow
2. **Step 2**: Description of second step
3. **Step 3**: Description of third step
4. **Step 4**: Description of fourth step (if applicable)

## Code Examples

Provide relevant code examples that demonstrate best practices:

```typescript
// Example following repository patterns
import useAppTranslation from '@/hooks/useAppTranslation';

const ExampleComponent = () => {
  const { t } = useAppTranslation();
  
  return (
    <div>
      <h1>{t('Page.title')}</h1>
    </div>
  );
};
```

## Quality Checklist

Before considering work complete:

- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3
- [ ] Requirement 4
- [ ] Requirement 5

## Reference Materials

Required reading before starting:

- `/AGENTS.md` - Repository-wide guidelines
- `/templates/[template-name]/AGENTS.md` - Template-specific patterns
- Existing codebase for established patterns
- [Additional relevant documentation]

## Common Tools & Libraries

List the primary tools and libraries relevant to this agent's work:

- **Tool/Library 1**: Purpose and use case
- **Tool/Library 2**: Purpose and use case
- **Tool/Library 3**: Purpose and use case

## Expected Output

Describe what this agent should produce:

- Output format
- Quality standards
- Documentation requirements
- Testing requirements (if applicable)

Focus on [key outcome the agent should achieve] while maintaining consistency with repository patterns and best practices.
```

## YAML Frontmatter Fields

### Required Fields

**name**: (string)
- Unique identifier for the agent
- Use lowercase with hyphens
- Example: `"requirements-analyst"`

**description**: (string)
- Brief description (1-2 sentences)
- Max 150 characters
- Clearly explains role and expertise
- Example: `"Translates user requirements into technical specifications. Expert in requirements analysis and creating actionable technical docs."`

**tools**: (array of strings)
- List of tools the agent can use
- Standard tools: `["read", "search", "edit", "create", "bash", "grep", "glob"]`
- Add/remove based on agent needs

### Optional Fields

**category**: (string)
- `"sdlc"` for SDLC phase agents
- `"template-specialist"` for framework-specific agents
- Example: `category: "sdlc"`

**expertise**: (array of strings)
- List of specific expertise areas
- Example: `expertise: ["React", "TypeScript", "Testing"]`

**framework**: (string, for template specialists only)
- Specific framework/template
- Example: `framework: "next.js"`

## Content Sections

### 1. Agent Title and Introduction (Required)

```markdown
# Agent Title

You are a **[Role/Title]** for the scaffolding-templates repository. [Introduction paragraph explaining the agent's purpose]
```

**Guidelines:**
- Use title case for agent title
- Bold the role/title
- Keep introduction concise (2-3 sentences)
- Clearly state the agent's primary purpose

### 2. Your Role (Required)

```markdown
## Your Role

- **Key Responsibility 1**: Description
- **Key Responsibility 2**: Description
- **Key Responsibility 3**: Description
```

**Guidelines:**
- List 3-5 key responsibilities
- Use bold for responsibility names
- Be specific and actionable
- Focus on outcomes

### 3. Core Principles (Required)

```markdown
## Core Principles

### Principle Category 1
- Guideline 1
- Guideline 2

### Principle Category 2
- Guideline 1
- Guideline 2
```

**Guidelines:**
- Group principles by category
- 2-4 categories recommended
- 3-5 guidelines per category
- Link to repository patterns

### 4. Process (Recommended)

```markdown
## Process

1. **Step 1**: Description
2. **Step 2**: Description
3. **Step 3**: Description
```

**Guidelines:**
- Outline clear workflow steps
- Use numbered list
- Bold step names
- Be sequential and logical

### 5. Code Examples (Recommended)

```markdown
## Code Examples

\`\`\`typescript
// Example code
\`\`\`
```

**Guidelines:**
- Provide practical examples
- Follow repository patterns
- Include comments
- Show best practices

### 6. Quality Checklist (Required)

```markdown
## Quality Checklist

- [ ] Item 1
- [ ] Item 2
- [ ] Item 3
```

**Guidelines:**
- Use checkbox format
- 5-10 items recommended
- Cover key quality criteria
- Make items actionable

### 7. Reference Materials (Required)

```markdown
## Reference Materials

- Link 1
- Link 2
- Link 3
```

**Guidelines:**
- Link to relevant docs
- Include AGENTS.md
- Reference existing code
- Keep links current

### 8. Common Tools & Libraries (Recommended)

```markdown
## Common Tools & Libraries

- **Tool**: Purpose
```

**Guidelines:**
- List relevant tools
- Explain purpose
- Include examples
- Keep updated

## Agent Types

### SDLC Phase Agent

**Purpose:** General development lifecycle task

**Characteristics:**
- Applies to all templates
- Process-oriented
- Role-based (analyst, architect, engineer, etc.)
- No framework-specific knowledge

**Example:** Requirements Analyst, Software Architect, Quality Analyst

**Template:**
```markdown
---
name: sdlc-agent-name
description: Brief description of SDLC role
category: "sdlc"
tools: ["read", "search", "edit", "create", "bash", "grep", "glob"]
---

# SDLC Agent Title

You are a **[Role]** for the scaffolding-templates repository...

[Focus on cross-template patterns and general best practices]
```

### Template Specialist Agent

**Purpose:** Framework-specific expertise

**Characteristics:**
- Specific to one template/framework
- Framework-focused knowledge
- Technical implementation details
- Best practices for that framework

**Example:** Next.js SSR Specialist, React Router SPA Specialist

**Template:**
```markdown
---
name: template-name-specialist
description: Brief description of framework expertise
category: "template-specialist"
framework: "framework-name"
expertise: ["framework-feature-1", "framework-feature-2"]
tools: ["read", "search", "edit", "create", "bash", "grep", "glob"]
---

# Template Name Specialist

You are a **[Framework] Specialist** for the scaffolding-templates repository...

[Focus on framework-specific patterns and best practices]
```

## Best Practices

### 1. Single Responsibility

Each agent should have one clear focus:

✅ Good: "Requirements Analyst - Analyzes and documents requirements"
❌ Bad: "Full-Stack Developer - Does everything from requirements to deployment"

### 2. Clear Boundaries

Define what the agent does and doesn't do:

```markdown
## What You Do
- Analyze requirements
- Create technical specs
- Define acceptance criteria

## What You Don't Do
- Write implementation code (Implementation Engineer's role)
- Create tests (Quality Analyst's role)
```

### 3. Reference Repository Patterns

Always link to established patterns:

```markdown
## Required Patterns

- **i18n**: All user-facing text must use translation keys (see /AGENTS.md)
- **Forms**: Always use React Hook Form (see /AGENTS.md "Form Handling")
- **Validation**: Use Zod schemas (see /AGENTS.md "API Clients")
```

### 4. Provide Context

Help the agent understand its place in the workflow:

```markdown
## Workflow Position

**Receives from:** Requirements Analyst (technical specifications)
**Produces:** Architectural design documents and ADRs
**Passes to:** Implementation Engineer (implementation guidelines)
```

### 5. Include Examples

Show, don't just tell:

```markdown
## Example Workflow

**Input:** User story about dashboard customization
**Process:** 
1. Review requirements from Requirements Analyst
2. Design component architecture
3. Define state management approach
4. Create ADR for decisions
**Output:** Technical design document with architecture diagrams
```

### 6. Quality Standards

Set clear quality expectations:

```markdown
## Quality Standards

All deliverables must:
- Follow TypeScript strict mode
- Include proper error handling
- Use established patterns from /AGENTS.md
- Include inline documentation for complex logic
- Pass all linters (ESLint, Prettier)
```

### 7. Tool Selection

Choose appropriate tools:

**Read-only agents:** `["read", "search"]`
**Documentation agents:** `["read", "search", "edit", "create"]`
**Implementation agents:** `["read", "search", "edit", "create", "bash", "grep", "glob"]`

## Adding Agents to Repository

### For SDLC Phase Agents

1. **Create root agent:** `/agents/new-agent.agent.md`
2. **Add to all templates:** `/templates/*/agents/new-agent.agent.md`
3. **Update root README:** `/agents/README.md`
4. **Update template READMEs:** `/templates/*/agents/README.md`
5. **Update main docs:**
   - `/AGENTS.md` - Add agent information
   - `/docs/custom-agents-guide.md` - Update agent list
   - `/docs/QUICK_START.md` - Update available agents

### For Template Specialist Agents

1. **Create root specialist:** `/agents/template-name-specialist.agent.md`
2. **Create template specialist:** `/templates/template-name/agents/template-name-specialist.agent.md`
3. **Update root README:** `/agents/README.md`
4. **Update template README:** `/templates/template-name/agents/README.md`
5. **Update main docs:**
   - `/AGENTS.md` - Add specialist information
   - `/docs/custom-agents-guide.md` - Update specialist list

## Testing Your Agent

Before finalizing, test your agent:

### 1. Syntax Validation

- Valid YAML frontmatter
- Proper Markdown formatting
- All links work

### 2. Content Completeness

- All required sections included
- Examples provided
- Quality checklist present
- References complete

### 3. Practical Testing

Test with real scenarios:

```
@new-agent

[Test scenario matching agent's purpose]
```

Verify:
- Agent understands its role
- Follows repository patterns
- Produces expected output
- Maintains quality standards

### 4. Integration Testing

Test with other agents:

```
Step 1: @requirements-analyst [task]
Step 2: @new-agent [task using output from step 1]
Step 3: @implementation-engineer [task using output from step 2]
```

## Maintenance

### Keeping Agents Updated

When repository patterns change:

1. **Identify affected agents**
2. **Update agent documentation**
3. **Update code examples**
4. **Update quality checklists**
5. **Test updated agents**
6. **Update changelog**

### Version Control

Use semantic commit messages:

```
feat(agents): Add new security-specialist agent
fix(agents): Update implementation-engineer with new i18n patterns
docs(agents): Update agent template with new sections
```

## Examples

See existing agents for reference:

- `/agents/requirements-analyst.agent.md` - Simple SDLC agent
- `/agents/software-architect.agent.md` - Complex SDLC agent
- `/agents/implementation-engineer.agent.md` - Comprehensive SDLC agent
- `/agents/nextjs-ssr-specialist.agent.md` - Template specialist agent

## Additional Resources

- **[Custom Agents Guide](/docs/custom-agents-guide.md)** - Complete usage guide
- **[AGENTS.md](/AGENTS.md)** - Repository patterns and guidelines
- **[GitHub Copilot Docs](https://docs.github.com/en/copilot)** - Copilot agent documentation
- **Template-specific docs** - Framework-specific patterns

## Questions?

If you have questions about creating custom agents:

1. Review existing agents for patterns
2. Check the custom agents guide
3. Open an issue for clarification
4. Suggest improvements to this template

---

**Ready to create your agent?** Copy the basic template above and customize it for your needs!
