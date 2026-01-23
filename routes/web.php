<?php

use App\Enums\Permissions;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn () => Inertia::render('dashboard'))->name('dashboard');

    Route::get('/usuarios', fn () => Inertia::render('users/index'))
        ->middleware('can:' . Permissions::LIST_USER->value)
        ->name('users');

    Route::get('/usuarios/crear', fn () => Inertia::render('users/create'))
        ->middleware('can:' . Permissions::CREATE_USER->value)
        ->name('users.create');
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
