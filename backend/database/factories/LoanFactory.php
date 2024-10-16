<?php

namespace Database\Factories;

use App\Infra\Adapters\Persistence\Eloquent\Models\Author;
use App\Infra\Adapters\Persistence\Eloquent\Models\Book;
use App\Models\Loan;
use Illuminate\Database\Eloquent\Factories\Factory;

class LoanFactory extends Factory
{

    protected $model = Loan::class;

    public function definition()
    {
        return [
            'book_id' => Book::factory(),
            'author_id' => Author::factory(),
            'loaned_at' => now(),
            'returned_at' => null,
        ];
    }
}
