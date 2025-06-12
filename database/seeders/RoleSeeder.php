<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role       = new Role();
        $role->name = 'admin';
        $role->label = 'Administrateur';
        $role->save();

        $role1       = new Role();
        $role1->name = 'viewer';
        $role1->label = 'Lecteur';
        $role1->save();

        $role2       = new Role();
        $role2->name = 'client';
        $role2->label = 'Client';
        $role2->save();

        $role3       = new Role();
        $role3->name = 'manager';
        $role3->label = 'Manager';
        $role3->save();
    }
}
