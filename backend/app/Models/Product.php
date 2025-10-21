<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'image',
        'productname',
        'price',
        'discount',
        'quantity',
        'description',
        'detail',
        'guarantee',
        'status'
    ];

    // Product has many order details
    public function orderdetails() {
        return $this->hasMany(Orderdetail::class);
    }

    // Product has many carts (many users can add this product to cart)
    public function carts() {
        return $this->hasMany(Cart::class);
    }

    // Product has many comments
    public function comments() {
        return $this->hasMany(Comment::class);
    }

    // Product has many images
    public function images() {
        return $this->hasMany(Image::class);
    }

    // Product belongs to one category
    public function category() {
        return $this->belongsTo(Category::class);
    }
}
