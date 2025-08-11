export interface DashboardStats {
  success: boolean;
  data: {
    totals: {
      orders: number;
      products: number;
      categories: number;
      users: number;
      vendors: number;
      stores: number;
    };
    revenue: {
      current_month: number;
      last_month: number;
      change_percentage: number;
    };
    order_statuses: Record<string, number>;
    recent_orders: Array<{
      id: number;
      user_name: string;
      total: number;
      status: string;
      created_at: string;
      items_count: number;
    }>;
    top_products: Array<{
      id: number;
      name: string;
      orders_count: number;
      price: number;
      image: string;
    }>;
  };
}
