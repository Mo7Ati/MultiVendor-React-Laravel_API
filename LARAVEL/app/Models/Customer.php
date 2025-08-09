<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'mobile',
        'is_active',
        'mobile_verified',
        'about_mobile',
        'mobile_type',
        'location',
        'fcm_token',
        'timezone',
        'last_seen_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'mobile_verified' => 'boolean',
        'about_mobile' => 'array',
        'location' => 'array',
        'last_seen_at' => 'datetime',
    ];
}
