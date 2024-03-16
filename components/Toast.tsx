'use client';

import React, { useState } from 'react';
import { AlertType } from './Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faWarning, faCheck } from '@fortawesome/free-solid-svg-icons';

export interface ToastProps {
	message: string;
	alertType: AlertType;
	onCloseToast?: () => void;
}

export default function Toast(toastProps: ToastProps) {
	const { message, alertType, onCloseToast } = toastProps;
	const [isVisible, setIsVisible] = useState(true);

	const handleClose = () => {
		if (onCloseToast) {
			onCloseToast();
		} else {
			setIsVisible(false);
		}
	};

	if (!isVisible) return null;

	return (
		<div
			className={`absolute top-4 right-4 alert ${
				alertType ?? 'alert-info'
			} flex items-center w-full max-w-md p-4 shadow-xl z-20`}
			role="alert"
		>
			<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
				<FontAwesomeIcon icon={alertType === AlertType.success ? faCheck : faWarning} size="xl" className="pt-1" />
			</div>
			<div className="ms-3 text-base font-normal">{message}</div>
			<button
				type="button"
				onClick={handleClose}
				className="ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
				aria-label="Close"
			>
				<FontAwesomeIcon icon={faClose} className="pt-1" />
			</button>
		</div>
	);
}
