<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientErrorRequest;
use App\Models\ClientError;

class ClientErrorController extends Controller
{
    public function store(ClientErrorRequest $request)
    {
        $validated = $request->validated();

        $cleanedStack = preg_replace('/:\d+:\d+/', '', $validated['stack'] ?? '');
        $fingerprint = hash('sha256', $validated['message'] . $cleanedStack);

        $error = ClientError::where('fingerprint', $fingerprint)->first();

        if ($error) {
            $error->update([
                'occurrences' => $error->occurrences + 1,
                'last_seen_at' => now(),
                'user_id' => auth()->id() ?? $error->user_id,
            ]);
        } else {
            ClientError::create([
                'fingerprint' => $fingerprint,
                'message' => $validated['message'],
                'stack' => $validated['stack'] ?? '',
                'component_stack' => $validated['component_stack'] ?? null,
                'url' => $validated['url'],
                'user_id' => auth()->id(),
                'occurrences' => 1,
                'first_seen_at' => now(),
                'last_seen_at' => now(),
            ]);
        }

        return response()->noContent();
    }
}
