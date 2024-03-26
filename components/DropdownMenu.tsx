'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
	items: { text: string; icon: IconProp; color: string; id: number }[];
	onSelect?: (itemIndex: number, dropdownItemId: number) => void;
	itemIndex: number;
}

export default function DropdownMenu({ items, onSelect, itemIndex }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, dropdownItemId: number) => {
		event.preventDefault();
		onSelect && onSelect(itemIndex, dropdownItemId);
		setIsDropdownOpen(false);
	};

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
								<a href="#" className="flex space-x-2 w-full" onClick={(event) => handleItemClick(event, item.id)}>
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
