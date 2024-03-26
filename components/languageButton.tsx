'use client';

import { ChangeEvent, useTransition } from 'react';
import { useRouter, usePathname } from '../navigation';
import { useLocale } from 'next-intl';

export default function LanguageButton() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const locale = useLocale();

	const onSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextLocale = event.target.checked ? 'fr' : 'en';
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale });
		});
	};

	return (
		<label className="swap swap-flip text-base text-base-content">
			<input type="checkbox" checked={locale === 'fr'} disabled={isPending} onChange={onSelectChange} />

			<div className="swap-on">EN</div>
			<div className="swap-off">FR</div>
		</label>
	);
}
