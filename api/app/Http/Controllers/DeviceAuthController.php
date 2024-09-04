<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;

class DeviceAuthController extends Controller
{
    //
    public function register(Request $request)
    {
        //TODO: Make form request
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $device = Device::create([
            'name' => $request->name,
        ]);

        $token = $device->createToken('arduino-token')->plainTextToken;

        return response()->json([
            'token' => $token,
        ]);
    }
}
