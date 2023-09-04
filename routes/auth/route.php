<?php

use App\Http\Controllers\DreamController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function(){
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::resource('profile', ProfileController::class, [
        "only" => ["index", "show", "update", "destroy"]
    ]);

    Route::prefix('/profile')->name('profile.')->group(function(){
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    });

    Route::resource('notification', NotificationController::class, [
        "only" => ["index"]
    ]);

    Route::resource('search', SearchController::class, [
       "only" => ["index"]
    ]);

    Route::resource('dream', DreamController::class, [
        "only" => ["store"]
    ]);
});



