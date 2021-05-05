<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::fallback([SpaController::class, 'lost'])->name("lost");
Route::group([
    "as" => "spa."
], function () {
    Route::get('/', [SpaController::class, 'index'])->name("index");
    Route::get('/about', [SpaController::class, 'index'])->name("about");
    Route::get('/login', [SpaController::class, 'index'])->name("login");
    Route::get('/register', [SpaController::class, 'index'])->name("register");
    Route::get('/account', [SpaController::class, 'index'])->name("account");
    Route::get('/feed', [SpaController::class, 'index'])->name("feed");
});
