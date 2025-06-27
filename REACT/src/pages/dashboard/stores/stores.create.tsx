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
import { data, useNavigate } from "react-router-dom";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { storesContext } from "@/providers/stores-provider";
import { useTranslation } from 'react-i18next';
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
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
    const { t } = useTranslation();

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
        logo: '',
        gallery: [],
        email: '',
        phone: '',
        password: '',
        is_active: true,
        rate: 1,
    });

    const handleSubmit = () => {
        axiosClient.post('/api/admin/dashboard/stores', data,).then(res => {
            dispatch({ type: "ADD_STORE", payload: res.data });
            setFlashMessage(t('stores.storeCreated'));
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
                        <Form.Item name={`name-${locale.code}`} label="Name" labelCol={{ span: 7 }}>
                            <Input
                                onChange={(e) => {
                                    setData({ ...data, name: { ...data.name, [locale.code]: e.currentTarget.value } });
                                }}
                            />
                        </Form.Item>

                        <Form.Item name={`description-${locale.code}`} label={'Description'} labelCol={{ span: 7 }}>
                            <TextArea
                                rows={4}
                                onChange={
                                    e => {
                                        setData({ ...data, description: { ...data.description, [locale.code]: e.currentTarget.value } })
                                    }
                                }
                            />
                        </Form.Item>

                        <Form.Item name={`Address-${locale.code}`} label={'address'} labelCol={{ span: 7 }}>
                            <Input
                                onChange={
                                    e => {
                                        setData({ ...data, address: { ...data.address, [locale.code]: e.currentTarget.value } })
                                    }
                                }
                            />
                        </Form.Item>

                        <Form.Item name={`keywords-${locale.code}`} label={'keywords'} labelCol={{ span: 7 }}>
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                onChange={(value) => {
                                    setData({ ...data, keywords: { ...data.keywords, [locale.code]: value } })
                                }}
                            />
                        </Form.Item>

                        <Form.Item name={`social_Media-${locale.code}`} label={t('stores.form.socialMedia')} labelCol={{ span: 7 }}  >
                            <Input
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
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    function getCookie(name: string) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


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
                            <Card title={t('stores.form.storeInformation')} type="inner">
                                <Tabs defaultActiveKey="1" items={items} />
                                <br />
                            </Card>
                        </Col>

                        <Col span={10} offset={1}>
                            <Card title={t('stores.form.storeCredentials')} type="inner">
                                <Form.Item name="email" label={t('stores.columns.email')} labelCol={{ span: 6 }}
                                    rules={[
                                        { required: true, message: t('stores.validation.emailRequired') },
                                        { type: 'email', message: t('stores.validation.emailInvalid') },
                                    ]}
                                >
                                    <Input
                                        onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={t('stores.form.phone')}
                                    labelCol={{ span: 6 }}
                                    name="phone"
                                    rules={[
                                        { required: true, message: t('stores.validation.phoneRequired') },
                                        { pattern: /^[0-9]{10,15}$/, message: t('stores.validation.phoneInvalid') },
                                    ]}
                                >
                                    <Input
                                        onChange={(e) => setData({ ...data, phone: e.currentTarget.value })}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={t('stores.form.password')}
                                    labelCol={{ span: 6 }}
                                    name="password"
                                    rules={[
                                        { required: true, message: t('stores.validation.passwordRequired') },
                                        { min: 6, message: t('stores.validation.passwordMinLength') },
                                    ]}
                                >
                                    <Input.Password
                                        onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                                    />
                                </Form.Item>
                            </Card>
                            <br />
                            {/* description and address */}
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Card title={t('stores.form.storeStatus')} type="inner">
                        <Form.Item label={t('stores.form.logo')}>
                            <FilePond
                                allowMultiple={false}
                                maxFiles={1}
                                name="upload"
                                server={{
                                    process: {
                                        url: 'http://localhost:8000/api/admin/dashboard/upload/stores',
                                        headers: {
                                            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
                                        },
                                        withCredentials: true,
                                        ondata: (formData) => {
                                            formData.append('collection', 'logos');
                                            return formData;
                                        },
                                        onload: (response) => {
                                            setData({
                                                ...data, logo: response
                                            })
                                            return response;
                                        },
                                    },
                                    revert: (uniqueFileId, load, error) => {
                                        const folderName = uniqueFileId;
                                        const collection = 'logos';

                                        axiosClient.delete('/api/admin/dashboard/upload/stores', {
                                            data: {
                                                folder_name: folderName,
                                                collection: collection,
                                            },
                                        })
                                            .then((res) => {
                                                if (res.status === 200) {
                                                    load();
                                                    setData({ ...data, logo: '' })
                                                }
                                                else error('Revert failed');
                                            })
                                            .catch(() => error('Network error'));
                                    },
                                }}
                            />
                        </Form.Item>
                        <Form.Item label={t('stores.form.gallery')}>
                            <FilePond
                                allowMultiple={true}
                                allowRevert={true}
                                name="upload"
                                server={{
                                    process: {
                                        url: 'http://localhost:8000/api/admin/dashboard/upload/stores',
                                        headers: {
                                            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
                                        },
                                        withCredentials: true,
                                        ondata: (formData) => {
                                            formData.append('collection', 'gallery');
                                            return formData;
                                        },
                                        onload: (response) => {
                                            setData((prev) => ({
                                                ...prev,
                                                gallery: [...prev.gallery, response]
                                            }));
                                            return response;
                                        },
                                    },
                                    revert: (uniqueFileId, load, error) => {
                                        const folderName = uniqueFileId;
                                        const collection = 'gallery';

                                        axiosClient.delete('/api/admin/dashboard/upload/stores', {
                                            data: {
                                                folder_name: folderName,
                                                collection: collection,
                                            },
                                        })
                                            .then((res) => {
                                                if (res.status === 200) {
                                                    setData((prev) => ({
                                                        ...prev,
                                                        gallery: prev.gallery.filter(folder_name => folder_name !== folderName)
                                                    }));
                                                    load();
                                                } else {
                                                    error('Revert failed');
                                                }
                                            })
                                            .catch(() => error('Network error'));
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Checkbox style={{ marginLeft: 170 }} onChange={(e) => setData({ ...data, is_active: e.target.checked })}>{t('stores.form.isActive')}</Checkbox>
                        </Form.Item>
                    </Card>
                    <Form.Item >
                        <div className="flex gap-10 mt-1">
                            <Button color="primary" className="ml-20" htmlType="submit" variant="outlined">
                                {t('stores.createStore')}
                            </Button>
                            <Button color="danger" variant="outlined"
                                onClick={() => {
                                    navigate('/admin/dashboard/stores');
                                }}>
                                {t('common.cancel')}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </AppLayout >
    );
}
