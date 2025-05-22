import { type BreadcrumbItem, type SharedData } from '@/types';
// import { Transition } from '@headlessui/react';
import { FormEventHandler, useContext, useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Link } from 'react-router-dom';
import { DashboardAuthContext } from '@/providers/dashboard-provider';
import axiosClient from '@/axios-client';
import { Transition } from '@headlessui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

interface ProfileForm {
    name: string;
    email: string;
}

export default function Profile() {

    const { user, setUser } = useContext(DashboardAuthContext);

    const [data, setData] = useState<Required<ProfileForm>>({
        name: user?.name!,
        email: user?.email!,
    });
    const [status, setStatus] = useState<string>('');

    const [errors, setErrors] = useState({
        name: '',
        email: '',
    });

    const [processing, setProcessing] = useState<boolean>(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState<boolean>(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);

        axiosClient.put('/user/profile-information', data)
            .then(res => {
                setRecentlySuccessful(true);
            }
            ).catch(res => {
                setErrors(res.response.data.errors);
            }).finally(() => setProcessing(false));
    };
    console.log(status);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {user?.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <button onClick={e => {
                                        axiosClient.post("email/verification-notification")
                                            .then(res => setStatus('Email Verification Has Been Sent To Your Email'))
                                    }} type='button'>
                                        Click here to resend the verification email.
                                    </button>
                                </p>
                                {status && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        {status}
                                    </div>
                                )}
                            </div>

                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>
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
            </SettingsLayout >
        </AppLayout >
    );
}
