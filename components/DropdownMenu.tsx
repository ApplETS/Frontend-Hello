'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Constants from '@/utils/constants';

interface Props {
	items: { text: string; icon: IconProp; color: string }[];
	viewPublicationModal?: () => void;
	modifyPublicationModal?: () => void;
	duplicatePublicationModal?: () => void;
	deletePublicationModal?: () => void;
}

export default function DropdownMenu({
	items,
	viewPublicationModal,
	modifyPublicationModal,
	duplicatePublicationModal,
	deletePublicationModal,
}: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
		event.preventDefault();

		if (index === Constants.publicationMenuItemsStatus.open) {
			viewPublicationModal && viewPublicationModal();
		} else if (index === Constants.publicationMenuItemsStatus.modify) {
			modifyPublicationModal && modifyPublicationModal();
		} else if (index === Constants.publicationMenuItemsStatus.duplicate) {
			duplicatePublicationModal && duplicatePublicationModal();
		} else if (index === Constants.publicationMenuItemsStatus.delete) {
			deletePublicationModal && deletePublicationModal();
		}

		setIsDropdownOpen(false);
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
		<div className="flex items-center space-x-4" ref={dropdownRef}>
			<div className="dropdown relative">
				<button className="flex items-center" onClick={toggleDropdown}>
					<FontAwesomeIcon icon={faEllipsisVertical} className="w-5 ml-2" />
				</button>
				{isDropdownOpen && (
					<ul className={'p-2 shadow menu dropdown-content bg-base-100 rounded-box absolute z-10 right-0'}>
						{items.map((item, index) => (
							<li className={`flex ${item.color} w-40`} key={index}>
								<a href="#" className="flex space-x-2 w-full" onClick={(event) => handleItemClick(event, index)}>
									<FontAwesomeIcon icon={item.icon} className="w-5" />
									<span>{item.text}</span>
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
