<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class LLMService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => config('services.llm.api_url'),
            'stream' => true,
            'headers' => [
                'Authorization' => 'Bearer ' . config('services.llm.api_key'),
                'Content-Type' => 'application/json',
                'Accept' => 'text/event-stream',
            ],
        ]);
    }

    public function run($systemPrompt, $userPrompt)
    {
        $postData = [
            'model' => config('services.llm.model'),
            'max_tokens' => config('services.llm.max_tokens'),
            'stream' => true,
            'messages' => [
                ['role' => 'system', 'content' => $systemPrompt],
                ['role' => 'user', 'content' => $userPrompt],
            ],
        ];

        try {
            return $this->client->post(config('services.llm.endpoint'), [
                'json' => $postData,
            ]);
        } catch (RequestException $e) {
            Log::error('Request to LLM API failed: ' . $e->getMessage());
            throw $e;
        }
    }
}