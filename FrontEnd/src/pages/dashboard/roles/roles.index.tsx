import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { RoleType } from "@/types/dashboard";
import { Head, router } from "@inertiajs/react";
import { Button, Flex, Space, Table, Image, Pagination, message } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: route('dashboard.roles.index'),
    },
];

interface Iprops {
    roles: {
        data: RoleType[],
        per_page: number,
        current_page: number,
    },
    total_products: number,
    flash: { message: string },
}
export default function RoleIndex(props: Iprops) {

    const { Column } = Table;
    const [roles, setStores] = useState<RoleType[]>(props.roles.data);
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
        router.get(route('dashboard.roles.index'), { page });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            {contextHolder}
            <div className="rounded-xl p-4">
                {
                    can('create roles') && (
                        <Button
                            color="primary"
                            variant="outlined"
                            className="mb-2"
                            onClick={() => router.get(route('dashboard.roles.create'))}
                        >
                            Add Role
                        </Button>
                    )
                }

                <Table<RoleType> dataSource={roles} rowKey="id" pagination={false} >

                    <Column title="Name" dataIndex={'name'} />

                    {
                        (can('delete roles') && can('update roles')) && (
                            <Column
                                title="Action"
                                render={(_: any, record: RoleType) => (
                                    <Space size="middle">
                                        <Flex gap="small">
                                            {
                                                can('edit roles') && (
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={e => {
                                                            router.get(route('dashboard.roles.edit', record))
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )
                                            }


                                            {
                                                can('delete roles') && (
                                                    <Button color="danger" variant="outlined" onClick={e => {
                                                        axios.delete(route('dashboard.roles.destroy', record))
                                                            .then(_ => {
                                                                setStores(prev => prev.filter(role => role.id !== record.id));
                                                                setFlashMessage("Role Deleted Successfully");
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
                        current={props.roles.current_page}
                        defaultCurrent={1}
                        total={props.total_products}
                        pageSize={props.roles.per_page}
                        onChange={onPageChange}
                    />
                </div>
            </div>
        </AppLayout >
    );
}

