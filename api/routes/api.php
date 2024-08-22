<?php

use App\Http\Controllers\LedController;
use App\Http\Controllers\DeviceAuthController;
use App\Http\Controllers\StrokeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response()->json("halo");
});

Route::post('user/register', [USerController::class, 'register']);

Route::get('/led', [LedController::class, 'getState'])->name('led.state');
Route::post('/led', [LedController::class, 'switch'])->name('led.switch');

Route::post('/stroke/save', [StrokeController::class, 'save']);

Route::post('/device/register', [DeviceAuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/device/cycle', [StrokeController::class, 'store']);