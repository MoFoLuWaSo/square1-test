<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id'=>function(){
            return User::factory()->create()->id;
            },
            'title'=>$this->faker->sentence,
            'description'=>$this->faker->paragraph,
            'publication_date'=>$this->faker->dateTime,
        ];
    }
}

