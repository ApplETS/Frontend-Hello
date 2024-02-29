'use client';
import Image from 'next/image';
import { HelloEvent } from '@/models/hello-event';

interface Props {
	events: HelloEvent[];
}

export default function NewsTimeline({ events }: Props) {
	return (
		<div className="pl-10 timeline timeline-compact timeline-snap-icon timeline-vertical h-full overflow-y-auto">
			{events.map((event) => (
				<li className="">
					<hr />
					<div className="timeline-middle">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="timeline-end h-full flex flex-col justify-center px-4 py-2">
						<p className="font-mono italic">{event.eventStartDate.substring(0, 10)}</p>
						<div className="flex flex-col justify-center bg-base-200 rounded-3xl p-10 h-full">
							<div className="text-lg font-black">{event.title}</div>
							<img src={event.imageUrl} alt={event.title} className="rounded-3xl object-cover" />
							<p className="">{event.content}</p>
						</div>
					</div>
					<hr />
				</li>
			))}
		</div>
	);
}