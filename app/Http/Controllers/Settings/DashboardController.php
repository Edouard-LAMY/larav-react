<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $userCounter = User::count();

        $sliders = Slider::orderBy('updated_at', 'desc')->with('image')->get();

        return Inertia::render('dashboard', [
            'userCounter'   => $userCounter,
            'sliders'       => $sliders,
        ]);
    }
}