<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Illuminate\Database\QueryException;

class UserController extends Controller
{
    /**
     * Register User
     * @param Request
     * @return Ok || Fail
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
        }

        $inputs = $request->all();
        $inputs["password"] = Hash::make($request->password);
        try {
            $user = User::create($inputs);

            if (!is_null($user)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Success! registration completed",
                    "data" => $user
                ]);
            } else {
                return response()->json(["status" => "failed", "message" => "Registration failed!"]);
            }
        } catch (Exception $e) {
            $impliesEmail = preg_match("/users\.email/", $e);
            $impliesName = preg_match("/users\.name/", $e);
            if ($impliesName || $impliesEmail) {
                $fault = $impliesEmail ? "email" : "name";

                return response()->json(["error" => "$fault is already used"]);
            } else {
                return response()->json(["error" => "Internal Problems", $e], 500);
            }
        }
    }
    /**
     * Login User
     * @param Request
     * @return Ok || Fail
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" =>  "required|email",
            "password" =>  "required",
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
        }
        $user = User::where("email", $request->email)->first();
        if (is_null($user)) {
            return response()->json(["status" => "failed", "message" => "Failed! email not found"]);
        }
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            return response()->json(["status" => "success", "login" => true, "token" => $token, "data" => $user]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! invalid password"]);
        }
    }
    public function about(Request $request)
    {
        return response()->json(["data" => $request->user()]);
    }
    /**
     * Update User
     */
    public function update(Request $request)
    {
        // Get current user
        $userId = Auth::id();
        $user = User::findOrFail($userId);

        // Validate the data submitted by user
        $validator = Validator::make($request->all(), [
            'description' => 'required'
        ]);

        // if fails redirects back with errors
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
        }

        // Fill user model
        $user->fill([
            'description' => $request->description
        ]);

        // Save user to database
        $user->save();
        return response()->json(["status" => "success", "data" => $user]);
    }
    /**
     * Logout User
     * @param Request
     * @return Message
     */
    public function logout(Request $request)
    {
        $user = request()->user(); //or Auth::user()
        // Revoke current user token
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        return response()->json(["status" => "success"]);
    }
}
