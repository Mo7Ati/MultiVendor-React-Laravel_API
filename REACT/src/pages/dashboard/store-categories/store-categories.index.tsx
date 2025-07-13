import axiosClient from "@/axios-client";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { StoreCategoryType } from "@/types/dashboard";
import {
    Button,
    Space,
    Table,
    message,
    InputRef,
    TableColumnsType,
    TableColumnType,
    Input,
    Dropdown,
    MenuProps,
} from 'antd';
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { FilterDropdownProps } from "antd/es/table/interface";
import { useTranslation } from 'react-i18next';
import { useLanguage } from "@/providers/LanguageProvider";

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

export default function StoreCategoriesIndex() {
    const [messageApi, contextHolder] = message.useMessage();
    const can = usePermissions();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [storeCategories, setStoreCategories] = useState<StoreCategoryType[]>([]);

    useEffect(() => {
        getStoreCategories();
    }, []);

    const getStoreCategories = async () => {
        try {
            const response = await axiosClient.get('/api/admin/dashboard/store-categories');
            setStoreCategories(response.data);
            setLoaded(true);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: t('common.error'),
            });
        }
    };

    type DataIndex = keyof StoreCategoryType;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<StoreCategoryType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`${t('common.search')} ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        {t('common.search')}
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        {t('common.reset')}
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        {t('common.filter')}
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        {t('common.close')}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            const fieldValue = record[dataIndex];
            if (typeof fieldValue === 'object' && fieldValue !== null) {
                if ('en' in fieldValue) {
                    return (fieldValue.en || '')
                        .toString()
                        .toLowerCase()
                        .includes((value as string).toLowerCase());
                }
                return JSON.stringify(fieldValue)
                    .toLowerCase()
                    .includes((value as string).toLowerCase());
            }
            return fieldValue
                ?.toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()) || false;
        },
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text, record, index) => {
            const fieldValue = record[dataIndex];
            if (typeof fieldValue === 'object' && fieldValue !== null) {
                if ('en' in fieldValue) {
                    return fieldValue.en || '';
                }
                return JSON.stringify(fieldValue);
            }
            return text;
        },
    });

    const getActionMenu = (record: StoreCategoryType): MenuProps['items'] => [
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: t('common.edit'),
            onClick: () => navigate(`/admin/dashboard/store-categories/${record.id}/edit`),
            disabled: !can('update-store-categories'),
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: t('common.delete'),
            onClick: () => {
                axiosClient.delete(`/api/store-categories/${record.id}`).then((res) => {
                    setStoreCategories(prev => prev.filter(cat => cat.id !== record.id));
                    messageApi.open({
                        type: 'success',
                        content: t('common.deleted'),
                    });
                });
            },
            disabled: !can('delete-store-categories'),
        },
    ];

    const columns: TableColumnsType<StoreCategoryType> = [
        {
            title: t('common.name'),
            dataIndex: 'name',
            key: 'name',
            width: 200,
            ...getColumnSearchProps('name'),
            render: (name) => (
                <div>
                    <div className="font-medium">{name[currentLanguage]}</div>
                </div>
            ),
        },
        {
            title: t('common.description'),
            dataIndex: 'description',
            key: 'description',
            width: 300,
            ...getColumnSearchProps('description'),
            render: (description) => (
                <div>
                    <div className="text-sm text-gray-600">{description?.[currentLanguage] || '-'}</div>
                </div>
            ),
        },
        {
            title: t('common.actions'),
            key: 'actions',
            width: 120,
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

    const tableData = useMemo(() => {
        return storeCategories.map((category, index) => ({
            ...category,
            key: category.id || index,
        }));
    }, [storeCategories]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
            <div className="rounded-xl p-6 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{t('storeCategories.title')}</h1>
                        <p className="text-gray-600 mt-1">{t('storeCategories.subtitle')}</p>
                    </div>
                    {can('create-store-categories') && (
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate('/admin/dashboard/store-categories/create')}
                            className="flex items-center gap-2"
                        >
                            {t('storeCategories.addCategory')}
                        </Button>
                    )}
                </div>

                <Table<StoreCategoryType>
                    columns={columns}
                    dataSource={tableData}
                    loading={!loaded}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${t('pagination.showing')} ${range[0]}-${range[1]} ${t('pagination.of')} ${total} ${t('pagination.entries')}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        defaultPageSize: 20,
                    }}
                    scroll={{ x: 800 }}
                    size="middle"
                    bordered
                    className="custom-table"
                />
            </div>
        </AppLayout>
    );
} 