<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Unique;
use TijsVerkoyen\CssToInlineStyles\Css\Rule\Rule;

class StoreRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'array'],
            'name.en' => ['required', 'string', 'max:255'],
            'name.ar' => ['required', 'string', 'max:255'],

            'address' => ['required', 'array'],
            'address.en' => ['required', 'string', 'max:255'],
            'address.ar' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'array'],
            'description.en' => ['nullable', 'string'],
            'description.ar' => ['nullable', 'string'],



            'keywords' => ['nullable', 'array'],
            'keywords.en' => ['nullable', 'array'],
            'keywords.ar' => ['nullable', 'array'],

            'social_Media' => ['nullable', 'array'],

            'email' => [
                'required',
                'email',

            ],
            'phone' => ['required', 'string', 'unique:stores,phone'],
            'password' => ['required', 'string', 'min:8'],

            'is_active' => ['boolean'],
            'rate' => ['numeric', 'min:0'],
            'logo' => ['nullable', 'string'],
        ];
    }
}
