import React from 'react';
import ProfileClient from './pageClient';
import { getOrganizer } from '@/lib/get-organizer';
import { getEvents } from '@/lib/get-events';
import facebookIcon from '@/public/Socials/Facebook.svg';
import discordIcon from '@/public/Socials/Discord.svg';
import instagramIcon from '@/public/Socials/Instagram.svg';
import linkedinIcon from '@/public/Socials/Linkedin.svg';
import tiktokIcon from '@/public/Socials/Tiktok.svg';
import redditIcon from '@/public/Socials/Reddit.svg';
import xIcon from '@/public/Socials/X.svg';

type Props = {
	params: { locale: string; userId: string };
};

export default async function Profile({ params: { userId, locale } }: Props) {
	const organizer = await getOrganizer(userId);

	if (organizer.facebookLink) {
		organizer.socials.push({
			icon: facebookIcon,
			inputName: 'facebookIcon',
			link: organizer.facebookLink,
		});
	}

	if (organizer.discordLink) {
		organizer.socials.push({
			icon: discordIcon,
			inputName: 'discordIcon',
			link: organizer.discordLink,
		});
	}

	if (organizer.instagramLink) {
		organizer.socials.push({
			icon: instagramIcon,
			inputName: 'instagramIcon',
			link: organizer.instagramLink,
		});
	}

	if (organizer.linkedInLink) {
		organizer.socials.push({
			icon: linkedinIcon,
			inputName: 'linkedinIcon',
			link: organizer.linkedInLink,
		});
	}

	if (organizer.tikTokLink) {
		organizer.socials.push({
			icon: tiktokIcon,
			inputName: 'tiktokIcon',
			link: organizer.tikTokLink,
		});
	}

	if (organizer.redditLink) {
		organizer.socials.push({
			icon: redditIcon,
			inputName: 'redditIcon',
			link: organizer.redditLink,
		});
	}

	if (organizer.xLink) {
		organizer.socials.push({
			icon: xIcon,
			inputName: 'xIcon',
			link: organizer.xLink,
		});
	}

	return <ProfileClient organizer={organizer} locale={locale} />;
}
