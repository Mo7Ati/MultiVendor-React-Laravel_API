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
import { CategoryType, EStatus, ProductType, StoreType, TagType } from "@/types/dashboard";
import { productsContext } from "@/providers/products-provider";
import axiosClient from "@/axios-client";
import { useNavigate } from "react-router-dom";
import { categoriesContext } from "@/providers/categories-provider";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { tagsContext } from "@/providers/tags-provider";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];


export default function CreateProduct() {
    const [displayImage, setDisplayImage] = useState<boolean>(true)

    const { dispatch, setFlashMessage } = useContext(productsContext);
    const { categories, categoriesLoaded, getCategories } = useContext(categoriesContext);
    const { tags, tagsLoaded, getTags, dispatch: tagsDispatch } = useContext(tagsContext);

    const [errors, setErrors] = useState({
        name: '',
        category_id: '',
        category: null,
        store_id: '',
        store: null,
        price: '',
        compare_price: '',
        quantity: '',
        tags: [],
        description: '',
        image: "",
        image_url: '',
        status: EStatus,
        removeImage: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!categoriesLoaded) {
            getCategories();
        }
        if (!tagsLoaded) {
            getTags();
        }
    }, []);


    const [data, setData] = useState<ProductType>({
        name: '',
        store_id: 3,
        price: 0,
        compare_price: 0,
        quantity: 0,
        tags: [],
        description: '',
        image: '',
        status: EStatus.ARCHIVED,
        removeImage: false,
    });

    console.log(data);
    const handleSubmit = () => {
        axiosClient.post('/api/admin/dashboard/products', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            dispatch({ type: "ADD_PRODUCT", payload: res.data });
            tagsDispatch({ type: 'UPDATE_TAGS', payload: data.tags });
            setFlashMessage("Product Added Successfully");
            navigate("/admin/dashboard/products");
        }).catch((res => {
            console.log(res.response.data.errors);
        }))
    }
    console.log(data);

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
                                setData({ ...data, name: e.currentTarget.value })
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
                                setData({ ...data, category_id: value });
                            }}
                        >
                            <Select.Option value={''}>No Category</Select.Option>
                            {
                                (categories).map((category: CategoryType) => (
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
                            value={3}
                            onChange={(value) => {
                                setData({ ...data, store_id: Number(value) });
                            }}>
                            {/* {
                                (props.stores).map((store: StoreType) => (
                                    <Select.Option key={store.id} value={store.id}>{store.name}</Select.Option>
                                ))
                            } */}
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
                        // validateStatus={errors.price && 'error'}
                        >
                            <Input
                                value={data.price !== 0 ? data.price : ''}
                                onChange={
                                    (e) => {
                                        const price = Number(e.currentTarget.value);
                                        if (!isNaN(price)) {
                                            setData({ ...data, price: price });
                                        } else {
                                            if (data.price) {
                                                setData({ ...data, price: data.price })
                                            } else {
                                                setData({ ...data, price: 0 })
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
                        // validateStatus={errors.compare_price && 'error'}
                        >
                            <Input
                                value={data.compare_price !== 0 ? data.compare_price : ''}
                                onChange={
                                    (e) => {
                                        const price = Number(e.currentTarget.value);
                                        if (!isNaN(price)) {
                                            setData({ ...data, compare_price: price });
                                        } else {
                                            if (data.compare_price) {
                                                setData({ ...data, compare_price: data.compare_price })
                                            } else {
                                                setData({ ...data, compare_price: 0 })
                                            }

                                        }
                                    }
                                }
                            />

                        </Form.Item>
                    </div>

                    <Form.Item label="quantity"
                        help={
                            errors.quantity && (
                                <span className="ml-5  text-red-450 text-sm font-medium">
                                    {errors.quantity}
                                </span>
                            )
                        }
                    // validateStatus={errors.price && 'error'}
                    >
                        <Input
                            value={data.quantity !== 0 ? data.quantity : ''}
                            onChange={
                                (e) => {
                                    const quantity = Number(e.currentTarget.value);
                                    if (!isNaN(quantity)) {
                                        setData({ ...data, quantity: quantity });
                                    } else {
                                        if (data.quantity) {
                                            setData({ ...data, quantity: data.quantity })
                                        } else {
                                            setData({ ...data, quantity: 0 })
                                        }
                                    }
                                }
                            }
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
                                errors.description = '';
                                setData({ ...data, description: e.currentTarget.value })
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
                            <div className="flex flex-col gap-3">
                                <Upload
                                    beforeUpload={(value) => {
                                        setData({ ...data, image: value });
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

                    <Form.Item label="Tags"
                        help={
                            errors.tags && (
                                <span className="ml-5  text-red-450 text-sm font-medium">
                                    {errors.tags}
                                </span>
                            )
                        }
                    // validateStatus={errors.tags && 'error
                    >
                        <Select
                            mode="tags"
                            value={data.tags}
                            style={{ width: '100%' }}
                            placeholder="Enter Tags"
                            onChange={(value) => {
                                setData({ ...data, tags: value })
                            }}
                            options={tags}
                        />
                    </Form.Item>


                    <Form.Item label="Status"
                        help={
                            errors.status && (
                                <span className="ml-5 text-red-450 text-sm font-medium">
                                    {/* {errors.status} */}
                                </span>
                            )
                        }
                        validateStatus={errors.status ? 'error' : ''}
                    >
                        <Radio.Group defaultValue={'active'}>
                            <Radio
                                value="active"
                                name="status"
                                onChange={e => {
                                    setData({ ...data, status: e.target.value })
                                }
                                }
                            >
                                Active
                            </Radio>
                            <Radio
                                value="archived"
                                name="status"
                                onChange={e => {
                                    setData({ ...data, status: e.target.value })
                                }
                                }
                            >
                                Archived
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
                                    navigate('/admin/dashboard/products');

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
