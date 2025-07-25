import { router, useForm } from "@inertiajs/react";
import { useState } from 'react';
import {
    Input,
    Image,
    Button,
    Form,
    Radio,
    Upload,
    Checkbox,
    Select,
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { AdminType, CategoryType, EForm, RoleType, StoreType, TagType } from "@/types/dashboard";
import Password from "antd/es/input/Password";


interface Iprops {
    admin: AdminType;
    roles: RoleType[];
    errors: object,
    formType: string;
}

export default function AdminForm(props: Iprops) {
    const {
        data,
        setData,
        errors,
        post,
        put,
    } = useForm<AdminType>({
        id: props.admin.id,
        name: props.admin.name,
        username: props.admin.username,
        phone_number: props.admin.phone_number,
        email: props.admin.email,
        password: props.admin.password,
        status: props.admin.status,
        super_admin: props.admin.super_admin,
        roles: props.admin.roles ?? [],
    });

    const handleSubmit = () => {
        if (props.formType === 'create') {
            post(route('dashboard.admins.store'));
        } else if (props.formType === 'edit') {
            put(route('dashboard.admins.update', props.admin.id));
        }
    }
    return (
        <Form
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
                    value={data.name}
                    onChange={(e) => {
                        errors.name = '';
                        setData('name', e.currentTarget.value)
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
                    value={data.username}
                    onChange={(e) => {
                        errors.username = '';
                        setData('username', e.currentTarget.value)
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
                    value={data.email}
                    onChange={(e) => {
                        errors.email = '';
                        setData('email', e.currentTarget.value)
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
                    value={data.phone_number}
                    onChange={(e) => {
                        errors.phone_number = '';
                        setData('phone_number', Number(e.currentTarget.value))
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
                    value={data.password}
                    onChange={(e) => {
                        errors.password = '';
                        setData('password', e.currentTarget.value)
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
                    props.roles.map(role => (
                        <Checkbox
                            key={role.id}
                            checked={data.roles.find(r => r.id === role.id) ? true : false}
                            onChange={
                                (e) => {
                                    console.log(props.admin);
                                    if (e.target.checked) {
                                        setData('roles', [...data.roles, role]);
                                    } else if (!e.target.checked) {
                                        setData('roles', [...data.roles].filter(r => r.id !== role.id))
                                    }
                                }}
                        >
                            {role.name}
                        </Checkbox>
                    ))
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
                <Radio.Group defaultValue={props.admin.status}>
                    <Radio
                        value="active"
                        name="status"
                        onChange={e => {
                            errors.status = '';
                            setData('status', e.target.value)
                        }
                        }
                    >
                        Active
                    </Radio>
                    <Radio
                        value="inactive"
                        name="status"
                        onChange={e =>
                            setData('status', e.target.value)
                        }
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
                    checked={data.super_admin}
                    onChange={
                        (e) => {
                            setData('super_admin', e.target.checked);
                        }}
                >

                </Checkbox>
            </Form.Item>
            <Form.Item >
                <div className="flex gap-10 mt-1">
                    <Button color="primary" className="ml-20" htmlType="submit" variant="outlined">
                        {
                            (props.formType === EForm.CREATE) ? "Create" : "Edit"
                        }
                    </Button>
                    <Button color="danger" variant="outlined"
                        onClick={() => {
                            router.get(route('dashboard.admins.index'));
                        }}>
                        Cancel
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}



