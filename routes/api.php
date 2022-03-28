<?php

use App\Http\Controllers\Guest\PublicPostsController;
use App\Http\Controllers\Home\BlogPostsController;
use App\Http\Controllers\Home\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/user', [HomeController::class, 'getUser']);


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
Route::resource('posts', BlogPostsController::class)->only(['index', 'store', 'show']);

/*
|------------------------------------------------------
| Blog Posts Routes
|--------------------------------------------------
| Route below this line relates to blog post.
| resource endpoints is used to reduce the
| lines of codes required for setting up
| routes. This is expected to be a
| public route
|
*/
Route::resource('public-posts', PublicPostsController::class)->only(['index']);
