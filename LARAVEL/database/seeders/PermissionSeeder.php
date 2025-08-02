<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'Admins' => [
                'create-admins',
                'view-admins',
                'update-admins',
                'delete-admins',
            ],
            'Roles' => [
                'create-roles',
                'view-roles',
                'update-roles',
                'delete-roles',
            ],
            'Stores' => [
                'create-stores',
                'view-stores',
                'update-stores',
                'delete-stores',
            ],
            'Products' => [
                'create-products',
                'view-products',
                'update-products',
                'delete-products',
            ],
        ];

        foreach ($permissions as $group => $perms) {
            foreach ($perms as $perm) {
                Permission::firstOrCreate([
                    'name' => $perm,
                    'group' => $group,
                    'guard_name' => 'admin',
                ]);
            }
        }
    }
}
