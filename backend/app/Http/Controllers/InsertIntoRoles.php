<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
class InsertIntoRoles extends Controller
{
    //
    public function insertRole()
    {
        $role = new Role();
        $role->role = 'Admin';
        $role->save();

        return 'Role inserted successfully.';
    }
    public function insertRoleUser()
    {
        $role = new Role();
        $role->role = 'User';
        $role->save();

        return 'Role inserted successfully.';
    }
    
}
