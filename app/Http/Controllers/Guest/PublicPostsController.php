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

    public function getExternalPosts()
    {
        $data = json_decode(file_get_contents("https://sq1-api-test.herokuapp.com/posts"), 1);
        $posts = $this->filterPosts($data['data']);
        if (!empty($posts)) {

            BlogPost::insert($posts);
        }


    }

    public function filterPosts($data)
    {
        $posts = [];
        $titles = [];
        foreach ($data as $datum) {
            $now = now();
            if (! $this->validatePosts($datum)) {
                //further ensuring we have no duplicate titles in the new set of posts
                if (!in_array($datum['title'], $titles)) {

                    $datum['user_id'] = 1; //the first created user, the admin
                    $datum['created_at'] = $now;
                    $datum['updated_at'] = $now;
                    $posts[] = $datum;
                    $titles [] = $datum['title'];
                }
            }
        }
        return $posts;
    }

    /*
     * Validate post to ensure no field is missing
     * and also to ensure title is unique
     */
    public function validatePosts($post)
    {

        return Validator::make($post, [
            'title' => ['required', 'string', 'max:255', 'min:3', Rule::unique('blog_posts')],
            'description' => ['required', 'string'],
            'publication_date' => ['required', 'date']
        ])->fails();
    }


}
