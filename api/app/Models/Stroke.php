<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stroke extends Model
{
    use HasFactory;

    protected $fillable = [
        'data',
    ];
    
    protected $casts = [
        'data' => 'array',
    ];

    //TODO perhaps think about relationship here for a specific device

}
