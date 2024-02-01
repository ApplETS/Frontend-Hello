'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
  title: string;
  items: string[];
}

export default function Dropdown({ title, items }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex items-center space-x-4' ref={dropdownRef}>
      <div className="dropdown relative">
        <button className="m-1 btn flex items-center btn-outline btn-accent" onClick={toggleDropdown}>
          {title}
          <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className='w-5 ml-2' />
        </button>
        {isDropdownOpen && (
          <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box absolute z-10">
            {items.map((item, index) => (
              <li className="w-40" key={index} onClick={handleItemClick}><a>{item}</a></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
