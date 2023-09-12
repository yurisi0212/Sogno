<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SearchHistory extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable=["text", "user_id"];
}
