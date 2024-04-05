'use client';

import { AlertType } from '@/components/Alert';
import { ReactNode, createContext, useContext, useState } from 'react';

type Props = {
	children: ReactNode;
};

export enum ToastDelay {
	short = 3000,
	long = 10000,
}

interface ToastContextType {
	show: boolean;
	message: string;
	alertType: AlertType;
	setToast: (message: string, alertType: AlertType, delay?: ToastDelay) => void;
	showToast: (show: boolean) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: Props) {
	const [show, showToast] = useState(false);
	const [message, setMessage] = useState('');
	const [alertType, setAlertType] = useState(AlertType.error);

	const setToast = (message: string, alertType: AlertType, delay: ToastDelay = ToastDelay.short) => {
		setMessage(message);
		setAlertType(alertType);
		showToast(true);
		setTimeout(() => {
			showToast(false);
		}, delay);
		setTimeout(() => {
			setMessage('');
		}, delay + 500);
	};

	const toast = {
		show,
		message,
		alertType,
		setToast,
		showToast,
	};

	return <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>;
}

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};
