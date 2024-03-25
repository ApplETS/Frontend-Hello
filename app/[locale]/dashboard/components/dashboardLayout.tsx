'use client';

import Navbar from './navbar';
import { ReactElement, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/models/user';
import NewsNavbar from '../news/components/NewsNavbar';
import { useToast } from '@/utils/provider/ToastProvider';
import { useUser } from '@/utils/provider/UserProvider';
import Toast from '@/components/Toast';
import { useLoading } from '@/utils/provider/LoadingProvider';
import LoadingSpinner from '@/components/modals/LoadingSpinner';

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
	const { isLoading } = useLoading();
	const { setUser } = useUser();

	useEffect(() => {
		if (user) {
			setUser(user);
		}
	}, []);

	return (
		<>
			{user !== null ? (
				<Navbar activePage={activePage} pages={pages} signOut={signOut} user={user} locale={locale} />
			) : (
				<NewsNavbar locale={locale} />
			)}
			{message && (
				<div className={`${show ? 'animate-in' : 'animate-out'} z-50`}>
					<Toast message={message} alertType={alertType} onCloseToast={() => showToast(false)} />
				</div>
			)}
			<div className="flex flex-col flex-grow overflow-auto page-content animate-in p-7 bg-base-100">
				{pages[activePage]?.title && activePage !== 'news' && pages[activePage]?.isVisible && (
					<div className="text-2xl mb-7">{pages[activePage].title}</div>
				)}

				{children}
				{isLoading && <LoadingSpinner />}
			</div>
			<div id="modal-root"></div>
		</>
	);
}
