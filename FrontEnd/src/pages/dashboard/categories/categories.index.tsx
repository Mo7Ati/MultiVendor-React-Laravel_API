import axiosClient from "@/axios-client";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { categoriesContext, CategoriesProvider } from "@/providers/categories-provider";
import { BreadcrumbItem } from "@/types";
import { AdminType, CategoryType } from "@/types/dashboard";
import { Button, Flex, Space, Table, Image, message, Skeleton } from 'antd';
import { use, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

interface Iprops {
    categories: CategoryType[],
    auth: {
        user: AdminType;
        permissions: string[];
    },
    flash: { message: string },
}
export default function CategoriesIndex() {
    const { categories, categoriesLoaded, flashMessage, setLoaded, dispatch, getCategories, setFlashMessage } = useContext(categoriesContext);
    const can = usePermissions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!categoriesLoaded) {
            getCategories();
        }
    }, []);

    const { Column } = Table;
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (flashMessage) {
            messageApi.open({
                type: 'success',
                content: flashMessage,
            });
            setFlashMessage('');
        }
    }, [flashMessage, messageApi]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Categories" /> */}
            {contextHolder}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {
                    can('create-categories') && (
                        <div>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={e => navigate('/admin/dashboard/categories/create')}
                            >
                                Add Category
                            </Button>
                        </div>
                    )
                }
                <Table<CategoryType> dataSource={categories} rowKey="id" loading={!categoriesLoaded} >
                    <Column title="Image" render={(_: any, record: CategoryType) => (
                        <Image
                            height={80}
                            width={100}
                            src={record.image_url}
                        />
                    )} />

                    <Column title="Name"
                        render={(_: any, record: CategoryType) => (
                            <Link to={`categories/${record.id}`}>{record.name}</Link>
                        )} />

                    <Column
                        title="Parent"
                        render={(_: any, record: CategoryType) => (
                            <>
                                {
                                    record.parent ? record.parent.name : ''
                                }
                            </>
                        )}
                    />
                    <Column title="Status" dataIndex="status" />
                    <Column title="Description" dataIndex="description" width={'500px'} />

                    {
                        (can('delete-categories') || can('update-categories'))
                        &&
                        (
                            <Column
                                title="Action"
                                render={(_: any, record: CategoryType) => (
                                    <Space size="middle">
                                        <Flex gap="small">
                                            {
                                                can('update-categories') &&
                                                (
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={
                                                            e => {
                                                                navigate(`/admin/dashboard/categories/${record.id}/edit`)
                                                            }
                                                        }>
                                                        Edit
                                                    </Button>
                                                )
                                            }

                                            {
                                                can('delete-categories') &&
                                                (
                                                    <Button color="danger" variant="outlined" onClick={e => {
                                                        axiosClient.delete(`/admin/dashboard/categories/${record.id}`)
                                                            .then(_ => {
                                                                dispatch({ type: 'DELETE_CATEGORY', payload: record.id })
                                                                setFlashMessage("Category Deleted Successfully");
                                                            });
                                                    }}>
                                                        Delete
                                                    </Button>
                                                )
                                            }
                                        </Flex>
                                    </Space>
                                )}
                            />
                        )
                    }
                </Table>
            </div >
        </AppLayout >
    );
}

