'use client';

import React, { useState, useEffect, useTransition, useRef } from 'react';
import AddTag from '@/components/AddTag';
import Constants from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { faMobileScreen, faXmark } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { AlertType } from '../Alert';
import Preview, { PreviewInfos } from './Preview';
import { createPublication } from '@/lib/publications/actions/create-publication';
import { Tag } from '@/models/tag';
import { updatePublication } from '@/lib/publications/actions/update-publication';
import { useToast } from '@/utils/provider/ToastProvider';
import ActivityAreaDropdown from '../ActivityAreaDropdown';
import { useUser } from '@/utils/provider/UserProvider';
import { NewsStates } from '@/models/news-states';
import Confirmation from './Confirmation';
import { updatePublicationState } from '@/lib/publications/actions/update-publication-state';
import { MDXEditorMethods } from '@mdxeditor/editor';
import Modal from './Modal';
import { draftAPublication } from '@/lib/publications/actions/draft-publication';
import ImageCropper from '../ImageCropper';
import { DraftEvent } from '@/models/draft-event';
import Markdown from 'react-markdown';
import style from '@/markdown-styles.module.css';
import { ActivityArea, getActivityAreaName } from '@/models/activity-area';

const EditorComp = dynamic(() => import('../EditorComponent'), { ssr: false });

interface PublicationDetailsProps {
	locale: string;
	modalMode: Number;
	publication: DraftEvent | null;
	tags: Tag[];
	onClose: () => void;
	activityAreas: ActivityArea[];
}

