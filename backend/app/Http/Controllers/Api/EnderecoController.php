<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnderecoRequest;
use App\Http\Requests\UpdateEnderecoRequest;
use App\Http\Resources\ApiCollection;
use App\Models\Endereco;
use Illuminate\Http\Request;
use App\Http\Resources\EnderecoResource;
use Throwable;
use Exception;

class EnderecoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Endereco::query();

            if ($request->filled('busca')) {
                $busca = $request->string('busca');
                
                $query->where(function ($q) use ($busca) {
                    $q->where('logradouro', 'like', "%{$busca}%")
                    ->orWhere('bairro', 'like', "%{$busca}%")
                    ->orWhere('cidade', 'like', "%{$busca}%")
                    ->orWhere('cep', 'like', "%{$busca}%");
                });
            }

            $enderecos = $query
                ->orderBy('cidade')
                ->paginate($request->integer('por_pagina', 15));

            return new ApiCollection($enderecos, EnderecoResource::class);

        } catch (Throwable $e) {
            throw new Exception('Falha ao buscar os endereços no sistema.', 500, $e);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnderecoRequest $request)
    {
        $endereco = Endereco::create($request->validated());

        return (new EnderecoResource($endereco))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Endereco $endereco)
    {
        return new EnderecoResource($endereco);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnderecoRequest $request, Endereco $endereco)
    {
        $endereco->update($request->validated());

        return new EnderecoResource($endereco);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Endereco $endereco)
    {
        $endereco->delete();

        return new EnderecoResource($endereco);
    }
}
