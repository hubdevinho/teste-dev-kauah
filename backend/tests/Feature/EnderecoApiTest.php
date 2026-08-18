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

        $this->assertDatabaseHas('enderecos', ['cep' => '01310100']);
    }

    public function test_validacao_ao_criar_endereco_sem_logradouro(): void
    {
        $this->postJson('/api/enderecos', ['cep' => '01310-100', 'bairro' => 'Bela Vista', 'cidade' => 'São Paulo', 'estado' => 'SP'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['logradouro']);
    }

    public function test_mostra_endereco(): void
    {
        $endereco = Endereco::factory()->create();

        $this->getJson("/api/enderecos/{$endereco->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $endereco->id);
    }

    public function test_atualiza_endereco(): void
    {
        $endereco = Endereco::factory()->create();

        $this->putJson("/api/enderecos/{$endereco->id}", ['cidade' => 'Campinas'])
            ->assertOk()
            ->assertJsonPath('data.cidade', 'Campinas');
    }

    public function test_remove_endereco(): void
    {
        $endereco = Endereco::factory()->create();

        $this->deleteJson("/api/enderecos/{$endereco->id}")->assertOk();

        $this->assertSoftDeleted('enderecos', ['id' => $endereco->id]);
    }

    public function test_endereco_inexistente_retorna_404(): void
    {
        $this->getJson('/api/enderecos/999999')
            ->assertNotFound()
            ->assertJson(['success' => false]);
    }

    public function test_endereco_deletado_retorna_404_ao_buscar(): void
    {
        $endereco = Endereco::factory()->create();
        $endereco->delete();

        $this->getJson("/api/enderecos/{$endereco->id}")
            ->assertNotFound()
            ->assertJson(['success' => false]);
    }
}
