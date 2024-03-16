'use client';

import React, { useEffect, useRef, useState } from 'react';
import ThemeButton from '@/components/themeButton';
import LanguageButton from '@/components/languageButton';
import { Page } from './dashboardLayout';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { User } from '@/models/user';
import { useTranslations } from 'next-intl';
import { UserTypes } from '@/models/user-types';

interface Props {
	activePage: string;
	pages: {
		[key: string]: Page;
	};
	signOut: (formData: FormData) => Promise<never>;
	user: User;
}

export default function Navbar({ activePage, pages, signOut, user }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const t = useTranslations('Navbar');
	const isModerator = user.type == UserTypes.MODERATOR;

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="navbar w-full bg-base-300">
			<div className="flex-1 ml-5 gap-3">
				{Object.entries(pages).map(
					([pageKey, pageValue]) =>
						pageValue.isVisible && (
							<Link
								key={pageKey}
								className={`btn min-h-min h-min py-2 px-4 rounded-lg ${
									activePage === pageKey ? 'btn-primary ' : 'btn-ghost'
								}`}
								href={pageValue.link}
							>
								<span className={`px-4 text-base`}>{pageValue.title}</span>
							</Link>
						)
				)}
			</div>
			<div className="flex-none gap-2">
				<div className="btn btn-ghost btn-circle">
					<LanguageButton />
				</div>
				<ThemeButton />
				<div className="divider divider-horizontal before:bg-base-content after:bg-base-content my-2"></div>

				<div className="dropdown dropdown-end mr-5" ref={dropdownRef}>
					<div tabIndex={0} role="button" className="btn btn-ghost" onClick={toggleDropdown}>
						{isModerator ? (
							<div className="text-base mr-1">{t('moderator')}</div>
						) : (
							<div className="text-base mr-1">{user.organisation}</div>
						)}
						<div className="avatar">
							<div className="w-10 rounded-full">
								{/* TODO : Replace with the real user image */}
								<img
									alt="Tailwind CSS Navbar component"
									src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
								/>
							</div>
						</div>
					</div>
					{isDropdownOpen && (
						<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-max">
							<li className="pointer-events-none">
								<div className="flex flex-row pl-2">
									<div className="avatar placeholder">
										<div className="bg-neutral text-neutral-content rounded-full w-10">
											<span className="text-sm">D</span>
										</div>
									</div>
									<div className="flex flex-col gap-1">
										{isModerator ? (
											<p className="text-base font-bold ml-0">{t('moderator')}</p>
										) : (
											<p className="text-base font-bold ml-0">{user.organisation}</p>
										)}
										<p className="text-xs ml-0 text-secondary">{user.activityArea}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="flex flex-row gap-2">
									<Link href={'/fr/dashboard/settings/profile'}>
										<FontAwesomeIcon icon={faCog} className="pr-2" />
										{t('settings')}
									</Link>
								</div>
							</li>
							<div className="divider my-0"></div>
							<li>
								<form action={signOut}>
									<input type="hidden" name="redirectLink" value={`/fr/login`} />
									<div className="flex flex-row gap-2">
										<FontAwesomeIcon icon={faSignOut} className="pt-1" />
										<button>{t('sign-out')}</button>
									</div>
								</form>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
