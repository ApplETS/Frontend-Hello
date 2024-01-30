'use client';

import ETSImage from '@/components/ETSImage';
import ThemeButton from '@/components/themeButton';
import LanguageButton from '@/components/languageButton';
import { useState } from 'react';

export default function Footer({ locale }: { locale: string }) {
	const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('isdark') === 'true');

	const handleThemeChange = (isDark: boolean) => {
		setIsDarkTheme(isDark);
	};
	return (
		<>
			<div className='flex flex-col absolute bottom-6 left-8 gap-2'>
				<div className='btn btn-circle btn-ghost bg-base-100'>
					<ThemeButton onThemeChange={handleThemeChange} />
				</div>
				<div className='btn btn-circle btn-ghost bg-base-100'>
					<LanguageButton />
				</div>
			</div>
			<div className={`absolute bottom-4 right-4 bg-cover`}>
				<ETSImage lang={locale} isDarkTheme={isDarkTheme} />
			</div>
		</>
	);
}
