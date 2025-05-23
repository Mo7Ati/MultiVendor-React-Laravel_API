import axiosClient from "@/axios-client";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { storesContext } from "@/providers/stores-provider";
import { BreadcrumbItem } from "@/types";
import { StoreType } from "@/types/dashboard";
import { Button, Flex, Space, Table, Image, message } from 'antd';
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: 'dashboard/products',
    },
];

export default function StoresIndex() {
    const { stores, getStores, loaded, flashMessage, setFlashMessage, dispatch } = useContext(storesContext)
    const { Column } = Table;
    const [messageApi, contextHolder] = message.useMessage();
    const can = usePermissions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            getStores();
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Products" /> */}
            {contextHolder}
            <div className="rounded-xl p-4">
                {
                    can('create-stores') && (
                        <Button
                            color="primary"
                            variant="outlined"
                            className="mb-2"
                            onClick={() => navigate('/admin/dashboard/stores/create')}
                        >
                            Add Store
                        </Button>
                    )
                }
                <Table<StoreType> dataSource={stores} rowKey="id" loading={!loaded} >
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
                        (can('update-stores') || can('delete-stores')) && (
                            <Column
                                title="Action"
                                render={(_: any, record: StoreType) => (
                                    <Space size="middle">
                                        <Flex gap="small">
                                            {
                                                can('update-stores') && (
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={e => {
                                                            navigate(`/admin/dashboard/stores/${record.id}/edit`);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )
                                            }

                                            {
                                                can('delete stores') && (
                                                    <Button color="danger" variant="outlined" onClick={e => {
                                                        axiosClient.delete(`/admin/dashboard/stores/${record.id}`)
                                                            .then(_ => {
                                                                dispatch({ type: "DELETE_STORE", payload: record.id });
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
            </div>
        </AppLayout >
    );
}

