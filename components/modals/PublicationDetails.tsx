'use client';

import React, { useState, useEffect } from "react";
import ActivityArea from "@/components/ActivityArea";
import AddTag from "@/components/AddTag";
import Constants from "@/utils/constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
  onClose: () => void;
}

export default function PublicationDetails({ props, modalMode, onClose }: PublicationDetailsProps) {
  const [title, setTitle] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [altText, setAltText] = useState('');
  const [content, setContent] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState(props.tags);
  const isDisabled = modalMode === Constants.publicationModalStatus.view ||
                     modalMode === Constants.publicationModalStatus.delete;
  const addTagButtonIsDisabled = selectedTags.length >= 5;

  const handleClose = () => {
    onClose();
  };

  const submit = () => {
    // TODO
    onClose();
  };

  const colors = [
    'bg-blue',
    'bg-green',
    'bg-pink',
    'bg-orange',
    'bg-purple',
  ];

  useEffect(() => {
    setAvailableTags(props.tags.filter(tag => !selectedTags.includes(tag)));
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
		const reader = new FileReader();
		reader.onloadend = () => {
			setImageSrc(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

  return (
    <dialog id="publication_modal" className="modal overflow-y-auto p-4 max-h-[80vh]" open={true}>
      <div className="overflow-y-auto w-full">
        <div className="modal-box w-3/4 max-w-7xl mx-auto p-5 bg-base-200">
          <div className="flex items-center gap-2">
          <h1 className="text-2xl block">{props.pageTitle}</h1>
            {
              modalMode === Constants.publicationModalStatus.modify && (
                <div className="tooltip tooltip-bottom ml-2" data-tip={props.toolTipText}>
                  <button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center mb-2">!</button>
                </div>
              )
            }
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
                    <div>
                      <label className="block">{props.activityArea}</label>
                      <ActivityArea items={["Clubs scientifiques", "ÉTS", "Service à la Vie Étudiante", "AEETS"]} isDisabled={isDisabled} />
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
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileDrop(e.target.files[0]);
                    }
                  }}
                />
                {imageSrc ? (
                  <img src={imageSrc} alt={altText} className="w-full h-full object-cover rounded-lg mt-2" />
                ) : (
                  <div className="w-full h-full bg-base-100 rounded-lg mt-2"></div>
                )}
              </div>
            </div>
          </div>


          <div className="mb-3">
            <label className="block">{props.tagsTitle}</label>
            <div className="flex items-center gap-2 py-2 px-2 border border-base-content rounded-md">
              {selectedTags.map((tag, index) => (
                <div key={tag} className={`badge ${colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}>
                  {tag}
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="ml-2 cursor-pointer"
                    onClick={() => handleTagDelete(tag)}
                  />
                </div>
              ))}
              {!isDisabled && !addTagButtonIsDisabled && <AddTag titleButton={props.addTag} items={availableTags} onTagSelected={handleTagSelect} />}
            </div>
          </div>

          <div className="w-full">
            <label className="block">{props.content}</label>
            <textarea
              value={content}
              className="textarea textarea-ghost border-current row-span-2 h-full w-full"
              onChange={(e) => setContent(e.target.value)}
              disabled={isDisabled}
            ></textarea>
          </div>
          
          <div className="divider my-1"></div> 
          <div className="modal-action">
            <button className="btn btn-secondary text-base-100" onClick={handleClose}>
              { props.cancelButton }
            </button>
            <button className="btn btn-success text-base-100 ml-3" onClick={submit}>
              { props.submitButton }
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

