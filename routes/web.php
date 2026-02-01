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
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
