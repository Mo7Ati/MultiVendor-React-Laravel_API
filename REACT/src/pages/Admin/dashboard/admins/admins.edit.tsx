import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import AdminForm from "./admins.form";
import { useContext, useEffect, useState } from 'react';
import {
    Input,
    Image,
    Button,
    Form,
    Radio,
    Upload,
    Checkbox,
    Select,
    Spin,
} from 'antd';

import { AdminType, EStatus } from "@/types/dashboard";
import { AdminsContext } from "@/providers/admin-provider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "@/axios-client";
import { RolesContext } from "@/providers/roles-provider";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admins',
        href: '/admins',
    },
];

export default function EditAdmin(props: any) {
    const { admins, getAdmins, dispatch, setFlashMessage, loaded } = useContext(AdminsContext);
    const { state, getRoles, loaded: RolesLoaded } = useContext(RolesContext);

    const params = useParams();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<AdminType>(admins.find(admin => admin.id === Number(params.id))!);


    useEffect(() => {
        if (!loaded) {
            getAdmins();
        }
        if (!RolesLoaded) {
            getRoles();
        }
    }, [])
    useEffect(() => {
        setAdmin(admins.find(admin => admin.id === Number(params.id))!);
    }, [loaded])


    const [errors, setErrors] = useState({
        name: '',
        password: '',
        email: '',
        username: '',
        phone_number: '',
        roles: '',
        status: '',
        super_admin: '',
    })

    const handleSubmit = () => {
        axiosClient.put(`/api/admin/dashboard/admins/${admin.id}`, admin).then(response => {
            dispatch({ type: "UPDATE_ADMIN", payload: response.data });
            setFlashMessage("Admin Updated Successfully");
            navigate('/admin/dashboard/admins');
        }).catch(res => {
            setErrors(res.response.data.errors);
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Categories" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {
                    admin ? <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 800 }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item label="Name"
                            help={
                                errors.name && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {errors.name}
                                    </span>
                                )
                            }
                            validateStatus={errors.name && 'error'}
                        >
                            <Input
                                value={admin.name}
                                onChange={(e) => {
                                    errors.name = '';
                                    setAdmin({ ...admin, name: e.currentTarget.value })
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="User Name"
                            help={
                                errors.username && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {errors.username}
                                    </span>
                                )
                            }
                            validateStatus={errors.username && 'error'}
                        >
                            <Input
                                value={admin.username}
                                onChange={(e) => {
                                    errors.username = '';
                                    setAdmin({ ...admin, username: e.currentTarget.value })
                                }}
                            />

                        </Form.Item>
                        <Form.Item label="Email"
                            help={
                                errors.email && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {errors.email}
                                    </span>
                                )
                            }
                            validateStatus={errors.email && 'error'}
                        >
                            <Input
                                value={admin.email}
                                onChange={(e) => {
                                    errors.email = '';
                                    setAdmin({ ...admin, email: e.currentTarget.value })
                                }}
                            />

                        </Form.Item>
                        <Form.Item label="Phone Number"
                            help={
                                errors.phone_number && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {errors.phone_number}
                                    </span>
                                )
                            }
                            validateStatus={errors.phone_number && 'error'}
                        >
                            <Input
                                value={admin.phone_number!}
                                onChange={(e) => {
                                    errors.phone_number = '';
                                    setAdmin({ ...admin, phone_number: e.currentTarget.value })
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="Password"
                            help={
                                errors.password && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {errors.password}
                                    </span>
                                )
                            }
                            validateStatus={errors.password && 'error'}
                        >
                            <Input
                                value={admin.password}
                                onChange={(e) => {
                                    errors.password = '';
                                    setAdmin({ ...admin, password: e.currentTarget.value })
                                }}
                            />

                        </Form.Item>

                        <Form.Item label="Roles"
                            help={
                                errors.roles && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {errors.roles}
                                    </span>
                                )
                            }
                            validateStatus={errors.roles && 'error'}
                        >
                            {
                                state.roles ? state.roles.map(role => (
                                    <Checkbox
                                        key={role.id}
                                        value={admin.roles}
                                        checked={admin.roles.find(r => r.id === role.id) ? true : false}
                                        onChange={
                                            (e) => {
                                                console.log(admin.roles.includes(role));

                                                if (e.target.checked) {
                                                    const newArray = [...admin.roles];
                                                    newArray.push(role);
                                                    setAdmin({ ...admin, roles: newArray })
                                                } else if (!e.target.checked) {
                                                    setAdmin({ ...admin, roles: [...admin.roles].filter(r => r.id !== role.id) })
                                                }
                                            }}
                                    >
                                        {role.name}
                                    </Checkbox>
                                )) : <Spin />
                            }
                        </Form.Item>


                        <Form.Item label="Status"
                            help={
                                errors.status && (
                                    <span className="ml-5 text-red-450 text-sm font-medium">
                                        {errors.status}
                                    </span>
                                )
                            }
                            validateStatus={errors.status ? 'error' : ''}
                        >
                            <Radio.Group defaultValue={admin.status}>
                                <Radio
                                    value="active"
                                    name="status"
                                    onChange={e => {
                                        errors.status = '';
                                        setAdmin({ ...admin, status: e.target.value })
                                    }
                                    }
                                >
                                    Active
                                </Radio>
                                <Radio
                                    value="inactive"
                                    name="status"
                                    onChange={e =>
                                        setAdmin({ ...admin, status: e.target.value })}
                                >
                                    Inactive
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Super Admin"
                            help={
                                errors.super_admin && (
                                    <span className="ml-5 text-red-450 text-sm font-medium">
                                        {errors.super_admin}
                                    </span>
                                )
                            }
                            validateStatus={errors.super_admin ? 'error' : ''}
                        >
                            <Checkbox
                                checked={admin.super_admin}
                                onChange={
                                    (e) => {
                                        setAdmin({ ...admin, super_admin: e.target.checked })
                                    }}
                            >

                            </Checkbox>
                        </Form.Item>
                        <Form.Item >
                            <div className="flex gap-10 mt-1">
                                <Button color="primary" className="ml-20" htmlType="submit" variant="outlined">
                                    Create
                                </Button>
                                <Button color="danger" variant="outlined"
                                    onClick={() => {
                                        navigate('/admin/dashboard/admins');
                                    }}>
                                    Cancel
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                        : <Spin />
                }
            </div>
        </AppLayout >
    );
}
