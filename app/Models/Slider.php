<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Slider extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Relationship between an PromotionMessage and an Image
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }

}
