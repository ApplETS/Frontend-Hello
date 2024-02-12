'use client';
import CancelButton from '@/components/CancelButton';
import ConfirmButton from '@/components/ConfirmButton';
import { useSettings } from '@/utils/provider/SettingsProvider';

interface SettingsFooterProps {
	locale: string;
	buttonText: string;
	errorText: string;
	inputsConfig: {
		match?: string[];
		filled?: string[];
	};
}

export default function SettingsFooter({ locale, buttonText, errorText, inputsConfig }: SettingsFooterProps) {
	const { hasChanges } = useSettings();
	return (
		<footer className="sticky flex justify-end mt-auto gap-2">
			{hasChanges && <p className="text-error mt-3">{errorText}</p>}
			<CancelButton locale={locale} />
			<ConfirmButton
				buttonText={buttonText}
				style={'btn btn-primary rounded-md text-base w-1/5 mt-auto'}
				inputsConfig={inputsConfig}
			/>
		</footer>
	);
}
