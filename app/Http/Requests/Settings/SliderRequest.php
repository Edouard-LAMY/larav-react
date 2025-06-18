<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class SliderRequest extends FormRequest
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
            'title'             => 'required|max:100',
            'subtitle'          => 'required|max:100',
            'message'           => 'max:255',
            'title_color'       => 'string|nullable',
            'subtitle_color'    => 'string|nullable',
            'background_color'  => 'string|nullable',
            'text_button'       => 'string|nullable',
            'button_style'      => 'string|nullable',
            'button_link'       => 'required',
            'image_id'          => 'required|integer',
            'is_active'         => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'                    => 'Un titre est obligatoire.',
            'title.max'                         => 'Le titre ne doit pas contenir plus de 100 caractères.',
            'subtitle.required'                 => 'Un sous-titre est obligatoire.',
            'subtitle.max'                      => 'Le sous-titre ne doit pas contenir plus de 100 caractères.',
            'message.max'                       => 'Le message ne doit pas contenir plus de 255 caractères.',
            'title_color.string'                => 'La couleur du titre doit être textuel.',
            'subtitle_color.string'             => 'La couleur du sous-titre doit être textuel.',
            'background_color.string'           => 'La couleur du fond doit être textuel.',
            'text_button.string'                => 'Le texte du bouton doit être textuel',
            'button_link.required'              => 'Un lien pour le bouton est obligatoire.',
            'image_id.integer'                  => 'L\'image doit être un entier.',
            'image_id.required'                 => 'Une image est obligatoire.',
            'is_active.boolean'                 => 'L\'activation doit être un booléen.',
        ];
    }
}
