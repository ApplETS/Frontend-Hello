'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faFilter } from '@fortawesome/free-solid-svg-icons';

interface Props {
	title: string;
	items: string[];
	onFilterChange?: (selectedIndices: number[]) => void;
}

export default function DropdownSelect({ title, items, onFilterChange }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
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

	// Notify parent component about the selection change
	useEffect(() => {
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
					<FontAwesomeIcon icon={faFilter} size="lg" />
					{title}
					<FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className="w-5 ml-2" />
				</button>
				{isDropdownOpen && (
					<ul className="p-2 shadow menu bg-base-100 rounded-box absolute z-10">
						{items.map((item, index) => (
							<li className="flex" key={index}>
								<a className="flex items-center justify-start space-x-2" onClick={() => handleItemClick(index)}>
									<input
										type="checkbox"
										className="checkbox checkbox-primary"
										checked={selectedItems.includes(index)}
									/>
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
