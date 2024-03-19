'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

export default function HelpButton() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const t = useTranslations('Help');

	const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target as Node)
		) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative">
			{/* Add a ref to the button */}
			<div ref={buttonRef} className="btn btn-circle btn-ghost" onClick={toggleDropdown}>
				<FontAwesomeIcon className="w-6 h-6" icon={faQuestionCircle} />
			</div>
			{isDropdownOpen && (
				<div
					ref={dropdownRef}
					className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 absolute top-full right-0 z-10"
				>
					<p className="m-2 text-lg">{t('title')}</p>
					<p className="mx-2 mb-2">
						{t('contact-us')}{' '}
						<a href="mailto:applets@ens.etsmtl.ca" className="text-blue-600 text-accent hover:text-success underline">
							applets@ens.etsmtl.ca
						</a>
					</p>
				</div>
			)}
		</div>
	);
}
