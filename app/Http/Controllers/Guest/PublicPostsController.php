<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;


use App\Models\BlogPost;
use App\Traits\AppQuery;
use App\Traits\AppResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PublicPostsController extends Controller
{
    use AppResponser;
    use AppQuery;


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function index()
    {
        if (!request()->ajax()) {
            return redirect()->to('/');
        }

        $data = $this->filterQuery();
        $posts['data'] = $data->get('data');
        $posts['paginate'] = $data->except('data');

        return $this->successResponse($posts);
    }




}
