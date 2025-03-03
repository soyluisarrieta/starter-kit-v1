<?php

namespace App\Http\Requests\Integrations;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class LLMRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userPrompt' => 'string|min:1|max:5000'
        ];
    }
}
