'use client';

import { AlertType } from '@/components/Alert';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

type Props = {
	children: ReactNode;
};

export enum ToastDelay {
	short = 3000,
	long = 10000,
}

interface Toast {
	message: string;
	alertType: AlertType;
	showToast: boolean;
	delay: ToastDelay;
}

interface ToastContextType {
	toasts: Toast[];
	addToast: (message: string, alertType: AlertType, delay?: ToastDelay) => void;
	hideToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: Props) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = (message: string, alertType: AlertType, delay: ToastDelay = ToastDelay.short) => {
		const toast: Toast = {
			message: message,
			alertType: alertType,
			showToast: true,
			delay: delay,
		};

		setToasts((oldToasts) => [...oldToasts, toast]);
	};

	const hideToast = (id: number) => {
		setToasts((oldToasts) =>
			oldToasts.map((toast, index) => {
				return { ...toast, showToast: id === index ? false : toast.showToast };
			})
		);

		setTimeout(() => {
			setToasts((oldToasts) => oldToasts.filter((_, index) => index !== id));
		}, 400);
	};

	useEffect(() => {
		if (toasts.length > 0) {
			const lastToast = toasts[toasts.length - 1];
			const timeoutId = setTimeout(() => {
				hideToast(toasts.length - 1);
			}, lastToast.delay);

			return () => clearTimeout(timeoutId);
		}
	}, [toasts]);

	const toast = {
		toasts,
		addToast,
		hideToast,
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
