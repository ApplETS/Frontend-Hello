import React, { useRef, useLayoutEffect } from 'react';

interface Props {
	children: string;
	parentRef: React.RefObject<HTMLDivElement>;
	monthview: boolean;
}

export default function Marquee({ children, parentRef, monthview }: Props) {
	const marqueeRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const parentElement = parentRef.current;
		const marqueeElement = marqueeRef.current;
		if (parentElement && marqueeElement) {
			if (parentElement.scrollWidth > parentElement.clientWidth) {
				marqueeElement.classList.add('marquee');
			} else {
				marqueeElement.classList.remove('marquee');
			}
		}
	}, [children, parentRef]);

	return (
		<span className={`${monthview ? 'truncate' : ''}`} ref={marqueeRef}>
			{children}
		</span>
	);
}
