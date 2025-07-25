import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
    Input,
    Button,
    Form,
    TabsProps,
    Card,
    Tabs,
    Checkbox,
    Select,
    Row,
    Col,
    message,
    Spin,
} from 'antd';
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { MediaType, StoreCategoryIndexType, StoreType } from "@/types/dashboard";
import axiosClient from "@/axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { storesContext } from "@/providers/stores-provider";
import { useTranslation } from 'react-i18next';
import { Loader } from "@/components/loader";


import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import Pond from "@/components/file-pond";
import SocialMediaInput from "@/components/ui/SocialMediaInput";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


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
        title: 'Edit Store',
        href: '/admin/dashboard/stores/edit',
    }
];


type EditStorePageType = StoreType & {
    logo: MediaType;
    gallery: MediaType[];
};

export default function EditStore() {
    const { t } = useTranslation();
    const params = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState<{ logo: string, gallery: string[] }>({ logo: '', gallery: [] })
    const [form] = Form.useForm();
    const [backendErrors, setBackendErrors] = useState<string[]>([]);


    const InitialValues: EditStorePageType = {
        name: { ar: '', en: '' },
        description: { ar: '', en: '' },
        address: { ar: '', en: '' },
        keywords: { ar: '', en: '' },
        email: '',
        phone: '',
        password: '',
        delivery_time: 0,
        is_active: true,
        social_media: [{ platform: '', url: '' }],
        rate: 0,
        logo: {},
        category_id: null,
        gallery: [{}],
    }
    const [store, setStore] = useState<EditStorePageType>(InitialValues);
    const logo = useMemo(() => store?.logo ? [store.logo] : undefined, [store?.logo])
    const [storeCategories, setStoreCategories] = useState<StoreCategoryIndexType[]>([])


    const handleLogoChange = useCallback((payload: string, type: 'add' | 'revert') => {
        if (type === 'add') {
            setMedia(prev => ({ ...prev, logo: payload }))
        } else if (type === 'revert') {
            setMedia(prev => ({ ...prev, logo: '' }))
        }
    }, []);

    const handleGalleryChange = useCallback((payload: string, type: 'add' | 'revert') => {
        if (type === 'add') {
            setMedia(prev => ({ ...prev, gallery: [...prev.gallery, payload] }))
        } else if (type === 'revert') {
            setMedia(prev => ({ ...prev, gallery: [...prev.gallery].filter(file => file !== payload) }))
        }
    }, []);

    useEffect(() => {
        fetchStore();
        getStoreCategories();
    }, []);

    const fetchStore = async () => {
        try {
            const response = await axiosClient.get(`api/admin/dashboard/stores/${Number(params.id)}`)
            setStore(response.data)
            setLoaded(true)
        } catch (e) {

        }
    }
    const getStoreCategories = () => {
        axiosClient.get("/api/admin/dashboard/store-categories")
            .then((response) => {
                setStoreCategories(response.data.data);
            }).catch(error => {
                alert(error);
            })
    }
    const handleSubmit = () => {
        setLoading(true);
        setBackendErrors([]);
        const updateData = {
            ...store,
            logo: null,
            gallery: null,
            media,
        };
        axiosClient.put(`/api/admin/dashboard/stores/${params.id}`, updateData)
            .then(res => {
                messageApi.open({
                    type: 'success',
                    content: t('stores.storeUpdated'),
                });
                navigate("/admin/dashboard/stores");
            }).catch((error) => {
                if (error.response?.data?.errors) {
                    const errorsArray = Object.values(error.response.data.errors).flat();
                    setBackendErrors(errorsArray as string[]);
                } else {
                    setBackendErrors([t('common.error')]);
                }
                messageApi.open({
                    type: 'error',
                    content: t('common.validationError'),
                });
            }).finally(() => {
                setLoading(false);
            });
    };

    const items: TabsProps['items'] =
        [{ code: 'en', label: 'English' }, { code: 'ar', label: 'عربي' }].map(locale =>
        (
            {
                key: locale.code,
                label: locale.label,
                children: (
                    store && <>
                        <Form.Item
                            name={['name', locale.code]}
                            label="Name"
                            labelCol={{ span: 7 }}
                            rules={[
                                { required: true, message: t('stores.validation.nameRequired') },
                                { max: 255, message: t('stores.validation.nameMaxLength') }
                            ]}
                        >
                            <Input
                                value={store.name?.[locale.code as keyof typeof store.name] || ''}
                                onChange={(e) => {
                                    setStore({ ...store, name: { ...store.name, [locale.code]: e.currentTarget.value } });
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name={['description', locale.code]}
                            label={'Description'}
                            labelCol={{ span: 7 }}
                        >
                            <TextArea
                                rows={4}
                                value={store.description?.[locale.code as keyof typeof store.description] || ''}
                                onChange={e => {
                                    setStore({ ...store, description: { ...store.description, [locale.code]: e.currentTarget.value } })
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name={['address', locale.code]}
                            label={'Address'}
                            labelCol={{ span: 7 }}
                            rules={[
                                { required: true, message: t('stores.validation.addressRequired') },
                                { max: 255, message: t('stores.validation.addressMaxLength') }
                            ]}
                        >
                            <Input
                                value={store.address?.[locale.code as keyof typeof store.address] || ''}
                                onChange={e => {
                                    setStore({ ...store, address: { ...store.address, [locale.code]: e.currentTarget.value } })
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name={['keywords', locale.code]}
                            label={'Keywords'}
                            labelCol={{ span: 7 }}
                        >
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                value={store.keywords?.[locale.code as keyof typeof store.keywords] || []}
                                onChange={(value) => {
                                    setStore({ ...store, keywords: { ...store.keywords, [locale.code]: value } })
                                }}
                            />
                        </Form.Item>
                    </>
                )
            }
        ));
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {
                    (store && loaded)
                        ?
                        <Form
                            form={form}
                            initialValues={store}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: '100%' }}
                            onFinish={handleSubmit}
                        >
                            {backendErrors.length > 0 && (
                                <div className="mb-6">
                                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                                        <ul className="list-disc pl-5">
                                            {backendErrors.map((err, idx) => (
                                                <li key={idx}>{err}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            <Row>
                                <Col span={12}>
                                    <Card title={t('stores.form.storeInformation')} type="inner">
                                        <Tabs defaultActiveKey="1" items={items} />
                                        <br />
                                    </Card>
                                </Col>

                                <Col span={10} offset={1}>
                                    <Card title={t('stores.form.storeCredentials')} type="inner">
                                        <Form.Item
                                            name="email"
                                            label={t('stores.columns.email')}
                                            labelCol={{ span: 6 }}
                                            rules={[
                                                { required: true, message: t('stores.validation.emailRequired') },
                                                { type: 'email', message: t('stores.validation.emailInvalid') },
                                            ]}
                                        >
                                            <Input
                                                value={store.email}
                                                placeholder={t('stores.form.email')}
                                                onChange={(e) => setStore({ ...store, email: e.currentTarget.value })}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            label={t('stores.form.phone')}
                                            labelCol={{ span: 6 }}
                                            rules={[
                                                { required: true, message: t('stores.validation.phoneRequired') },
                                                { pattern: /^[0-9]{10,15}$/, message: t('stores.validation.phoneInvalid') },
                                            ]}
                                        >
                                            <Input
                                                value={store.phone}
                                                placeholder={t('stores.form.phone')}
                                                onChange={(e) => setStore({ ...store, phone: e.currentTarget.value })}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            label={t('stores.form.password')}
                                            labelCol={{ span: 6 }}
                                            help={t('stores.form.passwordHelp')}
                                            rules={[
                                                { min: 8, message: t('stores.validation.passwordMinLength') },
                                            ]}
                                        >
                                            <Input.Password
                                                value={store.password}
                                                placeholder={t('stores.form.password')}
                                                onChange={(e) => setStore({ ...store, password: e.currentTarget.value })}
                                            />
                                        </Form.Item>
                                    </Card>
                                    <Card title={'status'} type="inner">
                                        <Form.Item
                                            name="delivery_time"
                                            label={t('stores.form.delivery_time')}
                                            labelCol={{ span: 6 }}
                                            rules={[
                                                // { required: true, message: t('stores.validation.deliveryTimeRequired') },
                                                // { type: 'number', message: t('stores.validation.deliveryTimeNumeric') }
                                            ]}
                                        >
                                            <Input
                                                type="number"
                                                value={store.delivery_time}
                                                onChange={
                                                    e => {
                                                        setStore({ ...store, delivery_time: Number(e.currentTarget.value) })
                                                    }
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="is_active"
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                                checked={!!store?.is_active}
                                                onChange={(e) => setStore(prev => prev ? { ...prev, is_active: e.target.checked } : prev)}
                                            >
                                                {t('stores.form.isActive')}
                                            </Checkbox>
                                        </Form.Item>
                                        <Form.Item
                                            name={'category_id'}
                                            label={'Category'}
                                            labelCol={{ span: 7 }}
                                            rules={[{ required: true, message: "The Category Is Required" }]}
                                        >
                                            <Select
                                                value={store.category_id}
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="Search Category"
                                                optionFilterProp="label"
                                                onChange={(value) => setStore(prev => prev ? { ...prev, category_id: value } : prev)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={storeCategories ? storeCategories.map(category => ({ label: category.name, value: category.id })) : []}
                                            />
                                        </Form.Item>
                                    </Card>
                                </Col>
                            </Row>
                            <br />
                            <br />
                            <Card title={t('stores.form.socialMedia')} type="inner">
                                <SocialMediaInput
                                    value={store.social_media}
                                    onChange={(socialMedia) => setStore({ ...store, social_media: socialMedia })}
                                />
                            </Card>
                            <br />
                            <Card title={t('stores.form.storeStatus')} type="inner">
                                <Form.Item
                                    label={t('stores.form.logo')}
                                >
                                    <Pond
                                        allowMultiple={false}
                                        maxFiles={1}
                                        files={store.logo ? logo : undefined}
                                        onChange={handleLogoChange}
                                        setLoading={setLoading}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={'Gallery'}
                                >
                                    <Pond
                                        allowMultiple={true}
                                        maxFiles={5}
                                        files={store.gallery ?? undefined}
                                        onChange={handleGalleryChange}
                                        setLoading={setLoading}
                                    />
                                </Form.Item>
                            </Card>
                            <Form.Item>
                                <div className="flex gap-10 mt-1">
                                    <Button
                                        type="primary"
                                        className="ml-20"
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        {t('stores.editStore')}
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() => {
                                            navigate('/admin/dashboard/stores');
                                        }}
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                        :
                        <Loader />
                }
            </div>
        </AppLayout >
    );




}
