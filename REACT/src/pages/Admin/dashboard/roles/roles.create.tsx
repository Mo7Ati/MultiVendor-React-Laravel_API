import { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    Checkbox,
    Card,
    Row,
    Col,
    message,
    Typography,
    Space,
} from "antd";
import axiosClient from "@/axios-client";
import AppLayout from "@/layouts/app-layout";
import { useNavigate } from "react-router-dom";
import { BreadcrumbItem } from "@/types";
import { Loader } from "@/components/loader";


const { Title } = Typography;

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Roles", href: "/admin/dashboard/roles" },
    { title: "Create Role", href: "/admin/dashboard/roles/create" },
];

export default function RolesCreate() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState<Record<string, { id: number; name: string; group: string; guard_name: string; }[]>>({});

    const [role, setRole] = useState<{ name: string, guard: string, permissions: string[] }>(
        { name: '', guard: '', permissions: [] }
    );
    const [backendErrors, setBackendErrors] = useState<string[]>([]);

    const getPermissions = async () => {
        try {
            const response = await axiosClient.get("/api/admin/dashboard/permissions");
            const permissionsData = response.data && typeof response.data === 'object' ? response.data : {};
            setPermissions(permissionsData);
        } catch (error) {
            console.error('Error fetching permissions:', error);
            message.error("Failed to load permissions.");
            setPermissions({}); 
        }
    };

    useEffect(() => {
        getPermissions();
    }, []);


    const handlePermissionChange = (permissionName: string, checked: boolean) => {
        if (checked) {
            setRole(prev => ({ ...prev, permissions: [...prev.permissions, permissionName] }))
        } else {
            setRole(prev => ({ ...role, permissions: role.permissions.filter(name => name !== permissionName) }))
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setBackendErrors([]);
        try {
            await axiosClient.post("/api/admin/dashboard/roles", role);
            message.success("Role created successfully.");
            navigate("/admin/dashboard/roles");
        } catch (error: any) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                setBackendErrors(errors as string[]);
            } else {
                message.error("An error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {
                Object.keys(permissions).length > 0 ? (
                    <div className="flex flex-col gap-4 p-4">
                        <Card title={<Title level={4}>Create Role</Title>} >
                            {backendErrors.length > 0 && (
                                <div className="mb-4 text-red-500">
                                    <ul className="list-disc pl-5">
                                        {backendErrors.map((err, idx) => (
                                            <li key={idx}>{err}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <Form
                                layout="vertical"
                                form={form}
                                onFinish={handleSubmit}
                                initialValues={role}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Role Name"
                                            name="name"
                                            rules={[{ required: true, message: "Role name is required" }]}
                                        >
                                            <Input
                                                placeholder="Enter role name"
                                                onChange={e => setRole({ ...role, name: e.currentTarget.value })}
                                                value={role.name}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Guard Name"
                                            name="guard_name"
                                            rules={[{ required: true, message: "Guard name is required" }]}
                                        >
                                            <Select
                                                onChange={value => setRole({ ...role, guard: value })}
                                            >
                                                <Select.Option value="admin">admin</Select.Option>
                                                <Select.Option value="web">web</Select.Option>
                                                <Select.Option value="cashier">cashier</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label="Permissions"
                                >
                                    <Row gutter={[16, 16]}>
                                        {
                                            Object.entries(permissions).map(([groupName, groupPermissions]) => {
                                                return <Col span={8} key={groupName}>
                                                    <Card size="small" title={groupName} type="inner">
                                                        <Space direction="vertical">
                                                            {groupPermissions.map((permission) => {
                                                                return (
                                                                    <Checkbox
                                                                        key={permission.id}
                                                                        checked={role.permissions.includes(permission.name)}
                                                                        onChange={(e) => handlePermissionChange(permission.name, e.target.checked)}
                                                                    >
                                                                        {permission.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                                                    </Checkbox>
                                                                )
                                                            })}
                                                        </Space>
                                                    </Card>
                                                </Col>
                                            })
                                        }
                                    </Row>
                                </Form.Item>

                                <Form.Item >
                                    <div className="flex gap-10 mt-1">
                                        <Button
                                            type="primary"
                                            className="ml-20"
                                            htmlType="submit"
                                        >
                                            {'stores.createCategory'}
                                        </Button>
                                        <Button
                                            danger
                                            onClick={() => {
                                                navigate('/admin/dashboard/stores');
                                            }}
                                        >
                                            {'common.cancel'}
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>) :
                    <Loader />
            }
        </AppLayout>
    );
}
