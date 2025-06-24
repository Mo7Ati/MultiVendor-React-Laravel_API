import React, { useContext, useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Image,
    Button,
    Form,
    Upload,
    Tabs,
    Card,
    TabsProps,
    Checkbox,
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { CategoryType, EStatus } from "@/types/dashboard";
import axiosClient from '@/axios-client';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { useNavigate } from 'react-router-dom';
import { categoriesContext } from '@/providers/categories-provider';
import { Type } from 'lucide-react';

// اعمل ال errors يهامل

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/Categories',
    },
];


export default function CreateCategory() {
    const [displayImage, setDisplayImage] = useState<boolean>(true);
    const { categories, categoriesLoaded, getCategories, dispatch, setFlashMessage } = useContext(categoriesContext);

    const [errors, setErrors] = useState({
        name: '',
        parent_id: '',
        image: '',
        status: '',
        description: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!categoriesLoaded) {
            getCategories();
        }
    }, [])

    const [data, setData] = useState<CategoryType>(
        {
            name: { 'ar': '', 'en': '' },
            description: { 'ar': '', 'en': '' },
            image: '',
            is_active: true,
            media: null,
        });

    const handleSubmit = () => {
        axiosClient.post('/api/admin/dashboard/categories', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            dispatch({ type: "ADD_CATEGORY", payload: res.data });
            setFlashMessage("Category Added Successfully");
            navigate("/admin/dashboard/categories");
        }).catch((res => {
            console.log(res.response.data.errors);
        }))
    }

    const items: TabsProps['items'] =
        [{ code: 'en', label: 'EN' }, { code: 'ar', label: 'AR' }].map(locale =>
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
                    </>
                )
            }
        ));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={handleSubmit}
                >

                    <Card
                        title="Category  Information"
                    >
                        <Tabs defaultActiveKey="1" items={items} />
                    </Card>
                    <br />

                    <Card
                        title="Category Status"
                    >
                        <Form.Item
                            help={
                                errors.status && (
                                    <span className="ml-5 text-red-450 text-sm font-medium">
                                        {errors.status}
                                    </span>
                                )
                            }
                            validateStatus={errors.status ? 'error' : ''}
                        >
                            <Checkbox style={{ marginLeft: 170 }} onChange={(e) => setData({ ...data, is_active: e.target.checked })}>Active</Checkbox>
                        </Form.Item>

                        <Form.Item label="logo"
                            help={
                                errors.image && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {/* {errors.image.ss!} */}
                                    </span>
                                )
                            }
                            validateStatus={'error'} >

                            <div className="flex flex-row items-center gap-10 ml-3">
                                <div className="flex flex-col gap-3">
                                    <Upload
                                        beforeUpload={(value) => {
                                            setData({ ...data, image: value });
                                            setDisplayImage(false);
                                            return false;
                                        }}
                                        onRemove={() => { setDisplayImage(true) }}
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

                    </Card>
                    <Form.Item >
                        <div className="flex gap-10 mt-5">
                            <Button color="primary" className="ml-20" htmlType="submit" variant="outlined">
                                Create
                            </Button>
                            <Button color="danger" variant="outlined"
                                onClick={() => {
                                    navigate('/admin/dashboard/categories');
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
