<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orderdetail extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'total'
    ];

    // Order detail belongs to one order
    public function order() {
        return $this->belongsTo(Order::class);
    }

    // Order detail belongs to one product
    public function product() {
        return $this->belongsTo(Product::class);
    }
}
