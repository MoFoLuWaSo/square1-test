<?php

namespace App\Console\Commands;

use App\Models\BlogPost;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class FeedCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'feed:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->getExternalPosts();
      //  Log::info("Cron just retrieved some feeds!");
        return 0;
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
            if (!$this->validatePosts($datum)) {
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
