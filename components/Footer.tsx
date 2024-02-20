'use client';

import ETSImage from '@/components/ETSImage';
import ThemeButton from '@/components/themeButton';
import LanguageButton from '@/components/languageButton';
import { useTheme } from '@/utils/provider/ThemeProvider';

export default function Footer({ locale }: { locale: string }) {
	const { isLight } = useTheme();
	
	return (
		<>
			<div className='flex flex-col absolute bottom-6 left-8 gap-2'>
				<div className='btn btn-circle btn-ghost bg-base-100'>
					<ThemeButton />
				</div>
				<div className='btn btn-circle btn-ghost bg-base-100'>
					<LanguageButton />
				</div>
			</div>
			<div className={`absolute bottom-4 right-4 bg-cover`}>
				<ETSImage lang={locale} isDarkTheme={!isLight} />
			</div>
		</>
	);
}
