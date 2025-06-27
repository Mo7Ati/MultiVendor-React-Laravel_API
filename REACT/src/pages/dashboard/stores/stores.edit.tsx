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
    Spin,
    message,
    Image
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { EStatus, StoreType } from "@/types/dashboard";
import axiosClient from "@/axios-client";
import { useNavigate, useParams } from "react-router-dom";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { storesContext } from "@/providers/stores-provider";
import { useTranslation } from 'react-i18next';
import { Loader } from "@/components/loader";
import { FilePond } from "react-filepond";

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

// Extended StoreType for form handling
type ExtendedStoreType = StoreType & {
    logo_image?: any;
    gallery_image?: any;
    removeImage?: boolean;
    logo_url?: string;
};

export default function EditStore() {
    const { stores, loaded, getStores, setFlashMessage, dispatch } = useContext(storesContext);
    const { t } = useTranslation();
    const params = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const [displayImage, setDisplayImage] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);

    function getCookie(name: string) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    const currentStore = stores.find(store => store.id === Number(params.id)) as ExtendedStoreType;

    const [store, setStore] = useState<ExtendedStoreType>({
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
        email: '',
        phone: '',
        password: '',
        logo: '',
        gallery: [],
        is_active: true,
        rate: 1,
    });


    useEffect(() => {
        if (!loaded && !currentStore) {
            getStores();
        }
    }, []);

    useEffect(() => {
        if (currentStore && loaded) {
            setStore({
                ...currentStore,
                password: '', 
            });
        }
    }, [currentStore, loaded]);

    const handleSubmit = () => {
        setLoading(true);

        // Prepare store for update
        const updateData = {
            ...store,
            _method: 'PUT',
        };

        axiosClient.post(`/api/admin/dashboard/stores/${params.id}`, updateData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            dispatch({ type: 'UPDATE_STORE', payload: res.data });
            setFlashMessage(t('stores.storeUpdated'));
            messageApi.open({
                type: 'success',
                content: t('stores.storeUpdated'),
            });
            navigate("/admin/dashboard/stores");
        }).catch((res) => {
            messageApi.open({
                type: 'error',
                content: t('common.error'),
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
                        <Form.Item label="Name" labelCol={{ span: 7 }}>
                            <Input
                                value={store.name?.[locale.code as keyof typeof store.name] || ''}
                                onChange={(e) => {
                                    setStore({ ...store, name: { ...store.name, [locale.code]: e.currentTarget.value } });
                                }}
                            />
                        </Form.Item>

                        <Form.Item
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
                            label={'Address'}
                            labelCol={{ span: 7 }}
                        >
                            <Input
                                value={store.address?.[locale.code as keyof typeof store.address] || ''}
                                onChange={e => {
                                    setStore({ ...store, address: { ...store.address, [locale.code]: e.currentTarget.value } })
                                }}
                            />
                        </Form.Item>

                        <Form.Item
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

                        <Form.Item label={t('stores.form.socialMedia')} labelCol={{ span: 7 }}>
                            <Input
                                value={store.social_media?.[locale.code as keyof typeof store.social_media] || ''}
                                onChange={e => {
                                    setStore({ ...store, social_media: { ...store.social_media, [locale.code]: e.currentTarget.value } })
                                }}
                            />
                        </Form.Item>
                    </>
                )
            }
        ));

    if (!loaded || !store) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
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


                                <Form.Item
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
                                    label={t('stores.form.password')}
                                    labelCol={{ span: 6 }}
                                    help={t('stores.form.passwordHelp')}
                                >
                                    <Input.Password
                                        value={store.password}
                                        placeholder={t('stores.form.password')}
                                        onChange={(e) => setStore({ ...store, password: e.currentTarget.value })}
                                    />
                                </Form.Item>
                            </Card>
                            <br />
                            <Card title={t('stores.form.storeStatus')} type="inner">
                                <Form.Item label={t('stores.form.logo')}>
                                    <FilePond
                                        allowMultiple={false}
                                        maxFiles={1}
                                        name="upload"
                                        // files={(') => {

                                        // }}
                                        server={{
                                            process: {
                                                url: 'http://localhost:8000/api/admin/dashboard/upload',
                                                headers: {
                                                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
                                                },
                                                withCredentials: true,
                                            }
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item label={t('stores.form.gallery')}>
                                    <div className="flex flex-row items-center gap-10 ml-3">
                                        <div className="flex flex-col gap-3">
                                            <Upload
                                                beforeUpload={(value) => {
                                                    setStore({ ...store, gallery_image: value });
                                                    return false;
                                                }}
                                                listType="text"
                                                maxCount={5}
                                            >
                                                <Button icon={<UploadOutlined />}>
                                                    {t('stores.form.uploadGallery')}
                                                </Button>
                                            </Upload>
                                        </div>
                                    </div>
                                </Form.Item>

                                <Form.Item>
                                    <Checkbox
                                        checked={store.is_active}
                                        style={{ marginLeft: 170 }}
                                        onChange={(e) => setStore({ ...store, is_active: e.target.checked })}
                                    >
                                        {t('stores.form.isActive')}
                                    </Checkbox>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <br />
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


            </div>
        </AppLayout>
    );
}
