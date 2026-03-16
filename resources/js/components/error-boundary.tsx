import axios from 'axios';
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error('ErrorBoundary caught:', error, info);

        axios.post('/client-errors', {
            message: error.message,
            url: window.location.href,
            stack: error.stack ?? '',
            component_stack: info.componentStack ?? null,
        }).catch(() => {});
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <div className="w-full max-w-md rounded-lg border bg-card p-8 text-center shadow-sm">
                    <h2 className="mb-2 text-xl font-semibold text-foreground">
                        Algo sali&oacute; mal
                    </h2>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Ocurri&oacute; un error inesperado. Puedes intentar de nuevo o recargar la p&aacute;gina.
                    </p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent"
                        >
                            Intentar de nuevo
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                        >
                            Recargar p&aacute;gina
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
