'use client';

import React from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClose, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MDXEditor, linkPlugin, linkDialogPlugin } from '@mdxeditor/editor';
import Constants from '@/utils/constants';
import Modal from './Modal';
import EventDateAndImage from '../EventDateAndImage';

interface Props {
	locale: string;
	infos: {
		news: string;
		title: string;
		imageSrc: string;
		altText: string;
		author: string | null;
		activityArea: string | null;
		content: string;
		eventDateTitle: string;
		eventStartDate: string;
		eventEndDate: string;
		publishedDate: string;
		selectedTags: string[];
	};
	onClosePreview: () => void;
}

export default function Preview({ locale, infos, onClosePreview }: Props) {
	const { isLight } = useTheme();

	return (
		<Modal>
			<div className="flex justify-between">
				<div className="left-div">
					<div className="mockup-phone border-black w-80 p-0 m-0">
						<div className="camera"></div>
						<div className="display">
							<div className={`flex justify-between text-white p-4 ${isLight ? 'bg-red' : 'bg-gray-700'}`}>
								<div className="mt-5 flex items-center">
									<button className="mr-3 text-white">&larr;</button>
									<h1 className="text-xl font-bold">{infos.news}</h1>
								</div>
								<div className="mt-5">
									<FontAwesomeIcon icon={faEllipsisVertical} />
								</div>
							</div>

							<div className={`${isLight ? 'bg-white' : 'bg-gray-900'}`}>
								<h2 className="text-l font-bold px-4 pt-4">{infos.title}</h2>
								<div className="flex items-center text-xs px-4 pt-2">
									<p>
										{infos.publishedDate && (
											<p>
												{new Date(infos.publishedDate).toLocaleDateString(locale, {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												})}
											</p>
										)}
									</p>
									<div className="flex items-center ml-auto">
										<div className="flex items-center justify-center bg-base-100 rounded-full h-8 w-8 mr-2">
											<FontAwesomeIcon icon={faCalendar} size="lg" />
										</div>
										<div>
											<p>{infos.eventDateTitle}</p>
											{infos.eventStartDate && (
												<>
													{/* If there is only a start date */}
													{infos.eventStartDate && !infos.eventEndDate && (
														<p>
															{new Date(infos.eventStartDate).toLocaleDateString(locale, {
																day: 'numeric',
																month: 'long',
																year: 'numeric',
															})}
														</p>
													)}
													{/* If there is a start date and a end date with the same month */}
													{infos.eventStartDate &&
														infos.eventEndDate &&
														new Date(infos.eventStartDate).getMonth() === new Date(infos.eventEndDate).getMonth() && (
															<p>
																{new Date(infos.eventStartDate).toLocaleDateString(locale, {
																	day: 'numeric',
																})}
																{' - '}
																{new Date(infos.eventEndDate).toLocaleDateString(locale, {
																	day: 'numeric',
																})}{' '}
																{new Date(infos.eventStartDate).toLocaleDateString(locale, {
																	month: 'long',
																	year: 'numeric',
																})}
															</p>
														)}
													{/* If there is a start date and a end date not in the same month */}
													{infos.eventStartDate &&
														infos.eventEndDate &&
														new Date(infos.eventStartDate).getMonth() !== new Date(infos.eventEndDate).getMonth() && (
															<>
																<p>
																	{new Date(infos.eventStartDate).toLocaleDateString(locale, {
																		day: 'numeric',
																		month: 'long',
																		year: 'numeric',
																	})}
																	{' - '}
																</p>
																<p>
																	{new Date(infos.eventEndDate).toLocaleDateString(locale, {
																		day: 'numeric',
																		month: 'long',
																		year: 'numeric',
																	})}
																</p>
															</>
														)}
												</>
											)}
										</div>
									</div>
								</div>
								{infos.imageSrc ? (
									<img src={infos.imageSrc} alt={infos.altText} className="w-full h-40 object-cover mt-2" />
								) : (
									<div className={`flex mt-4 w-full h-40 ${isLight ? 'bg-base-300 ' : 'bg-base-100'}`}></div>
								)}
								<div
									className={`flex items-center text-white bg-base-100 text-xs px-4 py-2 ${
										isLight ? 'bg-red' : 'bg-gray-700'
									}`}
								>
									<div className="flex bg-white rounded-full h-10 w-10 mr-2 my-1"></div>
									<div>
										<p className="font-bold text-sm">{infos.author}</p>
										<p className="text-xs text-white">{infos.activityArea}</p>
									</div>
								</div>
								<div className="px-2 h-40 overflow-y-auto">
									<div style={{ position: 'relative' }}>
										<MDXEditor
											className={` text-sm text-justify ${
												isLight ? 'light-theme light-editor text-sm' : 'dark-theme dark-editor'
											}`}
											plugins={[linkPlugin(), linkDialogPlugin()]}
											markdown={infos.content}
										/>
										<div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}></div>
									</div>
								</div>
								<div className="flex flex-wrap p-4 gap-1">
									{infos.selectedTags.map((tag, index) => (
										<div
											key={tag}
											className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap text-sm`}
										>
											{tag}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="right-div">
					<button className="cursor-pointer rounded-full bg-primary p-2 w-10 h-10" onClick={onClosePreview}>
						<FontAwesomeIcon className="text-black" icon={faClose} />
					</button>
				</div>
			</div>
		</Modal>
	);
}
