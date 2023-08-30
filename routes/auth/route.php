<?php

use App\Http\Controllers\DreamController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function(){
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::prefix('/profile')->name('profile.')->group(function(){
        Route::get('/{id}', [ProfileController::class, 'show'])->name('show');
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/{id}', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::resource('dream', DreamController::class, [
        "only" => ["store"]
    ]);
});



