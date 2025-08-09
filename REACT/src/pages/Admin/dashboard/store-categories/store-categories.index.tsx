import axiosClient from "@/axios-client";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Button, Dropdown, Flex, Input, InputRef, MenuProps, message, Select, Space, Table, TableColumnsType, TablePaginationConfig, Tag, Typography } from 'antd';
import { useEffect, useMemo, useRef, useState } from "react";
import { StoreCategoryType } from "@/types/dashboard";
import {
    SearchOutlined,
    CloseOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { t } from "i18next";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Store Categories',
        href: '/admin/dashboard/store-categories',
    },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export default function StoreCategoriesIndex() {
    const [storeCategories, setStoreCategories] = useState<StoreCategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string | null>(null)
    const [debouncedValue, setDebouncedValue] = useState<string | null>(null)

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const navigate = useNavigate();

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

    const getStoreCategories = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/api/admin/dashboard/store-categories',
                {
                    params: {
                        search: debouncedValue,
                        page: pagination.current,
                        per_page: pagination.pageSize,
                    }
                });
            setStoreCategories(response.data.data);
            setPagination(prev => ({
                ...prev,
                total: response.data.meta.total,
            }));

            setLoading(false);
        } catch (e) {
            message.error('Failed to load store categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStoreCategories();
    }, [debouncedValue, pagination.current, pagination.pageSize]);

    const handleTableChange = (
        Pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<StoreCategoryType> | SorterResult<StoreCategoryType>[],
        extra: TableCurrentDataSource<StoreCategoryType>
    ) => {
        setPagination(prev => ({
            ...prev,
            current: Pagination.current!,
            pageSize: Pagination.pageSize!,
        }));
    }

    const getActionMenu = (record: StoreCategoryType): MenuProps['items'] => [
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: t('common.edit'),
            onClick: () => navigate(`/admin/dashboard/store-categories/${record.id}/edit`),
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: t('common.delete'),
            onClick: () => {
                axiosClient.delete(`/api/store-categories/${record.id}`).then((res) => {
                    setStoreCategories(prev => prev.filter(cat => cat.id !== record.id));
                    message.success('Store category deleted successfully');
                });
            },
        },
    ];

    const columns: TableColumnsType<StoreCategoryType> = [
        {
            title: <div style={{ textAlign: 'center' }}>Name</div>,
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: value => <div className="text-center">{value}</div>
        },
        {
            title: <div style={{ textAlign: 'center' }}>Description</div>,
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: value => <div className="text-center">{value}</div>
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 60,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Dropdown
                        menu={{ items: getActionMenu(record) }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button
                            type="text"
                            icon={<MoreOutlined />}
                            size="small"
                        />
                    </Dropdown>
                </Space>
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


                                {
                                    (search) &&
                                    <Button size="small" type="link" onClick={() => {
                                        setSearch(null);
                                        resetPagination();
                                    }}>
                                        Clear All
                                    </Button>
                                }
                            </Space>
                        }
                    </div>

                    <div className="flex justify-end items-center">
                        <Button color="default" style={{ marginRight: 6 }} variant="outlined" onClick={() => navigate('/admin/dashboard/store-categories/create')}>
                            Add Category
                        </Button>
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
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={storeCategories}
                    loading={loading}
                    bordered
                    title={() => { return <Text strong >Store Categories Table </Text> }}
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