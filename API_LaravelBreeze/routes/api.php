<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;

Route::middleware(['auth:sanctum'])->group(function () {
  // Get authenticated user
  Route::get('/user', function (Request $request) {
    return UserResource::make(Auth::user());
  });

  // Resources
  Route::apiResource('users', UserController::class);
});
