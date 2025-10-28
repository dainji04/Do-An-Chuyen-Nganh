<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'fullname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'phone' => ['required', 'string', 'max:15'],
            'password' => ['required', 'confirmed', 'min:6'],
        ]);

        $firstName = explode(' ', $request->fullname)[0];
        $lastName = explode(' ', $request->fullname)[count(explode(' ', $request->fullname)) - 1];

        $avt = 'https://ui-avatars.com/api/?name=' . $firstName . '+' . $lastName . '&background=random&color=fff';

        $user = User::create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'numberphone' => $request->phone,
            'password' => Hash::make($request->string('password')),
            'avatarimage' => $avt
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }
}
