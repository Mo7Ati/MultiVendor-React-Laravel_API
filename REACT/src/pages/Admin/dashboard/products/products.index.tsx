import axiosClient from "@/axios-client";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Button, Dropdown, Flex, Image, Input, InputRef, MenuProps, message, Radio, Select, Space, Switch, Table, TableColumnsType, TableColumnType, TablePaginationConfig, Tag, Typography } from 'antd';
import { use, useEffect, useMemo, useRef, useState } from "react";
import { CategoryType, ProductType, StoreType } from "@/types/dashboard";
import {
    SearchOutlined,
    MailOutlined,
    EnvironmentOutlined,
    StarOutlined,
    FilterOutlined,
    CloseOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { t } from "i18next";
import { Label } from "@/components/ui/label";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Products',
        href: '/admin/dashboard/products',
    },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export default function ProductsIndex() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string | null>(null)
    const [debouncedValue, setDebouncedValue] = useState<string | null>(null)
    const [stores, setStores] = useState<StoreType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const [store, setStore] = useState<number | null>(null);
    const [category, setCategory] = useState<number | null>(null);

    const searchInput = useRef<InputRef>(null);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [is_active, setIsActive] = useState<boolean | null>(null);
    const [sort, setSort] = useState<{ column: undefined | string, order: undefined | 'desc' | 'asc' }>({ column: undefined, order: undefined });

    function resetPagination() {
        setPagination(prev => ({
            ...prev,
            current: 1,
        }));
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedValue(search);
        }, 1000);

        return () => clearTimeout(delayDebounce);
    }, [search])

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/api/admin/dashboard/products',
                {
                    params: {
                        search: debouncedValue,
                        store,
                        category,
                        is_active,
                        sortColumn: sort.column,
                        sortOrder: sort.order,
                        page: pagination.current,
                        per_page: pagination.pageSize,
                    }
                });
            console.log(response);

            setProducts(response.data.data);
            setPagination(prev => ({
                ...prev,
                total: response.data.meta.total,
            }));

            setLoading(false);
        } catch (e) {
            message.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };
    const getStores = async () => {
        axiosClient.get('/api/admin/dashboard/stores')
            .then(response => setStores(response.data.data))
            .catch(error => alert(error));
    };
    const getCategories = async () => {
        axiosClient.get('/api/admin/dashboard/categories')
            .then(response => setCategories(response.data.data))
            .catch(error => alert(error));
    };

    useEffect(() => {
        getProducts();
    }, [debouncedValue, is_active, pagination.current, pagination.pageSize, sort.column, sort.order, store, category]);


    const handleTableChange = (
        Pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<ProductType> | SorterResult<ProductType>[],
        extra: TableCurrentDataSource<ProductType>
    ) => {


        setPagination(prev => ({
            ...prev,
            current: Pagination.current!,
            pageSize: Pagination.pageSize!,
        }));


        if (!Array.isArray(sorter)) {
            const { field, order } = sorter;
            const hasSort = Boolean(field && order);

            setSort(prevSort => {
                const newSort = hasSort
                    ?
                    {
                        column: field as string,
                        order: order === 'ascend' ? "asc" as const : "desc" as const,
                    }
                    :
                    {
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
    }

    const columns: TableColumnsType<ProductType> = [
        {
            title: 'image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            width: 80,
            render: (image) => {
                return (<Image
                    width={60}
                    height={60}
                    src={image || undefined}
                    fallback="data:image/png;base64,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"
                />);
            }
        },
        {
            title: <div style={{ textAlign: 'center' }}>Name</div>,
            dataIndex: 'name',
            key: 'name',
            width: 100,
            render: (name) => (
                <div>
                    <div className="font-medium">{name}</div>
                </div>
            ),
        },
        {
            title: <div style={{ textAlign: 'center' }}>Store</div>,
            dataIndex: 'store',
            key: 'store',
            width: 100,
            render: (store) => (
                <div className="flex justify-center">
                    {store}
                </div>
            ),
        },
        {
            title: <div style={{ textAlign: 'center' }}>Category</div>,
            dataIndex: 'category',
            key: 'category',
            width: 149,
            render: (category) => (
                <div className="flex justify-center">
                    {category}
                </div>
            ),
        },
        {
            title: <div style={{ textAlign: 'center' }}>Price</div>,
            dataIndex: 'price',
            key: 'price',
            width: 100,
            sorter: true,
            sortOrder: sort.order ? sort.order === 'asc' ? 'ascend' : 'descend' : null,
            render: (price) => (
                <div className="flex justify-center">
                    {price}
                </div>
            ),
        },
        {
            title: <div style={{ textAlign: 'center' }}>Active</div>,
            dataIndex: 'is_active',
            key: 'is_active',
            width: 70,
            render: (is_active, record) => (
                <Flex justify="center">
                    {is_active ?
                        <span style={{ color: 'green', fontSize: 20 }}>
                            <CheckCircleOutlined />
                        </span> :
                        <span style={{ color: 'red', fontSize: 20 }}>
                            <CloseCircleOutlined />
                        </span>
                    }
                </Flex>
            ),
        },
        {
            title: <div style={{ textAlign: 'center' }}>Accepted</div>,
            dataIndex: 'is_accepted',
            key: 'is_accepted',
            width: 70,
            render: (is_accepted, record) => (
                <Switch defaultChecked onChange={() => {
                    // axiosClient.put('api/admin/dashboard/accept-product')

                    //     .then(response)
                }} />
            ),
        },
    ];
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div style={{ padding: '8px' }} className="flex flex-col gap-4" >
                    <Label  > Active : </Label>
                    <Select
                        options={[
                            { label: 'All', value: null },
                            { label: 'Active', value: true },
                            { label: 'Not Active', value: false },
                        ]}
                        placeholder="Select Active Status"
                        style={{ width: 200 }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(value) => {
                            resetPagination();
                            setIsActive(value);
                            setDropdownOpen(false);
                        }}
                    />
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div style={{ padding: '8px' }} className="flex flex-col gap-4" >
                    <Label  > Store : </Label>
                    <Select
                        value={store}
                        options={stores && [{ label: '_', value: null }, ...stores.map(store => ({ label: store.name, value: store.id }))]}
                        placeholder="Select Active Status"
                        style={{ width: 200 }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(value) => {
                            resetPagination();
                            setStore(value);
                            setDropdownOpen(false);
                        }}
                    />
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div style={{ padding: '8px' }} className="flex flex-col gap-4" >
                    <Label  > Category : </Label>
                    <Select
                        value={category}
                        options={categories && categories.map(category => ({ label: category.name, value: category.id }))}
                        placeholder="Select Active Status"
                        style={{ width: 200 }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(value) => {
                            resetPagination();
                            setCategory(value);
                            setDropdownOpen(false);
                        }}
                    />
                </div>
            ),
        },
    ];


    const { Text } = Typography;
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between">
                    <div>
                        {
                            <Space wrap className="mb-4">
                                {search && (
                                    <Tag
                                        closable
                                        onClose={() => setSearch(null)}
                                        closeIcon={<CloseOutlined />}
                                        color="orange"
                                        style={{ padding: '0 8px', fontWeight: 500 }}
                                    >
                                        Search: {search}
                                    </Tag>
                                )}

                                {is_active !== null && (
                                    <Tag
                                        closable
                                        onClose={() => {
                                            setIsActive(null);
                                        }}
                                        closeIcon={<CloseOutlined />}
                                        color="orange"
                                        style={{ padding: '0 8px', fontWeight: 500 }}
                                    >
                                        {is_active ? 'Active' : 'Not Active'}
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
                                    (search || is_active !== null || (sort.column && sort.order)) &&
                                    <Button size="small" type="link" onClick={() => {
                                        setSearch(null);
                                        setIsActive(null);
                                        setSort({ column: undefined, order: undefined });
                                        resetPagination();
                                    }}>
                                        Clear All
                                    </Button>
                                }
                            </Space>
                        }
                    </div>

                    <div className="flex justify-end items-center">
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search globally..."
                            allowClear
                            onChange={(e) => {
                                setSearch(e.currentTarget.value)
                                resetPagination();
                            }}
                            value={search!}
                            style={{ maxWidth: 300 }}
                        />
                        <Dropdown
                            placement="bottomLeft"
                            className="w-3"
                            menu={{ items }}
                            trigger={['click']}
                            open={dropdownOpen}
                            onOpenChange={(open) => {
                                setDropdownOpen(open)
                                if (open && stores.length === 0) getStores();
                                if (open && categories.length === 0) getCategories();
                            }}
                        >
                            <Button>
                                <FilterOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={products}
                    loading={loading}
                    bordered
                    title={() => { return <Text strong >Products Table </Text> }}
                    onChange={handleTableChange}
                    pagination={{
                        ...pagination,
                        position: ['bottomCenter'],
                        size: 'default',
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                        pageSizeOptions: PAGE_SIZE_OPTIONS,
                        responsive: true,
                    }}
                    rowKey="id"
                    scroll={{ x: 800 }}
                    size="small"
                />
            </div>
        </AppLayout >
    );
}

