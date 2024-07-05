<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'descrption' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now','+1year'),
            'status' => fake()->randomElement(['pendeing','in_progress','completed']),
            'img_path' => fake()->imageUrl(),
            'created_at' => 1,
            'updated_at' => 1,
        ];
    }
}
