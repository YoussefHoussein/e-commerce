<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class CrudProducts extends Controller
{
    //
    public function addNewProduct(Request $request){
        $name = $request->input('name');
        $description = $request->input('description');
        $price = $request->input('price');
        $category = $request->input('category');
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images');
        }
        else{
            return response()->json(['error' => 'Image not received'], 400);
        }

        

        $product = new Product();
        $product->name = $name;
        $product->description = $description;
        $product->price = $price;
        $product->category = $category;
        $product->image= $imagePath;

        $product->save();
        
        return json_encode(["status"=>"success"]);
    }
    public function getAllProducts(){
        $products = Product::all();
    
        
        $productData = [];
    
        foreach ($products as $product){
            
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
    public function getProductsIds(){
        $products = Product::all();

        $product_ids = [];

        foreach ($products as $product){
            
            $product_ids[] = $product->id;
                
        }
        return $product_ids;
    }
    public function getDataById(Request $request){
        
        $product = Product::find($request->input('id'));

        $name = $product->name;
        $price = $product->price;
        $description = $product->description;
        $category = $product->category;
        $image = $product->image;


        return json_encode(["name"=>$name,"price"=>$price,"description"=>$description,"category"=>$category,"image"=>$image]);
    }
    public function editProduct(Request $request){
        $name = $request->input('name');
        $description = $request->input('description');
        $price = $request->input('price');
        $category = $request->input('category');
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images');
        }
        $product = Product::find($request->input('id'));

        $product->name = $name;
        $product->description = $description;
        $product->price = $price;
        $product->category = $category;
        $product->image= $imagePath;
        $product->save();

        return json_encode(["status"=>"success"]);


    }
    public function deleteProduct(Request $request){
        $product = Product::find($request->input('id'))->delete();

        return json_encode(["status"=>"success"]);
    }
    
}
