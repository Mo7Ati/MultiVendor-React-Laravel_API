import axiosClient from "@/axios-client";
import AppLayout from "@/layouts/app-layout";
import { RolesContext } from "@/providers/roles-provider";
import { BreadcrumbItem } from "@/types";
import { EAbilityType, RoleType } from "@/types/dashboard";
import { CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Button,
    Form,
    Switch,
    Spin,
} from 'antd';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];


export default function EditRole() {
    const { state, loaded, dispatch, setFlashMessage, getRoles } = useContext(RolesContext);
    const params = useParams();
    const [role, setRole] = useState<RoleType>(state.roles.find(role => role.id === Number(params.id))!);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        name: '',
        abilities: '',
    })
    const handleSubmit = () => {
        axiosClient.put(`/admin/dashboard/roles/${role.id}`, role).then(res => {
            dispatch({ type: "UPDATE_ROLE", payload: res.data });
            setFlashMessage('Role Updated Successfully');
            navigate('/admin/dashboard/roles');
        }).catch(res => {
            setErrors(res.response.data.errors);
        });
    }

    useEffect(() => {
        if (!loaded) {
            getRoles();
        }
    }, []);


    useEffect(() => {
        setRole(state.roles.find(role => role.id === Number(params.id))!);
    }, [loaded])


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Roles" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {role ?
                    (
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 800 }}
                            onFinish={handleSubmit}
                        >

                            <Form.Item label="Role Name"
                                help={
                                    errors.name && (
                                        <span className="ml-5  text-red-450 text-sm font-medium">
                                            {errors.name}
                                        </span>
                                    )
                                }
                                validateStatus={errors.name && 'error'}
                            >
                                <Input
                                    value={role.name}
                                    onChange={(e) => {
                                        errors.name = '';
                                        setRole({ ...role, name: e.currentTarget.value })
                                    }}
                                />
                            </Form.Item>


                            <Form.Item label="Abilities"
                                help={
                                    errors.abilities && (
                                        <span className="ml-5 text-red-450 text-sm font-medium">
                                            {errors.abilities}
                                        </span>
                                    )
                                }
                                validateStatus={errors.abilities && 'error'}
                            >

                                <div className="flex flex-col gap-10 items-center h-100 of-hidden flex-wrap">
                                    {
                                        role.abilities.map(ability => (
                                            <div className="flex gap-5" key={ability.id}>
                                                {
                                                    ability.ability
                                                }
                                                <Switch
                                                    onChange={
                                                        (e) => {
                                                            const newArray = [...role.abilities];
                                                            newArray.map((ab) => {
                                                                (ab.id === ability.id) && (ab.type = (e ? EAbilityType.ALLOW : EAbilityType.DENY));
                                                            })
                                                            setRole({ ...role, abilities: newArray });
                                                        }
                                                    }
                                                    checked={ability.type === 'allow'}
                                                    checkedChildren={<CheckOutlined />}
                                                    unCheckedChildren={<CloseOutlined />}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>

                            </Form.Item>

                            <Form.Item >
                                <div className="flex gap-10 mt-1">
                                    <Button color="primary" className="ml-20" htmlType="submit" variant="outlined">
                                        Edit
                                    </Button>
                                    <Button color="danger" variant="outlined"
                                        onClick={() => {
                                            navigate('/admin/dashboard/roles');
                                        }}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    ) : <Spin />
                }
            </div>
        </AppLayout >
    );
}

