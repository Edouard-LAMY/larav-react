<?php

namespace App\Http\Controllers\Settings;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Slider;
use Illuminate\View\View;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Settings\SliderRequest;

class SliderController extends Controller
{
    public function index(): Response
    {
        $sliders = Slider::orderBy('updated_at', 'desc')->get();

        return Inertia::render('settings.sliders', compact('sliders'));
    }

    public function store(SliderRequest $request): RedirectResponse
    {
        $saved = Slider::create($request->all());

        return redirect()->route('press-admin-slider-index')->with('saved', $saved);
    }

    public function edit(int $slider): View
    {
        $slide = Slider::findOrFail($slider);
        return view('press.admin.slider.edit', compact('slide'));
    }

    public function update(int $id, SliderRequest $request): RedirectResponse
    {
        $slide      = Slider::findOrFail($id);
        $updated    = $slide->update($request->all());

        return redirect()->route('press-admin-slider-index')->with('updated', $updated);
    }

    public function delete(int $id): RedirectResponse
    {
        $slide      = Slider::findOrFail($id);
        $deleted    = $slide->delete();

        return redirect()->route('press-admin-slider-index')->with('deleted', $deleted);
    }

    public function duplicate(int $id): RedirectResponse
    {
        $slide                      = Slider::findOrFail($id);
        $duplicateSlide             = $slide->replicate();
        $duplicateSlide->is_active  = false;
        $duplicateSlide->save();

        return redirect()->route('press-admin-slider-index')->with('duplicated', $duplicateSlide);
    }

}
