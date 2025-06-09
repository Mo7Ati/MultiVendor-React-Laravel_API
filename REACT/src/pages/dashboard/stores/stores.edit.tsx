import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import React, { use, useContext, useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Image,
    Button,
    Form,
    Radio,
    Upload,
    Spin,

} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { EStatus, StoreType } from "@/types/dashboard";
import axiosClient from "@/axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { storesContext } from "@/providers/stores-provider";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stores',
        href: '/stores',
    },
];

export default function EditStore(props: any) {
    const [displayImage, setDisplayImage] = useState<boolean>(true)
    const { stores, loaded, getStores, setFlashMessage, dispatch } = useContext(storesContext);
    const params = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        logo_image: '',
        status: '',
    });

    const [store, setStore] = useState<StoreType>(stores.find(store => store.id === Number(params.id))!);
    const [image, setImage] = useState(stores.find(store => store.id === Number(params.id))?.logo_image!);


    useEffect(() => {
        if (!loaded) {
            getStores();
        }
    }, []);

    useEffect(() => {
        setImage(stores.find(store => store.id === Number(params.id))?.logo_image!)
        setStore({
            ...stores.find(store => store.id === Number(params.id))!,
            logo_image: '',
            _method: 'PUT',
        });
    }, [loaded])




    const handleSubmit = () => {
        axiosClient.post(`/api/admin/dashboard/stores/${params.id}`, store, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            dispatch({ type: 'UPDATE_STORE', payload: res.data });
            setFlashMessage("Store Updated Successfully");
            navigate("/admin/dashboard/stores");
        }).catch((res => {
            setErrors(res.response.data.errors);
        }))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Categories" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {loaded ? <Form
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
                            value={store.name}
                            onChange={(e) => {
                                errors.name = '';
                                setStore({ ...store, name: e.currentTarget.value })
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
                            value={store.description}
                            onChange={e => {
                                errors.description = '';
                                setStore({ ...store, description: e.currentTarget.value })
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
                                (image && displayImage) && (
                                    <Image
                                        height={80}
                                        width={100}
                                        src={store.logo_url}
                                    />
                                )
                            }
                            <div className="flex flex-col gap-3">
                                <Upload
                                    beforeUpload={(value) => {
                                        setStore({ ...store, logo_image: value });
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
                                            onClick={e => { setDisplayImage(false), setStore({ ...store, removeImage: true }) }}
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
                                    setStore({ ...store, status: e.target.value })
                                }
                                }
                            >
                                Active
                            </Radio>
                            <Radio
                                value="inactive"
                                name="status"
                                onChange={e => {
                                    setStore({ ...store, status: e.target.value })
                                }
                                }
                            >
                                Inactive
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
                                    navigate('/admin/dashboard/stores');
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
