<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'name',
        'email',
        'phone',
        'address',
        'status',
    ];

    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }

    public function products()
    {
        return $this->hasMany(CustomerProduct::class);
    }
}
