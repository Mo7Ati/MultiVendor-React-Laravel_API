<?php

namespace App\Http\Requests\Dashboard;

use App\Models\Store;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStoreRequest extends FormRequest
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
        $store = $this->route('store');
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

            'media' => ['required', 'array'],
            // 'media.logo' => [
            //     function (string $attribute, mixed $value, Closure $fail) use ($store) {
            //         if (!$store->getFirstMedia('stores-logo')) {
            //             $fail('The Logo Field Is Required');
            //         }
            //     },
            //     'string',
            // ],
            'media.gallery' => ['nullable', 'array'],

            'social_media' => ['nullable', 'array'],
            'social_media.*.platform' => ['required', 'string', 'max:255'],
            'social_media.*.url' => ['required', 'url', 'max:500'],

            'delivery_time' => ['required', 'numeric'],
            'email' => [
                'required',
                'email',
                Rule::unique('stores', 'email')->ignore($store->id),
            ],
            'phone' => [
                'required',
                'string',
                Rule::unique('stores', 'phone')->ignore($store->id),
            ],
            'password' => ['required', 'string', 'min:8'],
            'is_active' => ['boolean'],
            'rate' => ['numeric', 'min:0'],
            'logo' => ['nullable', 'string'],
        ];
    }


}
