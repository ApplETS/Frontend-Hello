'use client';

import React, { useState, useEffect, useRef } from 'react';
import ActivityArea from '@/components/ActivityArea';
import AddTag from '@/components/AddTag';
import Constants from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useTheme } from '@/utils/provider/ThemeProvider';
import Toast from '@/components/Toast';
import { AlertType } from '../Alert';
import Preview from './Preview';
import { User } from '@/models/user';
import { HelloEvent } from '@/models/hello-event';

const EditorComp = dynamic(() => import('../EditorComponent'), { ssr: false });

interface PublicationDetailsProps {
	locale: string;
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
		tags: string[];
		toolTipText: string;
		errorToastMessage: string;
		dateErrorToastMessage: string;
		imageFormatErrorToastMessage: string;
		previewTitle: string;
	};
	user: User;
	onClose: () => void;
	selectedEvent: HelloEvent | null;
}

export default function ApprobationDetails({
	locale,
	props,
	modalMode,
	user,
	onClose,
	selectedEvent,
}: PublicationDetailsProps) {
	const { isLight } = useTheme();
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const [title, setTitle] = useState(selectedEvent?.title || '');
	const [imageSrc, setImageSrc] = useState(selectedEvent?.imageUrl || '');
	const [altText, setAltText] = useState('');
	const [content, setContent] = useState(selectedEvent?.content || '');
	const [activityArea, setActivityArea] = useState(selectedEvent?.organizer?.activityArea || user.activityArea);
	const [eventStartDate, setEventStartDate] = useState(selectedEvent?.eventStartDate.substring(0, 16) || '');
	const [eventEndDate, setEventEndDate] = useState(selectedEvent?.eventEndDate.substring(0, 16) || '');
	const [publishedDate, setPublishedDate] = useState(selectedEvent?.publicationDate.substring(0, 10) || '');
	const [selectedTags, setSelectedTags] = useState<string[]>(selectedEvent?.tags || []);
	const [availableTags, setAvailableTags] = useState(props.tags);
	const isDisabled =
		modalMode === Constants.publicationModalStatus.view || modalMode === Constants.publicationModalStatus.delete;
	const addTagButtonIsDisabled = selectedTags.length >= 5;
	const [showPreview, setShowPreview] = useState(false);

	const previewInfos = {
		news: props.newsTitle,
		title: title,
		imageSrc: imageSrc,
		altText: altText,
		author: user.organisation,
		activityArea: user.activityArea,
		content: content,
		eventDateTitle: props.eventTitle,
		eventStartDate: eventStartDate,
		eventEndDate: eventEndDate,
		publishedDate: publishedDate,
		selectedTags: selectedTags,
	};

	const handleClose = () => {
		onClose();
	};

	const submit = () => {
		if (!title || !imageSrc || !altText || !content || !eventStartDate || !eventEndDate || !publishedDate) {
			setShowToast(true);
			setToastMessage(props.errorToastMessage);
			return;
		}

		if (new Date(eventEndDate).getTime() < new Date(eventStartDate).getTime()) {
			setShowToast(true);
			setToastMessage(props.dateErrorToastMessage);
			return;
		}

		// TODO Submit to backend
		onClose();
	};

	useEffect(() => {
		setAvailableTags(props.tags.filter((tag) => !selectedTags.includes(tag)));
	}, [selectedTags, props.tags]);

	const handleTagSelect = (tagValue: string) => {
		setSelectedTags((prevTags) => {
			if (!prevTags.includes(tagValue)) {
				return [...prevTags, tagValue];
			}
			return prevTags;
		});
	};

	const handleTagDelete = (tagValue: string) => {
		setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagValue));
	};

	const handleFileDrop = (file: File) => {
		const allowedTypes = ['image/jpeg', 'image/png'];
		console.log(file.type);
		console.log(allowedTypes.includes(file.type));

		if (!allowedTypes.includes(file.type)) {
			setToastMessage(props.imageFormatErrorToastMessage);
			setShowToast(true);
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setImageSrc(reader.result as string);
		};

		reader.readAsDataURL(file);
	};

	const handleContentChange = (newContent: string) => {
		setContent(newContent);
	};

	const handleCloseToast = () => {
		setShowToast(false);
	};

	const handleClosePreview = () => {
		setShowPreview(false);
	};

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-30 z-40">
				<dialog id="publication_modal" className="modal overflow-y-auto p-4" open={true}>
					{showToast && <Toast message={toastMessage} alertType={AlertType.error} onCloseToast={handleCloseToast} />}
					<div className="overflow-y-auto w-full">
						<div className="modal-box w-3/4 max-w-7xl mx-auto p-5 bg-base-200 max-h-[80vh]">
							<div className="grid grid-cols-2 gap-2"></div>
							<div className="flex items-center gap-2">
								<h1 className="text-2xl block mb-2">{props.pageTitle}</h1>
								{modalMode === Constants.publicationModalStatus.modify && (
									<div className="tooltip tooltip-bottom ml-2" data-tip={props.toolTipText}>
										<button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">
											!
										</button>
									</div>
								)}
								<div className="ml-auto mb-2">
									<button className="btn btn-primary" onClick={() => setShowPreview(true)}>
										{props.previewTitle}
									</button>
								</div>
							</div>

							<div className="flex mb-3">
								<div className="grid grid-cols-3 gap-4">
									<div className="col-span-2">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<div>
													<label className="block">{props.title}</label>
													<input
														type="text"
														value={title}
														className="input input-ghost w-full border-base-content"
														onChange={(e) => setTitle(e.target.value)}
														disabled={isDisabled}
													/>
												</div>
												<div className="mt-3">
													<label className="block">{props.publishedDate}</label>
													<input
														type="date"
														value={publishedDate}
														className="input input-ghost w-full border-base-content"
														onChange={(e) => setPublishedDate(e.target.value)}
														disabled={isDisabled}
													/>
												</div>
											</div>
											<div>
												<div className="z-30">
													<label className="block">{props.activityArea}</label>
													<ActivityArea
														items={['Clubs scientifiques', 'ÉTS', 'Service à la Vie Étudiante', 'AEETS']}
														isDisabled={isDisabled}
													/>
												</div>
												<div className="mt-3">
													<label className="block">{props.altText}</label>
													<input
														type="text"
														value={altText}
														className="input input-ghost w-full border-base-content"
														onChange={(e) => setAltText(e.target.value)}
														disabled={isDisabled}
													/>
												</div>
											</div>

											<div className="mb-3">
												<label className="block">{props.eventStartDate}</label>
												<input
													type="datetime-local"
													value={eventStartDate}
													className="input input-ghost w-full border-base-content"
													onChange={(e) => setEventStartDate(e.target.value)}
													disabled={isDisabled}
												/>
											</div>
											<div className="mb-3">
												<label className="block">{props.eventEndDate}</label>
												<input
													type="datetime-local"
													value={eventEndDate}
													className="input input-ghost w-full border-base-content"
													onChange={(e) => setEventEndDate(e.target.value)}
													min={eventStartDate}
													disabled={isDisabled}
												/>
											</div>
										</div>
									</div>

									<div className="flex-1 ml-4 h-64 overflow-hidden rounded-lg">
										<input
											type="file"
											className="file-input file-input-bordered file-input-accent w-full"
											disabled={isDisabled}
											accept="image/*"
											onChange={(e) => {
												if (e.target.files && e.target.files.length > 0) {
													handleFileDrop(e.target.files[0]);
												}
											}}
										/>
										{imageSrc ? (
											<img src={imageSrc} alt={altText} className="w-full h-full object-cover rounded-lg mt-2" />
										) : (
											<div
												className={`w-full h-full rounded-lg mt-2 ${isLight ? 'bg-base-300 ' : 'bg-base-100'}`}
											></div>
										)}
									</div>
								</div>
							</div>

							<div className="mb-3">
								<label className="block">{props.tagsTitle}</label>
								<div
									className={`flex items-center gap-2 py-2 px-2 border border-base-content rounded-md ${
										isDisabled ? 'h-10' : ''
									}`}
								>
									{selectedTags.map((tag, index) => (
										<div
											key={tag}
											className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
										>
											{tag}
											<FontAwesomeIcon
												icon={faXmark}
												className="ml-2 cursor-pointer"
												onClick={() => handleTagDelete(tag)}
											/>
										</div>
									))}
									{!isDisabled && !addTagButtonIsDisabled && (
										<AddTag titleButton={props.addTag} items={availableTags} onTagSelected={handleTagSelect} />
									)}
								</div>
							</div>

							<div className="w-full z-40">
								<label className="block">{props.content}</label>
								{!isDisabled ? (
									<EditorComp markdown={content} onContentChange={handleContentChange} />
								) : (
									<input
										type="text"
										value={content}
										className="input input-ghost w-full border-base-content"
										disabled={true}
									/>
								)}
							</div>

							<div className="divider my-1"></div>
							<div className="modal-action">
								<button
									className={`btn text-black ${isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary'}`}
									onClick={handleClose}
								>
									{props.cancelButton}
								</button>
								<button className="btn btn-success text-black ml-3" onClick={submit}>
									{props.submitButton}
								</button>
							</div>
						</div>
					</div>
				</dialog>
			</div>
			{showPreview && (
				<div className="inset-0">
					<Preview locale={locale} infos={previewInfos} onClosePreview={handleClosePreview} />
				</div>
			)}
		</>
	);
}
