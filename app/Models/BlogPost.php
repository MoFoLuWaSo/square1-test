<?php

namespace App\Models;

use eloquentFilter\QueryFilter\ModelFilters\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;
    use Filterable;

    private static $whiteListFilter = ['*'];
    protected $fillable = ['title', 'description', 'user_id', 'publication_date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
