<?php

namespace App\Http\Requests\Settings;

use App\Enums\Permissions;
use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permissions::CREATE_ROLES->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'label' => 'required|string|max:70|unique:roles,label,'.$this->route('role'),
        ];
    }

    public function attributes(): array
    {
        return [
            'label' => 'nombre del rol',
        ];
    }
}
