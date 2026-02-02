<?php

use App\Enums\Permissions;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn () => Inertia::render('dashboard'))->name('dashboard');

    Route::get('/usuarios', [UserController::class, 'index'])
        ->middleware('can:'.Permissions::LIST_USER->value)
        ->name('users');

    Route::post('/users', [UserController::class, 'store'])
        ->middleware('can:'.Permissions::CREATE_USER->value)
        ->name('users.store');

    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('can:'.Permissions::UPDATE_USER->value)
        ->name('users.update');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('can:'.Permissions::DELETE_USER->value)
        ->name('users.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
