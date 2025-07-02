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
import { MediaType, StoreType } from "@/types/dashboard";
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

const GalleryPond = memo(function Pond({ gallery, onGalleryChange }: { gallery: MediaType[], onGalleryChange: (data: string, type: 'add' | 'revert') => void }) {
    return (
        <FilePond
            name="upload"
            allowMultiple={true}
            files={
                gallery
                    ? gallery.map(file => ({
                        source: file.uuid!,
                        options: {
                            type: 'local'
                        }
                    }))
                    : []
            }
            server={{
                process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                    const formData = new FormData();
                    formData.append(fieldName, file, file.name);
                    const source = axios.CancelToken.source();

                    axiosClient.post('/api/admin/dashboard/upload', formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            onUploadProgress: (e) => {
                                progress(e.lengthComputable, e.loaded, Number(e.total));
                            },
                            cancelToken: source.token,
                        }).then(response => {
                            if (response.status >= 200 && response.status < 300) {
                                onGalleryChange(response.data, 'add')
                                load(response.data);
                            } else {
                                error('oh no');
                            }
                        })

                    return {
                        abort: () => {
                            // This function is entered if the user has tapped the cancel button
                            source.cancel('Upload cancelled by user');
                            // Let FilePond know the request has been cancelled
                            abort();
                        },
                    };
                },
                revert: (uniqueFileId, load, error) => {
                    const folderName = uniqueFileId;

                    axiosClient.delete('/api/admin/dashboard/upload', {
                        data: {
                            folder_name: folderName,
                        },
                    }).then((response) => {
                        if (response.status === 200) {
                            onGalleryChange(response.data, 'revert')
                            load();
                        }
                        else error('Revert failed');
                    })
                        .catch(() => error('Network error'));
                },
                load: (source, load, error, progress, abort, headers) => {
                    axiosClient.post('/api/admin/dashboard/load',
                        source,
                        {
                            responseType: 'blob',
                            onUploadProgress: (e) => {
                                progress(e.lengthComputable, e.loaded, Number(e.total));
                            },
                        }
                    ).then(res => load(res.data))
                        .catch(res => error('oh my goodness'))
                    return {
                        abort: () => {
                            abort();
                        },
                    };
                },
                remove: (source, load, error) => {
                    console.log(source);
                    axiosClient.post("api/admin/dashboard/remove", source)
                        .then(res => {
                            // setStore({ ...store, gallery: [...store.gallery].filter(file => file.uuid !== source) })
                            load()
                        })
                        .catch(res => error('oh my goodness'))
                },
            }}
        />
    )
});

const LogoPond = memo(function Pond({ logo, onLogoChange }: { logo: MediaType, onLogoChange: (data: string) => void }) {
    return (
        <FilePond
            name="upload"
            allowMultiple={false}
            maxFiles={1}
            files={
                logo
                    ? [{ source: logo.uuid!, options: { type: 'local' } }]
                    : []
            }
            server={{
                process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                    const formData = new FormData();
                    formData.append(fieldName, file, file.name);

                    const source = axios.CancelToken.source();

                    axiosClient.post('/api/admin/dashboard/upload', formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            onUploadProgress: (e) => {
                                progress(e.lengthComputable, e.loaded, Number(e.total));
                            },
                            cancelToken: source.token,
                        }).then(response => {
                            if (response.status >= 200 && response.status < 300) {
                                onLogoChange(response.data);
                                load(response.data);
                            } else {
                                error('oh no');
                            }
                        })

                    return {
                        abort: () => {
                            // This function is entered if the user has tapped the cancel button
                            source.cancel('Upload cancelled by user');
                            // Let FilePond know the request has been cancelled
                            abort();
                        },
                    };
                },
                revert: (uniqueFileId, load, error) => {
                    const folderName = uniqueFileId;

                    axiosClient.delete('/api/admin/dashboard/upload', {
                        data: {
                            folder_name: folderName,
                        },
                    })
                        .then((res) => {
                            if (res.status === 200) {
                                onLogoChange(res.data);
                                load();
                            }
                            else error('Revert failed');
                        })
                        .catch(() => error('Network error'));
                },
                load: (source, load, error, progress, abort, headers) => {
                    axiosClient.post('/api/admin/dashboard/load',
                        source,
                        {
                            responseType: 'blob',
                            onUploadProgress: (e) => {
                                progress(e.lengthComputable, e.loaded, Number(e.total));
                            },
                        }
                    )
                        .then(res => load(res.data))
                        .catch(res => error('oh my goodness'))

                    return {
                        abort: () => {
                            abort();
                        },
                    };
                },
                remove: (source, load, error) => {
                    axiosClient.post("api/admin/dashboard/remove", source,
                    )
                        .then(res => load())
                        .catch(res => error('oh my goodness'))
                },
            }
            }
        />
    )

});

export default function EditStore() {
    const { t } = useTranslation();
    const params = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const [store, setStore] = useState<EditStorePageType>();
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gallery, setGallery] = useState<string[]>([])
    const [logo, setLogo] = useState<string>('')

    const handleGalleryChange = useCallback((data: string, type: 'add' | 'revert') => {
        if (type === 'add') {
            setGallery(prev => [...prev, data]);
        } else if (type === 'revert') {
            setGallery(prev => [...prev].filter(file => file !== data));
        }
    }, []);

    const handleLogoChange = useCallback((data: string) => {
        setLogo(data)
    }, []);

    console.log(logo, gallery);

    useEffect(() => {
        fetchStore();
    }, []);

    const fetchStore = () => {
        axiosClient.get(`api/admin/dashboard/stores/${Number(params.id)}/edit`)
            .then(response => {
                setStore(response.data)
                setLoaded(true)
            }).catch(e => <></>)
    }

    const handleSubmit = () => {
        setLoading(true);

        const updateData = {
            ...store,
            logo,
            gallery
        };
        axiosClient.put(`/api/admin/dashboard/stores/${params.id}`, updateData)
            .then(res => {
                // setFlashMessage(t('stores.storeUpdated'));
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


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {contextHolder}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {
                    store
                        ?
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
                                    {/*  */}
                                </Col>
                            </Row>
                            <br />
                            <br />

                            <Card title={t('stores.form.storeStatus')} type="inner">
                                <Form.Item label={t('stores.form.logo')}>
                                    <LogoPond logo={store.logo} onLogoChange={handleLogoChange} />
                                </Form.Item>
                                <Form.Item label={t('stores.form.gallery')}>
                                    <GalleryPond gallery={store.gallery} onGalleryChange={handleGalleryChange} />
                                </Form.Item>

                                <Form.Item>
                                    <Checkbox style={{ marginLeft: 170 }} onChange={(e) => setStore({ ...store, is_active: e.target.checked })}>{t('stores.form.isActive')}</Checkbox>
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
        </AppLayout>
    );




}
