<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//USER
Route::get('/users', [UserController::class, 'index']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
