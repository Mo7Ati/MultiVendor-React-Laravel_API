import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { RolesContext } from "@/providers/roles-provider";
import { BreadcrumbItem } from "@/types";
import { RoleType } from "@/types/dashboard";
import {
    Button,
    Dropdown,
    Input,
    message,
    Space,
    Table,
    Tag,
    Typography,
    Flex,
    TablePaginationConfig
} from "antd";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    MoreOutlined,
    SearchOutlined
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/axios-client";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Roles',
        href: '/admin/dashboard/roles',
    },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export default function RolesIndex() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const [search, setSearch] = useState<string | null>(null);
    const [debouncedValue, setDebouncedValue] = useState<string | null>(null);
    const searchInput = useRef(null);
    const [roles, setRoles] = useState<RoleType[]>([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const resetPagination = () => {
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedValue(search);
        }, 800);
        return () => clearTimeout(delayDebounce);
    }, [search]);


    useEffect(() => {
        getRoles();
    }, [debouncedValue, pagination.current, pagination.pageSize]);


    const getRoles = async () => {
        try {
            const response = await axiosClient.get("/api/admin/dashboard/roles");
            setRoles(response.data.data);
        } catch {
            message.error("Failed to load roles");
        } finally {
            setLoaded(true);
        }
    };



    const handleDelete = async (record: RoleType) => {
        try {
            axiosClient.delete(`/api/admin/dashboard/roles/${record.id}`)
                .then(response => {
                    const newRoles = [...roles].filter(role => role.id !== record.id);
                    setRoles(newRoles);
                });
        } catch {
            messageApi.error("Failed to delete role.");
        }
    };

    const getActionMenu = (record: RoleType): MenuProps['items'] => [
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Edit',
            onClick: () => navigate(`/admin/dashboard/roles/${record.id}/edit`)
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Delete',
            onClick: () => handleDelete(record)
        }
    ];

    const handleTableChange = (
        paginationConfig: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<RoleType> | SorterResult<RoleType>[],
        extra: TableCurrentDataSource<RoleType>) => {
        setPagination({
            current: paginationConfig.current!,
            pageSize: paginationConfig.pageSize!,
            total: pagination.total
        });
    };

    const { Text } = Typography;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between">
                    <div>
                        <Space wrap className="mb-4">
                            {search && (
                                <Tag
                                    closable
                                    onClose={() => setSearch(null)}
                                    closeIcon={<CloseOutlined />}
                                    color="orange"
                                    style={{ padding: "0 8px", fontWeight: 500 }}
                                >
                                    Search: {search}
                                </Tag>
                            )}

                            {search && (
                                <Button size="small" type="link" onClick={() => {
                                    setSearch(null);
                                    resetPagination();
                                }}>
                                    Clear All
                                </Button>
                            )}
                        </Space>
                    </div>

                    <div className="flex gap-2 items-center">

                        <Button type="primary" onClick={() => navigate("/admin/dashboard/roles/create")}>
                            Add Role
                        </Button>

                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search roles..."
                            allowClear
                            onChange={(e) => {
                                setSearch(e.target.value);
                                resetPagination();
                            }}
                            value={search || ''}
                            style={{ maxWidth: 300 }}
                        />
                    </div>
                </div>

                <Table
                    columns={[
                        {
                            title: <div style={{ textAlign: 'center' }}>Name</div>,
                            dataIndex: "name",
                            key: "name",
                            width: '200px',

                            render: value => <div className="text-center">{value}</div>
                        },
                        {
                            title: <div style={{ textAlign: 'center' }}>Permissions Count</div>,
                            dataIndex: "permission_count",
                            key: "permission_count",
                            width: '200px',
                            render: value => <div className="text-center">{value}</div>
                        },
                        {
                            title: "Actions",
                            key: "actions",
                            fixed: 'right',
                            width: 60,
                            render: (_, record) => (
                                <Dropdown
                                    menu={{ items: getActionMenu(record) }}
                                    trigger={["click"]}
                                    placement="bottomRight"
                                >
                                    <Button type="text" icon={<MoreOutlined />} size="small" />
                                </Dropdown>
                            )
                        }
                    ]}
                    title={() => <Text strong>Roles Table</Text>}
                    dataSource={roles}
                    rowKey="id"
                    loading={loading}
                    onChange={handleTableChange}
                    bordered={true}
                    pagination={{
                        ...pagination,
                        position: ["bottomCenter"],
                        size: "default",
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        pageSizeOptions: PAGE_SIZE_OPTIONS,
                        responsive: true
                    }}
                    scroll={{ x: 600 }}
                />
            </div>
        </AppLayout>
    );
}
