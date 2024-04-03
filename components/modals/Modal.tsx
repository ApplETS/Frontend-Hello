import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type Props = {
	children: ReactNode;
	localModal?: boolean;
};

export default function Modal({ children, localModal }: Props) {
	const modalContent = (
		<div className="fixed inset-0 z-30 flex justify-center items-center">
			<dialog className={`modal bg-black bg-opacity-30`} open={true}>
				{children}
			</dialog>
		</div>
	);

	if (localModal) {
		return modalContent;
	} else {
		const modalContainer = document.getElementById('modal-root');

		if (modalContainer) {
			return ReactDOM.createPortal(modalContent, modalContainer);
		} else {
			return null;
		}
	}
}
