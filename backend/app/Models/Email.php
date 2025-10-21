<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'message'
    ];

    // Email belongs to one user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
