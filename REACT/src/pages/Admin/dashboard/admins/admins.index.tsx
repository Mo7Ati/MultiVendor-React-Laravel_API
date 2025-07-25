import axiosClient from "@/axios-client";
import AppLayout from "@/layouts/app-layout";
import { usePermissions } from "@/hooks/use-permissions";
import { BreadcrumbItem } from "@/types";
import { AdminType } from "@/types/dashboard";
import { useEffect, useRef, useState } from "react";
import {
    Table,
    Button,
    Input,
    Tag,
    Space,
    Dropdown,
    MenuProps,
    Typography,
    message,
    Flex,
    TablePaginationConfig
} from "antd";
import {
    SearchOutlined,
    FilterOutlined,
    CloseOutlined,
    EditOutlined,
    DeleteOutlined,
    MoreOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/admin/dashboard"
    },
    {
        title: "Admins",
        href: "/admin/dashboard/admins"
    }
];

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export default function AdminsIndex() {
    const [admins, setAdmins] = useState<AdminType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string | null>(null);
    const [debouncedValue, setDebouncedValue] = useState<string | null>(null);
    const searchInput = useRef(null);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });


    const navigate = useNavigate();
    const can = usePermissions();
    const [messageApi, contextHolder] = message.useMessage();

    const resetPagination = () => {
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedValue(search);
        }, 800);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const getAdmins = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/api/admin/dashboard/admins", {
                params: {
                    search: debouncedValue,
                    page: pagination.current,
                    per_page: pagination.pageSize
                }
            });
            setAdmins(response.data.data);
            setPagination(prev => ({
                ...prev,
                total: response.data.meta.total
            }));
        } catch (error) {
            messageApi.error("Failed to load admins");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAdmins();
    }, [debouncedValue, pagination.current, pagination.pageSize]);

    const handleTableChange = (
        paginationConfig: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<AdminType> | SorterResult<AdminType>[],
        extra: TableCurrentDataSource<AdminType>) => {
        setPagination({
            current: paginationConfig.current!,
            pageSize: paginationConfig.pageSize!,
            total: pagination.total
        });
    };

    const getActionMenu = (record: AdminType): MenuProps['items'] => [
        ...(can('update-admins') ? [{
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Edit',
            onClick: () => navigate(`/admin/dashboard/admins/${record.id}/edit`)
        }] : []),
        ...(can('delete-admins') ? [{
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Delete',
            onClick: async () => {
                try {
                    await axiosClient.delete(`/api/admin/dashboard/admins/${record.id}`);
                    messageApi.success("Admin deleted successfully");
                    getAdmins();
                } catch {
                    messageApi.error("Failed to delete admin");
                }
            }
        }] : [])
    ];

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
                        {can('create-admins') && (
                            <Button type="primary" onClick={() => navigate("/admin/dashboard/admins/create")}>
                                Add Admin
                            </Button>
                        )}
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search admins..."
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
                            render(value, record, index) {
                                return (
                                    <div className="flex justify-center">
                                        {value}
                                    </div>
                                )
                            },
                        },
                        {
                            title: <div style={{ textAlign: 'center' }}>Email</div>,
                            dataIndex: "email",
                            key: "email",
                            width: '200px',
                            render(value, record, index) {
                                return (
                                    <div className="flex justify-center">
                                        {value}
                                    </div>
                                )
                            },
                        },
                        {
                            title: <div style={{ textAlign: 'center' }}>Roles</div>,
                            key: "roles",
                            width: '200px',
                            render: (_, record) => (
                                <>{record.roles?.map(role =>
                                    <div key={role.id} className="flex justify-center">
                                        {role.name}
                                    </div>)}</>
                            )
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
                    dataSource={admins}
                    rowKey="id"
                    loading={loading}
                    onChange={handleTableChange}
                    bordered={true}
                    title={() => <Text strong>Admins Table</Text>}
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
                    scroll={{ x: 800 }}
                    // size="small"
                />
            </div>
        </AppLayout>
    );
}
