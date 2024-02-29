'use client';

import React, { useState } from 'react';
import ThemeButton from '@/components/themeButton';
import LanguageButton from '@/components/languageButton';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { User } from '@/models/user';

export default function NewsNavbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	return (
		<div className="navbar w-full bg-base-300">
			<div className="flex-1 ml-5 gap-3"></div>
			<div className="flex-none gap-2">
				<LanguageButton />
				<ThemeButton />
				<div className="divider divider-horizontal before:bg-base-content after:bg-base-content my-2"></div>

				<div className="dropdown dropdown-end mr-5">
					<div tabIndex={0} role="button" className="btn btn-ghost" onClick={toggleDropdown}>
						<div className="text-base mr-1">Invité</div>
						<div className="avatar">
							<div className="w-10 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
								/>
							</div>
						</div>
					</div>
					{isDropdownOpen && (
						<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-max">
							<li className="pointer-events-none">
								<div className="flex flex-row pl-2">
									<div className="avatar placeholder">
										<div className="bg-neutral text-neutral-content rounded-full w-10">
											<span className="text-sm">D</span>
										</div>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-base font-bold ml-0">Organisation</p>
										<p className="text-xs ml-0 text-secondary">Activity area</p>
									</div>
								</div>
							</li>
							<li>
								<form action={() => redirect('/fr/dashboard/settings/profile')}>
									<div className="flex flex-row gap-2">
										<FontAwesomeIcon icon={faCog} className="pt-1" />
										<button>Paramètres</button>
									</div>
								</form>
							</li>
							<div className="divider my-0"></div>
							<li>
								<form>
									<input type="hidden" name="redirectLink" value={`/fr/login`} />
									<div className="flex flex-row gap-2">
										<FontAwesomeIcon icon={faSignOut} className="pt-1" />
										<button>Sign out</button>
									</div>
								</form>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}