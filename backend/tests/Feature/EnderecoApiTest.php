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
        Endereco::factory()->count(20)->create();

        $this->getJson('/api/enderecos')
            ->assertOk()
            ->assertJsonStructure(['success', 'data', 'links', 'meta'])
            ->assertJsonCount(15, 'data');
    }

    public function test_cria_endereco(): void
    {
        $dados = [
            'cep' => '01310100',
            'logradouro' => 'Avenida Paulista',
            'numero' => '1000',
            'bairro' => 'Bela Vista',
            'cidade' => 'São Paulo',
            'estado' => 'SP',
        ];

        $this->postJson('/api/enderecos', $dados)
            ->assertCreated()
            ->assertJsonPath('data.cidade', 'São Paulo');

        $this->assertDataBaseHas('enderecos', ['cep' => '01310100']);
    }
}
