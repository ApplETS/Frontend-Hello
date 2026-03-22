'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { signIn } from "next-auth/react";

type Props = {
};

export default function SigninButton({ }: Props) {
    const t = useTranslations('Dashboard');
    const baseUrl = process.env.NEXTAUTH_URL;

    return (
        <button type="button" className="btn btn-ghost" onClick={() => {
            signIn("authentik");
        }}>
            <div className="text-base mr-1">{t('login')}</div>
            <div className="avatar rounded-full bg-base-100">
                <div className="w-10 pt-2 pr-1">
                    <FontAwesomeIcon icon={faSignIn} size="xl" />
                </div>
            </div>
        </button>
    );
}