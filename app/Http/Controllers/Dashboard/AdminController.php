<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Role;
use App\Models\RoleUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use PhpParser\Node\Expr\Throw_;
use Throwable;
use function PHPUnit\Framework\throwException;

class AdminController extends Controller
{
    public function index()
    {
        Gate::authorize('view admins');
        $admins = Admin::with('roles')->where('super_admin' , false)->paginate();
        return Inertia::render(
            'dashboard/admins/admins.index',
            ['admins' => $admins]
        );
    }

    public function create()
    {
        Gate::authorize('create admins');

        $admin = new Admin();

        return Inertia::render(
            'dashboard/admins/admins.create',
            [
                'admin' => $admin,
                'roles' => Role::all(),
            ]
        );
    }

    public function store(Request $request)
    {
        Gate::authorize('create admins');

        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required',
            'phone_number' => 'required|numeric',
            'status' => 'required|in:active,inactive',
            'roles' => 'nullable|array',
        ]);


        DB::beginTransaction();
        try {
            $data = $request->except(['password', 'roles']);
            $data['password'] = Hash::make($request->post('password'));
            $admin = Admin::create($data);

            if ($request->post('roles')) {
                foreach ($request->post('roles') as $role) {
                    $admin->roles()->attach($role['id']);
                }
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }


        return redirect()->route('dashboard.admins.index')->with('message', 'Admin Added Successfully');
    }

    public function show(string $id)
    {

    }

    public function edit(Admin $admin)
    {
        Gate::authorize('update admins');

        return Inertia::render(
            'dashboard/admins/admins.edit',
            [
                'admin' => $admin->load('roles'),
                'roles' => Role::all(),
            ]
        );
        ;
    }

    public function update(Request $request, Admin $admin)
    {
        Gate::authorize('update admins');

        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required',
            'phone_number' => 'required|numeric',
            'status' => 'required|in:active,inactive',
            'roles' => 'nullable|array',
        ]);

        $data = $request->except(['password', 'roles']);
        $data['password'] = Hash::make($request->post('password'));


        $admin->update($data);

        if ($request->post('roles')) {
            $ids = [];
            foreach ($request->post('roles') as $role) {
                $ids[] = $role['id'];
            }
            $admin->roles()->sync($ids);
        } else {
            $admin->roles()->detach();
        }

        return redirect()->route('dashboard.admins.index')
            ->with('message', 'Admin Updated Successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        Gate::authorize('delete admins');
        $admin->delete();
    }
}
