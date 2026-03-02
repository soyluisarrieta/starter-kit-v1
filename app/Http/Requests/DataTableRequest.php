<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DataTableRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:100'],
            'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
            'sortBy' => ['nullable', 'string', 'max:50', 'regex:/^[a-zA-Z_]+$/'],
            'sortOrder' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
        ];
    }
}
