<?php

namespace App\Http\Requests\Modules;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|regex:/^[a-zA-Z\s]+$/|min:3|max:25',
            'lastname' => 'required|string|regex:/^[a-zA-Z\s]+$/|min:3|max:25',
            'gender' => 'nullable|in:male,female,other',
            'birthdate' => 'nullable|date|before_or_equal:today',
            'address' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:50',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:100',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}
