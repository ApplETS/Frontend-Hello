'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faFilter } from '@fortawesome/free-solid-svg-icons';

interface Props {
	title: string;
	items: string[];
	onFilterChange?: (selectedIndices: number[]) => void;
	defaultSelected?: boolean;
}

export default function DropdownSelect({ title, items, onFilterChange, defaultSelected }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState<number[]>(defaultSelected ? items.map((_, index) => index) : []);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleItemClick = (index: number) => {
		const selectedIndex = selectedItems.indexOf(index);
		if (selectedIndex > -1) {
			setSelectedItems(selectedItems.filter((item) => item !== index));
		} else {
			setSelectedItems([...selectedItems, index]);
		}
	};

	useEffect(() => {
		// Notify parent component about the selection change
		if (onFilterChange) {
			onFilterChange(selectedItems);
		}
	}, [selectedItems]);

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
				<button className="m-1 btn flex items-center btn-outline btn-accent" onClick={toggleDropdown}>
					<FontAwesomeIcon icon={faFilter} />
					{title}
					<FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className="w-5 ml-2" />
				</button>
				{isDropdownOpen && (
					<ul className="p-2 shadow-xl menu bg-base-100 rounded-box absolute z-10" style={{ minWidth: '250px' }}>
						{items.map((item, index) => (
							<li className="flex" key={index}>
								<a className="flex items-center justify-start space-x-2" onClick={() => handleItemClick(index)}>
									<input type="checkbox" className="checkbox w-5 h-5" checked={selectedItems.includes(index)} />
									<span>{item}</span>
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
