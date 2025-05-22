import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
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
import { CategoryType, ProductType, StoreType, TagType } from "@/types/dashboard";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];




export default function EditProduct(props: any) {
    for (let i = 0; i < props.tags.length; i++) {
        options.push({
            label: props.tags[i].name,
            value: props.tags[i].name,
        });
    }


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

                    <Form.Item label="Product Name"
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

                    <Form.Item label="Category"
                        help={
                            errors.category_id && (
                                <span className="ml-5  text-red-450  text-sm font-medium">
                                    {errors.category_id}
                                </span>
                            )
                        }
                        validateStatus={errors.category_id ? 'error' : ''}
                    >
                        <Select
                            value={data.category_id ?? ''}
                            onChange={(value) => {
                                errors.category_id = '';
                                setData('category_id', Number(value));
                            }}>
                            {
                                (props.categories).map(category => (
                                    <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="Store"
                        help={
                            errors.store_id && (
                                <span className="ml-5  text-red-450  text-sm font-medium">
                                    {errors.store_id}
                                </span>
                            )
                        }
                        validateStatus={errors.store_id ? 'error' : ''}
                    >
                        <Select
                            value={data.store_id ?? ''}
                            onChange={(value) => {
                                errors.store_id = '';
                                setData('store_id', Number(value));
                            }}>
                            {
                                (props.stores).map(store => (
                                    <Select.Option key={store.id} value={store.id}>{store.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <div className="flex flex-col justify-center">
                        <Form.Item label="Price"
                            help={
                                errors.price && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {errors.price}
                                    </span>
                                )
                            }
                            validateStatus={errors.price && 'error'}
                        >
                            <Input
                                value={data.price !== 0 ? data.price : ''}
                                onChange={
                                    (e) => {
                                        errors.price = '';
                                        const price = Number(e.currentTarget.value);
                                        if (!isNaN(price)) {
                                            setData('price', price);
                                        } else {
                                            if (data.price) {
                                                setData('price', data.price)
                                            } else {
                                                setData('price', 0)
                                            }

                                        }
                                    }
                                }
                            />

                        </Form.Item>

                        <Form.Item label="Compare Price"
                            help={
                                errors.compare_price && (
                                    <span className="ml-5  text-red-450 text-sm font-medium">
                                        {errors.compare_price}
                                    </span>
                                )
                            }
                            validateStatus={errors.compare_price && 'error'}
                        >
                            <Input
                                value={data.compare_price !== 0 ? data.compare_price : ''}
                                onChange={
                                    (e) => {
                                        errors.compare_price = '';
                                        const price = Number(e.currentTarget.value);
                                        if (!isNaN(price)) {
                                            setData('compare_price', price);
                                        } else {
                                            if (data.compare_price) {
                                                setData('compare_price', data.price)
                                            } else {
                                                setData('compare_price', 0)
                                            }

                                        }
                                    }
                                }
                            />

                        </Form.Item>
                    </div>

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
                            errors.image && (
                                <span className="ml-5  text-red-450 text-sm font-medium">
                                    {errors.image}
                                </span>
                            )
                        }>

                        <div className="flex flex-row items-center gap-10 ml-3">
                            {
                                (props.formType === EForm.EDIT && props.product.image && displayImage) && (
                                    <Image
                                        height={80}
                                        width={100}
                                        src={data.image_url}
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
                                            (props.formType === EForm.EDIT && props.product.image) ? "Update Logo" : "Upload Logo"
                                        }
                                    </Button>
                                </Upload>

                                {
                                    (props.formType === EForm.EDIT && props.product.image && displayImage) && (
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

                    <Form.Item label="Tags"
                        help={
                            errors.tags && (
                                <span className="ml-5  text-red-450 text-sm font-medium">
                                    {errors.tags}
                                </span>
                            )
                        }
                        validateStatus={errors.tags && 'error'}
                    >
                        <Select
                            mode="tags"
                            value={data.tags}
                            style={{ width: '100%' }}
                            placeholder="Enter Tags"
                            onChange={(value) => {
                                errors.tags = '';
                                setData('tags', value);
                            }}
                            options={options}
                        />
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
                        <Radio.Group defaultValue={props.product.status}>
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
                                    router.get(route('dashboard.products.index'));
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
