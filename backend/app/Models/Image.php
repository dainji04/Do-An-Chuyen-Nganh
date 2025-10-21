<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'image',
        'product_id'
    ];

    // Image belongs to one product
    public function product() {
        return $this->belongsTo(Product::class);
    }
}
