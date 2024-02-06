"use client";
import { useState } from "react";

interface Props {
	items: string[];
	inputName?: string;
}

export default function Dropdown({ items, inputName }: Props) {
	const [selectedValue, setSelectedValue] = useState(items[0]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const onOptionClicked = (item: string) => {
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
				id={inputName ?? "dropdown"}
				className="btn bg-inherit border-current w-full hover:bg-inherit"
				onClick={toggleDropdown}>
				{selectedValue}
			</div>
			{isDropdownOpen && (
				<ul
					tabIndex={0}
					className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max">
					{items.map((item) => (
						<li key={item}>
							<a onClick={(e) => onOptionClicked(item)}>{item}</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
