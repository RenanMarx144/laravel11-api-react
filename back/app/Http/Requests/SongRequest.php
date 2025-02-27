<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SongRequest extends FormRequest
{
    /**
     * Determina se o usuário está autorizado a fazer esta solicitação.
     */
    public function authorize(): bool
    {
        return true; // Mantenha true para permitir a requisição
    }

    /**
     * Regras de validação
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'views' => 'required|integer|min:0',
            'link' => 'required|url',
        ];
    }

    /**
     * Mensagens personalizadas para cada validação.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O nome da música é obrigatório.',
            'name.string' => 'O nome deve ser um texto.',
            'name.max' => 'O nome pode ter no máximo 255 caracteres.',
            'views.required' => 'O número de visualizações é obrigatório.',
            'views.integer' => 'O número de visualizações deve ser um número inteiro.',
            'views.min' => 'O número de visualizações não pode ser negativo.',
            'link.required' => 'O link da música é obrigatório.',
            'link.url' => 'O link deve ser uma URL válida.',
        ];
    }
}
