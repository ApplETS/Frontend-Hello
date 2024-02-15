'use client';

import React, { useState } from "react";
import ActivityArea from "@/components/ActivityArea";
import AddTag from "@/components/AddTag";
import Constants from "@/utils/constants";

interface PublicationDetailsProps {
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
    cancelButton: string;
    submitButton: string;
    tags: string[];
    toolTipText: string;
  }
}

export default function PublicationDetails({ props, modalMode }: PublicationDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [altText, setAltText] = useState('');
  const [content, setContent] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const handleTagSelect = (tagValue: string) => {
    setSelectedTag(tagValue);
  };

  const closeModal = () => setIsModalOpen(false);

  if (!isModalOpen) return null;

  const isDisabled = (modalMode === Constants.publicationModalStatus.view || modalMode === Constants.publicationModalStatus.delete);

  return (
    <dialog id="publication_modal" className="modal overflow-y-auto p-4 max-h-[80vh]" open={isModalOpen}>
      <div className="overflow-y-auto w-full">
        <div className="modal-box w-3/4 max-w-7xl mx-auto p-5 shadow-2xl">
          <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl mb-2 block">{props.pageTitle}</h1>
            {
              modalMode === Constants.publicationModalStatus.modify && (
                <div className="tooltip tooltip-bottom ml-2" data-tip={props.toolTipText}>
                  <button className="btn btn-circle btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">!</button>
                </div>
              )
            }
          </div>

          <div className="flex">
            <div className="flex-1">
              <div className="mb-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">{props.title}</label>
                  <input
                    type="text"
                    value="Compétion AMC" // TODO : {title}
                    className="input input-ghost w-full border-base-content"
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isDisabled}
                  />
                </div>
                <div>
                  <label className="block mb-2">{props.activityArea}</label>
                  <ActivityArea items={["Clubs scientifiques", "ÉTS", "Service à la Vie Étudiante", "AEETS"]} isDisabled={isDisabled} />
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">{props.publishedDate}</label>
                  <input
                    type="date"
                    value={publishedDate}
                    className="input input-ghost w-full border-base-content"
                    onChange={(e) => setPublishedDate(e.target.value)}
                    disabled={isDisabled}
                  />
                </div>
                <div>
                  <label className="block mb-2">{props.altText}</label>
                  <input
                    type="text"
                    value="Bannière de l'AMC" // TODO: {altText}
                    className="input input-ghost w-full border-base-content"
                    onChange={(e) => setAltText(e.target.value)}
                    disabled={isDisabled}
                  />
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-4">
                <div className="mt-1">
                  <label className="block">{props.eventStartDate}</label>
                  <input
                    type="datetime-local"
                    value={eventStartDate}
                    className="input input-ghost w-full border-base-content"
                    onChange={(e) => setEventStartDate(e.target.value)}
                    disabled={isDisabled}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <label className="block">{props.eventEndDate}</label>
                  </div>
                  <input
                    type="datetime-local"
                    value={eventEndDate}
                    className="input input-ghost w-full border-base-content"
                    onChange={(e) => setEventEndDate(e.target.value)}
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 ml-4 mt-2">
              <div className="h-64 rounded-xl bg-primary overflow-hidden">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-accent w-full"
                  disabled={isDisabled}
                />
                {imageSrc && (
                  <img src={imageSrc} alt={altText} className="w-full h-full object-cover"/>
                )}
              </div>
            </div>
          </div>
          <p>{selectedTag}</p>

          <div className="mb-3">
            <label className="block mb-2">{props.tagsTitle}</label>
            <div className="flex items-center gap-2 py-2 px-2 border border-base-content rounded-md">
              <div className="badge bg-blue text-black py-4 px-4">
                Compétition
              </div>
              {!isDisabled && <AddTag titleButton={props.addTag} items={props.tags} onTagSelected={handleTagSelect} />}
            </div>
          </div>

          <div className="w-full">
            <label className="block mb-2">{props.content}</label>
            <textarea
              value={content}
              className="textarea textarea-ghost border-current row-span-2 h-full w-full"
              onChange={(e) => setContent(e.target.value)}
              disabled={isDisabled}
            ></textarea>
          </div>
          
          {/* Footer */}
          <div className="modal-action">
            <button className="btn btn-secondary text-base-100" onClick={closeModal}>
              { props.cancelButton }
            </button>
            <button className="btn btn-success text-base-100 ml-3">
              { props.submitButton }
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

