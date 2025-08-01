<?php

namespace App\Http\Controllers\Settings;

use App\Models\Image;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\ImageRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Settings\ImageRequest;
use Illuminate\Http\JsonResponse;

class ImageController extends Controller
{
    /**
     * Returns the list of Images.
     */
    public function index(Request $request, ImageRepository $repo): View
    {
        $images = $repo->filter($request);

        //Manage pagination according to request
        $images->appends(request()->input())->links();

        return view('image.index', ['images' => $images]);
    }

    /**
     * Creates a new Image through the POST data received, then redirects to the list route.
     */
    public function store(ImageRequest $request): JsonResponse
    {
        $imageExist = Image::where('name', $request->name)->first();

        if (!$imageExist) {
            $image                  = new Image;
            $image->name            = $request->name;
            $image->legend          = $request->legend;
            $image->alt             = $request->alt;
    
            $month                  = now()->month < 10 ? '0'.now()->month : now()->month;
    
            $format_image_original_name = '';
    
            if ($request->file('image')) {
                $format_image_original_name = $request->file('image')->getClientOriginalName().Image::generateRandomString();
            }
    
            $realNameNoExt = now()->year.'/'.$month.'/'.Image::formatImageName($format_image_original_name);
    
            Storage::disk('public')->putFileAs('images/original/', $request->file('image'), $realNameNoExt.'.jpg', 'public');
    
            $image->path            = $realNameNoExt;
            $image->save();
        } else {
            $image = $imageExist;
        }

        return response()->json([
            'image_id' => $image->id,
        ]);
    }

    /**
     * Returns the edit view of a particular Image.
     */
    public function edit(int $id): View
    {
        $image = Image::findOrFail($id);

        return view('press.admin.image.edit', [
            'image' => $image,
        ]);
    }

    /**
     * Updates an existing Image through the POST data received, then redirects to the list route or return the id of the image
     */
    public function update(int $id, ImageRequest $request): RedirectResponse|int
    {
        $image          = Image::findOrFail($id);
        $image->name    = $request->image_name;
        $image->legend  = $request->legend;
        $image->alt     = $request->alt;

        $updated = $image->save();
        
        return redirect('/admin/contenu/image/liste')->with('updated', $updated);
    }

    /**
     * Deletes an existing Newsletter through the POST data received, then redirects to the list route
     */
    public function delete(int $id): RedirectResponse
    {
        $image = Image::findOrFail($id);

        Storage::delete('images/original/'.$image->name.'.jpg');

        $deleted = $image->delete();

        return redirect('/admin/contenu/image/liste')->with('deleted', $deleted);
    }
}
