'use client';

import CancelButton from '@/components/CancelButton';
import ConfirmButton from '@/components/ConfirmButton';
import { useSettings } from '@/utils/provider/SettingsProvider';

interface SettingsFooterProps {
	buttonText: string;
	errorText: string;
	inputsConfig: {
		match?: string[];
		filled?: string[];
	};
	cancelButtonText: string;
	dialogText: {
		title: string;
		message: string;
		yes: string;
		no: string;
	};
	onSend?: () => void;
}

export default function SettingsFooter({
	buttonText,
	errorText,
	inputsConfig,
	cancelButtonText,
	dialogText,
	onSend,
}: SettingsFooterProps) {
	const { hasChanges } = useSettings();

	return (
		<footer className="sticky flex justify-end mt-auto gap-2 mb-5">
			{hasChanges && <p className="text-error mt-3">{errorText}</p>}
			<CancelButton buttonText={cancelButtonText} dialogText={dialogText} />
			<ConfirmButton
				buttonText={buttonText}
				style={'btn btn-primary rounded-md text-base w-1/5 mt-auto'}
				inputsConfig={inputsConfig}
				onClick={onSend}
			/>
		</footer>
	);
}
