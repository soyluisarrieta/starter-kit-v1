import type { VisibilityState } from '@tanstack/react-table';
import { useEffect, useRef } from 'react';
import type { ResponsiveColumnConfig } from '@/types/data-table';

interface UseResponsiveColumnsParams {
    configs: ResponsiveColumnConfig[];
    onVisibilityChange: (visibility: VisibilityState) => void;
    currentVisibility: VisibilityState;
}

export function useResponsiveColumns({
    configs,
    onVisibilityChange,
    currentVisibility,
}: UseResponsiveColumnsParams): void {
    const previousWidthRef = useRef<number>(0);
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const calculateVisibility = (width: number): VisibilityState => {
            const visibility: VisibilityState = { ...currentVisibility };

            for (const config of configs) {
                const shouldBeVisible = width >= config.minWidth;
                visibility[config.columnId] = shouldBeVisible;
            }

            return visibility;
        };

        const handleResize = (): void => {
            const width = window.innerWidth;

            if (width === previousWidthRef.current) return;
            previousWidthRef.current = width;

            const newVisibility = calculateVisibility(width);

            const hasChanges = configs.some(
                (config) =>
                    newVisibility[config.columnId] !==
                    currentVisibility[config.columnId],
            );

            if (hasChanges) {
                onVisibilityChange(newVisibility);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [configs, onVisibilityChange, currentVisibility]);
}
