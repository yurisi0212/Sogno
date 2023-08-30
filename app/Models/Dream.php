<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dream extends Model {
    use HasFactory;

    protected $fillable = ["id"];

    public function reply(): HasMany {
        return $this->hasMany(self::class, 'reply_dream_id', 'id');
    }

    public function parent_reply(): BelongsTo {
        return $this->belongsTo(self::class, 'id', 'reply_dream_id');
    }
}
