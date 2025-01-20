<?php

namespace App\Http\Requests;

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
    return  [
      'name' => 'required|string|min:3|max:50',
      'last_name' => 'required|string|min:3|max:50',
      'gender' => 'required|string|in:male,female,other',
      'email' => ['required', 'string', 'email', 'max:100', Rule::unique('users')->ignore($this->user?->id)],
      'password' => 'nullable|string|min:8|max:35|confirmed',
      'birthdate' => 'nullable|date|before_or_equal:' . now()->toDateString(),
      'address' => 'nullable|string|min:3|max:100',
      'phone' => 'nullable|string|regex:/^[0-9]+$/|size:10',
      'avatar' => 'nullable|image|max:2048', // 2MB
    ];
  }
}
