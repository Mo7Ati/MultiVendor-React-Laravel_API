import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { AdminType, RoleType } from "@/types/dashboard";
import { Head, router, } from "@inertiajs/react";
import { Button, Flex, Space, Table, Image, Pagination, message } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admins',
        href: route('dashboard.admins.index'),
    },
];

interface Iprops {
    admins: {
        data: AdminType[],
        per_page: number,
        current_page: number,
    },
    flash: { message: string },
}
export default function AdminsIndex(props: Iprops) {

    const { Column } = Table;
    const [admins, setAdmins] = useState<AdminType[]>(props.admins.data);
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
        router.get(route('dashboard.admins.index'), { page });
    }
    console.log(admins);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admins" />
            {contextHolder}
            <div className="rounded-xl p-4">
                {
                    can('create admins') && (
                        <Button
                            color="primary"
                            variant="outlined"
                            className="mb-2"
                            onClick={() => router.get(route('dashboard.admins.create'))}
                        >
                            Add Admin
                        </Button>
                    )
                }

                <Table<AdminType> dataSource={admins} rowKey="id" pagination={false} >

                    <Column title="Name" dataIndex="name" />
                    <Column title="username" dataIndex="username" />
                    <Column title="email" dataIndex="email" />
                    <Column title="phone_number" dataIndex="phone_number" />

                    <Column title="Password" render={(_: any, record: AdminType) => (
                        <div>
                            {/* {(record.password as string)} */}
                            {/* 11 */}
                        </div>
                    )} />

                    <Column
                        title="Roles"
                        render={
                            (_: any, record: AdminType) => {
                                return (
                                    <>
                                        {
                                            record.roles?.map(role => {
                                                return role.name;
                                            })
                                        }
                                    </>
                                );
                            }} />
                    <Column title="super_admin" dataIndex="super_admin" />
                    <Column title="Status" dataIndex="status" />


                    {
                        (can('update admins') || can('delete admins')) && (
                            <Column
                                title="Action"
                                render={(_: any, record: AdminType) => (
                                    <Space size="middle">
                                        <Flex gap="small">
                                            {
                                                can('update admins') && (
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={e => {
                                                            router.get(route('dashboard.admins.edit', record))
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )
                                            }

                                            {
                                                can('delete admins') && (
                                                    <Button color="danger" variant="outlined" onClick={e => {
                                                        axios.delete(route('dashboard.admins.destroy', record))
                                                            .then(_ => {
                                                                setAdmins(prev => prev.filter(admin => admin.id !== record.id));
                                                                setFlashMessage("Admin Deleted Successfully");
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
                        current={props.admins.current_page}
                        defaultCurrent={1}
                        // total={props.total_products}
                        pageSize={props.admins.per_page}
                        onChange={onPageChange}
                    />
                </div>
            </div>
        </AppLayout >
    );
}

