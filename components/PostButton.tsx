'use client';
import React, { useState } from 'react';
import PublicationsDetails from '@/components/modals/PublicationDetails';
import { User } from '@/models/user';

interface Props {
	locale: string;
	text: string;
	modalMode: Number;
	props: {
		pageTitle: any;
		title: string;
		activityArea: string;
		altText: string;
		publishedDate: string;
		eventStartDate: string;
		eventEndDate: string;
		addTag: string;
		tagsTitle: string;
		content: string;
		newsTitle: string;
		eventTitle: string;
		chooseFile: string;
		cancelButton: string;
		submitButton: string;
		approveButton?: string;
		rejectButton?: string;
		tags: string[];
		toolTipText: string;
		errorToastMessage: string;
		dateErrorToastMessage: string;
		imageFormatErrorToastMessage: string;
		previewTitle: string;
	};
	user: User;
}

export default function PostButton({ locale, text, props, modalMode, user }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className="relative w-full max-w-lg">
			{isModalOpen && (
				<PublicationsDetails
					locale={locale}
					props={props}
					modalMode={modalMode}
					user={user}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
			<button className="btn btn-primary text-base-100" onClick={toggleModal}>
				{text}
			</button>
		</div>
	);
}
