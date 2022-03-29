<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Traits\AppQuery;
use App\Traits\AppResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BlogPostsController extends Controller
{
    use AppResponser;
    use AppQuery;

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->filterQuery();
        $posts['data'] = $data->get('data');
        $posts['paginate'] = $data->except('data');
        return $this->successResponse($posts);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        //remember to index publication date and title
        $data = $request->all();

        Validator::make($data, [
            'title' => ['required', 'string', 'max:255', 'min:3', Rule::unique('blog_posts')],
            'description' => ['required', 'string'],
        ])->validate();

        $user = Auth::user();
        $data['user_id'] = $user->id;
        $data['publication_date'] = now();
        $posts = BlogPost::create($data);
        return $this->successResponse(['data' => $posts]);
    }

}
