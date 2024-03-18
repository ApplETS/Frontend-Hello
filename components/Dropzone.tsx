'use client';

import { useCallback, useState } from 'react';

export default function Dropzone({ title, onFileDrop }: { title: string; onFileDrop: (file: File) => void }) {
	const [dragging, setDragging] = useState(false);

	const handleDragOver = useCallback(
		(e: { preventDefault: () => void }) => {
			e.preventDefault();
			if (!dragging) {
				setDragging(true);
			}
		},
		[dragging]
	);

	const handleDragLeave = useCallback(() => {
		setDragging(false);
	}, []);

	const handleDrop = useCallback(
		(e: { preventDefault: () => void; dataTransfer: { files: any } }) => {
			e.preventDefault();
			if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
				const file = e.dataTransfer.files[0]; // Assuming only one file is dropped
				onFileDrop(file); // Call the callback with the file
			}
			setDragging(false);
		},
		[onFileDrop]
	);

	const handleInputClick = () => {
		// Trigger file input click when dropzone is clicked
		const fileInput = document.getElementById('fileInput');
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			onFileDrop(file);
		}
	};

	return (
		<div className="col-span-1">
			<div
				className={`border-2 ${
					dragging ? 'border-blue-300' : 'border-gray-300'
				} border-dashed rounded-lg p-4 text-center cursor-pointer`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleInputClick} // Add onClick handler to trigger file input
			>
				<input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleInputChange} />
				{title}
			</div>
		</div>
	);
}
