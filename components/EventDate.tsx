'use client';
import { HelloEvent } from '@/models/hello-event';
import { useTranslations } from 'next-intl';

interface Props {
	eventStartDate: string;
	eventEndDate: string;
	locale: string;
}

export default function EventDate({ eventStartDate, eventEndDate, locale }: Props) {
	const t = useTranslations('Profile');

	return (
		<div>
			<div className="mx-4 my-2">
				{eventStartDate && (
					<div className="text-sm font-normal">
						{/* If there is only a start date */}
						{eventStartDate && !eventEndDate && (
							<p>
								{new Date(eventStartDate).toLocaleDateString(locale, {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
									hour: 'numeric',
									minute: 'numeric',
								})}
							</p>
						)}
						{/* If there is a start date and an end date with the same day and month */}
						{eventStartDate &&
							eventEndDate &&
							new Date(eventStartDate).getDate() === new Date(eventEndDate).getDate() &&
							new Date(eventStartDate).getMonth() === new Date(eventEndDate).getMonth() && (
								<div className="mb-1">
									<span>
										{new Date(eventStartDate).toLocaleDateString(locale, {
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										})}
										{t('from')}
										{new Date(eventStartDate).toLocaleTimeString(locale, {
											hour: 'numeric',
											minute: 'numeric',
										})}
										{t('to')}
										{new Date(eventEndDate).toLocaleTimeString(locale, {
											hour: 'numeric',
											minute: 'numeric',
										})}
									</span>
								</div>
							)}
						{/* If there is a start date and an end date with only the same month */}
						{eventStartDate &&
							eventEndDate &&
							new Date(eventStartDate).getDate() !== new Date(eventEndDate).getDate() &&
							new Date(eventStartDate).getMonth() === new Date(eventEndDate).getMonth() && (
								<div className="mb-1">
									<span>
										{new Date(eventStartDate).toLocaleDateString(locale, {
											day: 'numeric',
										})}
										{' - '}
										{new Date(eventEndDate).toLocaleDateString(locale, {
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										})}
										{t('from')}
										{new Date(eventStartDate).toLocaleTimeString(locale, {
											hour: 'numeric',
											minute: 'numeric',
										})}
										{t('to')}
										{new Date(eventEndDate).toLocaleTimeString(locale, {
											hour: 'numeric',
											minute: 'numeric',
										})}
									</span>
								</div>
							)}
						{/* If there is a start date and an end date not in the same month */}
						{eventStartDate &&
							eventEndDate &&
							new Date(eventStartDate).getMonth() !== new Date(eventEndDate).getMonth() && (
								<>
									<div className="mb-1">
										<span>
											{new Date(eventStartDate).toLocaleDateString(locale, {
												day: 'numeric',
												month: 'long',
												year: 'numeric',
											})}
											{t('to')}
											{new Date(eventStartDate).toLocaleTimeString(locale, {
												hour: 'numeric',
												minute: 'numeric',
											})}
											{t('until')}
											{new Date(eventEndDate).toLocaleDateString(locale, {
												day: 'numeric',
												month: 'long',
												year: 'numeric',
											})}
											{t('to')}
											{new Date(eventEndDate).toLocaleTimeString(locale, {
												hour: 'numeric',
												minute: 'numeric',
											})}
										</span>
									</div>
								</>
							)}
					</div>
				)}
			</div>
			<div className="w-full aspect-[2/1]">
				{/* {imageUrl}  */}
				<img
					src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					alt="event"
					className="w-full h-full"
				/>
			</div>
		</div>
	);
}
