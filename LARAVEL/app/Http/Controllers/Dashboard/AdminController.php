<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Role;
use App\Models\RoleUser;
use Auth;
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
        Gate::authorize('view-admins');
        $admins = Admin::with('roles')->where('id', '<>', Auth::id())->get();
        return ['admins' => $admins];
    }

    public function store(Request $request)
    {
        Gate::authorize('create-admins');

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


        return $admin->load('roles');
    }

    public function show(string $id)
    {

    }

    public function update(Request $request, Admin $admin)
    {
        Gate::authorize('update-admins');

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

        return $admin->load('roles');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        Gate::authorize('delete-admins');
        $admin->delete();
    }
}
