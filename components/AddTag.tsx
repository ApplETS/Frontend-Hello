'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';

interface Props {
	titleButton: string;
	items: string[];
	onTagSelected: (value: string) => void;
}

export default function AddTag({ titleButton, items, onTagSelected }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [, setSelectedItem] = useState(items[0] || 'Dropdown');
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isLight } = useTheme();

	const handleItemClick = (item: string) => {
		setSelectedItem(item);
		setIsDropdownOpen(false);
		onTagSelected(item);
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
		<div ref={dropdownRef} className="dropdown w-fit z-40">
			<button
				type="button"
				className={` badge py-4 px-4 bg-base-300 ${
					isLight ? 'hover:bg-secondary text-black' : 'hover:bg-base-100 text-white'
				}`}
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				{titleButton}
			</button>
			{isDropdownOpen && (
				<ul tabIndex={-1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
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
