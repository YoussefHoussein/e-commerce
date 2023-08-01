<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Cart;
class LoginSignupController extends Controller
{
    //
    public function signUp(Request $request)
    {
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $email = $request->input('email');
        $password = $request->input('password');
        $role_id = $request->input('role_id');
        
        $users = User::where("email",$email)->get();

        $encryptedPassword = Hash::make($password);
        if($users->isEmpty()){
            $user = new User();
            $user->first_name = $first_name;
            $user->last_name = $last_name;
            $user->email = $email;
            $user->password = $encryptedPassword;
            $user->role_id = $role_id;
            $user->save();
            
            $favorite = new Favorite();
            $favorite->user_id = $user->id;
            $favorite->save();

            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();

            return json_encode(["status"=>"success","user_id" => $user->id,"favorite_id"=> $favorite->id,"cart_id"=>$cart->id,"role_id"=>$role_id]);
        }
        else{
            return json_encode(["status" =>"user already exists"]);
        }
        
    }
    public function login (Request $request){
        $email = $request->input('email');
        $password = $request->input('password');
        
        $user = User::where("email",$email)->first();
        if(!$user){
            return json_encode(["status" =>"user not found"]);
        }
        else{
            if (Hash::check($password, $user->password)){
                $favorite = Favorite::where("user_id",$user->id)->first();
                $cart = Cart::where("user_id",$user->id)->first();
                return json_encode(["status"=>"success","user_id" => $user->id,"favorite_id"=> $favorite->id,"cart_id"=>$cart->id,"role_id"=>$user->role_id]);
            }
            else{
                return json_encode(["status" =>"Wrong Password"]);
            }
        }
    }

}
