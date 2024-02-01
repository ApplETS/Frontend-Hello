'use client';

import Navbar from "./navbar";
import { ReactElement } from "react";
import { usePathname } from 'next/navigation'

interface Props {
  children: ReactElement,
  pages: {
    [key: string]: Page
  },
}

export interface Page {
  title: string,
  link: string
}

export default function DashboardLayout({children, pages}: Props) {
  const pathname = usePathname()
  const activePage = pathname.split('/').pop() ?? "dashboard";

  return (
    <div className="w-screen h-screen bg-base-100">
      <Navbar
        activePage={activePage}
        pages={pages}
      />
      <div className="page-content animate-in m-7">
        <div className="text-2xl mb-7">
          {pages[activePage]?.title}
        </div>
        {children}
      </div>
    </div>
  );
}
