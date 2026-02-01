<?php

namespace App\Http\Requests\Settings;

use App\Concerns\UserValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    use UserValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return $this->userRules($this->user()->id);
    }

    public function attributes(): array
    {
        return $this->userAttributes();
    }
}