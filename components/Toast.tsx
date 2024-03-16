'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { AlertType } from './Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faWarning, faCheck } from '@fortawesome/free-solid-svg-icons';

export interface ToastProps {
	message: string;
	alertType: AlertType;
	delay: number;
	onCloseToast?: () => void;
	isLastToast: boolean;
}

interface ExtendedCSSProperties extends CSSProperties {
	'--value'?: number;
	'--size'?: string;
}

export default function Toast(toastProps: ToastProps) {
	const { message, alertType, delay, onCloseToast } = toastProps;
	const [isVisible, setIsVisible] = useState(true);
	const [progress, setProgress] = useState(0);

	const handleClose = () => {
		if (onCloseToast) {
			onCloseToast();
		} else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		if (toastProps.isLastToast) {
			const intervalDuration = 10;
			const incrementValue = 100 / (delay / intervalDuration);
			const interval = setInterval(() => {
				setProgress((prevProgress) => {
					const newProgress = prevProgress + incrementValue;
					return newProgress > 100 ? 100 : newProgress;
				});
			}, intervalDuration);

			return () => clearInterval(interval);
		}
	}, [delay, toastProps.isLastToast]);

	useEffect(() => {
		if (progress >= 100) {
			handleClose();
		}
	}, [progress]);

	if (!isVisible) return null;

	const style: ExtendedCSSProperties = { '--value': progress, '--size': '2rem' };

	return (
		<div className={`alert ${alertType ?? 'alert-info'} flex items-center w-full p-4 shadow-xl`} role="alert">
			<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
				<FontAwesomeIcon icon={alertType === AlertType.success ? faCheck : faWarning} size="xl" className="pt-1" />
			</div>
			<div className="ms-3 text-base font-normal">{message}</div>
			<div
				className="flex flex-col cursor-pointer justify-center items-center radial-progress ms-auto h-8 w-8"
				style={style}
				role="progressbar"
				onClick={handleClose}
			>
				<FontAwesomeIcon icon={faClose} />
			</div>
		</div>
	);
}
