import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import React, { useContext, useEffect, useState } from 'react';
import {
    Input,
    Button,
    Form,
    Select,
    Radio,
    SelectProps,
    Upload,

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
        href: '/stores',
    },
];


export default function CreateStore() {
    const [displayImage, setDisplayImage] = useState<boolean>(true)

    const { dispatch, setFlashMessage } = useContext(storesContext);

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        logo_image: '',
        status: '',
    });

    const navigate = useNavigate();


    const [data, setData] = useState<StoreType>({
        name: '',
        logo_image: '',
        logo_url: '',
        description: '',
        status: EStatus.ACTIVE,
    });

    const handleSubmit = () => {
        axiosClient.post('/admin/dashboard/stores', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Categories" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    onFinish={handleSubmit}
                >

                    <Form.Item label="Store Name"
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
                                clearError('name');
                                setData({ ...data, name: e.currentTarget.value })
                            }}
                        />
                    </Form.Item>


                    <Form.Item label="Description"
                        help={
                            errors.description && (
                                <span className="ml-5 text-red-450 text-sm font-medium">
                                    {errors.description}
                                </span>
                            )
                        }
                        validateStatus={errors.description ? 'error' : ''} >
                        <TextArea
                            rows={3}
                            value={data.description}
                            onChange={e => {
                                clearError('description');
                                setData({ ...data, description: e.currentTarget.value })
                            }
                            }
                        />
                    </Form.Item>

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
                                        setData({ ...data, logo_image: value });
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

                    <Form.Item label="Status"
                        help={
                            errors.status && (
                                <span className="ml-5 text-red-450 text-sm font-medium">
                                    {errors.status}
                                </span>
                            )
                        }
                        validateStatus={errors.status && 'error'}
                    >
                        <Radio.Group defaultValue={'active'}>
                            <Radio
                                value="active"
                                name="status"
                                onChange={e => {
                                    clearError('status');
                                    setData({ ...data, status: e.target.value })
                                }
                                }
                            >
                                Active
                            </Radio>
                            <Radio
                                value="inactive"
                                name="status"
                                onChange={e => {
                                    clearError('status');
                                    setData({ ...data, status: e.target.value })
                                }}
                            >
                                Inactive
                            </Radio>
                        </Radio.Group>
                    </Form.Item>


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
