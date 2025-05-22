import { useContext, useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Image,
    Button,
    Form,
    Select,
    Radio,
    Upload,
    Spin,
    Flex,
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { CategoryType, EStatus } from "@/types/dashboard";
import axiosClient from '@/axios-client';
import AppLayout from '@/layouts/app-layout';
import { data, useNavigate, useParams } from 'react-router-dom';
import { categoriesContext } from '@/providers/categories-provider';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `Categories/`,
        href: '/Categories',
    },
];

export default function EditCategory(props: any) {
    const navigate = useNavigate();
    const params = useParams();

    const { categories, loaded, getCategories, dispatch, setFlashMessage } = useContext(categoriesContext);
    const [data, setData] = useState<CategoryType>(categories.find(category => category.id === Number(params.id))!);
    const [image, setImage] = useState(categories.find(category => category.id === Number(params.id))?.image);
    const [displayImage, setDisplayImage] = useState<boolean>(true);

    const [errors, setErrors] = useState({
        name: '',
        parent_id: '',
        image: '',
        status: '',
        description: '',
    });

    useEffect(() => {
        if (!loaded) {
            getCategories();
        }
        setImage(categories.find(category => category.id === Number(params.id))?.image);
        setData({
            ...categories.find(category => category.id === Number(params.id))!,
            image: '',
            _method: 'PUT',
        });
    }, [loaded]);



    const handleSubmit = () => {
        axiosClient.post(`/admin/dashboard/categories/${params.id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data', }
        }).then(response => {
            dispatch({ type: "UPDATE_CATEGORY", payload: response.data });
            setFlashMessage("Category Updated Successfully");
            navigate("/admin/dashboard/categories");
        }).catch((res => {
            console.log(res.response.data.errors);
        }))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Categories" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {data?.name ? (<Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Name"
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
                            value={data?.name}
                            onChange={(e) => {
                                setData({ ...data, name: e.currentTarget.value });
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
                                setData({ ...data, parent_id: value, parent: categories.find(cat => cat.id === Number(value))! })
                            }}>
                            <Select.Option value={''} >Main Category</Select.Option>
                            {
                                categories
                                    .filter(category => category.id !== data.id)
                                    .map(category =>
                                        <Select.Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Select.Option>
                                    )
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
                        }
                        validateStatus={'error'} >

                        <div className="flex flex-row items-center gap-10 ml-3">
                            {
                                (image && displayImage) && (
                                    <Image
                                        height={100}
                                        width={120}
                                        src={data.image_url}
                                    />
                                )
                            }
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
                                        {
                                            image ? "Update Logo" : "Upload Logo"
                                        }
                                    </Button>
                                </Upload>

                                {
                                    (image && displayImage) && (
                                        <Button
                                            color="red"
                                            variant="outlined"
                                            onClick={e => { setDisplayImage(false), setData({ ...data, removeImage: true }) }}
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
                        <Radio.Group defaultValue={data.status}>
                            <Radio
                                value="active"
                                name="status"
                                onChange={
                                    e => {
                                        setData({ ...data, status: e.target.value })
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
                                        setData({ ...data, status: e.target.value });
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
                                Update
                            </Button>
                            <Button color="danger" variant="outlined"
                                onClick={() => {
                                    navigate('/admin/dashboard/categories');
                                }}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>)
                    : <Spin fullscreen />
                }
            </div>
        </AppLayout >
    );
}
