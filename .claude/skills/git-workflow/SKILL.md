---
name: git-workflow
description: >
  Conventional commits, versioning with changelogen, and release workflow.
  Trigger: git commit, versioning, release, changelog.
---

# Git Workflow - Skill

## Conventional Commits

Format: `type(scope): message` (lowercase, no period at end)

| Type | When to use |
| ---- | ----------- |
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Maintenance (deps, config, tooling) |
| `docs` | Documentation only |
| `refactor` | Refactor without behavior change |
| `test` | Adding or updating tests |
| `style` | Formatting, no logic change |
| `perf` | Performance improvement |

```bash
# ✅ Correct
feat(users): add role-based access control
fix(data-table): preserve filters after mutation
chore(deps): upgrade tanstack-query to v5.90

# ❌ Incorrect
Fixed bug in users
feat: Added new feature.
FIX(Users): Stuff
```

## Breaking Changes

```bash
# Append ! or add BREAKING CHANGE footer
feat!: remove legacy auth endpoints

# Or via footer
feat(auth): migrate to OAuth2

BREAKING CHANGE: removed /api/v1/login endpoint
```

## Semver Impact

| Commit type | Version bump |
| ----------- | ------------ |
| `fix`, `perf` | patch (1.0.0 → 1.0.1) |
| `feat` | minor (1.0.1 → 1.1.0) |
| `BREAKING CHANGE` | major (1.1.0 → 2.0.0) |
| `chore`, `docs`, `style`, `refactor`, `test` | no bump |

## Release Process

```bash
# Analyze commits → bump version → update CHANGELOG.md → create git tag → push
bun run release
```

What `bun run release` does internally:
1. `bunx changelogen --release` — reads commits since last tag, determines next version, updates `package.json` and `CHANGELOG.md`, creates tag `vX.Y.Z`
2. `git push --follow-tags` — pushes commit + tag to remote

> Run this only from `main` with a clean working tree.

## Commitlint (enforced via Husky)

The `commit-msg` hook runs `bunx commitlint` on every commit. Commits that don't follow conventional format are **rejected**.

```bash
# ✅ Passes
git commit -m "feat(auth): add two-factor authentication"

# ❌ Rejected by commitlint
git commit -m "added 2fa"
```

## Scopes (common)

Use the module or feature area as scope:

```
auth, users, roles, data-table, layout, ui, deps, config, migrations
```

Scope is optional but recommended for clarity.

## Keywords

git, commit, conventional-commits, changelogen, release, versioning, changelog, semver, commitlint
