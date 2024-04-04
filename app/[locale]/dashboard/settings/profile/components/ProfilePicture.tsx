'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Dropzone from '@/components/Dropzone';
import Avatar from '@/components/Avatar';
import Cropper, { Area } from 'react-easy-crop';
import { User } from '@/models/user';

interface Props {
	dropzoneText: string;
	buttonText: string;
	setCroppedAreaPixels: Dispatch<SetStateAction<Area | null>>;
	image: string | null;
	setImage: Dispatch<SetStateAction<string | null>>;
	rotation: number;
	setRotation: Dispatch<SetStateAction<number>>;
	user: User | undefined;
}

export default function ProfilePicture({
	dropzoneText,
	buttonText,
	setCroppedAreaPixels,
	image,
	setImage,
	rotation,
	setRotation,
	user,
}: Props) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [usePlaceholder, setUsePlaceholder] = useState(false);

	useEffect(() => {
		setUsePlaceholder(false);
	}, [user]);

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const handleFileDrop = (file: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleDeletePicture = () => {
		setImage(null);
		setUsePlaceholder(true);
	};

	return (
		<>
			{image ? (
				<div className="w-36 h-36 relative mask mask-circle">
					<Cropper
						image={image}
						crop={crop}
						rotation={rotation}
						cropSize={{ width: 150, height: 150 }}
						zoom={zoom}
						aspect={1}
						cropShape="round"
						maxZoom={10}
						onCropChange={setCrop}
						onRotationChange={setRotation}
						onCropComplete={onCropComplete}
						onWheelRequest={() => true}
						onZoomChange={setZoom}
						showGrid={true}
					/>
				</div>
			) : (
				<div className="avatar">
					<Avatar
						size="w-36 h-36"
						textSize="text-5xl"
						color="bg-base-300"
						usePlaceholderExtra={usePlaceholder}
						setUsePlaceholderExtra={setUsePlaceholder}
					/>
				</div>
			)}
			<div className="flex flex-col gap-2 col-span-2">
				<Dropzone title={dropzoneText} onFileDrop={handleFileDrop} />
				{(image || !usePlaceholder) && (
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
