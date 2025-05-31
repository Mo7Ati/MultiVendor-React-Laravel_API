// Components
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import axiosClient from '@/axios-client';
import { routes } from '@/routes';
import { useNavigate } from 'react-router-dom';

export default function ConfirmPassword() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{}>({});
    const [processing, setProcessing] = useState<Boolean>(false);

    const [data, setData] = useState<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        axiosClient.post(routes.confirmPassword, data)
            .then(response => {
                navigate(routes.dashboard)
                setErrors('');
            }).catch(response => {
                setErrors(response.response.data.message);
                setProcessing(false);
            });
    };

    return (
        <AuthLayout
            title="Confirm your password"
            description="This is a secure area of the application. Please confirm your password before continuing."
        >
            {/* <Head title="Confirm password" /> */}

            <form onSubmit={submit}>
                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={data.password}
                            autoFocus
                            onChange={(e) => setData({ ...data, password: e.currentTarget.value })}
                        />

                        {/* <InputError message={errors.password} /> */}
                    </div>

                    <div className="flex items-center">
                        <Button className="w-full" >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Confirm password
                        </Button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
