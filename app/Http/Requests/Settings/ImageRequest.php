<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class ImageRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'      => 'required|min:3|max:80',
            'legend'    => 'required|min:3|max:150',
            'alt'       => 'required|min:3|max:150',
        ];
    }

    /**
     * Get errors messages if validation fails.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required'     => 'Un nom est requis',
            'name.min'          => 'Le nom doit contenir au moins 3 caractères',
            'name.max'          => 'Le nom doit contenir au maximum 80 caractères',

            'legend.required'   => 'Une légende est requise',
            'legend.min'        => 'La légende doit contenir au moins 3 caractères',
            'legend.max'        => 'La légende doit contenir au maximum 150 caractères',

            'alt.required'      => 'Un texte alternatif est requis',
            'alt.min'           => 'Le texte alternatif doit contenir au moins 3 caractères',
            'alt.max'           => 'Le texte alternatif doit contenir au maximum 150 caractères',
        ];
    }
}
