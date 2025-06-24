import axiosClient from "@/axios-client";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { storesContext } from "@/providers/stores-provider";
import { BreadcrumbItem } from "@/types";
import { StoreType } from "@/types/dashboard";
import { Button, Flex, Space, Table, Image, message, InputRef, TableColumnsType, TableColumnType, Input } from 'antd';
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';


import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { FilterDropdownProps } from "antd/es/table/interface";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: 'dashboard/products',
    },
];

export default function StoresIndex() {
    const { stores, getStores, loaded, flashMessage, setFlashMessage, dispatch } = useContext(storesContext)
    const { Column } = Table;
    const [messageApi, contextHolder] = message.useMessage();
    const can = usePermissions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            getStores();
        }
    }, []);


    useEffect(() => {
        if (flashMessage) {
            messageApi.open({
                type: 'success',
                content: flashMessage,
            });
            setFlashMessage('');
        }
    }, [flashMessage, messageApi]);

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
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        // icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
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
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]!
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <>
                    {/* <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    /> */}
                </>
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<StoreType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Description',
            dataIndex: 'description.en',
            key: 'description',
            ...getColumnSearchProps('address'),
            // sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Products" /> */}
            {contextHolder}
            <div className="rounded-xl p-4">
                {
                    can('create-stores') && (
                        <Button
                            color="primary"
                            variant="outlined"
                            className="mb-2"
                            onClick={() => navigate('/admin/dashboard/stores/create')}
                        >
                            Add Store
                        </Button>
                    )
                }
                <Table<StoreType> columns={columns} dataSource={stores} />
            </div>
        </AppLayout >
    );
}

