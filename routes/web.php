<?php

use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\Guest\PublicPostsController;
use App\Http\Controllers\Home\BlogPostsController;
use App\Http\Controllers\Home\HomeController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

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

Route::get('/', function () {return view('welcome');});

Route::get('/home', [HomeController::class, 'getUser']);

Route::name('login')->get('/login', function () { return view('welcome');});


/*
|------------------------------------------------------
| Blog Posts Routes
|--------------------------------------------------
| Route below this line relates to blog post.
| resource endpoints is used to reduce the
| lines of codes required for setting up
| routes. This is expected to be a
| private or protected route
|
*/
Route::resource('posts', BlogPostsController::class)->only(['index', 'store']);


/*
|------------------------------------------------------
| Public Posts Routes
|--------------------------------------------------
| Route below this line relates to blog post.
| resource endpoints is used to reduce the
| lines of codes required for setting up
| routes. This is expected to be a
| public route
|
*/
Route::resource('public-posts', PublicPostsController::class)->only(['index']);
