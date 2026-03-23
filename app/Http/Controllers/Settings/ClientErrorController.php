<?php

namespace App\Http\Controllers\Settings;

use App\Concerns\HasDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\DataTableRequest;
use App\Models\ClientError;
use Inertia\Inertia;

class ClientErrorController extends Controller
{
    use HasDataTable;

    public function index(DataTableRequest $request)
    {
        $query = ClientError::with('user:id,name,email');
        $sortableColumns = ['id', 'message', 'occurrences', 'last_seen_at', 'first_seen_at'];

        $errors = $this->applyDataTable($query, $request, $sortableColumns, [
            'sortBy' => 'last_seen_at',
            'sortOrder' => 'desc',
            'perPage' => 10,
            'searchEnabled' => false,
        ]);

        if ($request->wantsJson()) {
            return response()->json($errors);
        }

        $queryParams = [
            ...$request->validated(),
            'page' => $request->integer('page', 1) ?: 1,
        ];

        return Inertia::render('settings/errors', compact('errors', 'queryParams'));
    }

    public function resolve(ClientError $error)
    {
        if ($error->resolved_at) {
            $error->update(['resolved_at' => null, 'reopened_at' => now()]);
            Inertia::flash('success', 'Error reabierto');
        } else {
            $error->update(['resolved_at' => now(), 'reopened_at' => null]);
            Inertia::flash('success', 'Error resuelto');
        }

        return back();
    }

    public function destroy(ClientError $error)
    {
        $error->delete();

        Inertia::flash('success', 'Error eliminado');

        return back();
    }
}
