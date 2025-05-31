import { FormEventHandler, useContext, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import axiosClient from '@/axios-client';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { NProgress } from 'nprogress';
import { DashboardAuthContext } from '@/providers/dashboard-provider';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string>("");
    const [processing, setProcessing] = useState<Boolean>(false);
    const { fetchUser } = useContext(DashboardAuthContext);

    const [loginData, setLoginData] = useState<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        setProcessing(true);
        axiosClient.get('/sanctum/csrf-cookie').then(res => {
            axiosClient.post("admin/login", loginData)
                .then(response => {
                    fetchUser();
                    navigate('/admin/dashboard');
                    setErrors('');
                }).catch(response => {
                    setErrors(response.response.data.message);
                    setProcessing(false);
                });
        });

    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            {/* <Head title="Log in" /> */}
            <Link to={'/admin/dashboard'}> Got TO dashboard</Link>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.currentTarget.value })}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink to={'/admin/forgot-password'} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.currentTarget.value })}
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={loginData.remember}
                            onClick={(e) => setLoginData({ ...loginData, remember: Boolean(e.currentTarget.value) })}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <TextLink to={'/admin/register'} tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
