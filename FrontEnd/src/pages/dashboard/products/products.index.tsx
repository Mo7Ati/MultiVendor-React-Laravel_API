import axiosClient from "@/axios-client";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { productsContext } from "@/providers/products-provider";
import { BreadcrumbItem } from "@/types";
import { ProductType } from "@/types/dashboard";
import { Button, Flex, Space, Table, Image, Pagination, message } from 'antd';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: 'dashboard/products',
    },
];

export default function ProductsIndex() {

    const { Column } = Table;
    const { products, loaded, flashMessage, setLoaded, dispatch, getProducts, setFlashMessage } = useContext(productsContext);
    const [messageApi, contextHolder] = message.useMessage();
    const can = usePermissions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            getProducts();
        }
    }, []);



    useEffect(() => {
        if (flashMessage) {
            messageApi.open({
                type: 'success',
                content: flashMessage,
            });
            setFlashMessage('');
        }
    }, [flashMessage, messageApi]);


    // const onPageChange = (page: number, pageSize: number) => {
    //     router.get(route('dashboard.products.index'), { page });
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Products" /> */}
            {contextHolder}
            <div className="rounded-xl p-4">
                {
                    can('create products') && (
                        <Button
                            color="primary"
                            variant="outlined"
                            className="mb-2"
                            onClick={() => navigate('/admin/dashboard/products/create')}
                        >
                            Add Product
                        </Button>
                    )
                }
                <Table<ProductType> dataSource={products} rowKey="id" loading={!loaded}>
                    <Column title="Image" render={(_: any, record: ProductType) => (
                        <>
                            <Image
                                height={63}
                                width={100}
                                src={record.image_url}
                            />
                        </>
                    )} />

                    <Column title="Name" dataIndex={'name'} />

                    <Column
                        title="Category"
                        render={(_: any, record: ProductType) => (
                            <>
                                {
                                    record.category?.name
                                }
                            </>
                        )} />

                    <Column
                        title="Store"
                        render={(_: any, record: ProductType) => (
                            <>
                                {
                                    record.store?.name
                                }
                            </>
                        )} />
                    <Column title="Status" dataIndex="status" />
                    <Column title="Price" dataIndex="price" />
                    <Column title="Compare Price" dataIndex="compare_price" />
                    <Column title="Description" dataIndex="description" />
                    <Column title="Quantity" dataIndex="quantity" />
                    {
                        (can('update products') || can('delete products')) && (
                            <Column
                                title="Action"
                                render={(_: any, record: ProductType) => (
                                    <Space size="middle">
                                        <Flex gap="small">
                                            {
                                                can('update products') && (
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={e => {
                                                            navigate(`/admin/dashboard/products/${record.id}/edit`)
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )
                                            }


                                            {
                                                can('delete  products') && (
                                                    <Button color="danger" variant="outlined" onClick={e => {
                                                        axiosClient.delete(`/admin/dashboard/products/${record.id}`)
                                                            .then(_ => {
                                                                dispatch({ type: 'DELETE_PRODUCT', payload: record.id });
                                                                setFlashMessage("Product Deleted Successfully");
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
                {/* <div className="mt-5">
                    <Pagination
                        align="start"
                        current={props.products.current_page}
                        defaultCurrent={1}
                        total={props.total_products}
                        pageSize={props.products.per_page}
                    // onChange={onPageChange}
                    />
                </div> */}
            </div>
        </AppLayout >
    );
}

