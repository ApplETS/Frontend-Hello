import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export default function Modal({ children }: Props) {
	return (
		<div className="fixed inset-0 z-30 flex justify-center items-center">
			<dialog className={`modal bg-black bg-opacity-30`} open={true}>
				{children}
			</dialog>
		</div>
	);
}
