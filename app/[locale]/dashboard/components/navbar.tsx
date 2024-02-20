"use client";

import React from "react";
import { Page } from "./dashboardLayout";
import Link from "next/link";
import LanguageButton from "@/components/languageButton";
import ThemeButton from "@/components/themeButton";

interface Props {
  activePage: string;
  pages: {
    [key: string]: Page;
  };
}

export default function Navbar({ activePage, pages }: Props) {
  return (
    <div className="navbar w-full bg-base-300">
      <div className="flex-1 ml-5 gap-3">
        {Object.entries(pages).map(([pageKey, pageValue]) => (
          <Link
            key={pageKey}
            className={`btn min-h-min h-min py-2 px-4 rounded-lg ${
              activePage === pageKey ? "btn-primary " : "btn-ghost"
            }`}
            href={pageValue.link}
          >
            <span className={`px-4 text-base`}>{pageValue.title}</span>
          </Link>
        ))}
      </div>
      <div className="flex-none gap-2">
        <div className="btn btn-ghost btn-circle">
          <LanguageButton />
        </div>
        <ThemeButton />
        <div className="divider divider-horizontal before:bg-base-content after:bg-base-content my-2"></div>

        <div className="text-base mr-1">Prénom Nom</div>

        <div className="dropdown dropdown-end mr-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
