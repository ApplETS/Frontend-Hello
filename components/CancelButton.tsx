'use client';

import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { useSettings } from '@/utils/provider/SettingsProvider';

type Props = {
	buttonText: string;
	dialogText: {
		title: string;
		message: string;
		yes: string;
		no: string;
	};
};

export default function CancelButton({ buttonText, dialogText }: Props) {
	const { hasChanges } = useSettings();

	const [showConfirmDialog, setShowConfirmDialog] = useState(false);

	return (
		<>
			<button
				type="button"
				className="font-normal btn rounded-md text-base-content w-1/5 mt-auto ml-2"
				disabled={!hasChanges}
				onClick={() => setShowConfirmDialog(true)}
			>
				{buttonText}
			</button>
			{showConfirmDialog && (
				<ConfirmDialog
					title={dialogText.title}
					message={dialogText.message}
					yesMessage={dialogText.yes}
					noMessage={dialogText.no}
					onConfirm={() => {
						setShowConfirmDialog(false);
						window.location.reload();
					}}
					onCancel={() => setShowConfirmDialog(false)}
				/>
			)}
		</>
	);
}
