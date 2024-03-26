import { AlertType } from '@/components/Alert';
import { ToastDelay } from '@/utils/provider/ToastProvider';
import { TransitionStartFunction } from 'react';

export interface Response {
	status: string;
	type: AlertType;
}

export const handleSubmitForm = (
	formData: FormData,
	action: (formData: FormData) => Promise<Response>,
	startTransition: TransitionStartFunction,
	setToast: (message: string, alertType: AlertType, delay?: ToastDelay | undefined) => void,
	t_default: (key: string, defaultMsg?: string | undefined) => string,
	form: HTMLFormElement | null = null
) => {
	startTransition(async () => {
		const response = await action(formData);
		setToast(t_default(response.status), response.type);

		if (form && response.status === '200') {
			form.reset();
		}
	});
};