export default function PublicationDetails({
	locale,
	publication,
	modalMode,
	tags,
	onClose,
	activityAreas,
}: PublicationDetailsProps) {
	const t = useTranslations('Publications');
	const ta = useTranslations('Approbations');
	const { isLight } = useTheme();
	const { setToast } = useToast();
	let { user } = useUser();

	if (publication?.organizer) {
		user = publication.organizer;
	}

	const [, startTransition] = useTransition();
	const [title, setTitle] = useState(publication?.title || '');
	const [imageSrc, setImageSrc] = useState(publication?.imageUrl || '');
	const [imageBinary, setImageBinary] = useState<Blob>();
	const [imageAltText, setImageAltText] = useState(publication?.imageAltText || '');
	const [content, setContent] = useState(publication?.content || '');
	const [eventStartDate, setEventStartDate] = useState(publication?.eventStartDate?.slice(0, 16) || '');
	const [eventEndDate, setEventEndDate] = useState(publication?.eventEndDate?.slice(0, 16) || '');
	const [publishedDate, setPublishedDate] = useState(publication?.publicationDate?.slice(0, 10) || '');
	const [selectedTags, setSelectedTags] = useState(publication?.tags || []);
	const [availableTags, setAvailableTags] = useState(tags);
	const editorRef = React.useRef<MDXEditorMethods | null>(null);

	const [rejectReason, setRejectReason] = useState('');
	const [deactivateReason, setDeactivateReason] = useState('');

	const items = activityAreas.map((activityArea) => {
		return {
			title: getActivityAreaName(activityArea, locale),
			value: activityArea.id,
		};
	});

	const isDisabled =
		modalMode === Constants.publicationModalStatus.view ||
		modalMode === Constants.publicationModalStatus.delete ||
		modalMode === Constants.publicationModalStatus.moderator;
	const addTagButtonIsDisabled = selectedTags.length >= 5;
	const [showPreview, setShowPreview] = useState(false);

	const [rejectModalOpen, setRejectModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const [imageModalOpen, setImageModalOpen] = useState(false);

	const PublicationInfosForPreview: PreviewInfos = {
		news: t('modal.news'),
		title: title,
		imageSrc: imageSrc,
		altText: imageAltText,
		author: user?.organization ?? '',
		activityArea: user?.activityArea ? getActivityAreaName(user?.activityArea, locale) : '',
		content: content,
		eventDateTitle: t('modal.event-date'),
		eventStartDate: eventStartDate,
		eventEndDate: eventEndDate,
		publishedDate: publishedDate,
		selectedTags: selectedTags?.map((tag) => tag.name) ?? [],
	};

	const updateFormData = (formData: FormData, isDraft?: boolean) => {
		// Generate a unique filename for the image using date timestamp
		const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
		const filename = `image_${timestamp}.jpg`;
		if (imageBinary) formData.set('image', imageBinary, filename);

		formData.set('title', title);
		formData.set('imageAltText', imageAltText);
		formData.set('publicationDate', new Date(publishedDate).toUTCString());
		formData.set('eventStartDate', new Date(eventStartDate).toUTCString());
		formData.set('eventEndDate', new Date(eventEndDate).toUTCString());
		formData.set('content', content.replace(/\\\[+/g, '[').replace(/\\\(+/g, '('));
		if (!isDraft || isDraft == undefined) {
			formData.set('reportCount', '0');
		}

		if (formData.has('tags')) formData.delete('tags');
		selectedTags.forEach((tag) => formData.append('tags', tag.id));

		return formData;
	};

	const [missingFields, setMissingFields] = useState<string[]>([]);
	const isSubmittingRef = useRef(false);
	const createOrUpdate = (formData: FormData) => {
		if (isSubmittingRef.current) {
			return;
		}

		isSubmittingRef.current = true;

		const newMissingFields = [];
		if (!title) newMissingFields.push(t('modal.title'));
		if (!imageSrc) newMissingFields.push(t('modal.image'));
		if (!imageAltText) newMissingFields.push(t('modal.alt-text'));
		if (!content) newMissingFields.push(t('modal.content'));
		if (!eventStartDate) newMissingFields.push(t('modal.event-start-date'));
		if (!eventEndDate) newMissingFields.push(t('modal.event-end-date'));
		if (!publishedDate) newMissingFields.push(t('modal.published-date'));

		setMissingFields(newMissingFields);

		if (newMissingFields.length > 0) {
			setToast(`${t('modal.error-toast-message')}: ${newMissingFields.join(', ')}`, AlertType.error);
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

			isSubmittingRef.current = false;
			if (!helloEvent) return;
			else onClose();
		});
	};

	useEffect(() => {
		setAvailableTags(tags.filter((tag) => !selectedTags.includes(tag)));
	}, [selectedTags]);

	useEffect(() => {
		if (!eventStartDate) {
			setEventEndDate('');
		}
	}, [eventStartDate]);

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
		setImageModalOpen(true);
	};

	const handleImageModalClose = () => {
		setImageSrc(publication?.imageUrl || '');
		setImageModalOpen(false);
	};

	const handleImageModalConfirm = async (imageSrc: string) => {
		try {
			const response = await fetch(imageSrc);

			if (!response.ok) {
				throw new Error('Failed to fetch image data');
			}

			const blob = await response.blob();

			setImageSrc(imageSrc);
			setImageBinary(blob);
			setImageModalOpen(false);
		} catch (error) {
			console.error('Error fetching image data:', error);
		}
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
				return t('modal.create-page-title') + ' ' + t('modal.duplicate-page-title');
			case Constants.publicationModalStatus.moderator:
				return ta('modal.moderator-page-title');
			default:
				return '';
		}
	};

	const handleDeactivation = async () => {
		const success = await updatePublicationState(publication!.id, NewsStates.DELETED, deactivateReason);
		if (success) publication!.state = NewsStates.DELETED;
		setDeleteModalOpen(false);
		onClose();
		setToast(
			t(`modal.delete-${success ? 'success' : 'error'}-toast-message`),
			success ? AlertType.success : AlertType.error
		);
	};

	const handleReject = async () => {
		const success = await updatePublicationState(publication!.id, NewsStates.REFUSED, rejectReason);
		if (success) publication!.state = NewsStates.REFUSED;
		setRejectModalOpen(false);
		onClose();
		setToast(
			t(`modal.reject-${success ? 'success' : 'error'}-toast-message`),
			success ? AlertType.success : AlertType.error
		);
	};

	const handleApprove = async () => {
		const success = await updatePublicationState(publication!.id, NewsStates.APPROVED, null);
		if (success) publication!.state = NewsStates.APPROVED;
		onClose();
		setToast(
			t(`modal.approve-${success ? 'success' : 'error'}-toast-message`),
			success ? AlertType.success : AlertType.error
		);
	};

	const isSubmittingDraftRef = useRef(false);
	const handleDraft = async () => {
		if (isSubmittingDraftRef.current) {
			return;
		}

		isSubmittingDraftRef.current = true;

		const formData = new FormData();
		const updatedFormData = updateFormData(formData, true);

		startTransition(async () => {
			const helloEvent = await draftAPublication(updatedFormData);

			setToast(
				t(`modal.draft-${helloEvent ? 'success' : 'error'}-toast-message`),
				helloEvent ? AlertType.success : AlertType.error
			);

			isSubmittingDraftRef.current = false;
			if (helloEvent) onClose();
		});
	};

	const verifyReason = () => {
		const correct = rejectReason.trim() !== '';

		if (!correct) {
			setToast(ta('give-reason'), AlertType.error);
		}

		return !correct;
	};

	const verifyReasonDeactivate = () => {
		const correct = deactivateReason.trim() !== '';

		if (!correct) {
			setToast(ta('give-reason'), AlertType.error);
		}

		return !correct;
	};

	return (
		<Modal>
			<div id="publication_modal" className="overflow-y-auto p-4 w-[80rem] h-[50rem]">
				<form action={createOrUpdate} className="overflow-y-auto max-h-full w-full">
					<div className="p-5 bg-base-200 max-h-full w-full rounded-2xl overflow-y-auto">
						<div className="grid grid-cols-2 gap-2"></div>
						<div className="flex items-center gap-2">
							<h1 className="text-2xl block">{getModalTitle()}</h1>{' '}
							{modalMode === Constants.publicationModalStatus.modify && (
								<div className="tooltip tooltip-bottom ml-2" data-tip={t('modal.tool-tip-text')}>
									<button
										type="button"
										className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2"
									>
										!
									</button>
								</div>
							)}
							{!isDisabled && (
								<div className="ml-auto">
									<button type="button" className="btn btn-primary" onClick={() => setShowPreview(true)}>
										{t('modal.preview')}
										<FontAwesomeIcon icon={faMobileScreen} className="ml-1" />
									</button>
								</div>
							)}
						</div>
						<div className="flex mb-3 w-full">
							<div className="grid grid-cols-3 gap-4 w-full">
								<div className="col-span-2 mt-4">
									<div>
										<label className="block mb-3">
											{t('modal.title')}{' '}
											{modalMode !== Constants.publicationModalStatus.moderator &&
												missingFields.includes(t('modal.title')) && <span style={{ color: 'red' }}>*</span>}
										</label>
										<div className={`${isDisabled ? 'border border-base-content rounded-lg' : ''}`}>
											<input
												type="text"
												value={title}
												className={`input input-ghost w-full`}
												onChange={(e) => setTitle(e.target.value)}
												disabled={isDisabled}
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<div className="mt-3">
												<label className="block">
													{t('modal.published-date')}{' '}
													{modalMode !== Constants.publicationModalStatus.moderator &&
														missingFields.includes(t('modal.published-date')) && (
															<span style={{ color: 'red' }}>*</span>
														)}
												</label>
												<div className={`${isDisabled ? 'border border-base-content rounded-lg' : ''}`}>
													<input
														type="date"
														value={publishedDate}
														className="input input-ghost w-full"
														onChange={(e) => setPublishedDate(e.target.value)}
														disabled={isDisabled}
														min={new Date().toISOString().split('T')[0]}
													/>
												</div>
											</div>
										</div>
										<div>
											<div className="z-30">
												<label className="block mt-3">{t('modal.activity-area')}</label>
												<div style={{ pointerEvents: 'none', opacity: 0.5 }}>
													<ActivityAreaDropdown
														items={items}
														inputName="activity"
														onItemChange={() => {}}
														customStyle="w-full"
														defaultItem={{
															title: user?.activityArea ? getActivityAreaName(user?.activityArea, locale) : '',
															value: user?.activityArea?.id,
														}}
													/>
												</div>
											</div>
										</div>

										<div className="mb-3">
											<label className="block">
												{t('modal.event-start-date')}{' '}
												{modalMode !== Constants.publicationModalStatus.moderator &&
													missingFields.includes(t('modal.event-start-date')) && (
														<span style={{ color: 'red' }}>*</span>
													)}
											</label>
											<div className={`${isDisabled ? 'border border-base-content rounded-lg' : ''}`}>
												<input
													type="datetime-local"
													value={eventStartDate}
													className="input input-ghost w-full"
													onChange={(e) => setEventStartDate(e.target.value)}
													disabled={isDisabled}
												/>
											</div>
										</div>
										<div className="mb-3">
											<label className="block">
												{t('modal.event-end-date')}{' '}
												{modalMode !== Constants.publicationModalStatus.moderator &&
													missingFields.includes(t('modal.event-end-date')) && <span style={{ color: 'red' }}>*</span>}
											</label>
											<div
												className={`${isDisabled || !eventStartDate ? 'border border-base-content rounded-lg' : ''}`}
											>
												<input
													type="datetime-local"
													value={eventEndDate}
													className="input input-ghost w-full"
													onChange={(e) => setEventEndDate(e.target.value)}
													disabled={isDisabled || !eventStartDate}
													min={eventStartDate}
												/>
											</div>
										</div>
									</div>
									<div className="mb-3">
										<label className="block">{t('modal.tags-title')}</label>
										<div
											className={`flex items-center min-h-[3rem] gap-2 py-2 px-2 border border-base-content rounded-lg`}
										>
											{selectedTags.map((tag, index) => (
												<div
													key={tag.id}
													className={`badge ${Constants.colors[index]} text-black py-4 px-3 flex items-center whitespace-nowrap overflow-hidden`}
													style={{ maxWidth: 'calc(100% - 30px)' }}
												>
													<span className="truncate">{tag.name}</span>
													{!isDisabled && (
														<FontAwesomeIcon
															icon={faXmark}
															className="ml-2 cursor-pointer"
															onClick={() =>
																setSelectedTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag))
															}
														/>
													)}
												</div>
											))}
											{!isDisabled &&
												!addTagButtonIsDisabled &&
												modalMode !== Constants.publicationModalStatus.moderator && (
													<AddTag searchText={t('search')} items={availableTags} onTagSelected={handleTagSelect} />
												)}
										</div>
									</div>
								</div>

								<div className="ml-4 flex flex-col gap-3">
									<div>
										<div className="flex items-center mt-1">
											<label className="block">
												{t('modal.alt-text')}
												{modalMode !== Constants.publicationModalStatus.moderator &&
													missingFields.includes(t('modal.alt-text')) && <span style={{ color: 'red' }}>*</span>}
											</label>
											<div className="tooltip tooltip-bottom ml-2" data-tip={t('modal.alt-text-tooltip')}>
												<button
													type="button"
													className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2"
												>
													?
												</button>
											</div>
										</div>
										<div className={`${isDisabled ? 'border border-base-content rounded-lg' : ''}`}>
											<input
												type="text"
												value={imageAltText}
												className="input input-ghost w-full"
												onChange={(e) => setImageAltText(e.target.value)}
												disabled={isDisabled}
											/>
										</div>
									</div>
									<div className="flex-1 h-64 overflow-clip rounded-lg">
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
											<img src={imageSrc} alt={imageAltText} className="w-full aspect-[2/1] rounded-lg mt-5" />
										) : (
											<div
												className={`w-full h-full rounded-lg mt-2 ${isLight ? 'bg-base-300 ' : 'bg-base-100'}`}
											></div>
										)}
										{imageModalOpen && (
											<Modal>
												<div className={`bg-base-200 overflow-y-auto p-5 w-[50rem] rounded-2xl h-[26rem]`}>
													<ImageCropper
														imageSrc={imageSrc}
														handleImageModalClose={handleImageModalClose}
														handleImageModalConfirm={handleImageModalConfirm}
													/>
												</div>
											</Modal>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="w-full z-40">
							<label className="block">
								{t('modal.content')}
								{modalMode !== Constants.publicationModalStatus.moderator &&
									missingFields.includes(t('modal.content')) && <span style={{ color: 'red' }}>*</span>}
							</label>
							{!isDisabled ? (
								<EditorComp
									markdown={content.replace(/\[/g, '\\[').replace(/\(/g, '\\(')}
									onContentChange={handleContentChange}
									editorRef={editorRef}
								/>
							) : (
								<div style={{ position: 'relative' }}>
									<div
										className={`${isDisabled ? 'border border-base-content rounded-lg markdown-custom-styling' : ''}`}
									>
										<Markdown className={`${style.reactMarkDown} p-2`}>{content}</Markdown>
									</div>
								</div>
							)}
						</div>

						<div className="divider my-1"></div>
						{modalMode !== Constants.publicationModalStatus.moderator && missingFields.length > 0 && (
							<span className="mr-2" style={{ color: 'red' }}>
								* {t('required-fields')}
							</span>
						)}
						<div
							className={`mt-2 ${
								modalMode === Constants.publicationModalStatus.moderator ? 'flex justify-between' : 'flex justify-start'
							}`}
						>
							{modalMode !== Constants.publicationModalStatus.modify &&
								modalMode !== Constants.publicationModalStatus.moderator && (
									<button
										className="btn btn-info px-8 font-normal"
										disabled={publication?.state === NewsStates.APPROVED ?? false}
										onClick={handleDraft}
										type="button"
									>
										{ta('modal.draft')}
									</button>
								)}

							{modalMode === Constants.publicationModalStatus.moderator && (
								<>
									{publication?.state !== NewsStates.PUBLISHED ? (
										<div className="grid grid-cols-2 gap-6">
											<button
												className="font-normal btn btn-success px-8"
												disabled={publication?.state === NewsStates.APPROVED ?? false}
												onClick={handleApprove}
												type="button"
											>
												{ta('modal.approve-button')}
											</button>
											<button
												className="font-normal btn btn-error"
												onClick={() => setRejectModalOpen(true)}
												type="button"
											>
												{ta('modal.reject-button')}
											</button>
										</div>
									) : (
										<button
											className="font-normal btn btn-error px-8"
											onClick={() => setDeleteModalOpen(true)}
											type="button"
										>
											{ta('modal.deactivate-button')}
										</button>
									)}
								</>
							)}
							{rejectModalOpen && (
								<Confirmation
									title={ta('refuse-question')}
									firstButtonTitle={ta('cancel')}
									secondButtonTitle={ta('reject')}
									secondButtonColor={'btn-error'}
									inputTitle={ta('reason')}
									inputValue={rejectReason}
									setInputValue={setRejectReason}
									onClose={() => setRejectModalOpen(false)}
									secondButtonHoverColor={''}
									confirmationAction={handleReject}
									verify={verifyReason}
								/>
							)}
							{deleteModalOpen && (
								<Confirmation
									title={ta('deactivate-question')}
									firstButtonTitle={ta('cancel')}
									secondButtonTitle={ta('deactivate')}
									secondButtonColor={'btn-error'}
									inputTitle={ta('reason')}
									inputValue={deactivateReason}
									setInputValue={setDeactivateReason}
									onClose={() => setDeleteModalOpen(false)}
									secondButtonHoverColor={''}
									confirmationAction={handleDeactivation}
									verify={verifyReasonDeactivate}
								/>
							)}

							<div className="ml-auto">
								<button
									className={`btn font-normal text-black px-11 ${
										isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary'
									}`}
									onClick={() => onClose()}
									type="button"
								>
									{t('modal.cancel-button')}
								</button>
								{modalMode !== Constants.publicationModalStatus.moderator && (
									<button className="btn font-normal btn-success text-black ml-3" type="submit">
										{modalMode === Constants.publicationModalStatus.modify
											? t('modal.resubmit-button')
											: t('modal.submit-button')}
									</button>
								)}
							</div>
						</div>
					</div>
				</form>
			</div>
			{showPreview && (
				<div className="inset-0">
					<Preview locale={locale} infos={PublicationInfosForPreview} onClosePreview={() => setShowPreview(false)} />
				</div>
			)}
		</Modal>
	);
}
