<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientErrorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'message' => ['required', 'string', 'max:500'],
            'stack' => ['nullable', 'string', 'max:10000'],
            'component_stack' => ['nullable', 'string', 'max:10000'],
            'url' => ['required', 'string', 'max:2048'],
        ];
    }
}
