---
name: react-19
description: >
  React 19 patterns with React Compiler.
  Trigger: When writing React components - no useMemo/useCallback needed.
---

# React 19 - Skill

## Available Skills

| Skill | Description |
| ----- | ----------- |
| **[tanstack-table](./tanstack-table/SKILL.md)** | TanStack Table v8 advanced patterns |

## Ignored Paths

Auto-generated, never modify:

- `resources/js/routes` - Wayfinder auto-generated routes
- `resources/js/actions` - Wayfinder auto-generated actions
- `resources/js/wayfinder` - Wayfinder runtime

## Naming Conventions

```ts
// ✅ Files: kebab-case for name files
// Example: user-profile.tsx, use-session.ts, date-formatter.ts

// ✅ Components: PascalCase for function components
// ✅ Parameters: camelCase for function parameters
export default function UserForm({ user }: UserFormProps) {}

// ✅ Variables & arrow functions: camelCase
const userData = [];
const handleUpdate = () => {};

// ✅ Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;

// ✅ Booleans: Prefix with is, has, or should
const isLoading = false;
const hasPermissions = true;
```

## Export Patterns

```tsx
// ✅ Use traditional function for components, hooks, stores with default export
// ✅ Use arrow functions for internal logic and handlers
export default function Component({ data }) {
  const transformData = (item) => item.toUpperCase();

  return <div>{data.map(transformData)}</div>;
}

// ✅ Functions named in the same file as arrow function in camelCase
const toUpperCase = (item) => item.toUpperCase();

// ✅ Named export for utility functions in the utils folder
export const toLowerCase = (item) => item.toLowerCase();
```

## No Manual Memoization

```tsx
// ✅ React Compiler handles optimization automatically
function Component({ items }) {
  const filtered = items.filter(x => x.active);
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  const handleClick = (id) => {
    console.log(id);
  };

  return <List items={sorted} onClick={handleClick} />;
}

// ❌ NEVER: Manual memoization
const filtered = useMemo(() => items.filter(x => x.active), [items]);
const handleClick = useCallback((id) => console.log(id), []);
```

## Imports

```tsx
// ✅ ALWAYS: Named imports
import { useState, useEffect, useRef } from "react";

// ❌ NEVER
import React from "react";
import * as React from "react";
```

## use() Hook

```typescript
import { use } from "react";

// Read promises (suspends until resolved)
function Comments({ promise }) {
  const comments = use(promise);
  return comments.map(c => <div key={c.id}>{c.text}</div>);
}

// Conditional context (not possible with useContext!)
function Theme({ showTheme }) {
  if (showTheme) {
    const theme = use(ThemeContext);
    return <div style={{ color: theme.primary }}>Themed</div>;
  }
  return <div>Plain</div>;
}
```

## ref as Prop (No forwardRef)

```tsx
// ✅ React 19: ref is just a prop
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// ❌ Old way (unnecessary now)
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);
```

## Routing (Wayfinder)

```tsx
// ✅ Import auto-generated routes
import { edit as editRoles } from '@/routes/roles';

// Use in links
const url = editRoles().url;
const urlWithParams = editRoles({ id: 123 }).url;
```

## State Management (Zustand)

```ts
// ✅ Store definition
import { create } from 'zustand';

interface StoreState { /* state */ }
interface StoreActions { /* actions */ }
type Store = StoreState & StoreActions;

// ✅ ALWAYS: define an initial state
const initialState = {
  value: 0
}

export const useStore = create<Store>((set, get) => ({
  // state
  ...initialState,

  // actions
  increment: () => set((state) => ({ value: state.value + 1 })),
  reset: () => set(initialState)
}));

// ✅ Usage
const value = useStore((state) => state.value);
const increment = useStore((state) => state.increment);
```

## Forms (InertiaJS)

```ts
import { useForm } from '@inertiajs/react';

const { put, post } = useForm({
  name: user?.name || '',
});

const onSuccess = () => {}

if (user) {
    put(update(user.id).url, { onSuccess });
} else {
    post(store().url, { onSuccess });
}
```

## Keywords

react, react-19, compiler, zustand, wayfinder, inertia, state management
