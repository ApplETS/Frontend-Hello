'use client';
import { useState, useEffect, useRef } from 'react';

interface PublicationDetailsProps {
	isDisabled: Boolean;
	items: string[]
  }

export default function Dropdown({ items, isDisabled }: PublicationDetailsProps) {
	const [selectedValue, setSelectedValue] = useState('Clubs scientifiques'); // TODO: get the selected value from the props
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleItemClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		setSelectedValue(event.currentTarget.textContent || '');
		setIsDropdownOpen(false);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
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
		<div className='dropdown relative w-full' ref={dropdownRef}>
			<div
				tabIndex={0}
				role='button'
				className='btn bg-inherit border-current w-full hover:bg-base-300'
				onClick={toggleDropdown}
			>
				{selectedValue}
			</div>
      {isDropdownOpen && !isDisabled && (
        <ul className={"dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"}>
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
	);
}
