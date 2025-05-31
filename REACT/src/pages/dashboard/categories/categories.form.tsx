import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Image,
    Button,
    Form,
    Select,
    Radio,
    Upload,
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { CategoryType } from "@/types/dashboard";
import axiosClient from '@/axios-client';

enum EForm {
    CREATE = 'create',
    EDIT = 'edit',
}

// interface Iprops {
//     category: CategoryType;
//     parents: CategoryType[];
//     errors: object,
//     formType: string;
// }

export default function CategoryForm({ formType }: { formType: string }) {
    const [displayImage, setDisplayImage] = useState<boolean>(true);
    const [
        data,
        setData,
    ] = useState<CategoryType>();

    const handleSubmit = () => {

        if (formType === 'create') {
            axiosClient.post('/admin/dashboard/categories', data);
        } else if (formType === 'edit') {
            axiosClient.put(`/admin/dashboard/categories/${data.id}/edit`, data);
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
                        setData('name', e.currentTarget.value);
                        errors.name = ''
                    }}
                />

            </Form.Item>
            <Form.Item label="Category"
                help={
                    errors.parent_id && (
                        <span className="ml-5  text-red-450  text-sm font-medium">
                            {errors.parent_id}
                        </span>
                    )
                }
                validateStatus={errors.parent_id ? 'error' : ''}
            >
                <Select
                    value={data.parent_id ?? ''}
                    onChange={(value) => {
                        setData('parent_id', value);
                        errors.parent_id = ''
                    }}>
                    <Select.Option value={''} >Main Category</Select.Option>
                    {
                        (props.parents).map(parent => (
                            <Select.Option key={parent.id} value={parent.id}>{parent.name}</Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item label="Description"
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
                    value={data.description}
                    onChange={
                        e => {
                            setData('description', e.currentTarget.value)
                            errors.description = '';
                        }
                    }
                />
            </Form.Item>


            <Form.Item label="logo"
                help={
                    errors.image && (
                        <span className="ml-5  text-red-450 text-sm font-medium">
                            {errors.image}
                        </span>
                    )
                }
                validateStatus={'error'} >

                <div className="flex flex-row items-center gap-10 ml-3">
                    {
                        (props.formType === EForm.EDIT && props.category.image && displayImage) && (
                            <Image
                                height={100}
                                width={120}
                                src={props.category.image_url}
                            />
                        )
                    }
                    <div className="flex flex-col gap-3">
                        <Upload
                            beforeUpload={(value) => {
                                setData('image', value);
                                setDisplayImage(false);
                                return false;
                            }}
                            onRemove={() => { setDisplayImage(true) }}
                            listType="text"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>
                                {
                                    (props.formType === EForm.EDIT && props.category.image) ? "Update Logo" : "Upload Logo"
                                }
                            </Button>
                        </Upload>

                        {
                            (props.formType === EForm.EDIT && props.category.image && displayImage) && (
                                <Button
                                    color="red"
                                    variant="outlined"
                                    onClick={e => { setDisplayImage(false), setData('removeImage', true) }}
                                >
                                    Remove Image
                                </Button>
                            )
                        }
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
                validateStatus={errors.status ? 'error' : ''}
            >
                <Radio.Group defaultValue={props.category.status}>
                    <Radio
                        value="active"
                        name="status"
                        onChange={
                            e => {
                                setData('status', e.target.value)
                                errors.status = '';
                            }
                        }
                    >
                        Active
                    </Radio>
                    <Radio
                        value="archived"
                        name="status"
                        onChange={
                            e => {
                                setData('status', e.target.value);
                                errors.status = ''
                            }
                        }
                    >
                        Archived
                    </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item >
                <div className="flex gap-10 mt-5">
                    <Button color="primary" className="ml-20" htmlType="submit" variant="outlined">
                        {
                            (props.formType === EForm.CREATE) ? "Create" : "Edit"
                        }
                    </Button>
                    <Button color="danger" variant="outlined"
                        onClick={() => {
                            router.get(route('dashboard.categories.index'));
                        }}>
                        Cancel
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}



