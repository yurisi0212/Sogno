<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dream extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = ["title", "content"];

    public function reply(): HasMany {
        return $this->hasMany(self::class, 'reply_dream_id', 'id');
    }

    public function parent_reply(): BelongsTo {
        return $this->belongsTo(self::class, 'id', 'reply_dream_id');
    }

    public function user(): BelongsTo{
        return $this->belongsTo(self::class, 'id', 'user_id');
    }
}
