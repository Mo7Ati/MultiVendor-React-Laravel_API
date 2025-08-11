import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Icons } from '@/components/icons';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { fetchDashboardStats } from '@/services/dashboardService';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend = 'neutral',
  className = ''
}: StatCardProps) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-muted-foreground'
  };

  const trendIcons = {
    up: <Icons.arrowUp className="h-3 w-3" />,
    down: <Icons.arrowDown className="h-3 w-3" />,
    neutral: null
  };

  return (
    <Card className={`relative overflow-hidden group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {description && (
          <p className={`text-xs mt-1 flex items-center ${trend ? trendColors[trend] : 'text-muted-foreground'}`}>
            {trend && trendIcons[trend]}
            <span className="ml-1">{description}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const StatSkeleton = () => (
  <Card className="overflow-hidden">
    <CardHeader className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-6 w-6 rounded" />
      </div>
      <Skeleton className="h-3 w-20 mt-1" />
    </CardHeader>
  </Card>
);

// Mock data for the charts and tables
const prepareSalesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    labels: months,
    datasets: [
      {
        label: '2023',
        data: months.map(() => Math.floor(Math.random() * 1000) + 500),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: '2024',
        data: months.map(() => Math.floor(Math.random() * 1500) + 1000),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
};

const recentTransactions = [
  { id: 1, customer: 'John Doe', amount: 125.99, status: 'completed', date: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: 2, customer: 'Jane Smith', amount: 89.50, status: 'pending', date: new Date(Date.now() - 1000 * 60 * 60 * 5) },
  { id: 3, customer: 'Acme Inc', amount: 1250.00, status: 'completed', date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 4, customer: 'Bob Johnson', amount: 45.75, status: 'failed', date: new Date(Date.now() - 1000 * 60 * 60 * 36) },
  { id: 5, customer: 'Alice Brown', amount: 299.99, status: 'completed', date: new Date(Date.now() - 1000 * 60 * 60 * 48) },
];

const activities = [
  { id: 1, type: 'order', user: 'John Doe', action: 'placed a new order', time: '2 minutes ago' },
  { id: 2, type: 'user', user: 'Jane Smith', action: 'signed up', time: '1 hour ago' },
  { id: 3, type: 'product', user: 'Admin', action: 'added a new product', time: '3 hours ago' },
  { id: 4, type: 'order', user: 'Acme Inc', action: 'completed order #12345', time: '5 hours ago' },
];

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });

  const salesData = prepareSalesData();

  if (error) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="flex h-full flex-1 flex-col items-center justify-center rounded-xl p-6 text-center">
          <div className="text-destructive mb-4">Error loading dashboard data. Please try again later.</div>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <Icons.refreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
            </>
          ) : data ? (
            <>
              <StatCard
                title="Total Revenue"
                value={formatCurrency(data.data.revenue.current_month)}
                icon={Icons.dollarSign}
                description={`${data.data.revenue.change_percentage > 0 ? '+' : ''}${data.data.revenue.change_percentage}% from last month`}
              />
              <StatCard
                title="Orders"
                value={data.data.totals.orders}
                icon={Icons.shoppingCart}
              />
              <StatCard
                title="Products"
                value={data.data.totals.products}
                icon={Icons.package}
              />
              <StatCard
                title="Customers"
                value={data.data.totals.users}
                icon={Icons.users}
              />
            </>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Sales Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Sales Overview</CardTitle>
                  <p className="text-sm text-muted-foreground">Monthly performance for 2023-2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Icons.download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[350px]">
              <Line
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        callback: (value) => `$${value}`,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
                  <p className="text-sm text-muted-foreground">Latest transactions from your store</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  View All
                  <Icons.chevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[350px]">
              <Line
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        // drawBorder: false,
                      },
                      ticks: {
                        callback: (value) => `$${value}`,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
                  <p className="text-sm text-muted-foreground">Latest transactions from your store</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  View All
                  <Icons.chevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.customer}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatDate(transaction.date, { month: 'short', day: 'numeric' })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-4 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Latest activities in your store</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {activity.type === 'order' ? (
                      <Icons.shoppingBag className="h-4 w-4 text-primary" />
                    ) : activity.type === 'user' ? (
                      <Icons.user className="h-4 w-4 text-primary" />
                    ) : (
                      <Icons.package className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {activity.user} <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
