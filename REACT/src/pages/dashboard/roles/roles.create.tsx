import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { AbilityType, EAbilityType, RoleType } from "@/types/dashboard";
import { useContext, useEffect, useState } from 'react';
import { CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Button,
    Form,
    Switch,
    Spin,
    Flex,
} from 'antd';
import { useAbilities } from "@/hooks/use-abilities";
import axiosClient from "@/axios-client";
import { useNavigate } from "react-router-dom";
import { RolesContext } from "@/providers/roles-provider";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function CreateRole() {

    const navigate = useNavigate();
    const { state, dispatch, setFlashMessage, loaded, getRoles } = useContext(RolesContext);
    const [role, setRole] = useState<RoleType>({
        name: '',
        abilities: state.allAbilities,
    });

    const [errors, setErrors] = useState({
        name: '',
        abilities: '',
    });

    useEffect(() => {
        if (!loaded) {
            getRoles();
        }
        setRole({ ...role, abilities: state.allAbilities });
    }, [loaded])


    console.log(role);

    const handleSubmit = () => {
        axiosClient.post('/api/admin/dashboard/roles', role)
            .then(res => {
                dispatch({ type: "ADD_ROLE", payload: res.data });
                setFlashMessage('Role Created Successfully');
                navigate('/admin/dashboard/roles');
            }).catch(res => {
                setErrors(res.response.data.errors);
            });;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Roles" /> */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
                                setRole({ ...role, name: e.currentTarget.value });
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
                                state.allAbilities.length ? state.allAbilities.map(ability => (
                                    <div className="flex gap-5" key={ability.name}>
                                        {
                                            ability.name
                                        }
                                        <Switch
                                            onChange={
                                                (e) => {
                                                    const newArray = [...state.allAbilities];
                                                    newArray.map((ab) => {
                                                        (ab.ability === ability.ability) && (ab.type = (e ? EAbilityType.ALLOW : EAbilityType.DENY));
                                                    })
                                                    setRole({ ...role, abilities: newArray });
                                                }
                                            }
                                            defaultChecked={false}
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                        />
                                    </div>
                                )) : <Spin size="large" className="" />
                            }
                        </div>

                    </Form.Item>

                    <Form.Item >
                        <div className="flex gap-10 mt-1">
                            <Button color="primary" className="ml-20" htmlType="submit" variant="outlined">
                                Create
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
            </div>
        </AppLayout >
    );
}
