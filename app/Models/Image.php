<?php

namespace App\Models;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use HasFactory, ImageTrait;

    protected $guarded = [];
    protected $appends = ['url'];

    /**
     * Relationship between an Image and a Slider
     */
    public function slider(): HasOne
    {
        return $this->hasOne(Slider::class);
    }

    public function getUrlAttribute(): string
    {
        return  Storage::url('images/original/' . $this->path . '.jpg');
    }
}
