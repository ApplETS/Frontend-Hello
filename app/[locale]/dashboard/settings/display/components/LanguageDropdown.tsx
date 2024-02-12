'use client';
import Dropdown from '@/components/SignUpActivity';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function LanguageDropdown({ locale }: { locale: string }) {
	const languageDropdownItems = [
		{
			title: 'English',
			redirect: '/en/dashboard/settings/display',
		},
		{
			title: 'French',
			redirect: '/fr/dashboard/settings/display',
		},
	];
	const [selectedValue, setSelectedValue] = useState(
		locale === 'en' ? languageDropdownItems[0] : languageDropdownItems[1]
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Toggle dropdown open/close
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="dropdown">
			<div
				tabIndex={0}
				role="button"
				id={'dropdown'}
				className="btn bg-inherit border-current w-full hover:bg-inherit"
				onClick={toggleDropdown}
			>
				{selectedValue.title}
			</div>
			{isDropdownOpen && (
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max">
					{languageDropdownItems.map((item) => (
						<li key={item.title}>
							<Link href={item.redirect}>{item.title}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
