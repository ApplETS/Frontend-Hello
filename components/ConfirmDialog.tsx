'use client';

import React from 'react';
import Modal from './modals/Modal';

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
		<Modal>
			<div className="bg-base-200 rounded-lg shadow-lg p-5 max-w-md w-full">
				<h2 className="text-lg font-semibold">{title}</h2>
				<p className="my-4">{message}</p>
				<div className="divider my-1"></div>
				<div className="flex justify-end">
					<div className="grid grid-cols-2 gap-2">
						<button onClick={onCancel} className="btn btn-neutral font-normal w-24" type="button">
							{noMessage}
						</button>
						<button onClick={onConfirm} className="font-normal btn btn-primary" type="button">
							{yesMessage}
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}
