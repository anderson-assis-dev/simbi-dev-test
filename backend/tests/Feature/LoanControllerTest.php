<?php

namespace Tests\Feature; // Use a pasta Feature para testes que envolvem API

use App\Models\Loan;
use App\Infra\Adapters\Persistence\Eloquent\Models\Author;
use App\Infra\Adapters\Persistence\Eloquent\Models\Book;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoanControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_loans()
    {
        $loan = Loan::factory()->create();

        $response = $this->get('/api/loans');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'book', 'author', 'loaned_at', 'returned_at'],
        ]);
    }

    /** @test */
    public function it_can_create_a_loan()
    {
        $author = Author::factory()->create();
        $book = Book::factory()->create(['author_id' => $author->id]);

        $data = [
            'book_id' => $book->id,
            'author_id' => $author->id,
            'loaned_at' => Carbon::now(),
        ];

        $response = $this->post('/api/loans', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('loans', $data);
    }

    /** @test */
    public function it_can_update_a_loan()
    {
        $loan = Loan::factory()->create();
        $data = ['returned_at' => Carbon::now()];

        $response = $this->put("/api/loans/{$loan->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('loans', ['id' => $loan->id, 'returned_at' => $data['returned_at']]);
    }

    /** @test */
    public function it_can_delete_a_loan()
    {
        $loan = Loan::factory()->create();

        $response = $this->delete("/api/loans/{$loan->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('loans', ['id' => $loan->id]);
    }
}
