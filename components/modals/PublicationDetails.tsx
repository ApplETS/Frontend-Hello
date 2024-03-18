'use client';

import React, { useState, useEffect, useTransition } from 'react';
import AddTag from '@/components/AddTag';
import Constants from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { faMobileScreen, faXmark } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { AlertType } from '../Alert';
import Preview from './Preview';
import { HelloEvent } from '@/models/hello-event';
import { createPublication } from '@/lib/publications/actions/create-publication';
import { Tag } from '@/models/tag';
import { updatePublication } from '@/lib/publications/actions/update-publication';
import { useToast } from '@/utils/provider/ToastProvider';
import ActivityAreaDropdown from '../ActivityAreaDropdown';
import { useUser } from '@/utils/provider/UserProvider';

const EditorComp = dynamic(() => import('../EditorComponent'), { ssr: false });

interface Props {
	locale: string;
	modalMode: Number;
	publication: HelloEvent | null;
	tags: Tag[];
	onClose: () => void;
}

export default function PublicationDetails({ locale, publication, modalMode, tags, onClose }: Props) {
	const t = useTranslations('Publications');
	const { isLight } = useTheme();
	const { setToast } = useToast();
	const { user } = useUser();

	// PUBLICATION DETAILS
	const [isPending, startTransition] = useTransition();
	const [title, setTitle] = useState(publication?.title || '');
	const [imageSrc, setImageSrc] = useState(publication?.imageUrl || '');
	const [imageBinary, setImageBinary] = useState<Blob>();
	const [imageAltText, setImageAltText] = useState(publication?.imageAltText || '');
	const [content, setContent] = useState(publication?.content || '');
	const [eventStartDate, setEventStartDate] = useState(publication?.eventStartDate.slice(0, 16) || '');
	const [eventEndDate, setEventEndDate] = useState(publication?.eventEndDate.slice(0, 16) || '');
	const [publishedDate, setPublishedDate] = useState(publication?.publicationDate.slice(0, 10) || '');
	const [selectedTags, setSelectedTags] = useState(publication?.tags || []);
	const [availableTags, setAvailableTags] = useState(tags);
	const [activityArea, setActivityArea] = useState(user?.activityArea || '');

	const isDisabled =
		modalMode === Constants.publicationModalStatus.view || modalMode === Constants.publicationModalStatus.delete;
	const addTagButtonIsDisabled = selectedTags.length >= 5;
	const [showPreview, setShowPreview] = useState(false);

	const PublicationInfosForPreview = {
		news: t('modal.news'),
		title: title,
		imageSrc: imageSrc,
		altText: imageAltText,
		author: user?.organisation ?? '',
		activityArea: user?.activityArea ?? '',
		content: content,
		eventDateTitle: t('modal.event-date'),
		eventStartDate: eventStartDate,
		eventEndDate: eventEndDate,
		publishedDate: publishedDate,
		selectedTags: selectedTags?.map((tag) => tag.name) ?? [],
	};

	const updateFormData = (formData: FormData) => {
		// Generate a unique filename for the image using date timestamp
		const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
		const filename = `image_${timestamp}.jpg`;
		if (imageBinary) formData.set('image', imageBinary, filename);

		formData.set('title', title);
		formData.set('imageAltText', imageAltText);
		formData.set('publicationDate', new Date(publishedDate).toUTCString());
		formData.set('eventStartDate', new Date(eventStartDate).toUTCString());
		formData.set('eventEndDate', new Date(eventEndDate).toUTCString());
		formData.set('content', content);

		if (formData.has('tags')) formData.delete('tags');
		selectedTags.forEach((tag) => formData.append('tags', tag.id));

		return formData;
	};

	const createOrUpdate = (formData: FormData) => {
		if (!title || !imageSrc || !imageAltText || !content || !eventStartDate || !eventEndDate || !publishedDate) {
			setToast(t('modal.error-toast-message'), AlertType.error);
			return;
		}

		if (new Date(eventEndDate).getTime() < new Date(eventStartDate).getTime()) {
			setToast(t('modal.date-error-toast-message'), AlertType.error);
			return;
		}

		startTransition(async () => {
			var helloEvent;
			formData = updateFormData(formData);

			if (modalMode === Constants.publicationModalStatus.modify) {
				helloEvent = await updatePublication(publication!.id, formData);
			} else {
				helloEvent = await createPublication(formData);
			}

			setToast(
				t(`modal.${helloEvent ? 'success' : 'post-error'}-toast-message`),
				helloEvent ? AlertType.success : AlertType.error
			);

			if (!helloEvent) return;
			else onClose();
		});
	};

	useEffect(() => {
		setAvailableTags(tags.filter((tag) => !selectedTags.includes(tag)));
	}, [selectedTags]);

	const handleTagSelect = (tagValue: Tag) => {
		setSelectedTags((prevTags) => {
			if (!prevTags.includes(tagValue)) {
				return [...prevTags, tagValue];
			}
			return prevTags;
		});
	};

	const handleFileDrop = (file: File) => {
		const allowedTypes = ['image/jpeg', 'image/png'];

		if (!allowedTypes.includes(file.type)) {
			setToast(t('modal.image-format-error-toast-message'), AlertType.error);
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			const arrayBuffer = reader.result as ArrayBuffer;

			const blob = new Blob([arrayBuffer], { type: file.type });
			const imageUrl = URL.createObjectURL(blob);
			setImageSrc(imageUrl);
			setImageBinary(blob);
		};

		reader.readAsArrayBuffer(file);
	};

	const handleContentChange = (newContent: string) => {
		setContent(newContent);
	};

	const getModalTitle = () => {
		switch (modalMode) {
			case Constants.publicationModalStatus.create:
				return t('modal.create-page-title');
			case Constants.publicationModalStatus.modify:
				return t('modal.modify-page-title');
			case Constants.publicationModalStatus.duplicate:
				return t('modal.create-page-title');
			default:
				return '';
		}
	};

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-30 z-40">
				<dialog id="publication_modal" className="modal overflow-y-auto p-4" open={true}>
					<form action={createOrUpdate} className="overflow-y-auto w-full">
						<div className="modal-box w-3/4 max-w-7xl mx-auto p-5 bg-base-200 max-h-[80vh]">
							<div className="grid grid-cols-2 gap-2"></div>
							<div className="flex items-center gap-2">
								<h1 className="text-2xl block mb-2">{getModalTitle()}</h1>{' '}
								{modalMode === Constants.publicationModalStatus.modify && (
									<div className="tooltip tooltip-bottom ml-2" data-tip={t('modal.tool-tip-text')}>
										<button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">
											!
										</button>
									</div>
								)}
								<div className="ml-auto mb-2">
									<button type="button" className="btn btn-primary" onClick={() => setShowPreview(true)}>
										{t('modal.preview')}
										<FontAwesomeIcon icon={faMobileScreen} className="ml-1" />
									</button>
								</div>
							</div>

							<div className="flex mb-3">
								<div className="grid grid-cols-3 gap-4">
									<div className="col-span-2 mt-4">
										<div>
											<label className="block mb-3">{t('modal.title')}</label>
											<input
												type="text"
												value={title}
												className="input input-ghost w-full border-base-content"
												onChange={(e) => setTitle(e.target.value)}
												disabled={isDisabled}
											/>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<div className="mt-3">
													<label className="block">{t('modal.published-date')}</label>
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
													<label className="block mt-3">{t('modal.activity-area')}</label>
													<div style={{ pointerEvents: 'none', opacity: 0.5 }}>
														<ActivityAreaDropdown
															items={[
																{ title: t('modal.activity-area-items.scientificClub') },
																{ title: t('modal.activity-area-items.ets') },
																{ title: t('modal.activity-area-items.sve') },
																{ title: t('modal.activity-area-items.aeets') },
															]}
															inputName="activity"
															onItemChange={setActivityArea}
															customStyle="w-full"
														/>
													</div>
												</div>
											</div>

											<div className="mb-3">
												<label className="block">{t('modal.event-start-date')}</label>
												<input
													type="datetime-local"
													value={eventStartDate}
													className="input input-ghost w-full border-base-content"
													onChange={(e) => setEventStartDate(e.target.value)}
													disabled={isDisabled}
												/>
											</div>
											<div className="mb-3">
												<label className="block">{t('modal.event-end-date')}</label>
												<input
													type="datetime-local"
													value={eventEndDate}
													className="input input-ghost w-full border-base-content"
													onChange={(e) => setEventEndDate(e.target.value)}
													disabled={isDisabled || !eventStartDate}
												/>
											</div>
										</div>
										<div className="mb-3">
											<label className="block">{t('modal.tags-title')}</label>
											<div
												className={`flex items-center gap-2 py-2 px-2 border border-base-content rounded-md ${
													isDisabled ? 'h-10' : ''
												}`}
											>
												{selectedTags.map((tag, index) => (
													<div
														key={tag.id}
														className={`badge ${Constants.colors[index]} text-black py-4 px-3 flex items-center whitespace-nowrap overflow-hidden`}
														style={{ maxWidth: 'calc(100% - 30px)' }}
													>
														<span className="truncate">{tag.name}</span>
														<FontAwesomeIcon
															icon={faXmark}
															className="ml-2 cursor-pointer"
															onClick={() =>
																setSelectedTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag))
															}
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

									<div className="ml-4 flex flex-col gap-3">
										<div>
											<div className="flex items-center mt-1">
												<label className="block">{t('modal.alt-text')}</label>
												<div className="tooltip tooltip-bottom ml-2" data-tip={t('modal.alt-text-tooltip')}>
													<button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">
														?
													</button>
												</div>
											</div>
											<input
												type="text"
												value={imageAltText}
												className="input input-ghost w-full border-base-content"
												onChange={(e) => setImageAltText(e.target.value)}
												disabled={isDisabled}
											/>
										</div>
										<div className="flex-1 h-64 overflow-hidden rounded-lg">
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
												<img src={imageSrc} alt={imageAltText} className="w-full h-full object-cover rounded-lg mt-2" />
											) : (
												<div
													className={`w-full h-full rounded-lg mt-2 ${isLight ? 'bg-base-300 ' : 'bg-base-100'}`}
												></div>
											)}
										</div>
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
									onClick={() => onClose()}
								>
									{t('modal.cancel-button')}
								</button>
								<button className="btn btn-success text-black ml-3" type="submit">
									{modalMode === Constants.publicationModalStatus.modify
										? t('modal.resubmit-button')
										: t('modal.submit-button')}
								</button>
							</div>
						</div>
					</form>
				</dialog>
			</div>
			{showPreview && (
				<div className="inset-0">
					<Preview locale={locale} infos={PublicationInfosForPreview} onClosePreview={() => setShowPreview(false)} />
				</div>
			)}
		</>
	);
}
