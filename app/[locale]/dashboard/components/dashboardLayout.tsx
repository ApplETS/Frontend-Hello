'use client';

import Navbar from './navbar';
import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/models/user';
import { useToast } from '@/utils/provider/ToastProvider';
import Toast from '@/components/Toast';
import NewsNavbar from '../news/components/NewsNavbar';

interface Props {
	children: ReactElement;
	pages: {
		[key: string]: Page;
	};
	signOut: (formData: FormData) => Promise<never>;
	user: User | null;
	locale: string;
}

export interface Page {
	title: string;
	link: string;
	isVisible: boolean;
}

export default function DashboardLayout({ children, pages, signOut, user, locale }: Props) {
	const pathname = usePathname();
	const activePage = pathname.split('/').pop() ?? 'dashboard';
	const { show, message, alertType, showToast } = useToast();

	return (
		<>
			{user !== null ? (
				<Navbar activePage={activePage} pages={pages} signOut={signOut} user={user} />
			) : (
				<NewsNavbar locale={locale} />
			)}
			<div className="flex flex-col flex-grow overflow-auto page-content animate-in p-7 bg-base-100">
				{message && (
					<div className={`z-10 ${show ? 'animate-in' : 'animate-out'}`}>
						<Toast message={message} alertType={alertType} onCloseToast={() => showToast(false)} />
					</div>
				)}
				{pages[activePage]?.title && activePage !== 'news' && pages[activePage]?.isVisible && (
					<div className="text-2xl mb-7">{pages[activePage].title}</div>
				)}

				{children}
			</div>
		</>
	);
}
