<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Str;
use App\Models\User;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $users = User::all();
    return UserResource::collection($users);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(UserRequest $request)
  {
    $user = User::create($request->validated());
    return new UserResource($user);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $user = User::findOrFail($id);
    return new UserResource($user);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UserRequest $request, User $user)
  {
    $validatedData = $request->validated();

    // Handle the avatar update
    if ($request->hasFile('avatar')) {
      if (!empty($user->avatar) && Storage::disk('public')->exists('avatars/' . $user->avatar)) {
        Storage::disk('public')->delete('avatars/' . $user->avatar);
      }

      $file = $request->file('avatar');
      $file->store('avatars', 'public');
      $validatedData['avatar'] = $file->hashName();
    }

    $user->update($validatedData);
    return new UserResource($user);
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $user = User::findOrFail($id);
    $user->delete();
    return response()->noContent();
  }
}
