<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }
    public function callback($provider)
    {
        $provider_user = Socialite::driver($provider)->user();

        $user = User::where([
            'provider' => $provider,
            'provider_id' => $provider_user->getId(),
        ])->first();


        if (!$user) {
            $user = User::create([
                'name' => $provider_user->getName(),
                'email' => $provider_user->getEmail(),
                'password' => Hash::make(Str::random(5)),
                'provider' => $provider,
                'provider_id' => $provider_user->getId(),
                'provider_token' => $provider_user->token,
            ]);
        }


        Auth::login($user);
        return redirect()->route('home');
    }
}

