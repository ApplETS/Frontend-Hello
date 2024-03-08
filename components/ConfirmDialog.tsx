'use client';
import React from 'react';

// Props interface to type-check our component's props
interface ConfirmDialogProps {
	title: string;
	message: string;
	yesMessage: string;
	noMessage: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function ConfirmDialog({
	title,
	message,
	yesMessage,
	noMessage,
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
			<div className="bg-base-200 rounded-lg shadow-lg p-5 max-w-sm w-full">
				<h2 className="text-lg font-semibold">{title}</h2>
				<p className="my-4">{message}</p>
				<div className="flex justify-end gap-4">
					<button
						onClick={onCancel}
						className="btn rounded-md text-base-content bg-base-300 hover:bg-base-400 w-1/5 mt-auto ml-2"
						type="button"
					>
						{noMessage}
					</button>
					<button onClick={onConfirm} className="btn btn-primary" type="button">
						{yesMessage}
					</button>
				</div>
			</div>
		</div>
	);
}
