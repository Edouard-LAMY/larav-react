<?php

use App\Http\Controllers\Settings\DashboardController;
use App\Http\Controllers\Settings\ImageController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SliderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['prefix' => 'admin'], function() {

        //Dashboard
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::redirect('settings', 'settings/profile')->name('profile');
    
        // PROFILE
        Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
        //PASSWORD
        Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
        Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');
    
        Route::get('settings/appearance', function () {
            return Inertia::render('settings/appearance');
        })->name('appearance');

        // IMAGES
        Route::get('settings/images', [ImageController::class, 'index'])->name('image.index');
        Route::get('settings/create-image/', [ImageController::class, 'create'])->name('image.create');
        Route::post('settings/create-image/', [ImageController::class, 'store'])->name('image.store');
        Route::put('settings/update-image/{image}', [ImageController::class, 'update'])->name('image.update');
        Route::post('settings/update-image/{image}', [ImageController::class, 'delete'])->name('image.delete');

        // SLIDERS
        Route::get('settings/sliders', [SliderController::class, 'index'])->name('image.index');
        Route::post('settings/create-slider/', [SliderController::class, 'store'])->name('slider.store');
        Route::put('settings/update-slider/{slider}', [SliderController::class, 'update'])->name('slider.update');
        Route::post('settings/update-slider/{slider}', [SliderController::class, 'delete'])->name('slider.delete');
    });
});
