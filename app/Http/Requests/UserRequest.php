<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        $user = $this->user();

        return [
            'name' => 'required|string|regex:/^[a-zA-Z\s]+$/|min:3|max:25',
            'last_name' => 'required|string|regex:/^[a-zA-Z\s]+$/|min:3|max:25',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'email' => [
                'required',
                'string',
                'email',
                'max:100',
                Rule::unique(User::class)->ignore($user->id),
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'nombre',
            'avatar' => 'avatar',
            'email' => 'correo electrónico',
        ];
    }
}
