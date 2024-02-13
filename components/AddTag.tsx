'use client';
import React, { useState, useEffect, useRef } from 'react';

interface Props {
	titleButton: string;
	items: string[];
  onTagSelected: (value: string) => void;
}

export default function AddTag({ titleButton, items, onTagSelected }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleItemClick = (event: React.MouseEvent) => {
    onTagSelected("test");
		setIsDropdownOpen(false);
		event.stopPropagation();
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
		<div className='' ref={dropdownRef}>
			<div className='dropdown relative'>
				<div className="py-4 px-4 badge bg-secondary text-black">
					<button className='flex items-center' onClick={toggleDropdown}>
					{ titleButton }
					</button>
				</div>
				{isDropdownOpen && (
					<ul className={"p-2 shadow menu dropdown-content bg-base-100 rounded-box absolute z-10"}>
						{items.map((item, index) => (
							<li className={`flex w-full`} key={index} onClick={handleItemClick}>
								<a className="flex space-x-2">
								{item}
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
