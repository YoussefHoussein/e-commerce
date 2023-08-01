<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductsInCart;
use App\Models\Product;
class CartCrud extends Controller
{
    //
    public function insertToCart(Request $request){
        $cart_id = $request->input('cart_id');
        $product_id = $request->input('product_id');

        $carts = ProductsInCart::where("cart_id",$cart_id)->get();
        foreach($carts as $cart){
            $prod_id = $cart->product_id;
            if($prod_id == $product_id){
                return json_encode(["status"=>"already exists"]);
            }
        }
        $cart = new ProductsInCart();

        $cart->cart_id = $cart_id;
        $cart->product_id = $product_id;

        $cart->save();

        return json_encode(["status"=>"success"]);
    }
    public function checkProducyInCart(Request $request){
        $cart_id = $request->input('cart_id');
        $product_id = $request->input('product_id');

       
        $carts = ProductsInCart::where("product_id",$product_id)->get();

        

        if($carts->isEmpty()){
            return json_encode(["status"=>"no such carts"]);
        }
        else{
            foreach($carts as $cart){
                if($cart->cart_id == $cart_id){
                    return json_encode(["status"=>"success"]);
                }
                
            }
            return json_encode(["status"=>"product not exists in this cart"]);
            
        }
    }
    public function getAllProductInCart(Request $request){
        $cart_id = $request->input('cart_id');

        $carts = ProductsInCart::where("cart_id",$cart_id)->get();

        $products_ids =[];
        foreach ($carts as $cart){
            $products_ids[] = $cart->product_id;
        }
        if(count($products_ids) == 0){
            return json_encode(["status"=>"cart is empty"]);
        }
        $productData = [];

        foreach($products_ids as $id){
            $product = Product::find($id);
            $productData[] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'description' => $product->description,
                'category' => $product->category,
                'image' => $product->image,
            ];
        }
        return $productData;
        
    }
    public function removeProductFromCart(Request $request){
        $cart_id = $request->input('cart_id');
        $product_id = $request->input('product_id');

        $carts = ProductsInCart::where("cart_id",$cart_id)->get();

        foreach($carts as $cart){
            $prod_id = $cart->product_id;
            if($prod_id == $product_id){
                $cart->delete();

                return json_encode(["status"=>"success"]);
            }
        }
        return json_encode(["status"=>"product not in cart"]);
    }
}
