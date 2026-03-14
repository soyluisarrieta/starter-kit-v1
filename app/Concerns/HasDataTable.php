<?php

namespace App\Concerns;

use App\Http\Requests\DataTableRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

trait HasDataTable
{
    /**
     * Apply DataTable query parameters (search, sort, pagination) to a query builder.
     *
     * @param  Builder  $query  The Eloquent query builder to apply filters to.
     * @param  DataTableRequest  $request  The validated request containing query params.
     * @param  string[]  $sortableColumns  Whitelist of columns allowed for sorting. Empty = allow all.
     * @param  array{
     *             sortBy?: string,
     *             sortOrder?: string,
     *             perPage?: int,
     *             searchEnabled?: bool,
     *         }  $defaults  Default values and options for this table.
     */
    protected function applyDataTable(
        Builder $query,
        DataTableRequest $request,
        array $sortableColumns = [],
        array $defaults = [
            'sortBy' => 'id',
            'sortOrder' => 'desc',
            'perPage' => 10,
            'searchEnabled' => true,
        ],
    ): LengthAwarePaginator {
        $search = $request->validated('search', '');
        $perPage = (int) ($request->validated('perPage', $defaults['perPage']) ?? $defaults['perPage']);
        $sortBy = $request->validated('sortBy', $defaults['sortBy']) ?? $defaults['sortBy'];
        $sortOrder = $request->validated('sortOrder', $defaults['sortOrder']) ?? $defaults['sortOrder'];

        // Validate sortable columns
        if (! empty($sortableColumns) && ! in_array($sortBy, $sortableColumns, true)) {
            $sortBy = $defaults['sortBy'];
        }

        // Apply search
        if ($defaults['searchEnabled'] && $search && method_exists($query->getModel(), 'scopeSearch')) {
            $query->search($search);
        }

        return $query
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();
    }
}
