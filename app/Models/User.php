<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public static function boot() {
        parent::boot();
        self::created(function (User $user){
            $user->createProfile();
        });
        self::deleted(function(User $user){
            //TODO delete dreams, searchHistories
        });
    }

    private function createProfile(): void {
        $profile = new Profile();
        $profile->user_id = $this->id;

        if(!$profile->save()){
            abort(500, "プロフィールの作成に失敗しました。");
        }
    }

    public function profile(): HasOne {
        return $this->hasOne(Profile::class, "user_id");
    }
}
