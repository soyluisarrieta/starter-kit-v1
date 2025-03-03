<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    // Success
    public static function success(
        $data = null,
        string $message = 'OK',
        int $status = 200,
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'errors' => null,
            'meta' => self::getMeta($status),
        ], $status);
    }

    // Error
    public static function error(
        $data = null,
        string $message = 'ERROR',
        int $status = 400,
        array $details = []
    ): JsonResponse {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => $data,
            'errors' => $details,
            'meta' => self::getMeta($status),
        ], $status);
    }

    // Common metadata
    private static function getMeta(int $status): array
    {
        return [
            'timestamp' => now()->toISOString(),
            'status' => $status,
            'api_version' => config('api.version', '1.0'),
            'request_id' => request()->header('X-Request-ID')
        ];
    }
}