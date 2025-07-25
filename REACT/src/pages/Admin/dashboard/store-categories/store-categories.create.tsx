import React, { useState } from 'react';
import { Input, Button, Form, TabsProps, Card, Tabs } from 'antd';
import TextArea from "antd/es/input/TextArea";
import axiosClient from '@/axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem } from '@/types';
import { t } from 'i18next';



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
        title: 'Create Category',
        href: '/admin/dashboard/store-categories/create',
    },
];

export default function StoreCategoryCreate() {
    const [data, setData] = useState({ name: { en: '', ar: '' }, description: { en: '', ar: '' } });
    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();


    const items: TabsProps['items'] =
        [{ code: 'en', label: 'English' }, { code: 'ar', label: 'عربي' }].map(locale =>
        (
            {
                key: locale.code,
                label: locale.label,
                children: (
                    <>
                        <Form.Item
                            name={`name-${locale.code}`}
                            label="Name"
                            labelCol={{ span: 7 }}
                            rules={[
                                { required: true, message: t('stores.validation.nameRequired') },
                                { max: 255, message: t('stores.validation.nameMaxLength') }
                            ]}
                        >
                            <Input
                                value={data.name[locale.code as keyof typeof data.name]}
                                onChange={(e) => {
                                    setData({ ...data, name: { ...data.name, [locale.code]: e.currentTarget.value } });
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name={`description-${locale.code}`}
                            label={'Description'}
                            labelCol={{ span: 7 }}
                        >
                            <TextArea
                                rows={4}
                                value={data.description[locale.code as keyof typeof data.description]}
                                onChange={
                                    e => {
                                        setData({ ...data, description: { ...data.description, [locale.code]: e.currentTarget.value } })
                                    }
                                }
                            />
                        </Form.Item>
                    </>
                )
            }
        ));


    const handleSubmit = async () => {
        try {
            await axiosClient.post('/api/admin/dashboard/store-categories', data);
            navigate('/admin/dashboard/store-categories');
        } catch (err: any) {
            setErrors(err.response?.data?.errors || {});
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* {contextHolder} */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    onFinish={handleSubmit}
                >
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
                            >
                                {t('stores.createCategory')}
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
            </div>
        </AppLayout>
    );
} 