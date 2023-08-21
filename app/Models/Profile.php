<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model {
    use HasFactory;

    protected $fillable = ["introduction"];

    public function user(): belongsTo {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}
