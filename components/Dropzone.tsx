'use client';
import { useCallback, useState } from 'react';

export default function Dropzone() {
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

	const handleDrop = useCallback((e: { preventDefault: () => void; dataTransfer: { files: any } }) => {
		e.preventDefault();
		setDragging(false);
		// Process files here
		console.log(e.dataTransfer.files);
	}, []);
	return (
		<div className='col-span-1'>
			<div
				className={`border-2 ${
					dragging ? 'border-blue-300' : 'border-gray-300'
				} border-dashed rounded-lg p-4 text-center cursor-pointer`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<input type='file' className='file-input w-full max-w-xs hidden' />
				Cliquez pour téléverser ou glisser-déposez
			</div>
		</div>
	);
}
