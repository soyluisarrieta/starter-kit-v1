---
name: laravel-12
description: >
  Laravel 12 patterns index - links to specific skills.
  Trigger: Laravel backend development.
---

# Laravel 12 - Skills Index

Modern Laravel 12 backend patterns for this starter kit.

## Available Skills

| Skill | Description |
| ----- | ----------- |
| **[validation](./validation/SKILL.md)** | FormRequests with reusable traits |

> **Related:** [project-architecture](../project-architecture/SKILL.md)

## Architecture Principles

### Errors

```php
// ✅ uses Inertia::flash to show toast notifications in the client
public function update(UserRequest $request, User $user)
{
    $user->update($request->validated());
    // ✅ success, error, warning, info
    Inertia::flash('success', 'Usuario actualizado exitosamente');

    return to_route('users');
}
```

### Models

- Use `$guarded = []` for mass assignment but with form requests
- Hide sensitive attributes

### Concerns (Traits)

- Reusable validation rules
- Validation patterns

## Keywords

laravel, laravel-12, backend, mvc, validation
