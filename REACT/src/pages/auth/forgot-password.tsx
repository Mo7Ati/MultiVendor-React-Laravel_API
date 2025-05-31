// Components
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import axiosClient from '@/axios-client';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    const navigate = useNavigate();


    const [error, setError] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [processing, setProcessing] = useState<Boolean>(false);

    const [data, setData] = useState<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        setProcessing(true);
        setError('');
        setStatus('');

        axiosClient.get('/sanctum/csrf-cookie').then(res => {
            axiosClient.post('/admin/forgot-password', data)
                .then(response => {
                    setStatus(response.data.status);
                }).catch(response => {
                    setError(response.response.data.message);
                }).finally(() => setProcessing(false));
        });
    };

    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            {/* <Head title="Forgot password" /> */}

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
                            placeholder="email@example.com"
                        />

                        <InputError message={error} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="text-muted-foreground space-x-1 text-center text-sm">
                    <span>Or, return to</span>
                    <TextLink to={'/admin/login'}>log in</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
