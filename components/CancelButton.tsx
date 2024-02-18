'use client';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function CancelButton({ locale, buttonText }: { locale: string; buttonText: string }) {
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	return (
		<>
			<button
				type="button"
				className="btn rounded-md text-base-content w-1/5 mt-auto ml-2"
				onClick={() => setShowConfirmDialog(true)}
			>
				{buttonText}
			</button>
			{showConfirmDialog && (
				<ConfirmDialog
					title="Reset Changes"
					message="Are you sure you want to reset all changes made to the fields of the page?"
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
