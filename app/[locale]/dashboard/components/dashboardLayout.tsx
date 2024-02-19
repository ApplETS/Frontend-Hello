"use client";

import Navbar from './navbar';
import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/models/user';

interface Props {
	children: ReactElement;
	pages: {
		[key: string]: Page;
	};
	signOut: (formData: FormData) => Promise<never>;
	user: User;
}

export interface Page {
	title: string;
	link: string;
  isVisible: boolean;
}

export default function DashboardLayout({ children, pages, signOut, user }: Props) {
	const pathname = usePathname();
	const activePage = pathname.split('/').pop() ?? 'dashboard';

	return (
		<>
			<Navbar activePage={activePage} pages={pages} signOut={signOut} user={user} />
			<div className="flex flex-col flex-grow overflow-auto page-content animate-in p-7 bg-base-100">
				{pages[activePage]?.title && <div className="text-2xl mb-7">{pages[activePage].title}</div>}
				{children}
			</div>
		</>
	);
}
