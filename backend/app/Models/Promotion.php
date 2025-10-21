<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = [
        'description',
        'promotionname',
        'startdate',
        'enddate',
        'percent',
        'status'
    ];

    // Promotion has many orders
    public function orders() {
        return $this->hasMany(Order::class);
    }
}
