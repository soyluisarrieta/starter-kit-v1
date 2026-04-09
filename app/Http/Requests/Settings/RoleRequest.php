<?php

namespace App\Http\Requests\Settings;

use App\Enums\Permissions;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permissions::MANAGE_ROLES->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:70', 'unique:roles,label,'.($this->route('role')?->id)],
            'hex_color' => ['required', 'string', 'max:7', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
        ];
    }

    public function attributes(): array
    {
        return [
            'label' => 'nombre del rol',
            'hex_color' => 'color del rol',
        ];
    }
}
