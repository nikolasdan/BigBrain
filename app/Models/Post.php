<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function user()
    {
        return $this->belongsTo("App\Models\User");
    }
    protected $fillable = ['title', "user_id", 'votes', 'views'];
    use HasFactory;
}
