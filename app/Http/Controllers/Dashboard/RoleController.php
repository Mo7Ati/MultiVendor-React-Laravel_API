<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\RoleAbility;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use function PHPUnit\Framework\throwException;

class RoleController extends Controller
{
    public function index()
    {
        Gate::authorize('view roles');

        $roles = Role::paginate();

        return Inertia::render(
            'dashboard/roles/roles.index',
            ['roles' => $roles],
        );
    }


    public function create()
    {
        Gate::authorize('create roles');

        $role = new Role();

        return Inertia::render(
            'dashboard/roles/roles.create',
            [
                'role' => $role,
                'allAbilities' => Config::get('abilities'),
            ],
        );
    }

    public function store(Request $request)
    {
        Gate::authorize('create roles');

        $request->validate([
            'name' => 'required|string|max:255',
            'abilities' => 'required|array',
        ]);
        DB::beginTransaction();
        try {
            $role = Role::create([
                'name' => $request->post('name'),
            ]);

            $abilities = $request->post('abilities');
            $this->storeAbilities($abilities, $role->id);

            DB::commit();
        } catch (QueryException $e) {
            DB::rollBack();
            report(
                $e
            );
        }


        return redirect()
            ->route('dashboard.roles.index')
            ->with('message', 'Role Added Successfully');
    }


    public function show(string $id)
    {
    }

    public function edit(Role $role)
    {
        Gate::authorize('update roles');

        return Inertia::render(
            'dashboard/roles/roles.edit',
            [
                'role' => $role->load('abilities'),
                'allAbilities' => config('abilities'),
            ],
        );
    }


    public function update(Request $request, Role $role)
    {
        Gate::authorize('update roles');

        $request->validate([
            'name' => 'required|string|max:255',
            'abilities' => 'required|array',
        ]);

        DB::beginTransaction();
        try {
            $role->update([
                'name' => $request->post('name'),
            ]);

            $this->updateAbilities($request->post('abilities'), $role->id);

            DB::commit();
        } catch (QueryException $e) {
            DB::rollBack();
            throw $e;
        }

        return redirect()
            ->route('dashboard.roles.index')
            ->with('message', 'Role Updated Successfully');

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
                'ability' => $ability['name'],
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
