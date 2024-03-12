'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function LanguageDropdown({
	locale,
	englishTitle,
	frenchTitle,
}: {
	locale: string;
	englishTitle: string;
	frenchTitle: string;
}) {
	const languageDropdownItems = [
		{
			title: englishTitle,
			redirect: '/en/dashboard/settings/display',
		},
		{
			title: frenchTitle,
			redirect: '/fr/dashboard/settings/display',
		},
	];
	const [selectedValue, setSelectedValue] = useState(
		locale === 'en' ? languageDropdownItems[0] : languageDropdownItems[1]
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Toggle dropdown open/close
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

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
		<div className="dropdown" ref={dropdownRef}>
			<div
				tabIndex={0}
				role="button"
				id={'dropdown'}
				className="flex justify-between items-center w-full btn bg-base-200 border-current hover:bg-base-300"
				onClick={toggleDropdown}
			>
				<span>{selectedValue.title}</span>
				<FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className="w-5" />
			</div>
			{isDropdownOpen && (
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-full">
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
