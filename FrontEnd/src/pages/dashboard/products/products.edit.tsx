import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import React, { use, useContext, useEffect, useState } from 'react';
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
    Spin,

} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { CategoryType, EStatus, ProductType, StoreType, TagType } from "@/types/dashboard";
import axiosClient from "@/axios-client";
import { productsContext } from "@/providers/products-provider";
import { categoriesContext } from "@/providers/categories-provider";
import { tagsContext } from "@/providers/tags-provider";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];



export default function EditProduct(props: any) {



    const [displayImage, setDisplayImage] = useState<boolean>(true)

    const { products, loaded: productsLoaded, getProducts, dispatch, setFlashMessage } = useContext(productsContext);
    const { categories, categoriesLoaded, getCategories } = useContext(categoriesContext);
    const { tags, tagsLoaded, getTags, dispatch: tagsDispatch } = useContext(tagsContext);

    const [errors, setErrors] = useState({
        name: '',
        category_id: '',
        store_id: '',
        price: '',
        compare_price: '',
        quantity: '',
        tags: '',
        description: '',
        image: '',
        status: EStatus,
    });

    const navigate = useNavigate();
    const params = useParams();

    const [product, setProduct] = useState<ProductType>(products.find(product => product.id === Number(params.id))!);
    const [image, setImage] = useState(products.find(product => product.id === Number(params.id))?.image!);


    useEffect(() => {
        if (!productsLoaded) {
            getProducts();
        }
        if (!categoriesLoaded) {
            getCategories();
        }
        if (!tagsLoaded) {
            getTags();
        }
    }, []);

    useEffect(() => {
        setImage(products.find(product => product.id === Number(params.id))?.image!)
        setProduct({
            ...products.find(product => product.id === Number(params.id))!,
            image: '',
            _method: 'PUT',
        });
    }, [productsLoaded])




    const handleSubmit = () => {
        axiosClient.post(`/admin/dashboard/products/${params.id}`, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
            setFlashMessage("Product Updated Successfully");
            navigate("/admin/dashboard/products");
        }).catch((res => {
            console.log(res.response.data.errors);
        }))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Categories" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {product?.name ? <Form
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
                            value={product.name}
                            onChange={(e) => {
                                errors.name = '';
                                setProduct({ ...product, name: e.currentTarget.value })
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
                            value={product.category_id ?? ''}
                            onChange={(value) => {
                                setProduct({ ...product, category_id: value, category: categories.find(category => category.id === value)! });
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
                                setProduct({ ...product, store_id: Number(value) });
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
                                value={product.price !== 0 ? product.price : ''}
                                onChange={
                                    (e) => {
                                        const price = Number(e.currentTarget.value);
                                        if (!isNaN(price)) {
                                            setProduct({ ...product, price: price });
                                        } else {
                                            if (product.price) {
                                                setProduct({ ...product, price: product.price })
                                            } else {
                                                setProduct({ ...product, price: 0 })
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
                                value={product.compare_price !== 0 ? product.compare_price : ''}
                                onChange={
                                    (e) => {
                                        const price = Number(e.currentTarget.value);
                                        if (!isNaN(price)) {
                                            setProduct({ ...product, compare_price: price });
                                        } else {
                                            if (product.compare_price) {
                                                setProduct({ ...product, compare_price: product.compare_price })
                                            } else {
                                                setProduct({ ...product, compare_price: 0 })
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
                            value={product.quantity !== 0 ? product.quantity : ''}
                            onChange={
                                (e) => {
                                    const quantity = Number(e.currentTarget.value);
                                    if (!isNaN(quantity)) {
                                        setProduct({ ...product, quantity: quantity });
                                    } else {
                                        if (product.quantity) {
                                            setProduct({ ...product, quantity: product.quantity })
                                        } else {
                                            setProduct({ ...product, quantity: 0 })
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
                            value={product.description}
                            onChange={e => {
                                errors.description = '';
                                setProduct({ ...product, description: e.currentTarget.value })
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
                                (image && displayImage) && (
                                    <Image
                                        height={80}
                                        width={100}
                                        src={product.image_url}
                                    />
                                )
                            }
                            <div className="flex flex-col gap-3">
                                <Upload
                                    beforeUpload={(value) => {
                                        setProduct({ ...product, image: value });
                                        setDisplayImage(false);
                                        return false;
                                    }}
                                    onRemove={() => { setDisplayImage(true) }}
                                    listType="text"
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        {
                                            displayImage ? "Update Logo" : "Upload Logo"
                                        }
                                    </Button>
                                </Upload>

                                {
                                    (image && displayImage) && (
                                        <Button
                                            color="red"
                                            variant="outlined"
                                            onClick={e => { setDisplayImage(false), setProduct({ ...product, removeImage: true }) }}
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
                    // validateStatus={errors.tags && 'error'}
                    >
                        <Select
                            mode="tags"
                            value={product.tags}
                            style={{ width: '100%' }}
                            placeholder="Enter Tags"
                            onChange={(value) => {
                                setProduct({ ...product, tags: value });
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
                                    setProduct({ ...product, status: e.target.value })
                                }
                                }
                            >
                                Active
                            </Radio>
                            <Radio
                                value="archived"
                                name="status"
                                onChange={e => {
                                    setProduct({ ...product, status: e.target.value })
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
                                Edit
                            </Button>
                            <Button color="danger" variant="outlined"
                                onClick={() => {
                                    navigate('/admin/dashboard/products');
                                }}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form> : <Spin />}
            </div>
        </AppLayout >
    );
}
