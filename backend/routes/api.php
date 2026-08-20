<?php

use App\Http\Controllers\Api\EnderecoController;
use Illuminate\Support\Facades\Route;

Route::apiResource('enderecos', EnderecoController::class)->whereNumber('endereco');
