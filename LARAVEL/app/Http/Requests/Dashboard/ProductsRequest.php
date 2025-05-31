<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class ProductsRequest extends FormRequest
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
            'name' => 'required|string|max:255|',
            'store_id' => 'required|integer|exists:stores,id',
            'category_id' => 'nullable|integer|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
            'price' => 'required|integer',
            'compare_price' => 'nullable|integer|gt:price',
            'quantity' => 'required|integer',
            'status' => 'required|in:active,archived',
            'tags' => 'nullable|array',
        ];
    }
}
