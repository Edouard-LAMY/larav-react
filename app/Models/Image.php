<?php

namespace App\Models;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model
{
    use HasFactory, ImageTrait;

    protected $guarded = [];

    /**
     * Relationship between an Image and a Slider
     */
    public function slider(): HasOne
    {
        return $this->hasOne(Slider::class);
    }
}
