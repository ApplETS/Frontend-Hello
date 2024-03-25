import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type Props = {
	children: ReactNode;
};

export default function Modal({ children }: Props) {
	const modalContent = (
		<div className="fixed inset-0 z-30 flex justify-center items-center">
			<dialog className={`modal bg-black bg-opacity-30`} open={true}>
				{children}
			</dialog>
		</div>
	);

	const modalContainer = document.getElementById('modal-root');

	if (modalContainer) {
		return ReactDOM.createPortal(modalContent, modalContainer);
	} else {
		return null;
	}
}
