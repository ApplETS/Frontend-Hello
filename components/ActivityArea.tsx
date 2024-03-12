'use client';
import { useState, useEffect, useRef } from 'react';

interface Props {
	isDisabled: boolean;
	items: string[];
}

export default function ActivityAreaDropdown({ items, isDisabled }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(items[0] || 'Dropdown');
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleItemClick = (item: string) => {
		setSelectedItem(item);
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
		<div ref={dropdownRef} className="dropdown w-full">
			<button
				className="btn bg-inherit border-current w-full hover:bg-base-300"
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				disabled={isDisabled}
			>
				{selectedItem}
			</button>
			{isDropdownOpen && (
				<ul tabIndex={-1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
					{items.map((item, index) => (
						<li key={index}>
							<a onClick={() => handleItemClick(item)}>{item}</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
