<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class BlogPostTest extends TestCase
{

    use DatabaseMigrations;

    /**
     * feature test for viewing post.
     *
     * @return void
     */


    public function testVisitorCanViewPosts()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }


    public function testUserCanCreatePost()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }


}
