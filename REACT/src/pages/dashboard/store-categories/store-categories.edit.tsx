import React, { useEffect, useState } from 'react';
import { Input, Button, Form, TabsProps, Card, Tabs, message, Spin } from 'antd';
import TextArea from "antd/es/input/TextArea";
import axiosClient from '@/axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { t } from 'i18next';
import { StoreCategoryType } from '@/types/dashboard';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Store Categories',
        href: '/admin/dashboard/store-categories',
    },
    {
        title: 'Edit Category',
        href: '/admin/dashboard/store-categories/edit',
    },
];

export default function StoreCategoryEdit() {
    const [messageApi, contextHolder] = message.useMessage();
    const [storeCategory, setStoreCategory] = useState<StoreCategoryType>();
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [backendErrors, setBackendErrors] = useState<string[]>([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams();

    const initialValues = storeCategory ? {
        ...Object.fromEntries([
            ...Object.entries(storeCategory.name || { en: '', ar: '' }).map(([k, v]) => [`name.${k}`, v]),
            ...Object.entries(storeCategory.description || { en: '', ar: '' }).map(([k, v]) => [`description.${k}`, v]),
        ])
    } : {};

    useEffect(() => {
        fetchStoreCategory();
    }, []);

    const fetchStoreCategory = () => {
        axiosClient.get(`/api/admin/dashboard/store-categories/${Number(params.id)}`)
            .then(response => {
                setStoreCategory(response.data);
                setLoaded(true);
            }).catch(error => {
                console.error('Error fetching store category:', error);
                messageApi.open({
                    type: 'error',
                    content: t('common.error'),
                });
            });
    };

    const items: TabsProps['items'] =
        [{ code: 'en', label: 'English' }, { code: 'ar', label: 'عربي' }].map(locale =>
        (
            {
                key: locale.code,
                label: locale.label,
                children: (
                    storeCategory && <>
                        <Form.Item
                            name={`name.${locale.code}`}
                            label="Name"
                            labelCol={{ span: 7 }}
                            rules={[
                                { required: true, message: t('stores.validation.nameRequired') },
                                { max: 255, message: t('stores.validation.nameMaxLength') }
                            ]}
                        >
                            <Input
                                value={storeCategory.name[locale.code as keyof typeof storeCategory.name]}
                                onChange={(e) => {
                                    setStoreCategory({ ...storeCategory, name: { ...storeCategory.name, [locale.code]: e.currentTarget.value } });
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name={`description.${locale.code}`}
                            label={'Description'}
                            labelCol={{ span: 7 }}
                        >
                            <TextArea
                                rows={4}
                                value={storeCategory.description?.[locale.code as keyof typeof storeCategory.description]}
                                onChange={
                                    e => {
                                        setStoreCategory({ ...storeCategory, description: { ...storeCategory.description, [locale.code]: e.currentTarget.value } })
                                    }
                                }
                            />
                        </Form.Item>
                    </>
                )
            }
        ));



    const handleSubmit = () => {
        setLoading(true);
        setBackendErrors([]);

        axiosClient.put(`/api/store-categories/${params.id}`, storeCategory)
            .then(res => {
                messageApi.open({
                    type: 'success',
                    content: t('common.updated'),
                });
                navigate('/admin/dashboard/store-categories');
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {!loaded ? (
                    <div className="flex justify-center items-center h-64">
                        <Spin size="large" />
                    </div>
                ) : storeCategory ? (
                    <Form
                        form={form}
                        initialValues={initialValues}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 800 }}
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
                        <Card title={t('stores.form.storeCategoryInformation')} type="inner">
                            <Tabs defaultActiveKey="1" items={items} />
                            <br />
                        </Card>

                        <Form.Item >
                            <div className="flex gap-10 mt-1">
                                <Button
                                    type="primary"
                                    className="ml-20"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    {t('common.update')}
                                </Button>
                                <Button
                                    danger
                                    onClick={() => {
                                        navigate('/admin/dashboard/store-categories');
                                    }}
                                >
                                    {t('common.cancel')}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="text-center text-gray-500">
                        {t('common.notFound')}
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 