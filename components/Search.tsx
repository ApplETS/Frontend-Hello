'use client';

import React, { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	search: string;
}

export default function Search({ search }: Props) {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className="relative w-full max-w-lg">
			<input
				type="text"
				placeholder={search}
				value={searchTerm}
				className="input input-ghost w-full"
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
				<FontAwesomeIcon icon={faMagnifyingGlass} className="w-5" />
			</div>
		</div>
	);
}
