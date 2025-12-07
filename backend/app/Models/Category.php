<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'categoryname',
        'description'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function representativeProduct()
    {
        return $this->hasOne(Product::class, 'category_id', 'id')->oldestOfMany();
    }
}
