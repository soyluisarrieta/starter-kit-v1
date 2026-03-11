import { useDataTableContext } from '@/components/commons/data-table/data-table-context';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { PaginationLink } from '@/types/data-table';

function getPageFromUrl(url: string): number {
    const match = url.match(/[?&]page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
}

interface DataTablePaginationProps {
    links: PaginationLink[];
}

export default function DataTablePagination({
    links,
}: DataTablePaginationProps) {
    const { perPage, setPerPage, refresh } = useDataTableContext((s) => ({
        perPage: s.query.perPage,
        setPerPage: s.setPerPage,
        refresh: s.refresh,
    }));

    const onPerPageChange = (value: string) => {
        setPerPage(value);
        refresh({ perPage: value });
    };

    const onPageChange = (link: PaginationLink) => {
        if (!link.url) return;
        refresh({ page: getPageFromUrl(link.url) });
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Label>Por Página</Label>
                <Select value={perPage} onValueChange={onPerPageChange}>
                    <SelectTrigger>
                        <SelectValue placeholder={perPage} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-center gap-0.5">
                {links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url || link.active}
                        onClick={() => onPageChange(link)}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={cn(
                            'rounded border px-3 py-1 text-sm',
                            link.active
                                ? 'bg-foreground text-background'
                                : 'bg-background text-foreground',
                            !link.url && 'pointer-events-none opacity-50',
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
