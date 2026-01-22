<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\ConfirmablePasswordController;
use Laravel\Fortify\Http\Controllers\EmailVerificationPromptController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

Route::group(['middleware' => config('fortify.middleware', ['web'])], function () {

    Route::middleware(['guest:'.config('fortify.guard')])->group(function () {
        Route::get('/ingresar', [AuthenticatedSessionController::class, 'create'])
            ->name('login');

        if (Features::enabled(Features::registration())) {
            Route::get('/registro', [RegisteredUserController::class, 'create'])
                ->name('register');
        }

        if (Features::enabled(Features::resetPasswords())) {
            Route::get('/recuperar-contrasena', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');

            Route::get('/restablecer-contrasena/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');
        }
    });

    Route::middleware([config('fortify.auth_middleware', 'auth').':'.config('fortify.guard')])->group(function () {
        if (Features::enabled(Features::emailVerification())) {
            Route::get('/verificar-correo', EmailVerificationPromptController::class)
                ->name('verification.notice');
        }

        Route::get('/confirmar-contrasena', [ConfirmablePasswordController::class, 'show'])
            ->name('password.confirm');
    });
});
