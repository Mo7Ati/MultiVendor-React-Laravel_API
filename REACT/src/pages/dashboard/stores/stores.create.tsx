import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import React, { useContext, useEffect, useState } from 'react';
import {
    Input,
    Button,
    Form,
    Radio,
    Upload,
    TabsProps,
    Card,
    Tabs,
    Checkbox,
    Tag,
    Select,
    Flex,
    Row,
    Col,

} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { EStatus, StoreType } from "@/types/dashboard";
import axiosClient from "@/axios-client";
import { useNavigate } from "react-router-dom";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { storesContext } from "@/providers/stores-provider";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stores',
        href: '/admin/dashboard/stores',
    },
    {
        title: 'Create Store',
        href: '/admin/dashboard/stores/create',
    }
];


export default function CreateStore() {
    const { dispatch, setFlashMessage } = useContext(storesContext);

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        logo_image: '',
        status: '',
    });

    const navigate = useNavigate();


    const [data, setData] = useState<StoreType>({
        name: {
            en: '',
            ar: '',
        },
        address: {
            en: '',
            ar: '',
        },
        description: {
            en: '',
            ar: '',
        },
        keywords: {
            en: '',
            ar: '',
        },

        social_media: { platform: '', url: '' },

        email: '',
        phone: '',
        password: '',

        is_active: true,
        rate: 1,
    });
    console.log(data);

    const handleSubmit = () => {
        axiosClient.post('/api/admin/dashboard/stores', data, {
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
        }).then(res => {
            dispatch({ type: "ADD_STORE", payload: res.data });
            setFlashMessage("Store Added Successfully");
            navigate("/admin/dashboard/stores");
        }).catch((res => {
            setErrors(res.response.data.errors);
        }))
    }
    const clearError = (field: string) => {
        setErrors(prev => {
            return { ...errors, [field]: '' };
        });
    };
    const items: TabsProps['items'] =
        [{ code: 'en', label: 'English' }, { code: 'ar', label: 'عربي' }].map(locale =>
        (
            {
                key: locale.code,
                label: locale.label,
                children: (
                    <>
                        <Form.Item
                            name={`name-${locale.code}`}
                            label="Name"
                            help={
                                errors.name && (
                                    <span className="ml-5 text-red-450 text-sm font-medium">
                                        {errors.name}
                                    </span>
                                )
                            }
                            validateStatus={errors.name && 'error'}
                        >
                            <Input
                                // value={data?.name}
                                onChange={(e) => {
                                    setData({ ...data, name: { ...data.name, [locale.code]: e.currentTarget.value } });
                                }}
                            />

                        </Form.Item>

                        <Form.Item
                            name={`description-${locale.code}`}
                            label={'description'}
                            help={
                                errors.description && (
                                    <span className="ml-5 text-red-450 text-sm font-medium">
                                        {errors.description}
                                    </span>
                                )
                            }
                            validateStatus={errors.description ? 'error' : ''}>
                            <TextArea
                                rows={4}
                                // value={data.description}
                                onChange={
                                    e => {
                                        setData({ ...data, description: { ...data.description, [locale.code]: e.currentTarget.value } })
                                    }
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name={`address-${locale.code}`}
                            label={'address'}
                            help={
                                errors.description && (
                                    <span className="ml-5 text-red-450 text-sm font-medium">
                                        {errors.description}
                                    </span>
                                )
                            }
                            validateStatus={errors.description ? 'error' : ''}>
                            <Input
                                // value={data.description}
                                onChange={
                                    e => {
                                        setData({ ...data, address: { ...data.address, [locale.code]: e.currentTarget.value } })
                                    }
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name={`keywords-${locale.code}`}
                            label={'keywords'}
                            // help={
                            //     errors.keywords && (
                            //         <span className="ml-5 text-red-450 text-sm font-medium">
                            //             {errors.keywords}
                            //         </span>
                            //     )
                            // }
                            validateStatus={errors.description ? 'error' : ''}>
                            <Select
                                mode="tags"
                                // value={data.tags}
                                style={{ width: '100%' }}
                                placeholder="Enter Tags"
                                onChange={(value) => {
                                    setData({ ...data, keywords: { ...data.keywords, [locale.code]: value } })
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name={`social_Media-${locale.code}`}
                            label={'Social Media'}
                            // help={
                            //     errors.keywords && (
                            //         <span className="ml-5 text-red-450 text-sm font-medium">
                            //             {errors.keywords}
                            //         </span>
                            //     )
                            // }
                            validateStatus={errors.description ? 'error' : ''}>
                            <Input
                                // value={data.description}
                                onChange={
                                    e => {
                                        setData({ ...data, social_media: { ...data.social_media, [locale.code]: e.currentTarget.value } })
                                    }
                                }
                            />
                        </Form.Item>
                    </>
                )
            }
        ));

    console.log(data);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Categories" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: '100%' }}
                    onFinish={handleSubmit}
                >
                    <Row>
                        <Col span={12}>
                            <Card title="Store  Information" type="inner">
                                <Tabs defaultActiveKey="1" items={items} />
                                <br />
                            </Card>
                        </Col>

                        <Col span={10} offset={1}>
                            <Card title="Store Credentials" type="inner">
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email address' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter email"
                                        onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Phone"
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Please enter your phone number' },
                                        { pattern: /^[0-9]{10,15}$/, message: 'Enter a valid phone number' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter phone number"
                                        onChange={(e) => setData({ ...data, phone: e.currentTarget.value })}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please enter your password' },
                                        { min: 6, message: 'Password must be at least 6 characters' },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Enter password"
                                        onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                                    />
                                </Form.Item>
                            </Card>
                            <br />
                            <Card title="Store Status" type="inner">
                                <Form.Item label="logo"
                                    help={
                                        errors.logo_image && (
                                            <span className="ml-5  text-red-450 text-sm font-medium">
                                                {errors.logo_image}
                                            </span>
                                        )
                                    }>


                                    <div className="flex flex-row items-center gap-10 ml-3">
                                        <div className="flex flex-col gap-3">
                                            <Upload
                                                beforeUpload={(value) => {
                                                    // setData({ ...data, logo_image: value });

                                                    return false;
                                                }}
                                                listType="text"
                                                maxCount={1}
                                            >
                                                <Button icon={<UploadOutlined />}>
                                                    Upload Logo
                                                </Button>
                                            </Upload>
                                        </div>
                                    </div>
                                </Form.Item>
                                <Form.Item label="gallery"
                                    help={
                                        errors.logo_image && (
                                            <span className="ml-5  text-red-450 text-sm font-medium">
                                                {errors.logo_image}
                                            </span>
                                        )
                                    }>


                                    <div className="flex flex-row items-center gap-10 ml-3">
                                        <div className="flex flex-col gap-3">
                                            <Upload
                                                beforeUpload={(value) => {
                                                    // setData({ ...data, logo_image: value });

                                                    return false;
                                                }}
                                                listType="text"
                                                maxCount={1}
                                            >
                                                <Button icon={<UploadOutlined />}>
                                                    Upload Logo
                                                </Button>
                                            </Upload>
                                        </div>
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    help={
                                        errors.status && (
                                            <span className="ml-5 text-red-450 text-sm font-medium">
                                                {errors.status}
                                            </span>
                                        )
                                    }
                                    validateStatus={errors.status && 'error'}
                                >
                                    <Checkbox style={{ marginLeft: 170 }} onChange={(e) => setData({ ...data, is_active: e.target.checked })}>Active</Checkbox>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Form.Item >
                        <div className="flex gap-10 mt-1">
                            <Button color="primary" className="ml-20" htmlType="submit" variant="outlined">
                                Create
                            </Button>
                            <Button color="danger" variant="outlined"
                                onClick={() => {
                                    navigate('/admin/dashboard/stores');
                                }}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </AppLayout >
    );
}
