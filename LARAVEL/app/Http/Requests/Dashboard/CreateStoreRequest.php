<?php

namespace App\Http\Requests\Dashboard;

use App\Models\Store;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class CreateStoreRequest extends FormRequest
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
            'name' => ['required', 'array:ar,en'],
            'name.en' => ['required', 'string', 'max:255'],
            'name.ar' => ['required', 'string', 'max:255'],

            'address' => ['required', 'array:ar,en'],
            'address.en' => ['required', 'string', 'max:255'],
            'address.ar' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'array:ar,en'],
            'description.en' => ['nullable', 'string'],
            'description.ar' => ['nullable', 'string'],

            'keywords' => ['nullable', 'array:ar,en'],
            'keywords.en' => ['nullable', 'array'],
            'keywords.ar' => ['nullable', 'array'],

            'media' => ['required', 'array:logo,gallery'],
            'media.logo' => ['required', 'string'],
            'media.gallery' => ['nullable', 'array'],

            'social_media' => ['nullable', 'array'],
            'social_media.*.platform' => ['required', 'string', 'max:255'],
            'social_media.*.url' => ['required', 'url', 'max:500'],


            'delivery_time' => ['required', 'numeric'],
            'email' => [
                'required',
                'email',
                Rule::unique('stores', 'email'),
            ],
            'phone' => [
                'required',
                'string',
                Rule::unique('stores', 'phone'),
            ],
            'password' => ['required', 'string', 'min:8'],
            'is_active' => ['boolean'],
            'rate' => ['numeric', 'min:0'],
            'logo' => ['nullable', 'string'],

            'category_id' => 'required|numeric|exists:store_categories,id',
        ];
    }
}
