import React, { useRef, useLayoutEffect } from 'react';

interface Props {
	children: string;
	parentRef: React.RefObject<HTMLDivElement>;
}

export default function Marquee({ children, parentRef }: Props) {
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

	return <span ref={marqueeRef}>{children}</span>;
}
