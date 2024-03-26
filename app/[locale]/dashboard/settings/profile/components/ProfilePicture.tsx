'use client';
import { useState } from 'react';
import Dropzone from '@/components/Dropzone';

export default function ProfilePicture({ dropzoneText, buttonText }: { dropzoneText: string; buttonText: string }) {
	const [image, setImage] = useState<string | null>(null);

	const handleFileDrop = (file: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleDeletePicture = () => {
		setImage(null);
	};

	const handleDropzoneClick = () => {
		const fileInput = document.getElementById('fileInput');
		if (fileInput) {
			fileInput.click();
		}
	};

	// TODO : Make the image work
	const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			handleFileDrop(file);
		}
	};

	return (
		<>
			<div className="avatar placeholder w-36 h-36" onClick={handleDropzoneClick}>
				{image ? (
					<img src={image} className="rounded-full" alt="Dropped" />
				) : (
					<div className="bg-neutral text-neutral-content rounded-full w-36">
						<span className="text-3xl">D</span>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-2 col-span-2">
				<Dropzone title={dropzoneText} onFileDrop={handleFileDrop} />
				{image && (
					<button
						type="button"
						className="btn btn-error bg-inherit text-error hover:text-white rounded-md"
						onClick={handleDeletePicture}
					>
						{buttonText}
					</button>
				)}
			</div>
		</>
	);
}
