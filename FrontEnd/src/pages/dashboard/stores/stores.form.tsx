import { router, useForm } from "@inertiajs/react";
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
    SelectProps,

} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { CategoryType, StoreType, TagType } from "@/types/dashboard";

enum EForm {
    CREATE = 'create',
    EDIT = 'edit',
}

interface Iprops {
    store: StoreType;
    categories: CategoryType[];
    stores: StoreType[];
    tags: TagType[];
    errors: object,
    formType: string;
}

export default function StoreForm(props: Iprops) {
    const [displayImage, setDisplayImage] = useState<boolean>(true);
    const {
        data,
        setData,
        errors,
        post,
    } = useForm<StoreType>(props.store);

    useEffect(() => {
        if (props.formType === EForm.EDIT) {
            setData({ ...data, logo_image: null, _method: 'PUT', removeImage: false });
        } else {
            setData('_method', 'POST');
        }
    }, []);

    const handleSubmit = () => {
        if (props.formType === 'create') {
            post(route('dashboard.stores.store'));
        } else if (props.formType === 'edit') {
            post(route('dashboard.stores.update', props.store.id), {
                forceFormData: true,
            });
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
                        errors.name = '';
                        setData('name', e.currentTarget.value)
                    }}
                />

            </Form.Item>


            <Form.Item
                label="Description"
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
                        errors.description = '';
                        setData('description', e.currentTarget.value)
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
                    {
                        (props.formType === EForm.EDIT && props.store.logo_image && displayImage) && (
                            <Image
                                height={80}
                                width={100}
                                src={data.logo_url}
                            />
                        )
                    }
                    <div className="flex flex-col gap-3">
                        <Upload
                            beforeUpload={(value) => {
                                setData('logo_image', value);
                                setDisplayImage(false);
                                return false;
                            }}
                            onRemove={() => { setDisplayImage(true) }}
                            listType="text"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>
                                {
                                    (props.formType === EForm.EDIT && props.store.logo_image) ? "Update Logo" : "Upload Logo"
                                }
                            </Button>
                        </Upload>

                        {
                            (props.formType === EForm.EDIT && props.store.logo_image && displayImage) && (
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
                <Radio.Group defaultValue={props.store.status}>
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
                        value="archived"
                        name="status"
                        onChange={e =>
                            setData('status', e.target.value)
                        }
                    >
                        Archived
                    </Radio>
                </Radio.Group>
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
                            router.get(route('dashboard.stores.index'));
                        }}>
                        Cancel
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}



