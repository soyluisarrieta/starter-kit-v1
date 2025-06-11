<?php

use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('inicio', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource_es('usuarios', UserController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
