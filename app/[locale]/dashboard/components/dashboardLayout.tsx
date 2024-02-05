'use client';

import Navbar from './navbar';
import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
	children: ReactElement;
	pages: {
		[key: string]: Page;
	};
	signOut: (formData: FormData) => Promise<never>;
}

export interface Page {
	title: string;
	link: string;
}

export default function DashboardLayout({ children, pages, signOut }: Props) {
	const pathname = usePathname();
	const activePage = pathname.split('/').pop() ?? 'dashboard';

	return (
		<>
			<Navbar activePage={activePage} pages={pages} signOut={signOut} />
			<div className='flex flex-col flex-grow overflow-auto page-content animate-in p-7 bg-base-100'>
				{pages[activePage]?.title && <div className='text-2xl mb-7'>{pages[activePage].title}</div>}
				{children}
			</div>
		</>
	);
}
