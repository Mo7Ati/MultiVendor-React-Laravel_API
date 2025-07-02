import axiosClient from "@/axios-client";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { StoreType } from "@/types/dashboard";
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
    Badge,
    Image
} from 'antd';
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    StarOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    GlobalOutlined
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
        title: 'Stores',
        href: '/admin/dashboard/stores',
    },
];

export default function StoresIndex() {
    const [messageApi, contextHolder] = message.useMessage();
    const can = usePermissions();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [stores, setStores] = useState<StoreType[]>([]);


    useEffect(() => {
        getStores();
    }, []);

    const getStores = async () => {
        try {
            const response = await axiosClient.get('/api/admin/dashboard/stores');
            setStores(response.data.stores);
            setLoaded(true);
        } catch (error) {
            throw error;
        }
    }
    console.log(loaded, stores);

    // useEffect(() => {
    //     if (flashMessage) {
    //         messageApi.open({
    //             type: 'success',
    //             content: flashMessage,
    //         });
    //         setFlashMessage('');
    //     }
    // }, [flashMessage, messageApi]);

    type DataIndex = keyof StoreType;

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

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<StoreType> => ({
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
                    return fieldValue.en
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
                    return fieldValue.en;
                }
                return JSON.stringify(fieldValue);
            }
            return text;
        },
    });

    const handleStatusChange = (checked: boolean, record: StoreType) => {
        // Handle status change logic here
        console.log('Status changed for store:', record.id, checked);
    };

    const getActionMenu = (record: StoreType): MenuProps['items'] => [
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: t('common.edit'),
            onClick: () => navigate(`/admin/dashboard/stores/${record.id}/edit`),
            disabled: !can('update-stores'),
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: t('common.delete'),
            onClick: () => {
                axiosClient.delete(`api/admin/dashboard/stores/${record.id}`).then((res) => {
                    // dispatch({ type: 'DELETE_STORE', payload: record.id });
                    messageApi.open({
                        type: 'success',
                        content: t('stores.storeDeleted'),
                    });
                });
            },
            disabled: !can('delete-stores'),
        },
    ];

    const columns: TableColumnsType<StoreType> = [
        {
            title: 'logo', //t('stores.columns.logo'),
            dataIndex: 'logo',
            key: 'logo',
            width: 80,
            render: (logo) => {
                return <Image
                    width={60}
                    height={60}
                    src={logo?.original_url}
                    fallback="data:image/png;base64,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"
                />
            }
            ,
        },
        {
            title: t('stores.columns.name'),
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
            title: t('stores.columns.email'),
            dataIndex: 'email',
            key: 'email',
            width: 200,
            ...getColumnSearchProps('email'),
            render: (email) => (
                <div className="flex items-center gap-2">
                    <MailOutlined className="text-gray-400" />
                    <span className="text-sm">{email}</span>
                </div>
            ),
        },
        {
            title: t('stores.columns.phone'),
            dataIndex: 'phone',
            key: 'phone',
            width: 140,
            ...getColumnSearchProps('phone'),
            render: (phone) => (
                <div className="flex items-center gap-2">
                    <PhoneOutlined className="text-gray-400" />
                    <span className="text-sm">{phone}</span>
                </div>
            ),
        },
        {
            title: t('stores.columns.address'),
            dataIndex: 'address',
            key: 'address',
            width: 200,
            ...getColumnSearchProps('address'),
            render: (address) => (
                <div>
                    <div className="flex items-center gap-1">
                        <EnvironmentOutlined className="text-gray-400 text-xs" />
                        <span className="text-sm">{address[currentLanguage]}</span>
                    </div>
                </div>
            ),
        },
        {
            title: t('stores.columns.rating'),
            dataIndex: 'rate',
            key: 'rate',
            width: 80,
            sorter: (a, b) => a.rate - b.rate,
            render: (rate) => (
                <div className="flex items-center gap-1">
                    <StarOutlined className="text-yellow-400" />
                    <span className="text-sm font-medium">{rate.toFixed(1)}</span>
                </div>
            ),
        },
        {
            title: t('stores.columns.status'),
            dataIndex: 'is_active',
            key: 'is_active',
            width: 100,
            filters: [
                { text: t('common.active'), value: true },
                { text: t('common.inactive'), value: false },
            ],
            onFilter: (value, record) => record.is_active === value,
            render: (is_active, record) => (
                <Badge
                    status={is_active ? 'success' : 'default'}
                    text={is_active ? t('common.active') : t('common.inactive')}
                />
            ),
        },
        {
            title: t('stores.columns.actions'),
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
        return stores.map((store, index) => ({
            ...store,
            key: store.id || index,
        }));
    }, [stores]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
            <div className="rounded-xl p-6 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{t('stores.title')}</h1>
                        <p className="text-gray-600 mt-1">{t('stores.subtitle')}</p>
                    </div>
                    {can('create-stores') && (
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate('/admin/dashboard/stores/create')}
                            className="flex items-center gap-2"
                        >
                            {t('stores.addStore')}
                        </Button>
                    )}
                </div>

                <Table<StoreType>
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
                    scroll={{ x: 1200 }}
                    size="middle"
                    bordered
                    className="custom-table"
                />
            </div>
        </AppLayout>
    );
}

