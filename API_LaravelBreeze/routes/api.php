<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

Route::middleware(['auth:sanctum'])->group(function () {
  // Get authenticated user
  Route::get('/user', function (Request $request) {
    return $request->user();
  });

  // Resources
  Route::apiResource('users', UserController::class);
});
