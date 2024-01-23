'use client';
import { useState } from 'react';

export default function Dropdown() {
	const [selectedValue, setSelectedValue] = useState('Clubs scientifiques');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const onOptionClicked = (value: string) => {
		setSelectedValue(value);
		setIsDropdownOpen(false);
	};

	// Toggle dropdown open/close
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className='dropdown'>
			<div
				tabIndex={0}
				role='button'
				className='btn bg-inherit border-primary w-full text-primary hover:bg-inherit'
				onClick={toggleDropdown}
			>
				{selectedValue}
			</div>
			{isDropdownOpen && (
				<ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-accent rounded-box w-max'>
					<li>
						<a onClick={(e) => onOptionClicked(e.currentTarget.text)}>Clubs scientifiques</a>
					</li>
					<li>
						<a onClick={(e) => onOptionClicked(e.currentTarget.text)}>ÉTS</a>
					</li>
					<li>
						<a onClick={(e) => onOptionClicked(e.currentTarget.text)}>Service à la Vie Étudiante</a>
					</li>
					<li>
						<a onClick={(e) => onOptionClicked(e.currentTarget.text)}>AEETS</a>
					</li>
				</ul>
			)}
		</div>
	);
}
