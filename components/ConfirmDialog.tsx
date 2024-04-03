'use client';

import React from 'react';

interface Props {
	title: string;
	message: string;
	yesMessage: string;
	noMessage: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function ConfirmDialog({ title, message, yesMessage, noMessage, onConfirm, onCancel }: Props) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
			<div className="bg-base-200 rounded-lg shadow-lg p-5 max-w-md w-full">
				<h2 className="text-lg font-semibold">{title}</h2>
				<p className="my-4">{message}</p>
				<div className="divider my-1"></div>
				<div className="flex justify-end gap-4">
					<button
						onClick={onCancel}
						className="btn rounded-md text-base-content bg-base-300 hover:bg-base-400 w-1/5 mt-auto ml-2"
						type="button"
					>
						{noMessage}
					</button>
					<button onClick={onConfirm} className="font-normal btn btn-primary" type="button">
						{yesMessage}
					</button>
				</div>
			</div>
		</div>
	);
}
