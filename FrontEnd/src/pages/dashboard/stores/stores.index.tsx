import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { StoreType } from "@/types/dashboard";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Button, Flex, Space, Table, Image, Pagination, message } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stores',
        href: route('dashboard.stores.index'),
    },
];

interface Iprops {
    stores: {
        data: StoreType[],
        per_page: number,
        current_page: number,
    },
    total_products: number,
    flash: { message: string },
}
export default function StoreIndex(props: Iprops) {

    const { Column } = Table;
    const [stores, setStores] = useState<StoreType[]>(props.stores.data);
    const [flashMessage, setFlashMessage] = useState<string>(props.flash.message);
    const [messageApi, contextHolder] = message.useMessage();
    const can = usePermissions();

    useEffect(() => {
        if (flashMessage) {
            messageApi.open({
                type: 'success',
                content: flashMessage,
            });
            setFlashMessage('');
        }
    }, [flashMessage, messageApi]);


    const onPageChange = (page: number, pageSize: number) => {
        router.get(route('dashboard.stores.index'), { page });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stores" />
            {contextHolder}

            <div className="rounded-xl p-4">
                {
                    can('create stores') && (
                        <Button
                            color="primary"
                            variant="outlined"
                            className="mb-2"
                            onClick={() => router.get(route('dashboard.stores.create'))}
                        >
                            Add Store
                        </Button>
                    )
                }
                <Table<StoreType> dataSource={stores} rowKey="id" pagination={false} >
                    <Column title="Image" render={(_: any, record: StoreType) => (
                        <>
                            <Image
                                height={63}
                                width={100}
                                src={record.logo_url}
                            />
                        </>
                    )} />

                    <Column title="Name" dataIndex={'name'} />
                    <Column title="Status" dataIndex="status" />
                    <Column title="Description" dataIndex="description" />


                    {
                        (can('update stores') || can('delete stores')) && (
                            <Column
                                title="Action"
                                render={(_: any, record: StoreType) => (
                                    <Space size="middle">
                                        <Flex gap="small">
                                            {
                                                can('update stores') && (
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={e => {
                                                            router.get(route('dashboard.stores.edit', record))
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )
                                            }

                                            {
                                                can('delete stores') && (
                                                    <Button color="danger" variant="outlined" onClick={e => {
                                                        axios.delete(route('dashboard.stores.destroy', record))
                                                            .then(_ => {
                                                                setStores(prev => prev.filter(store => store.id !== record.id));
                                                                setFlashMessage("Store Deleted Successfully");
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
                <div className="mt-5">
                    <Pagination
                        align="start"
                        current={props.stores.current_page}
                        defaultCurrent={1}
                        total={props.total_products}
                        pageSize={props.stores.per_page}
                        onChange={onPageChange}
                    />
                </div>
            </div>
        </AppLayout >
    );
}

