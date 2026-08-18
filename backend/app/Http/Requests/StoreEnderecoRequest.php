<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class StoreEnderecoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cep' => ['required', 'string', 'max:9', 'regex:/^[0-9]+$/'],
            'logradouro' => ['required', 'string', 'max:255'],
            'numero' => ['string', 'max:20'],
            'complemento' => ['nullable', 'string', 'max:255'],
            'bairro' => ['required', 'string', 'max:255'],
            'cidade' => ['required', 'string', 'max:255'],
            'estado' => ['required', 'string', 'size:2'],
        ];
    }

    public function messages(): array
    {
        return [
            'cep.regex' => 'O campo CEP deve conter apenas números, sem hífens, pontos ou espaços.',
        ];
    }
}
