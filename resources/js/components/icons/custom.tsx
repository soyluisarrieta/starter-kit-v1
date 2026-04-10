import type { SVGProps } from 'react';

/**
 * Custom icons used to fill gaps in Heroicons 2.
 * Heroicons doesn't ship a plain outline circle, so we draw one here.
 */
export function CircleIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
        </svg>
    );
}
