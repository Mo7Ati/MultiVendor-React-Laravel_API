import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useContext, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useNavigate } from 'react-router-dom';
import axiosClient from '@/axios-client';
import { DashboardAuthContext } from '@/providers/admin-dashboard-provider';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{}>({});
    const [processing, setProcessing] = useState<Boolean>(false);
    const { fetchUser } = useContext(DashboardAuthContext);


    const [data, setData] = useState<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        axiosClient.get('/sanctum/csrf-cookie').then(res => {
            axiosClient.post('/admin/register', data).then(response => {
                fetchUser();
                navigate('admin/dashboard')
                setErrors({});
            }).catch(response => {
                setErrors(response.response.data.errors);
                setProcessing(false);
            });
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
                            // disabled={processing!}
                            placeholder="Full name"
                        />
                        {/* <InputError message={errors.name} className="mt-2" /> */}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
                            // disabled={processing}
                            placeholder="email@example.com"
                        />
                        {/* <InputError message={errors.email} /> */}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                            // disabled={processing}
                            placeholder="Password"
                        />
                        {/* <InputError message={errors.password} /> */}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData({ ...data, password_confirmation: e.currentTarget.value })}
                            // disabled={processing}
                            placeholder="Confirm password"
                        />
                        {/* <InputError message={errors.password_confirmation} /> */}
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink to={'/admin/login'} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
