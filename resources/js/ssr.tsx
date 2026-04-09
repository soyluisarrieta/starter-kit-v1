import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: async (name) => {
            const mod = await resolvePageComponent<{ default: ResolvedComponent }>(
                `./pages/${name}.tsx`,
                import.meta.glob<{ default: ResolvedComponent }>('./pages/**/*.tsx'),
            );
            return mod.default;
        },
        setup: ({ App, props }) => {
            const ssrQueryClient = new QueryClient({
                defaultOptions: {
                    queries: { staleTime: 1000 * 60 * 5, retry: false },
                },
            });
            return (
                <QueryClientProvider client={ssrQueryClient}>
                    <App {...props} />
                </QueryClientProvider>
            );
        },
    }),
);
