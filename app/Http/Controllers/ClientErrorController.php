<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientErrorRequest;
use App\Models\ClientError;
use App\Notifications\FrequentClientErrorNotification;
use App\Notifications\NewClientErrorNotification;
use Illuminate\Support\Facades\Notification;

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
            $error = ClientError::create([
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

        $this->notify($error);

        return response()->noContent();
    }

    private function notify(ClientError $error): void
    {
        $email = config('errors.notify_email');

        if (! $email) {
            return;
        }

        $notifiable = Notification::route('mail', $email);

        if ($error->occurrences === 1) {
            $notifiable->notify(new NewClientErrorNotification($error));
        }

        $threshold = config('errors.frequent_threshold', 10);

        if ($error->occurrences === $threshold) {
            $notifiable->notify(new FrequentClientErrorNotification($error));
        }
    }
}
