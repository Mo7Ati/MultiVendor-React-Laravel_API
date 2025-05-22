import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
// import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosClient from '@/axios-client';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

export default function Password() {
    const [data, setData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({
        current_password: '',
        password: '',
    });

    const [processing, setProcessing] = useState<boolean>(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState<boolean>(false);

    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const updatePassword: FormEventHandler = (e) => {
        setProcessing(true);
        e.preventDefault();
        axiosClient.put("/user/password", data)
            .then(response => {

            }).catch(reason => {
                setErrors(reason.response.data.errors);

                if (reason.response.data.errors.current_password) {
                    setData({ ...data, current_password: '' });
                    currentPasswordInput.current?.focus();
                } else if (reason.response.data.errors.password) {
                    setData({ ...data, password: '', password_confirmation: '' });
                    passwordInput.current?.focus();
                }

            }).finally(() => setProcessing(false));
    }


    //     put(route('password.update'), {
    //         preserveScroll: true,
    //         onSuccess: () => reset(),
    //         onError: (errors) => {
    //             if (errors.password) {
    //                 reset('password', 'password_confirmation');
    //                 passwordInput.current?.focus();
    //             }

    //             if (errors.current_password) {
    //                 reset('current_password');
    //                 currentPasswordInput.current?.focus();
    //             }
    //         },
    //     });
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Profile settings" /> */}

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Current password</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData({ ...data, current_password: e.currentTarget.value })}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Current password"
                            />

                            <InputError message={errors.current_password[0]} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New password</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="New password"
                            />

                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData({ ...data, password_confirmation: e.currentTarget.value })}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                            />

                            <InputError message={errors.password[0]} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save password</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

