<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'last_name' => $this->last_name,
      'full_name' => "{$this->name} {$this->last_name}",
      'email' => $this->email,
      'birthdate' => $this->birthdate,
      'gender' => $this->gender,
      'phone' => $this->phone,
      'address' => $this->address,
      'avatar' => $this->avatar,
      'email_verified_at' => $this->email_verified_at,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      'roles' => $this->getRoleNames(),
      'permissions' => $this->getAllPermissions()->pluck('name'),
    ];
  }
}
