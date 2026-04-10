/**
 * Centralized icon barrel.
 *
 * Import icons from `@/components/icons` and never directly from a vendor
 * package. This keeps the icon set swappable in one place: change the right
 * side of the re-exports in this folder to switch a single icon's source.
 *
 * Default source: Heroicons 2 outline (`react-icons/hi2` → `HiOutline*`).
 */
export * from './actions';
export * from './navigation';
export * from './layout';
export * from './status';
export * from './users';
export * from './custom';

// Generic icon component type for prop typing (replaces LucideIcon).
export type { IconType } from 'react-icons';
