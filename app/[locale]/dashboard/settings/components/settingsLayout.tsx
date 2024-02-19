'use client';

import { ReactElement } from 'react';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSettings } from '@/utils/provider/SettingsProvider';

interface Props {
	children: ReactElement;
	locale: string;
	pages: {
		[key: string]: Page;
	};
	sectionTitle: string;
}

export interface Page {
	title: string;
	link: string;
	icon: IconDefinition;
}

export default function SettingsLayout({ children, locale, pages, sectionTitle }: Props) {
	const pathname = usePathname();
	const activePage = pathname.split('/').pop() ?? 'profile';
	const { hasChanges } = useSettings();

	return (
		<div className="flex flex-row h-screen gap-8">
			<div className="flex flex-col gap-2 basis-1/5">
				<p className="text-left text-2xl pb-10">{sectionTitle}</p>
				{Object.entries(pages).map(([pageKey, pageValue]) => (
					<Link
						key={pageKey}
						href={`/${locale}/dashboard/settings/${pageKey}`}
						className={`btn min-h-min h-min py-2 px-4 rounded-lg justify-start ${
							activePage === pageKey ? 'btn-primary' : 'btn-ghost'
						} 
						${hasChanges ? 'btn-disabled' : ''}`}
					>
						<div className="flex flex-row items-center gap-2">
							<FontAwesomeIcon icon={pageValue.icon} className="w-6" size="xl" />
							<p className={'px-4 text-xl font-normal'}>{pageValue.title}</p>
						</div>
					</Link>
				))}
			</div>
			{children}
		</div>
	);
}
