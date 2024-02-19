'use client';

import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/models/user';
import NewsNavbar from './NewsNavbar';

interface Props {
	children: ReactElement;
}

export interface Page {
	title: string;
	link: string;
	isVisible: boolean;
}

export default function NewsLayout({ children }: Props) {
	const pathname = usePathname();
	const activePage = pathname.split('/').pop() ?? 'dashboard';

	return (
		<>
			<NewsNavbar />
			<div className="flex flex-col flex-grow overflow-auto page-content animate-in p-7 bg-base-100">{children}</div>
		</>
	);
}
