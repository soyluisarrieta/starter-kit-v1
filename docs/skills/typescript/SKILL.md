---
name: typescript-config
description: >
  TypeScript strict configuration with path aliases.
  Trigger: TypeScript setup and imports.
---

# TypeScript Configuration - Skill

## Type-Only Imports

```ts
// ✅ Type imports
import type { ColumnDef } from '@tanstack/react-table';
import type { BreadcrumbItem, Role } from '@/types';

// ✅ Mixed imports
import { useState } from 'react';
import type { FC } from 'react';
```

## Path Aliases

```ts
// ✅ Use @ alias
import { cn } from '@/lib/utils';
import Heading from '@/components/layout/heading';
import type { User } from '@/types';

// ❌ Never relative paths for deep imports
import { cn } from '../../../lib/utils';
```

## Typing Patterns

```ts
// ✅ Interface for component props & objects
interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => void;
}

// ✅ Type for unions
type Status = 'pending' | 'approved' | 'rejected';

// ✅ Generic constraints
interface DataWithId {
  id: number;
}

function getData<T extends DataWithId>(items: T[]): T[] {
  return items;
}
```

## Extending Types

```ts
// ✅ Extend Inertia types
import type { SharedData } from '@/types';

interface PageProps extends SharedData {
  users: User[];
  filters: Filters;
}

export default function Page() {
  const { users } = usePage<PageProps>().props;
}
```

## Record Types

```ts
// ✅ Dynamic keys only if necessary
interface PermissionRow {
  roles: Record<string, boolean>;
}

// ✅ For mapped objects only if neccesary
const config: Record<string, FilterConfig> = {
  status: { type: 'select', options: [...] },
};
```

## Keywords

typescript, tsconfig, strict-mode, path-aliases, type-imports
