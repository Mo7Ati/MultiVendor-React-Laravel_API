import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import axiosClient from '@/axios-client';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword() {
    const params = useParams();
    const [urlSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [error, setError] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [processing, setProcessing] = useState<Boolean>(false);


    const [data, setData] = useState<Required<ResetPasswordForm>>({
        token: params.token ?? '',
        email: urlSearchParams.get('email') ?? '',
        password: '',
        password_confirmation: '',
    });
    const submit: FormEventHandler = (e) => {

        e.preventDefault();

        setProcessing(true);

        axiosClient.get('/sanctum/csrf-cookie').then(res => {
            axiosClient.post('reset-password', data)
                .then(response => {
                    setStatus(response.data.status);
                    setTimeout(() => { navigate("/admin/login") }, 3000)
                }).catch(response => {
                    setError(response.response.data.message);
                }).finally(() => setProcessing(false));
        });
    };

    return (
        <AuthLayout title="Reset password" description="Please enter your new password below">
            {/* <Head title="Reset password" /> */}
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            readOnly
                            onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
                        />
                        <InputError message={error} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoFocus
                            onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                            placeholder="Password"
                        />
                        {/* <InputError message={errors.password} /> */}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData({ ...data, password_confirmation: e.currentTarget.value })}
                            placeholder="Confirm password"
                        />
                        {/* <InputError message={errors.password_confirmation} className="mt-2" /> */}
                    </div>

                    <Button type="submit" className="mt-4 w-full" >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Reset password
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
