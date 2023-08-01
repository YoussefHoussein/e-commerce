<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InsertIntoRoles;
use App\Http\Controllers\LoginSignupController;
use App\Http\Controllers\CrudProducts;
use App\Http\Controllers\CartCrud;
use App\Http\Controllers\FavoriteCrud;
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
// Route::get('/addToRole', [InsertIntoRoles::class, 'insertRole']);
// Route::get('/addUserToRole', [InsertIntoRoles::class, 'insertRoleUser']);

Route::post('/signup',[LoginSignupController::class,'signUp']);
Route::post('/login',[LoginSignupController::class,'login']);

Route::post('/addproduct',[CrudProducts::class,'addNewProduct']);
Route::get('/getproducts',[CrudProducts::class,'getAllProducts']);
Route::get('/getproductsids',[CrudProducts::class,'getProductsIds']);
Route::post('/getproductsbyid',[CrudProducts::class,'getDataById']);
Route::post('/editproduct',[CrudProducts::class,'editProduct']);
Route::post('/deleteproduct',[CrudProducts::class,'deleteProduct']);

Route::post('/inserttocart',[CartCrud::class,'insertToCart']);
Route::post('/checkproductincart',[CartCrud::class,'checkProducyInCart']);
Route::post('/getproductsincart',[CartCrud::class,'getAllProductInCart']);
Route::post('/removeproductfromcart',[CartCrud::class,'removeProductFromCart']);

Route::post('/inserttofavorite',[FavoriteCrud::class,'insertToFavorite']);
Route::post('/checkproductinfavorite',[FavoriteCrud::class,'checkProducyInFavorite']);
Route::post('/getproductsinfavorite',[FavoriteCrud::class,'getAllProductInFavorite']);
Route::post('/removeproductfromfavorite',[FavoriteCrud::class,'removeProductFromFavorite']);
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
