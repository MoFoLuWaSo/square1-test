<?php


namespace App\Traits;


use App\Models\BlogPost;

trait AppQuery
{

    public function filterQuery()
    {
        $perPage = 10;
        $orderBy = "created_at";
        $direction = "desc";

        if (request()->has('per_page')) {
            $perPage = request()->get('per_page');
        }

        if (request()->has('sort_by')) {
            $orderBy = request()->get('sort_by');
        }

        if (request()->has('direction')) {
            $direction = request()->get('direction');
        }

        return collect(BlogPost::with('user:id,name')->ignoreRequest(['per_page', 'sort_by', 'direction'])->filter()->orderBy($orderBy, $direction)->paginate($perPage));
    }
}
