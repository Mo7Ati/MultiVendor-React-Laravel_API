<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\stores\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;



class OrdersController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'per_page' => ['nullable', 'integer'],
            'status' => ['nullable', new Enum(OrderStatusEnum::class)],
            'payment_status' => ['nullable', new Enum(PaymentStatusEnum::class)],
            'sortColumn' => 'nullable|string',
            'sortOrder' => 'nullable|in:asc,desc',
        ]);

        $query = Order::with(['customer', 'store']);

        if (isset($data['status'])) {
            $query->where('status', $data['status']);
        }
        
        if (isset($data['payment_status'])) {
            $query->where('payment_status', $data['payment_status']);
        }

        $query->orderBy($data['sortColumn'] ?? 'id', $data['sortOrder'] ?? 'asc');

        return OrderResource::collection($query->paginate($data['per_page'] ?? 15));
    }
    // public function store(CategoryRequest $request)
    // {
    //     $category = Category::create($request->all());
    //     return $category;
    // }

    // public function update(CategoryRequest $request, Category $category)
    // {
    //     $category->update($request->all());
    //     return $category->load('parent');
    // }

    // public function destroy(Category $category)
    // {
    //     $category->delete();
    // }

}
