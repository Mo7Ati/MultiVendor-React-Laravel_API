import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { AbilityType, EAbilityType, RoleType } from "@/types/dashboard";
import { useEffect } from 'react';
import { CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Button,
    Form,
    Switch,
} from 'antd';
import { useAbilities } from "@/hooks/use-abilities";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

interface Iprops {
    role: RoleType,
    allAbilities: string[],

}

export default function CreateRole(props: Iprops) {
    const {
        data,
        setData,
        errors,
        post,
    } = useForm<RoleType>({
        id: props.role.id,
        name: props.role.name,
        abilities: useAbilities(props.allAbilities),
    });

    const handleSubmit = () => {
        post(route('dashboard.roles.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
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
                            value={data.name}
                            onChange={(e) => {
                                errors.name = '';
                                setData('name', e.currentTarget.value)
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
                                data.abilities?.map(ability => (
                                    <div className="flex gap-5" key={ability.name}>
                                        {
                                            ability.name
                                        }
                                        <Switch
                                            onChange={
                                                (e) => {
                                                    const newArray = [...data.abilities];
                                                    newArray.map((ab) => {
                                                        (ab.name === ability.name) && (ab.type = (e ? EAbilityType.ALLOW : EAbilityType.DENY));
                                                    })
                                                    setData('abilities', newArray);
                                                }
                                            }
                                            defaultChecked={false}
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
                                Create
                            </Button>
                            <Button color="danger" variant="outlined"
                                onClick={() => {
                                    router.get(route('dashboard.roles.index'));
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
