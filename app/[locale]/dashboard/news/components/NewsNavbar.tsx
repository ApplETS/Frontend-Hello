'use client';

import React from 'react';
import ThemeButton from '@/components/themeButton';
import LanguageButton from '@/components/languageButton';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import SigninButton from './SigninButton';

interface Props {
	locale: string;
}

export default function NewsNavbar({ locale }: Props) {
	const t = useTranslations('Dashboard');
	return (
		<div className="navbar w-full bg-base-300">
			<div className="flex-1 ml-5 gap-3"></div>
			<div className="flex-none gap-2">
				<div className="btn btn-ghost btn-circle">
					<LanguageButton />
				</div>
				<ThemeButton />
				<div className="divider divider-horizontal before:bg-base-content after:bg-base-content my-2"></div>

				<div className="mr-5">
					<SigninButton />
				</div>
			</div>
		</div>
	);
}
