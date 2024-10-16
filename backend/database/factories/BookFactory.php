<?php

namespace Database\Factories;

use App\Infra\Adapters\Persistence\Eloquent\Models\Author;
use App\Infra\Adapters\Persistence\Eloquent\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Infra\Adapters\Persistence\Eloquent\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $author = Author::factory()->create();

        return [
            "id" => $this->faker->uuid(),
            "title" => $this->faker->text(80),
            "publisher" => $this->faker->company(),
            "author_id" => $author->id,
        ];
    }
}
