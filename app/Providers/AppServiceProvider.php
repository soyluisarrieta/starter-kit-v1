<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::macro('resource_es', function ($name, $controller) {
            Route::get($name, [$controller, 'index'])->name("$name.index");
            Route::get("$name/crear", [$controller, 'create'])->name("$name.crear");
            Route::post($name, [$controller, 'store'])->name("$name.guardar");
            Route::get("$name/{id}", [$controller, 'show'])->name("$name.mostrar");
            Route::get("$name/{id}/editar", [$controller, 'edit'])->name("$name.editar");
            Route::put("$name/{id}", [$controller, 'update'])->name("$name.actualizar");
            Route::delete("$name/{id}", [$controller, 'destroy'])->name("$name.eliminar");
        });
    }
}
