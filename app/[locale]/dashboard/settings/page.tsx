import { AlertType } from '@/components/Alert';
import ConfirmButton from '@/components/ConfirmButton';
import Dropzone from '@/components/Dropzone';
import PasswordInput from '@/components/PasswordInput';
import Toast from '@/components/Toast';
import { updatePasswordSettings } from '@/utils/supabase/auth';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import React, { useState } from 'react';
import Profil from './profile/page';
import MotDePasse from './password/page';
import Apparence from './display/page';
import ReseauxSociaux from './socials/page';
import { redirect } from 'next/navigation';

export default function Page({
	searchParams,
	params,
}: {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
}) {
	return redirect(`/${params.locale}/dashboard/settings/profile`);
}
