export function cleanQueryParams(queryParams: Record<string, any>) {
    return Object.fromEntries(
        Object.entries(queryParams).filter(([, v]) => v !== '' && v != null),
    );
}
