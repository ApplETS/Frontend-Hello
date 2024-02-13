'use client';
import Dropzone from '@/components/Dropzone';

export default function ProfilePicture({ dropzoneText, buttonText }: { dropzoneText: string; buttonText: string }) {
	return (
		<>
			<div className="avatar placeholder">
				<div className="bg-neutral text-neutral-content rounded-full w-36">
					<span className="text-3xl">D</span>
				</div>
			</div>
			<div className="flex flex-col gap-2 col-span-2">
				<Dropzone title={dropzoneText} />
				<button type="button" className="btn btn-error bg-inherit text-error rounded-md">
					{buttonText}
				</button>
			</div>
		</>
	);
}
