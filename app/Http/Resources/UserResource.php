<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use function PHPUnit\Framework\isNull;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $gender_letter = $this->gender === null || $this->gender === 'male'
            ? 'o' : ($this->gender === 'female' ? 'a' : '@');
        return [
            'id' => $this->id,
            'name' => $this->name,
            'lastname' => $this->lastname,
            'gender' => $this->gender,
            'gender_letter' => $gender_letter,
            'birthdate' => $this->birthdate,
            'address' => $this->address,
            'phone' => $this->phone,
            'has_whatsapp' => $this->has_whatsapp,
            'updated_at' => $this->updated_at,
            'email' => $this->email,
            'avatar' => $this->avatar,
        ];
    }
}
