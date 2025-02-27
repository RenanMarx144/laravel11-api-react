<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    // Defina os campos que são mass assignable
    protected $fillable = [
        'name',
        'views',
        'link',
        'approved'
    ];
}
