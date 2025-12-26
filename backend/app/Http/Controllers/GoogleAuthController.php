<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    // API 1: Trả về link Google Login cho Angular
    public function getGoogleAuthUrl()
    {
        $driver = Socialite::driver('google');

        $url = $driver->with(['prompt' => 'select_account'])->redirect()->getTargetUrl();

        return response()->json(['url' => $url]);
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            $httpClient = new Client([
                'verify' => 'C:/wamp64/ssl/cacert.pem',
            ]);

            $googleUser = Socialite::driver('google')
                ->setHttpClient($httpClient)
                ->stateless()->user();

            // Check if a user with this email exists
            $user = User::firstOrNew(['email' => $googleUser->getEmail()]);

            $user->fullname = $googleUser->getName();
            $user->google_id = $googleUser->getId();
            $user->avatarimage = $googleUser->getAvatar();

            if (!$user->exists) {
                $usernameRaw = explode('@', $googleUser->getEmail())[0];

                $checkUsername = User::where('username', $usernameRaw)->exists();
                if ($checkUsername) {
                    $user->username = $usernameRaw . rand(100, 999);
                } else {
                    $user->username = $usernameRaw;
                }

                $user->password = bcrypt('123456dummy');
                $user->role = 'user';
                $user->status = 'active';
            }

            $user->save();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Login failed: ' . $e->getMessage()], 500);
        }
    }
}
