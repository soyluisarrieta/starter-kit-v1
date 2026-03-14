type ExportFormat = 'PDF' | 'CSV' | 'XLS' | 'JSON';

interface ExportConfig {
    filename: string;
    columns: Array<{ id: string; header: string }>;
}

function formatDataForExport<TData extends object>(
    data: TData[],
    columns: ExportConfig['columns'],
): Array<Record<string, TData>> {
    return data.map((row) =>
        columns.reduce<Record<string, TData>>((acc, col) => {
            acc[col.header] = (row as Record<string, TData>)[col.id];
            return acc;
        }, {}),
    );
}

export function exportToPDF<TData extends object>(
    data: TData[],
    config: ExportConfig,
): void {
    const formattedData = formatDataForExport(data, config.columns);
    console.log(`[Exportar PDF] Archivo: ${config.filename}.pdf`);
    console.log('[Exportar PDF] Datos:', formattedData);
}

export function exportToCSV<TData extends object>(
    data: TData[],
    config: ExportConfig,
): void {
    const formattedData = formatDataForExport(data, config.columns);
    const headers = config.columns.map((c) => c.header).join(',');
    const rows = formattedData.map((row) =>
        config.columns.map((c) => String(row[c.header] ?? '')).join(','),
    );
    const csv = [headers, ...rows].join('\n');
    console.log(`[Exportar CSV] Archivo: ${config.filename}.csv`);
    console.log('[Exportar CSV] Contenido:', csv);
}

export function exportToExcel<TData extends object>(
    data: TData[],
    config: ExportConfig,
): void {
    const formattedData = formatDataForExport(data, config.columns);
    console.log(`[Exportar Excel] Archivo: ${config.filename}.xlsx`);
    console.log('[Exportar Excel] Datos:', formattedData);
}

export function exportToJSON<TData extends object>(
    data: TData[],
    config: ExportConfig,
): void {
    const formattedData = formatDataForExport(data, config.columns);
    const json = JSON.stringify(formattedData, null, 2);
    console.log(`[Exportar JSON] Archivo: ${config.filename}.json`);
    console.log('[Exportar JSON] Contenido:', json);
}

export function exportData<TData extends object>(
    format: ExportFormat,
    data: TData[],
    config: ExportConfig,
): void {
    const exporters: Record<
        ExportFormat,
        <T extends object>(data: T[], config: ExportConfig) => void
    > = {
        PDF: exportToPDF,
        CSV: exportToCSV,
        XLS: exportToExcel,
        JSON: exportToJSON,
    };
    exporters[format](data, config);
}
