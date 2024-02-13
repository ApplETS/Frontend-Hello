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

	return (
		<>
			<div className="avatar placeholder">
				{image ? (
					<img src={image} className="rounded-full w-36 h-36" alt="Dropped" />
				) : (
					<div className="bg-neutral text-neutral-content rounded-full w-36">
						<span className="text-3xl">D</span>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-2 col-span-2">
				<Dropzone title={dropzoneText} onFileDrop={handleFileDrop} />
				<button type="button" className="btn btn-error bg-inherit text-error rounded-md">
					{buttonText}
				</button>
			</div>
		</>
	);
}
