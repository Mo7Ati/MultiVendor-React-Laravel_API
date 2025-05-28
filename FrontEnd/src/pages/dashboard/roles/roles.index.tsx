import { usePermissions } from "@/hooks/use-permissions";
import AppLayout from "@/layouts/app-layout";
import { RolesContext } from "@/providers/roles-provider";
import { BreadcrumbItem } from "@/types";
import { RoleType } from "@/types/dashboard";
import { Button, Flex, Space, Table, Image, Pagination, message } from 'antd';
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/admin/dashboard/roles',
    },
];


export default function RoleIndex() {

    const { Column } = Table;
    const { state, loaded, flashMessage, setFlashMessage, dispatch, getRoles } = useContext(RolesContext);
    const [messageApi, contextHolder] = message.useMessage();
    const can = usePermissions();
    const navigate = useNavigate();


    useEffect(() => {
        if (flashMessage) {
            messageApi.open({
                type: 'success',
                content: flashMessage,
            });
            setFlashMessage('');
        }
    }, [flashMessage, messageApi]);

    useEffect(() => {
        if (!loaded) {
            getRoles();
        }
    }, [loaded])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Roles" /> */}
            {contextHolder}
            <div className="rounded-xl p-4">
                {
                    can('create-roles') && (
                        <Button
                            color="primary"
                            variant="outlined"
                            className="mb-2"
                            onClick={() => navigate('/admin/dashboard/roles/create')}
                        >
                            Add Role
                        </Button>
                    )
                }

                <Table<RoleType> dataSource={state.roles} rowKey="id" loading={!loaded} >
                    <Column title="Name" dataIndex={'name'} />
                    {
                        (can('delete-roles') && can('update-roles')) && (
                            <Column
                                title="Action"
                                render={(_: any, record: RoleType) => (
                                    <Space size="middle">
                                        <Flex gap="small">
                                            {
                                                can('update-roles') && (
                                                    <Button
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={e => {
                                                            navigate(`/admin/dashboard/roles/${record.id}/edit`)
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )
                                            }


                                            {
                                                can('delete-roles') && (
                                                    <Button color="danger" variant="outlined" onClick={e => {
                                                        axios.delete(route('dashboard.roles.destroy', record))
                                                            .then(_ => {
                                                                dispatch({ type: "DELETE_ROLE", payload: record.id! })
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
            </div>
        </AppLayout >
    );
}

