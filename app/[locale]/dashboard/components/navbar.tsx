"use client";

import React, { useState } from "react";
import ThemeButton from "./themeButton";
import LanguageButton from "./languageButton";
import { Page } from "./dashboardLayout"
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  activePage: string
  pages: {
    [key: string]: Page
  },
  signOut: (formData: FormData) => Promise<never>;
}

export default function Navbar({ activePage, pages, signOut }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="navbar w-full bg-base-300">
      <div className="flex-1 ml-5 gap-3">
        {Object.entries(pages).map(([pageKey, pageValue]) => (
          <Link
            key={pageKey}
            className={`btn min-h-min h-min py-2 px-4 rounded-lg ${activePage === pageKey ? "btn-primary" : "btn-ghost"
              }`}
            href={pageValue.link}
          >
            <span className={"px-4 text-base"}>{pageValue.title}</span>
          </Link>
        ))}
      </div>
      <div className="flex-none gap-2">
        <LanguageButton />
        <ThemeButton />
        <div className="divider divider-horizontal before:bg-base-content after:bg-base-content my-2"></div>

        <div className="text-base mr-1">Prénom Nom</div>

        <div className='dropdown dropdown-end mr-5'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar' onClick={toggleDropdown}>
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
              />
            </div>
          </div>
          {isDropdownOpen && (
            <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max'>
              <li>
                <form action={() => redirect('/fr/dashboard/settings')}>
                  <button>Paramètres</button>
                </form>
              </li>
              <li>
                <form action={signOut}>
                  <input type='hidden' name='redirectLink' value={`/fr/login`} />
                  <button>Sign out</button>
                </form>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
