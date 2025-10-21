<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'total',
        'promotion_id',
        'note',
        'process',
        'status',
        'address'
    ];

    // Order belongs to one promotion
    public function promotion() {
        return $this->belongsTo(Promotion::class);
    }

    // Order has many order details
    public function orderdetails() {
        return $this->hasMany(Orderdetail::class);
    }

    // Order belongs to one user
    public function user() {
        return $this->belongsTo(User::class);
    }
}
