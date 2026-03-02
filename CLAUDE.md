# CLAUDE.md

This repository provides AI agent skills for Claude Code (claude.ai/code), OpenCode, and other AI assistants.
Skills provide on-demand context and patterns for working with this codebase.

## Quick Start

When working on this project, Claude Code automatically loads relevant skills based on context.
For manual loading, read the SKILL.md file directly.

## Available Skills

| Skill | Description |
| ----- | ----------- |
| **[react-19](docs/skills/react-19/SKILLmd)** | React 19 patterns, compiler, hooks (includes tanstack-table) |
| **[typescript](docs/skills/typescript/SKILL.md)** | TypeScript strict config, types, path aliases |
| **[laravel-12](docs/skills/laravel-12/SKILL.md)** | Laravel 12 patterns (includes validation) |
| **[project-architecture](docs/skills/project-architecture/SKILL.md)** | Full-stack architecture overview |

## Global Rules

> **The AI MUST NOT load any skill until the prompt keywords match the skill's Trigger.**

If the user makes a broad request:  
→ **The AI must show an index of relevant skills.**

If the user asks for something specific:  
→ **The AI loads only that skill.**
