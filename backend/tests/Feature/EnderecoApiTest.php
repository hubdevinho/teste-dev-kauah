<?php

namespace Tests\Feature;

use App\Models\Endereco;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EnderecoApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_lista_enderecos_paginado(): void
    {
        $this->getJson('/api/enderecos')
            ->assertOk()
            ->assertJsonStructure(['success', 'data', 'links', 'meta'])
            ->assertJsonCount(15, 'data');
    }
}
