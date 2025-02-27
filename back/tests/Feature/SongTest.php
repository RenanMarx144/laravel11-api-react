<?php

namespace Tests\Feature;

use App\Models\Song;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SongTest extends TestCase
{
    use RefreshDatabase;
     /** @test */
     public function it_creates_a_song()
     {
         // Usando o Factory para criar uma música
         $song = Song::factory()->create();

         // Verificando se a música foi criada no banco de dados
         $this->assertDatabaseHas('songs', [
             'id' => $song->id,
             'name' => $song->name,
             'views' => $song->views,
             'link' => $song->link,
         ]);
     }
}
