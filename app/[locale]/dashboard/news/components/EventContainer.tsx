import React, { useRef } from 'react';
import Marquee from './Marquee';

interface Props {
	title: string;
}

export default function EventContainer({ title }: Props) {
	const parentRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={parentRef} className="parent-container overflow-hidden text-black">
			<Marquee parentRef={parentRef}>{title}</Marquee>
		</div>
	);
}
