'use client';

import React, { useState, useEffect, useRef } from 'react';
import AddTag from '@/components/AddTag';
import Constants from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
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
	publication: HelloEvent | null;
	user: User;
	onClose: () => void;
}

export default function PublicationDetails({ locale, publication, modalMode, user, onClose }: PublicationDetailsProps) {
	const tags = ['Apprentissage', 'Atelier', 'Bourses', 'Carrière', 'Programmation', 'Développement mobile']; // TODO: Replace with actual tags
	const t = useTranslations('Publications');
	const { isLight } = useTheme();
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const [title, setTitle] = useState('');
	const [imageSrc, setImageSrc] = useState('');
	const [altText, setAltText] = useState('');
	const [content, setContent] = useState('');
	const [eventStartDate, setEventStartDate] = useState('');
	const [eventEndDate, setEventEndDate] = useState('');
	const [publishedDate, setPublishedDate] = useState('');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [availableTags, setAvailableTags] = useState(tags);
	const isDisabled =
		modalMode === Constants.publicationModalStatus.view || modalMode === Constants.publicationModalStatus.delete;
	const addTagButtonIsDisabled = selectedTags.length >= 5;
	const [showPreview, setShowPreview] = useState(false);

	const previewInfos = {
		news: t('modal.news'),
		title: title,
		imageSrc: imageSrc,
		altText: altText,
		author: user.organisation,
		activityArea: user.activityArea,
		content: content,
		eventDateTitle: t('modal.event-date'),
		eventStartDate: eventStartDate,
		eventEndDate: eventEndDate,
		publishedDate: publishedDate,
		selectedTags: selectedTags,
	};

	let pageTitle;

	switch (modalMode) {
		case Constants.publicationModalStatus.create:
			pageTitle = t('modal.create-page-title');
			break;
		case Constants.publicationModalStatus.modify:
			pageTitle = t('modal.modify-page-title');
			break;
		case Constants.publicationModalStatus.duplicate:
			pageTitle = t('modal.create-page-title');
			break;
		case Constants.publicationModalStatus.view:
			pageTitle = t('modal.view-page-title');
			break;
		default:
			pageTitle = '';
			break;
	}

	const handleClose = () => {
		onClose();
	};

	const submit = () => {
		if (!title || !imageSrc || !altText || !content || !eventStartDate || !eventEndDate || !publishedDate) {
			setShowToast(true);
			setToastMessage(t('modal.error-toast-message'));
			return;
		}

		if (new Date(eventEndDate).getTime() < new Date(eventStartDate).getTime()) {
			setShowToast(true);
			setToastMessage(t('modal.date-error-toast-message'));
			return;
		}

		// TODO Submit to backend
		onClose();
	};

	useEffect(() => {
		setAvailableTags(tags.filter((tag) => !selectedTags.includes(tag)));
	}, [selectedTags]);

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
			setToastMessage(t('modal.image-format-error-toast-message'));
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
								<h1 className="text-2xl block mb-2">{pageTitle}</h1>
								{modalMode === Constants.publicationModalStatus.modify && (
									<div className="tooltip tooltip-bottom ml-2" data-tip={t('modal.tool-tip-text')}>
										<button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">
											!
										</button>
									</div>
								)}
								<div className="ml-auto mb-2">
									<button className="btn btn-primary" onClick={() => setShowPreview(true)}>
										{t('modal.preview')}
									</button>
								</div>
							</div>

							<div className="flex mb-3">
								<div className="grid grid-cols-3 gap-4">
									<div className="col-span-2">
										<div>
											<label className="block">{t('modal.title')}</label>
											<input
												type="text"
												value={title}
												className="input input-ghost w-full border-base-content"
												onChange={(e) => setTitle(e.target.value)}
												disabled={isDisabled}
											/>
										</div>

										<div className="grid grid-cols-2 gap-4 mt-3">
											<div className="">
												<div className="z-30 mt-3">
													<label className="block mb-2">{t('modal.activity-area')}</label>
													<div className="btn btn-disabled g-inherit border-current w-full hover:bg-inherit hover:border-current">
														{user.activityArea}
													</div>
												</div>
											</div>
											<div className="mb-3">
												<div className="flex items-center">
													<label className="block">{t('modal.published-date')}</label>
													<div className="tooltip tooltip-top ml-2" data-tip={t('modal.published-date-tool-tip-text')}>
														<button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">
															?
														</button>
													</div>
												</div>
												<input
													type="date"
													value={publishedDate}
													className="input input-ghost w-full border-base-content"
													onChange={(e) => setPublishedDate(e.target.value)}
													disabled={isDisabled}
												/>
											</div>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<div className="mb-3">
												<div className="flex items-center">
													<label className="block">{t('modal.event-start-date')}</label>
													<div className="tooltip tooltip-top ml-2" data-tip={t('modal.start-date-tool-tip-text')}>
														<button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">
															?
														</button>
													</div>
												</div>
												<input
													type="datetime-local"
													value={eventStartDate}
													className="input input-ghost w-full border-base-content"
													onChange={(e) => setEventStartDate(e.target.value)}
													disabled={isDisabled}
												/>
											</div>
											<div className="mb-3">
												<div className="flex items-center">
													<label className="block">{t('modal.event-end-date')}</label>
													<div className="tooltip tooltip-top ml-2" data-tip={t('modal.end-date-tool-tip-text')}>
														<button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">
															?
														</button>
													</div>
												</div>
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

										<div className="mb-3">
											<label className="block mt-3">{t('modal.tags-title')}</label>
											<div
												className={`flex flex-wrap items-center gap-2 py-2 px-2 border border-base-content rounded-md ${
													isDisabled ? 'h-10' : ''
												}`}
											>
												{selectedTags.map((tag, index) => (
													<div
														key={tag}
														className={`badge ${Constants.colors[index]} text-black py-4 px-3 flex items-center whitespace-nowrap overflow-hidden`}
														style={{ maxWidth: 'calc(100% - 30px)' }}
													>
														<span className="truncate">{tag}</span>
														<FontAwesomeIcon
															icon={faXmark}
															className="ml-2 cursor-pointer"
															onClick={() => handleTagDelete(tag)}
														/>
													</div>
												))}
												{!isDisabled && !addTagButtonIsDisabled && (
													<AddTag
														titleButton={t('modal.add-tag')}
														items={availableTags}
														onTagSelected={handleTagSelect}
													/>
												)}
											</div>
										</div>
									</div>

									<div className="flex-1 ml-4 overflow-hidden rounded-lg">
										<div className="mb-3">
											<label className="block">{t('modal.alt-text')}</label>
											<input
												type="text"
												value={altText}
												className="input input-ghost w-full border-base-content"
												onChange={(e) => setAltText(e.target.value)}
												disabled={isDisabled}
											/>
										</div>
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
											<img src={imageSrc} alt={altText} className="w-full h-48 object-cover rounded-lg mt-2" />
										) : (
											<div className={`w-full h-48 rounded-lg mt-2 ${isLight ? 'bg-base-300 ' : 'bg-base-100'}`}></div>
										)}
									</div>
								</div>
							</div>

							<div className="w-full z-40">
								<label className="block">{t('modal.content')}</label>
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
									{t('modal.cancel-button')}
								</button>
								<button className="btn btn-success text-black ml-3" onClick={submit}>
									{t('modal.submit-button')}
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
