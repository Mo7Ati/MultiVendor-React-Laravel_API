<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\stores\RoleResource;
use App\Models\RoleAbility;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'search' => 'nullable|string',
            'per_page' => 'nullable|integer',
        ]);

        $query = Role::withCount('permissions');

        if (isset($data['search'])) {
            $query->whereLike('name', '%' . $data['search'] . '%');
        }

        $query->orderBy($data['sortColumn'] ?? 'id', $data['sortOrder'] ?? 'asc');

        return RoleResource::collection($query->paginate($data['per_page'] ?? 15));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'guard' => "required|in:admin1,store,web",
            'permissions' => 'required|array|exists:permissions,name',
        ]);

        DB::beginTransaction();
        try {
            $role = Role::create([
                'name' => $data['name'],
            ]);

            $role->syncPermissions($data['permissions']);

            DB::commit();
        } catch (QueryException $e) {
            DB::rollBack();
            report(
                $e
            );
        }
        return $role->load('permissions');
    }


    public function show(string $id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        return $role;
    }


    public function update(Request $request, Role $role)
    {

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'guard' => "required|in:admin,store,web",
            'permissions' => 'required|array|exists:permissions,name',
        ]);

        DB::beginTransaction();
        try {
            $role->update([
                'name' => $data['name'],
            ]);
            $role->syncPermissions($data['permissions']);
            DB::commit();
        } catch (QueryException $e) {
            DB::rollBack();
            throw $e;
        }

        return $role->load('permissions');

    }

    public function destroy(Role $role)
    {
        Gate::authorize('delete roles');

        $role->delete();
    }

    public function storeAbilities($abilities, $role_id)
    {
        foreach ($abilities as $ability) {
            RoleAbility::create([
                'role_id' => $role_id,
                'ability' => $ability['ability'],
                'type' => $ability['type'],
            ]);
        }
    }
    public function updateAbilities($abilities, $role_id)
    {
        foreach ($abilities as $ability) {
            RoleAbility::updateOrCreate([
                'role_id' => $role_id,
                'ability' => $ability['ability'],
            ], [
                'type' => $ability['type'],
            ]);
        }
    }
}
