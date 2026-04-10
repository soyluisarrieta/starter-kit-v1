import type { IconType } from '@/components/icons';

interface IconProps {
    iconNode?: IconType | null;
    className?: string;
}

export function Icon({ iconNode: IconComponent, className }: IconProps) {
    if (!IconComponent) {
        return null;
    }

    return <IconComponent className={className} />;
}
