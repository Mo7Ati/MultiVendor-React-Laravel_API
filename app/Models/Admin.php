<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $guard = ['admin'];
    protected $fillable = [
        'name',
        'username',
        'password',
        'phone_number',
        'status',
        'super_admin',
        'email',
        'store_id',
    ];

    public function roles()
    {
        return $this->morphToMany(Role::class, 'authorizable', 'role_users');
    }

    public function hasAbility($ability)
    {
        $denied = $this->roles()->whereHas(
            'abilities',
            function ($builder) use ($ability) {
                return $builder
                    ->where('ability', $ability)
                    ->where('type', 'deny');
            }
        )->exists();

        if ($denied) {
            return false;
        }

        return $this->roles()->whereHas(
            'abilities',
            function ($builder) use ($ability) {
                return $builder
                    ->where('ability', $ability)
                    ->where('type', 'allow');
            }
        )->exists();

    }

    public function permissions()
    {
        if ($this->super_admin) {
            return [];
        }
        $deniedAbilities = DB::select("
        SELECT ability FROM role_abilities
        inner join roles on `roles`.`id` = `role_abilities`.`role_id`
        inner join role_users on role_users.role_id = roles.id and authorizable_id=?
        where role_abilities.type = 'allow'", [$this->id]);

        return array_map(
            fn($index) => $index->ability,
            $deniedAbilities
        );

    }




}
