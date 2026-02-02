<?php

namespace App\Http\Requests\User;

use App\Concerns\PasswordValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DestroyMultipleUsersRequest extends FormRequest
{
    use PasswordValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'password' => $this->currentPasswordRules(),
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['required', 'integer', 'exists:users,id'],
        ];
    }

    public function attributes(): array
    {
        return [
            ...$this->passwordAttributes(),
            'ids' => 'usuarios',
            'ids.*' => 'ID de usuario',
        ];
    }

    public function messages(): array
    {
        return [
            'ids.required' => 'Debe seleccionar al menos un usuario para eliminar.',
            'ids.min' => 'Debe seleccionar al menos un usuario para eliminar.',
            'ids.*.exists' => 'Uno o más usuarios seleccionados no existen.',
        ];
    }
}
