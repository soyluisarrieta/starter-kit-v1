<?php

namespace App\Http\Controllers\Integrations;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Integrations\LLMRequest;
use App\Services\LLMService;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LLMController extends Controller
{
    protected $llmService;

    public function __construct(LLMService $llmService)
    {
        $this->llmService = $llmService;
    }

    /**
     * Handle the chat request and stream the response from the LLM.
     */
    public function chat(LLMRequest $request): StreamedResponse|JsonResponse
    {
        try {
            $response = $this->llmService->run(
                'Eres una IA integrante del equipo de desarrollo de: ' . config('app.name'),
                $request->userPrompt
            );
        } catch (RequestException $e) {
            Log::error($e->getMessage());
            return match ($e->getCode()) {
                429 => ApiResponse::error(message: 'Too many requests', status: 429),
                503 => ApiResponse::error(message: 'Service unavailable', status: 503),
                default => ApiResponse::error(message: 'Internal server error', status: 500),
            };
        }

        return $this->handleResponse($response);
    }

    /**
     * Handle the response from the LLM.
     */
    protected function handleResponse($response)
    {
        // Check response status
        if ($response->getStatusCode() !== 200) {
            return ApiResponse::error(
                message: 'Failed to get response from LLM',
                status: $response->getStatusCode(),
            );
        }

        // Stream the response back to the client
        return new StreamedResponse(function () use ($response) {
            $body = $response->getBody();
            $buffer = '';

            while (!$body->eof()) {
                $buffer .= $body->read(1024);
                if ($buffer === false) {
                    sleep(1);
                    continue;
                }

                $lines = explode("\n", $buffer);

                foreach ($lines as $index => $line) {
                    if ($index >= count($lines) - 1) {
                        $buffer = $line;
                        continue;
                    }
                    if (str_starts_with(trim($line), "data: ")) {
                        $line = substr(trim($line), 5);
                    }
                    if (empty($line)) {
                        continue;
                    }
                    if (!$token = json_decode($line)) {
                        continue;
                    }
                    if (!isset($token->choices[0]->delta->content)) {
                        continue;
                    }
                    if (empty($token->choices[0]->delta->content)) {
                        continue;
                    }
                    echo json_encode(['text' => $token->choices[0]->delta->content]) . PHP_EOL;
                    @ob_flush();
                    @flush();
                }
            }

            echo 'DONE';
            @ob_flush();
            @flush();
        }, 200, [
            'Content-Type' => $response->getHeaderLine('Content-Type') ?: 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
        ]);
    }
}