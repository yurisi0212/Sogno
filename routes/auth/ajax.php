<?php

use App\Http\Controllers\DreamController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->name('auth.')->group(function(){
    Route::post('/ajax-get-dreams', [DreamController::class, 'ajaxGetDreams'])->name('get-dreams');
});
