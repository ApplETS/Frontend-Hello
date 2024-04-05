'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
	title: string;
	items: string[];
	onFilterChange?: (index: number) => void;
}

export default function Dropdown({ title, items, onFilterChange }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [titleText, setTitle] = useState(title);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleItemClick = (item: string | null) => {
		setIsDropdownOpen(false);
		if (item) {
			setTitle(item);
			if (onFilterChange) onFilterChange(items.indexOf(item));
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			} else {
				if ((event.target as HTMLElement).nodeName === 'A') {
					const target = event.target as HTMLAnchorElement;
					handleItemClick(target.textContent);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="flex items-center space-x-4" ref={dropdownRef}>
			<div className="dropdown relative">
				<button className="m-1 btn flex items-center btn-outline btn-accent" onClick={toggleDropdown}>
					{titleText}
					<FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className="w-5 ml-2" />
				</button>
				{isDropdownOpen && (
					<ul className="p-2 shadow menu dropdown-content bg-base-200 rounded-box absolute z-10">
						{items.map((item, index) => (
							<li className="w-40" key={index}>
								<a>{item}</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
