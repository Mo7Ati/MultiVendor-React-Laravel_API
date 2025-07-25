import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useCallback, useContext, useEffect, useState } from 'react';
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
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { StoreCategoryIndexType, StoreCategoryType, StoreType } from "@/types/dashboard";
import axiosClient from "@/axios-client";
import { useNavigate } from "react-router-dom";
import { storesContext } from "@/providers/stores-provider";
import { useTranslation } from 'react-i18next';

import Pond from "@/components/file-pond";
import SocialMediaInput from "@/components/ui/SocialMediaInput";

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
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [storeCategories, setStoreCategories] = useState<StoreCategoryIndexType[]>([])

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
        social_media: [],
        email: '',
        phone: '',
        password: '',
        delivery_time: 0,
        is_active: true,
        rate: 1,
        category_id: null,
    });
    const [media, setMedia] = useState<{ logo: string, gallery: string[] }>({ logo: '', gallery: [] });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [backendErrors, setBackendErrors] = useState<string[]>([]);




    const handleSubmit = async () => {
        try {
            setLoading(true);
            setErrors({});
            setBackendErrors([]);
            const response = await axiosClient.post('/api/admin/dashboard/stores', { ...data, media });
            messageApi.open({
                type: 'success',
                content: t('stores.storeCreated'),
            });
            navigate("/admin/dashboard/stores");
        } catch (error: any) {
            if (error.response?.data?.errors) {
                const backendErrorsArray = Object.values(error.response.data.errors).flat();
                setBackendErrors(backendErrorsArray as string[]);
            } else {
                setBackendErrors([t('common.error')]);
            }
            messageApi.open({
                type: 'error',
                content: t('common.validationError'),
            });
        } finally {
            setLoading(false);
        }
    };


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

                        <Form.Item
                            name={`Address-${locale.code}`}
                            label={'address'}
                            labelCol={{ span: 7 }}
                            rules={[
                                { required: true, message: t('stores.validation.addressRequired') },
                                { max: 255, message: t('stores.validation.addressMaxLength') }
                            ]}
                        >
                            <Input
                                value={data.address[locale.code as keyof typeof data.address]}
                                onChange={
                                    e => {
                                        setData({ ...data, address: { ...data.address, [locale.code]: e.currentTarget.value } })
                                    }
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name={`keywords-${locale.code}`}
                            label={'keywords'}
                            labelCol={{ span: 7 }}
                        >
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                value={data.keywords[locale.code as keyof typeof data.keywords]}
                                onChange={(value) => {
                                    setData({ ...data, keywords: { ...data.keywords, [locale.code]: value } })
                                }}
                            />
                        </Form.Item>
                    </>
                )
            }
        ));

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
        getStoreCategories();
    }, [])

    const getStoreCategories = () => {
        axiosClient.get("/api/admin/dashboard/store-categories")
            .then((response) => {
                setStoreCategories(response.data.data);
            }).catch(error => {
                alert(error);
            })
    }
    console.log(storeCategories);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Form
                    form={form}
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
                                        value={data.email}
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
                                        value={data.phone}
                                        onChange={(e) => setData({ ...data, phone: e.currentTarget.value })}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={t('stores.form.password')}
                                    labelCol={{ span: 6 }}
                                    name="password"
                                    rules={[
                                        { required: true, message: t('stores.validation.passwordRequired') },
                                        { min: 8, message: t('stores.validation.passwordMinLength') },
                                    ]}
                                >
                                    <Input.Password
                                        value={data.password}
                                        onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                                    />
                                </Form.Item>

                            </Card>
                            <br />
                            <Card title={'stores.form.status'} type="inner">
                                <Form.Item name={"delivery_time"} label={t('stores.form.delivery_time')} labelCol={{ span: 7 }}  >
                                    <Input
                                        type="number"
                                        value={data.delivery_time}
                                        onChange={
                                            e => {
                                                setData({ ...data, delivery_time: Number(e.currentTarget.value) })
                                            }
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    labelCol={{ span: 7 }}
                                >
                                    <Checkbox style={{ marginLeft: 170 }} onChange={(e) => setData({ ...data, is_active: e.target.checked })}>{t('stores.form.isActive')}</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    label={'Category'}
                                    labelCol={{ span: 7 }}
                                    rules={[{ required: true, message: "The Category Is Required" }]}
                                >
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Search Category"
                                        optionFilterProp="label"
                                        onChange={(value) => setData({ ...data, category_id: value })}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={storeCategories ? storeCategories.map(category => ({ label: category.name, value: category.id })) : []}
                                    />
                                </Form.Item>
                            </Card>
                            <br />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Card title={t('stores.form.socialMedia')} type="inner">
                        <SocialMediaInput
                            value={data.social_media}
                            onChange={(socialMedia) => setData({ ...data, social_media: socialMedia })}
                        />
                    </Card>
                    <Card title={t('stores.form.storeStatus')} type="inner">
                        <Form.Item
                            label={'Logo'}
                        >
                            <Pond
                                allowMultiple={false}
                                maxFiles={1}
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
                                onChange={handleGalleryChange}
                                setLoading={setLoading}
                            />
                        </Form.Item>
                    </Card>
                    <Form.Item >
                        <div className="flex gap-10 mt-1">
                            <Button
                                type="primary"
                                className="ml-20"
                                htmlType="submit"
                                loading={loading}
                            >
                                {t('stores.createStore')}
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
        </AppLayout >
    );
}
