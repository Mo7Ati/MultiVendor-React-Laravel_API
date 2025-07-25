<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;
class Admin extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $guard = ['admin'];
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
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
