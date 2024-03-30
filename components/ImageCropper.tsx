'use client';
import { getCroppedImg } from '@/utils/canvasUtils';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

interface Props {
	imageSrc: string;
	handleImageModalClose: () => void;
	handleImageModalConfirm: (croppedImage: string) => void;
}

export default function ImageCropper({ imageSrc, handleImageModalClose, handleImageModalConfirm }: Props) {
	const t = useTranslations('Publications.modal.image-cropper');
	const [croppedImageSrc, setCroppedImageSrc] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState(0);
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [showZoomHint, setShowZoomHint] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { isLight } = useTheme();
	const zoomTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

	useEffect(() => {
		clearTimeout(zoomTimeoutRef.current);
	}, []);

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const confirmCroppedImage = async () => {
		try {
			setIsLoading(true);
			const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
			setIsLoading(false);
			handleImageModalConfirm(croppedImage);
		} catch (e) {
			console.error(e);
		}
	};

	const onWheelRequest = (e: WheelEvent) => {
		// require the CTRL/⌘ key to be able to zoom with wheel
		if (e.ctrlKey || e.metaKey) {
			setShowZoomHint(false);
			return true;
		}
		setShowZoomHint(true);
		clearTimeout(zoomTimeoutRef.current);
		zoomTimeoutRef.current = setTimeout(() => setShowZoomHint(false), 2000);
		return false;
	};

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center w-full h-full">
					<div className="loading loading-spinner loading-lg"></div>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center w-full h-full">
					<div className="relative w-3/4 h-3/4">
						<Cropper
							image={imageSrc}
							crop={crop}
							rotation={rotation}
							zoom={zoom}
							aspect={2 / 1}
							onCropChange={setCrop}
							onRotationChange={setRotation}
							onCropComplete={onCropComplete}
							onWheelRequest={onWheelRequest}
							onZoomChange={setZoom}
							showGrid={false}
						/>
						{showZoomHint && (
							<div className={`flex justify-center items-center absolute inset-0 bg-black/25 w-full h-full`}>
								<p className="text-lg font-semibold">{t('zoom-hint')}</p>
							</div>
						)}
					</div>
					<div className="grid grid-cols-2 gap-6 px-24 mt-7">
						<button
							className={`btn text-black ${isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary'}`}
							onClick={() => handleImageModalClose()}
							type="button"
						>
							{t('cancel')}
						</button>
						<button className={`btn btn-success text-black`} onClick={() => confirmCroppedImage()}>
							{t('crop')}
						</button>
					</div>
				</div>
			)}
		</>
	);
}
