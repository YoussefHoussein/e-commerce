<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductsInFavorite;
use App\Models\Product;
class FavoriteCrud extends Controller
{
    //
    public function insertToFavorite(Request $request){
        $favorite_id = $request->input('favorite_id');
        $product_id = $request->input('product_id');

        $favorites = ProductsInFavorite::where("favorite_id",$favorite_id)->get();

        foreach($favorites as $favorite){
            $prod_id = $favorite->product_id;
            if($prod_id == $product_id){
                return json_encode(["status"=>"already exists"]);
            }
        }

        $favorite = new ProductsInFavorite();

        $favorite->favorite_id = $favorite_id;
        $favorite->product_id = $product_id;

        $favorite->save();

        return json_encode(["status"=>"success"]);
    }

    public function checkProducyInFavorite(Request $request){
        $favorite_id = $request->input('favorite_id');
        $product_id = $request->input('product_id');

       
        $favorites = ProductsInFavorite::where("product_id",$product_id)->get();

        

        if($favorites->isEmpty()){
            return json_encode(["status"=>"no such favorite"]);
        }
        else{
            foreach($favorites as $favorite){
                if($favorite->favorite_id == $favorite_id){
                    return json_encode(["status"=>"success"]);
                }
                
            }
            return json_encode(["status"=>"product not exists in this favorite"]);
        }
    }
    public function getAllProductInFavorite(Request $request){
        $favorite_id = $request->input('favorite_id');

        $favorites = ProductsInFavorite::where("favorite_id",$favorite_id)->get();

        $products_ids =[];
        foreach ($favorites as $favorite){
            $products_ids[] = $favorite->product_id;
        }
        if(count($products_ids) == 0){
            return json_encode(["status"=>"favorite is empty"]);
        }
        $productData = [];
        foreach($products_ids as $id){
            
            $product = Product::find($id);
            
            if($product){
                $productData[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'description' => $product->description,
                    'category' => $product->category,
                    'image' => $product->image,
                ];
            }
            
            
        }
        return $productData;
        
    }
    public function removeProductFromFavorite(Request $request){
        $favorite_id = $request->input('favorite_id');
        $product_id = $request->input('product_id');

        $favorites = ProductsInFavorite::where("favorite_id",$favorite_id)->get();

        foreach($favorites as $favorite){
            $prod_id = $favorite->product_id;
            if($prod_id == $product_id){
                $favorite->delete();

                return json_encode(["status"=>"success"]);
            }
        }
        return json_encode(["status"=>"product not in favorite"]);
    }
}
