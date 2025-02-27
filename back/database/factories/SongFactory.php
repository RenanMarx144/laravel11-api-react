<?php

namespace Database\Factories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Factories\Factory;

class SongFactory extends Factory
{
    protected $model = Song::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'views' => $this->faker->numberBetween(0, 10000),
            'link' => $this->faker->url(),
        ];
    }
}
