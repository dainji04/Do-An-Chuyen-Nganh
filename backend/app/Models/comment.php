<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'content',
        'rate'
    ];

    // Comment belongs to one user
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Comment belongs to one product
    public function product() {
        return $this->belongsTo(Product::class);
    }
}
