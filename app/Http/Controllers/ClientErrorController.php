<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientErrorRequest;
use App\Models\ClientError;
use App\Notifications\FrequentClientErrorNotification;
use App\Notifications\NewClientErrorNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class ClientErrorController extends Controller
{
    /**
     * Query parameter names that may contain credentials and must be removed
     * from the stored URL to avoid leaking secrets into the database.
     */
    private const SENSITIVE_QUERY_KEYS = [
        'token',
        'access_token',
        'refresh_token',
        'api_key',
        'apikey',
        'key',
        'secret',
        'password',
        'auth',
        'authorization',
        'session',
        'sig',
        'signature',
    ];

    public function store(ClientErrorRequest $request)
    {
        $validated = $request->validated();

        $fingerprint = hash('sha256', $validated['message']);
        $sanitizedUrl = $this->sanitizeUrl($validated['url']);

        $error = ClientError::where('fingerprint', $fingerprint)->first();

        if ($error) {
            $data = [
                'occurrences' => $error->occurrences + 1,
                'last_seen_at' => now(),
                'user_id' => auth()->id() ?? $error->user_id,
            ];

            if ($error->resolved_at) {
                $data['resolved_at'] = null;
                $data['reopened_at'] = now();
            }

            $error->update($data);
        } else {
            $error = ClientError::create([
                'fingerprint' => $fingerprint,
                'message' => $validated['message'],
                'stack' => $validated['stack'] ?? '',
                'component_stack' => $validated['component_stack'] ?? null,
                'url' => $sanitizedUrl,
                'user_id' => auth()->id(),
                'user_agent' => Str::limit((string) $request->userAgent(), 500, ''),
                'environment' => config('app.env'),
                'occurrences' => 1,
                'first_seen_at' => now(),
                'last_seen_at' => now(),
            ]);
        }

        $this->notify($error);

        return response()->noContent();
    }

    /**
     * Strip sensitive query parameters from a URL before persisting it.
     * Values are replaced with `[redacted]` so the rest of the URL stays useful.
     */
    private function sanitizeUrl(string $url): string
    {
        $parsed = parse_url($url);
        if ($parsed === false || ! isset($parsed['query'])) {
            return $url;
        }

        parse_str($parsed['query'], $params);
        $changed = false;

        foreach ($params as $key => $value) {
            if (in_array(strtolower((string) $key), self::SENSITIVE_QUERY_KEYS, true)) {
                $params[$key] = '[redacted]';
                $changed = true;
            }
        }

        if (! $changed) {
            return $url;
        }

        $rebuilt = ($parsed['scheme'] ?? 'https').'://'.($parsed['host'] ?? '');
        if (isset($parsed['port'])) {
            $rebuilt .= ':'.$parsed['port'];
        }
        $rebuilt .= $parsed['path'] ?? '';
        $rebuilt .= '?'.http_build_query($params);
        if (isset($parsed['fragment'])) {
            $rebuilt .= '#'.$parsed['fragment'];
        }

        return $rebuilt;
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
