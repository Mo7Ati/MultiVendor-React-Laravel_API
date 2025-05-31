// Components
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import axiosClient from '@/axios-client';

export default function VerifyEmail({ status }: { status?: string }) {

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('verification.send'));
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            {/* <Head title="Email verification" /> */}

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button variant="secondary">
                    {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                    Resend verification email
                </Button>

                <button onClick={() => { axiosClient.post('/admin/logout') }} className="mx-auto block text-sm">
                    Log out
                </button>
            </form>
        </AuthLayout>
    );
}
