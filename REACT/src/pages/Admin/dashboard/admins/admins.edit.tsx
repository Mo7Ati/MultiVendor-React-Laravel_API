import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useEffect, useState } from 'react';
import {
    Input,
    Button,
    Form,
    Checkbox,
    Radio,
    message,
    Card,
    Col,
    Row,
    Select,
} from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "@/axios-client";
import { AdminType, EStatus } from "@/types/dashboard";
import { Loader } from "@/components/loader";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admins', href: '/admin/dashboard/admins' },
    { title: 'Create Admin', href: '/admin/dashboard/admins/create' },
];

export default function CreateAdmin() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [backendErrors, setBackendErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const InitialValues: AdminType = {
        name: '',
        email: '',
        password: '',
        roles: [],
    }
    const [admin, setAdmin] = useState<AdminType>(InitialValues);

    const params = useParams();

    const getAdmin = async () => {
        setBackendErrors([]);
        try {
            const response = await axiosClient.get(`/api/admin/dashboard/admins/${Number(params.id)}`);
            setLoaded(true);
            setAdmin(response.data);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                const flatErrors = Object.values(error.response.data.errors).flat();
                setBackendErrors(flatErrors as string[]);
            } else {
                setBackendErrors(["An unexpected error occurred."]);
            }
        }
    }
    useEffect(() => {
        getAdmin();
    }, [])

    const handleSubmit = async () => {
        setLoading(true);
        setBackendErrors([]);

        axiosClient.put(`/api/admin/dashboard/admins/${Number(params.id)}`, admin)
            .then(response => {
                messageApi.success("Admin Created Successfully");
                navigate('/admin/dashboard/admins');
            }).catch(error => {
                if (error.response?.data?.errors) {
                    const flatErrors = Object.values(error.response.data.errors).flat();
                    setBackendErrors(flatErrors as string[]);
                } else {
                    setBackendErrors(["An unexpected error occurred."]);
                }
            }).finally(() => {
                setLoading(false);
            });
    }
    console.log(admin && !loading);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
            {(admin && loaded) ?
                (<Form
                    form={form}
                    initialValues={admin}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: '100%', padding: 30 }}
                    onFinish={handleSubmit}
                >
                    {backendErrors.length > 0 && (
                        <div className="mb-6">
                            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                                <ul className="list-disc pl-5">
                                    {backendErrors.map((err, idx) => (
                                        <li key={idx}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <Row>
                        <Col span={12}>
                            <Card title="Admin Information" type="inner">
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        value={admin.name}
                                        onChange={(e) => {
                                            setAdmin({ ...admin, name: e.currentTarget.value });
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                    <Input
                                        value={admin.email}
                                        onChange={(e) => {
                                            setAdmin({ ...admin, email: e.currentTarget.value });
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                >
                                    <Input.Password
                                        value={admin.password}
                                        onChange={(e) => {
                                            setAdmin({ ...admin, password: e.currentTarget.value });
                                        }}
                                    />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={12} >
                            <Card title="Roles & Status" className="mb-4" type="inner">
                                <Form.Item name="roles" label="Roles" rules={[{ required: false }]}>
                                    <Select></Select>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>

                    <Form.Item>
                        <div className="flex gap-4 justify-center mt-4">
                            <Button type="primary" htmlType="submit" loading={loading}>Update Admin</Button>
                            <Button onClick={() => navigate('/admin/dashboard/admins')}>Cancel</Button>
                        </div>
                    </Form.Item>
                </Form>) : <Loader />
            }
        </AppLayout>
    );
}
