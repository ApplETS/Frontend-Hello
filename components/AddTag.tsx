'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { Tag } from '@/models/tag';

interface Props {
	searchText: string;
	items: Tag[];
	onTagSelected: (value: Tag) => void;
}

export default function AddTag({ searchText, items, onTagSelected }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredItems, setFilteredItems] = useState<Tag[]>(items);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isLight } = useTheme();

	const handleItemClick = (item: Tag) => {
		onTagSelected(item);
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

	useEffect(() => {
		setFilteredItems(items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
	}, [searchTerm, items]);

	return (
		<div ref={dropdownRef} className="dropdown w-fit z-40">
			<button
				type="button"
				className={`badge py-4 px-4 bg-base-300 rounded-full ${
					isLight ? 'hover:bg-secondary text-black' : 'hover:bg-base-100 text-white'
				}`}
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				+
			</button>

			{isDropdownOpen && (
				<div className="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-60 mb-1">
					<input
						type="text"
						placeholder={searchText}
						className="input input-ghost w-full mb-2"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<ul className="max-h-40 overflow-y-auto">
						{filteredItems.map((item, index) => (
							<li key={index}>
								<button type="button" className="w-full text-left" onClick={() => handleItemClick(item)}>
									{item.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
