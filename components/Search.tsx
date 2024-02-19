"use client";

import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	search: string;
	onSearchTermChange?: (term: string) => void;
}

export default function Search({ search, onSearchTermChange }: Props) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm);
		if (onSearchTermChange) onSearchTermChange(newSearchTerm);
	};
  
	return (
		<div className="relative w-full max-w-lg">
			<input
				type="text"
				placeholder={search}
				value={searchTerm}
				className="input input-ghost w-full border-base-content"
				onChange={handleChange}
			/>
			<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
				<FontAwesomeIcon icon={faMagnifyingGlass} className="w-5" />
			</div>
		</div>
	);
}
