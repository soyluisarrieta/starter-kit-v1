---
name: laravel-validation
description: >
  Validation with FormRequests, Traits, and custom attributes.
  Trigger: Creating validation rules.
---

# Laravel Validation - Skill

## FormRequest Pattern

```php
// ✅ Basic FormRequest with reusable validation rules
namespace App\Http\Requests\User;

use App\Concerns\UserValidationRules;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    use UserValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->route('user');
        return $this->userRules($user?->id);
    }

    public function attributes(): array
    {
        return $this->userAttributes();
    }
}
```

## Validation Traits

```php
// ✅ Reusable validation rules in Traits in a Concerns folder
// ✅ This pattern only uses when the validation rules are the same for multiple requests
namespace App\Concerns;

use App\Models\User;
use Illuminate\Validation\Rule;

trait UserValidationRules
{
    protected function userRules(?string $userId = null): array
    {
        return [
            'name' => 'required|string|regex:/^[a-zA-Z\\s]+$/|min:3|max:25',
            'email' => $this->emailRules($userId),
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }

    // ✅ Separate some property rules because it is used in multiple requests
    protected function emailRules(?string $userId = null): array
    {
        return [
            'required',
            'string',
            'email:filter',
            'max:255',
            Rule::unique(User::class)->ignore($userId),
        ];
    }

    // ✅ Custom attributes in Spanish
    protected function userAttributes(): array
    {
        return [
            'name' => 'nombre',
            'email' => 'correo electrónico',
        ];
    }
}
```

## Keywords

laravel, validation, form-request, traits, unique-rule, custom-attributes
