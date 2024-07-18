'use client';

import { Icons } from './icons';
import { Button } from './ui/button';

import { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function GoogleSignInButton() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => signIn('github', { callbackUrl: callbackUrl ?? '/dashboard' })}
        >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Continue with Github
        </Button>
    );
}
