'use client';
import React, { useState, useEffect, useRef } from 'react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	items: { title: string; onClick?: () => void }[];
	inputName?: string;
	defaultItem?: { title: string; onClick?: () => void };
	defaultItemTheme?: { title: string; onClick?: () => void };
	customStyle?: string;
}

export default function ActivityAreaDropdown({ items, inputName, defaultItem, defaultItemTheme, customStyle }: Props) {
	const [selectedValue, setSelectedValue] = useState(defaultItem ?? items[0]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const onOptionClicked = (item: { title: string; onClick?: () => void }) => {
		if (item.onClick) item.onClick();
		setSelectedValue(item);
		setIsDropdownOpen(false);
	};

	// Toggle dropdown open/close
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
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
		<div className={`${customStyle} dropdown`} ref={dropdownRef}>
			<div
				tabIndex={0}
				role="button"
				id={inputName ?? 'dropdown'}
				className="flex justify-between items-center w-full btn bg-base-200 border-current hover:bg-base-300"
				onClick={toggleDropdown}
			>
				<span>{defaultItemTheme ? defaultItemTheme.title : selectedValue.title}</span>
				<FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className="w-5" />
			</div>
			{isDropdownOpen && (
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-full">
					{items.map((item) => (
						<li key={item.title}>
							<a onClick={() => onOptionClicked(item)}>{item.title}</a>
						</li>
					))}
				</ul>
			)}
			<input type="hidden" name={inputName} value={selectedValue.title} />
		</div>
	);
}
