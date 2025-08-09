import axiosClient from "@/axios-client";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Button, Dropdown, Flex, Input, InputRef, MenuProps, message, Select, Space, Table, TableColumnsType, TablePaginationConfig, Tag, Typography } from 'antd';
import { useEffect, useRef, useState } from "react";
import {
    SearchOutlined,
    FilterOutlined,
    CloseOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    MoreOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { Label } from "@/components/ui/label";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Orders',
        href: '/admin/dashboard/orders',
    },
];
type SortOrder = 'ascend' | 'descend' | undefined;

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

type OrderStatus = 'pending' | 'preparing' | 'on_the_way' | 'completed' | 'cancelled' | 'rejected';

type OrderType = {
    id: number;
    order_number: string;
    customer_name: string;
    store_name: string;
    total_amount: number;
    status: OrderStatus;
    created_at: string;
}

type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';


export default function OrdersIndex() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<OrderStatus | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);


    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [sort, setSort] = useState<{ column: undefined | string, order: undefined | 'desc' | 'asc' }>({ column: undefined, order: undefined });

    function resetPagination() {
        setPagination(prev => ({
            ...prev,
            current: 1,
        }));
    }
    const getOrders = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/api/admin/dashboard/orders',
                {
                    params: {
                        status,
                        payment_status: paymentStatus,
                        sortColumn: sort.column,
                        sortOrder: sort.order,
                        page: pagination.current,
                        per_page: pagination.pageSize,
                    }
                });

            setOrders(response.data.data);
            setPagination(prev => ({
                ...prev,
                total: response.data.meta.total,
            }));
            setLoading(false);
        } catch (e) {
            message.error('Failed to load orders');
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, [status, pagination.current, pagination.pageSize, sort.column, sort.order, paymentStatus]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<OrderType> | SorterResult<OrderType>[],
        extra: TableCurrentDataSource<OrderType>
    ) => {
        setPagination(prev => ({
            ...prev,
            current: pagination.current!,
            pageSize: pagination.pageSize!,
        }));

        if (!Array.isArray(sorter)) {
            const { field, order } = sorter;
            const hasSort = Boolean(field && order);

            setSort(prevSort => {
                const newSort = hasSort
                    ? {
                        column: field as string,
                        order: order === 'ascend' ? "asc" : "desc",
                    }
                    : {
                        column: undefined,
                        order: undefined,
                    };

                if (
                    prevSort.column !== newSort.column ||
                    prevSort.order !== newSort.order
                ) {
                    setPagination(prev => ({
                        ...prev,
                        current: 1,
                    }));
                }

                return newSort;
            });
        }
    };

    const getStatusTag = (status: OrderStatus) => {
        const statusConfig = {
            pending: { color: 'orange', text: 'Pending' },
            preparing: { color: 'blue', text: 'Preparing' },
            on_the_way: { color: 'geekblue', text: 'On The Way' },
            completed: { color: 'green', text: 'Completed' },
            cancelled: { color: 'red', text: 'Cancelled' },
            rejected: { color: 'volcano', text: 'Rejected' },
        };

        const config = statusConfig[status] || { color: 'default', text: status };
        return (
            <Tag color={config.color} key={status}>
                {config.text}
            </Tag>
        );
    };

    const getPaymentStatusTag = (status: PaymentStatus) => {
        const statusConfig = {
            unpaid: { color: 'orange', text: 'Unpaid' },
            paid: { color: 'green', text: 'Paid' },
            failed: { color: 'red', text: 'Failed' },
            refunded: { color: 'blue', text: 'Refunded' },
        };

        const config = statusConfig[status] || { color: 'default', text: status };
        return (
            <Tag color={config.color} key={status}>
                {config.text}
            </Tag>
        );
    };


    const columns: TableColumnsType<OrderType> = [
        {
            title: 'Order #',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (orderNumber) => (
                <div className="font-medium">{orderNumber}</div>
            ),
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            width: 150,
        },
        {
            title: 'Store',
            dataIndex: 'store',
            key: 'store',
            width: 120,
        },
        {
            title: 'Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
            width: 100,
            sorter: true,
            sortOrder: sort.order ? (sort.order === 'asc' ? "ascend" : "descend") : undefined,
            render: (amount) => `$${amount.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => getStatusTag(status),
        },
        {
            title: 'Payment Status',
            dataIndex: 'payment_status',
            key: 'payment_status',
            width: 120,
            render: (status) => getPaymentStatusTag(status),
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 120,
            sorter: true,
            sortOrder: sort.order ? (sort.order === 'asc' ? "ascend" : "descend") : undefined,
            render: (date) => new Date(date).toLocaleDateString(),
        },
    ];

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div style={{ padding: '8px' }} className="flex flex-col gap-4">
                    <Label>Status:</Label>
                    <Select
                        value={status}
                        options={[
                            { label: 'All Statuses', value: null },
                            { label: 'Pending', value: 'pending' },
                            { label: 'Preparing', value: 'preparing' },
                            { label: 'On The Way', value: 'on_the_way' },
                            { label: 'Completed', value: 'completed' },
                            { label: 'Cancelled', value: 'cancelled' },
                            { label: 'Rejected', value: 'rejected' },
                        ]}
                        placeholder="Select Status"
                        style={{ width: 200 }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(value) => {
                            resetPagination();
                            setStatus(value);
                            setDropdownOpen(false);
                        }}
                    />
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div style={{ padding: '8px' }} className="flex flex-col gap-4">
                    <Label>Payment Status :</Label>
                    <Select
                        value={paymentStatus}
                        options={[
                            { label: 'All Statuses', value: null },
                            { label: 'Unpaid', value: 'unpaid' },
                            { label: 'Paid', value: 'paid' },
                            { label: 'Failed', value: 'failed' },
                            { label: 'Refunded', value: 'refunded' },
                        ]}
                        placeholder="Select Status"
                        style={{ width: 200 }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(value) => {
                            resetPagination();
                            setPaymentStatus(value);
                            setDropdownOpen(false);
                        }}
                    />
                </div>
            ),
        },
    ];

    const { Text } = Typography;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between">
                    <div>
                        <Space wrap className="mb-4">
                            {status && (
                                <Tag
                                    closable
                                    onClose={() => setStatus(null)}
                                    closeIcon={<CloseOutlined />}
                                    color="blue"
                                    style={{ padding: '0 8px', fontWeight: 500 }}
                                >
                                    Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Tag>
                            )}
                            {paymentStatus && (
                                <Tag
                                    closable
                                    onClose={() => setStatus(null)}
                                    closeIcon={<CloseOutlined />}
                                    color="blue"
                                    style={{ padding: '0 8px', fontWeight: 500 }}
                                >
                                    Status: {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                                </Tag>
                            )}

                            {(sort.column && sort.order) && (
                                <Tag
                                    closable
                                    onClose={() => setSort({ column: undefined, order: undefined })}
                                    closeIcon={<CloseOutlined />}
                                    color="orange"
                                    style={{ padding: '0 8px', fontWeight: 500 }}
                                >
                                    Sort: {sort.column} ({sort.order})
                                </Tag>
                            )}

                            {
                                (status || (sort.column && sort.order) || paymentStatus) &&
                                <Button size="small" type="link" onClick={() => {
                                    setSort({ column: undefined, order: undefined });
                                    setStatus(null);
                                    setPaymentStatus(null);
                                    resetPagination();
                                }}>
                                    Clear All
                                </Button>
                            }
                        </Space>
                    </div>

                    <div className="flex justify-end items-center gap-2">
                        <Dropdown
                            placement="bottomRight"
                            menu={{ items }}
                            trigger={['click']}
                            open={dropdownOpen}
                            onOpenChange={(open) => {
                                setDropdownOpen(open);
                            }}
                        >
                            <Button icon={<FilterOutlined />}>
                                Filters
                            </Button>
                        </Dropdown>
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={orders}
                    loading={loading}
                    bordered
                    title={() => <Text strong>Orders</Text>}
                    onChange={handleTableChange}
                    pagination={{
                        ...pagination,
                        position: ['bottomCenter'],
                        size: 'default',
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} orders`,
                        pageSizeOptions: PAGE_SIZE_OPTIONS,
                        responsive: true,
                    }}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                    size="middle"
                />
            </div>
        </AppLayout>
    );
}
