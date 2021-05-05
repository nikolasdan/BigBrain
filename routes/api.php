<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    "prefix" => "/posts",
    "as" => "posts."
], function () {
    Route::get('/', [PostController::class, 'index'])->name("show");
    Route::post('/add', [PostController::class, 'create'])->name("add")->middleware("auth:sanctum");
    Route::get('/show/{id}', [PostController::class, 'show'])->name("show")->where("id", "\d+");
});
Route::group([
    "as" => "user."
], function () {
    Route::post('/login', [UserController::class, 'login'])->name("login");
    Route::post('/register', [UserController::class, 'register'])->name("register");
    Route::post('/info', [UserController::class, 'about'])->middleware('auth:sanctum');
    Route::post('/update', [UserController::class, 'update'])->middleware('auth:sanctum');
    Route::post('/logout', [UserController::class, 'logout'])->middleware("auth:sanctum");
});
