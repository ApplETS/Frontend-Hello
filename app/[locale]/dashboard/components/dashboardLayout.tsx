'use client';

import Navbar from './navbar';
import { ReactElement, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/models/user';
import NewsNavbar from '../news/components/NewsNavbar';
import { useToast } from '@/utils/provider/ToastProvider';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useUser } from '@/utils/provider/UserProvider';
import Toast from '@/components/Toast';
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
	const { toasts, hideToast } = useToast();
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
			<div className="flex flex-col flex-grow overflow-auto page-content animate-in p-7 bg-base-100">
				<div className="absolute shadow-md top-4 right-4 w-[32rem] z-50">
					<div className="w-full stack">
						{toasts.reverse().map((toast, index) => (
							<div className={`${toast.showToast ? 'animate-in' : 'animate-out'} w-full`}>
								<Toast
									key={index}
									message={toast.message}
									alertType={toast.alertType}
									delay={toast.delay}
									onCloseToast={() => hideToast(index)}
									isLastToast={index === 0}
								/>
							</div>
						))}
					</div>
				</div>
				{pages[activePage]?.title && activePage !== 'news' && pages[activePage]?.isVisible && (
					<div className="text-2xl mb-7">{pages[activePage].title}</div>
				)}
				{children}
				{isLoading && <LoadingSpinner />}
			</div>
		</>
	);
}
