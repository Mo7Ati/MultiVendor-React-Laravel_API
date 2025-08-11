<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $now = Carbon::now();
            $startOfMonth = $now->copy()->startOfMonth();
            $startOfLastMonth = $now->copy()->subMonth()->startOfMonth();
            $endOfLastMonth = $now->copy()->subMonth()->endOfMonth();

            // Total counts
            $totalOrders = Order::count();
            $totalProducts = Product::count();
            $totalCategories = Category::count();
            $totalCustomers = Customer::count();
            $totalStores = Store::count();

            // Monthly revenue
            $currentMonthRevenue = Order::where('status', 'completed')
                ->where('created_at', '>=', $startOfMonth)
                ->sum('total');

            $lastMonthRevenue = Order::where('status', 'completed')
                ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
                ->sum('total');

            // Revenue change percentage
            $revenueChange = $lastMonthRevenue > 0
                ? (($currentMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100
                : 100;

            // Order status counts
            $orderStatuses = Order::select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->pluck('count', 'status')
                ->toArray();

            // Recent orders
            $recentOrders = Order::latest()
                ->take(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        // 'user_name' => $order->user->name ?? 'Guest',
                        'total' => $order->total,
                        'status' => $order->status,
                        'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                        // 'items_count' => $order->items->count()
                    ];
                });

            // Top selling products
            $topProducts = Product::withCount('orders')
                ->orderBy('orders_count', 'desc')
                ->take(5)
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'orders_count' => $product->orders_count,
                        'price' => $product->price,
                        'image' => $product->image
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'totals' => [
                        'orders' => $totalOrders,
                        'products' => $totalProducts,
                        'categories' => $totalCategories,
                        'users' => $totalCustomers,
                        'stores' => $totalStores,
                    ],
                    'revenue' => [
                        'current_month' => $currentMonthRevenue,
                        'last_month' => $lastMonthRevenue,
                        'change_percentage' => round($revenueChange, 2),
                    ],
                    'order_statuses' => $orderStatuses,
                    'recent_orders' => $recentOrders,
                    'top_products' => $topProducts,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load dashboard data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
