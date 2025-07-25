import axiosClient from "@/axios-client";
import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { AdminsContext } from "@/providers/admin-provider";
import { BreadcrumbItem } from "@/types";
import { AdminType, RoleType } from "@/types/dashboard";
import { Button, Flex, Space, Table, Image, Pagination, message } from 'antd';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admins',
        href: '/admin/dashboard/admins',
    },
];

export default function AdminsIndex() {

    const { Column } = Table;
    const { admins, getAdmins, flashMessage, setFlashMessage, loaded, dispatch } = useContext(AdminsContext);
    const [messageApi, contextHolder] = message.useMessage();
    const can = usePermissions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            getAdmins();
        }
    }, [loaded]);

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
    //     navigate('admin/dashboard/admins');
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Admins" /> */}
            {contextHolder}
            <div className="rounded-xl p-4">
                {
                    can('create-admins') && (
                        <Button
                            color="primary"
                            variant="outlined"
                            className="mb-2"
                            onClick={() => navigate('/admin/dashboard/admins/create')}
                        >
                            Add Admin
                        </Button>
                    )
                }

                <Table<AdminType> dataSource={admins ?? undefined} rowKey="id" loading={!loaded}>
                    <Column title="Name" dataIndex="name" />
                    <Column title="username" dataIndex="username" />
                    <Column title="email" dataIndex="email" />
                    <Column title="phone_number" dataIndex="phone_number" />

                    {/* <Column title="Password" render={(_: any, record: AdminType) => (
                        <div>
                            {(record.password as string)}
                        </div>
                    )} /> */}

                    <Column
                        title="Roles"
                        render={
                            (_: any, record: AdminType) => {
                                return (
                                    <>
                                        {
                                            record.roles.map(role => {
                                                return (
                                                    <div>
                                                        {role.name}
                                                    </div>
                                                );
                                            })
                                        }
                                    </>
                                );
                            }} />
                    <Column title="super_admin" render={
                        (_: any, record: AdminType) => {
                            return (
                                <>
                                    {
                                        record.super_admin ? "true" : "false"
                                    }
                                </>
                            );
                        }} />
                    <Column title="Status" dataIndex="status" />


                    {
                        (can('update-admins') || can('delete-admins')) && (
                            <Column
                                title="Action"
                                render={(_: any, record: AdminType) => (
                                    <Space size="middle">
                                        <Flex gap="small">
                                            {
                                                can('update-admins') && (
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={e => {
                                                            navigate(`/admin/dashboard/admins/${record.id}/edit`)
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )
                                            }

                                            {
                                                can('delete-admins') && (
                                                    <Button color="danger" variant="outlined" onClick={e => {
                                                        axiosClient.delete(`/api/admin/dashboard/admins/${record.id}`).then(_ => {
                                                            dispatch({ type: "DELETE_ADMIN", payload: Number(record.id) });
                                                            setFlashMessage("Admin Deleted Successfully");
                                                        })
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

