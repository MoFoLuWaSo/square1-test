<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BlogPostTest extends TestCase
{

    use DatabaseMigrations;

    /**
     * feature test for viewing post.
     *
     * @return void
     */

    /** @test */
    public function a_visitor_can_view_posts()
    {
        $response = $this->get('/api/posts');
        $response->assertStatus(200);
    }
}
