<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|regex:/^[a-zA-Z\s]+$/|min:3|max:25',
            'lastname' => 'required|string|regex:/^[a-zA-Z\s]+$/|min:3|max:25',
            'gender' => 'nullable|in:male,female,other',
            'birthdate' => 'nullable|date|before_or_equal:today',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string',
            'has_whatsapp' => 'boolean',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|2048',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}
