'use client';
import { useState } from 'react';

interface Props {
	items: { title: string; onClick?: () => void }[];
	inputName?: string;
	defaultItem?: { title: string; onClick?: () => void };
}

export default function Dropdown({ items, inputName, defaultItem }: Props) {
	const [selectedValue, setSelectedValue] = useState(defaultItem ?? items[0]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const onOptionClicked = (item: { title: string; onClick?: () => void }) => {
		if (item.onClick) item.onClick();
		setSelectedValue(item);
		setIsDropdownOpen(false);
	};

	// Toggle dropdown open/close
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="dropdown">
			<div
				tabIndex={0}
				role="button"
				id={inputName ?? 'dropdown'}
				className="btn bg-inherit border-current w-full hover:bg-inherit"
				onClick={toggleDropdown}
			>
				{selectedValue.title}
			</div>
			{isDropdownOpen && (
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max">
					{items.map((item) => (
						<li key={item.title}>
							<a onClick={() => onOptionClicked(item)}>{item.title}</a>
						</li>
					))}
				</ul>
			)}
			{/* Hidden input to store the selected value */}
			<input type="hidden" name={inputName} value={selectedValue.title} />
		</div>
	);
}
