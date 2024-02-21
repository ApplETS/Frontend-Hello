'use client';

import React from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface PublicationDetailsProps {
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
		cancelButton: string;
		submitButton: string;
		tags: string[];
		toolTipText: string;
		errorToastMessage: string;
	};
}

export default function PublicationDetails({ props }: PublicationDetailsProps) {
	const colors = ['bg-blue', 'bg-green', 'bg-pink', 'bg-orange', 'bg-purple'];
	const selectedTags = ['Robotique', 'Informatique'];
	const { isLight } = useTheme();

	return (
		<div className="inset-0 bg-black bg-opacity-10 z-50">
			<dialog id="publication_modal" className="modal overflow-y-auto" open={true}>
				<div className="mockup-phone border-primary w-80 overflow-y-auto p-0 m-0">
					<div className="camera"></div>
					<div className="display">
						<div className="flex items-center bg-base-200 text-white p-4">
							<div className="mt-5 flex items-center">
								<button className="mr-3 text-white">&larr;</button>
								<h1 className="text-xl font-bold flex-grow">Annonce</h1>
								<div className="ml-5">
									<FontAwesomeIcon icon={faEllipsisVertical} />
								</div>
							</div>
						</div>

						<div className="bg-base-300">
							<h2 className="text-l font-bold px-4 pt-4">Venez nous rencontrer à notre séance d’informations !</h2>
							{/*  {props.title} */}
							<div className="flex items-center text-white text-xs px-4 pt-2">
								<p>5 février 2024</p>
								<div className="flex items-center ml-auto">
									<div className="flex items-center justify-center bg-base-100 rounded-full h-8 w-8 mr-2">
										<FontAwesomeIcon icon={faCalendar} size="lg" />
									</div>
									<div>
										<p>Date de l'événement</p>
										<p>7-8 février 2024</p>
									</div>
								</div>
							</div>
							{/*  {new Date(props.publishedDate).toLocaleDateString()} */}
							{/* Image */}
							<div className="flex mt-4 bg-pink w-full h-36"></div>
							{/* Author info */}
							<div className="flex bg-base-100">
								<div className="w-12 h-12 rounded-full mr-4"></div>
								<div>
									<div className="flex justify-start">
										<div className="flex bg-white rounded-full h-10 w-10 mr-2 my-2"></div>
										<div className="my-2">
											<p className="font-bold">Capra</p>
											<p className="text-sm text-white">Club scientifique</p>
										</div>
									</div>
								</div>
							</div>
							{/* Content */}
							<div className=" px-4 pt-4">
								<p className="text-white text-sm whitespace-pre-line">
									Le club scientifique qui conceptualise un robot de recherche et secourisme recrute pour ses nouveaux
									projets! Une rencontre d’information est prévue le mercredi 13 octobre 2021. Le club scientifique qui
									conceptualise un robot de recherche et secourisme recrute pour ses nouveaux projets! Une rencontre
									d’information est prévue le mercredi 13 octobre 2021.
								</p>
								{/* {props.content} */}
							</div>
							{/* Tags */}
							<div className="flex p-4 gap-1">
								{selectedTags.map((tag, index) => (
									<div
										key={tag}
										className={`badge ${colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap text-sm`}
									>
										{tag}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</dialog>
		</div>
	);
}
