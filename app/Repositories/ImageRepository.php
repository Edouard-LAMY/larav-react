<?php

namespace App\Repositories;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ImageRepository
{
    /**
     * Filter Images
     *
     * @return LengthAwarePaginator<Image>
     */
    public function filter(?Request $request = null): LengthAwarePaginator
    {
        $query = Image::select('images.*');

        /**
         * Multiple optional filters
         */
        if (isset($request->name) && $request->name != '') {
            $query->where('images.name', 'LIKE', '%'.$request->name.'%');
        }

        $query->orderBy('created_at', 'DESC');

        return $query->paginate(20);
    }
}
