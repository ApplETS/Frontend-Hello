'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { useUser } from '@/utils/provider/UserProvider';
import { UserTypes } from '@/models/user-types';
import { User } from '@/models/user';

interface Props {
	size?: string;
	color?: string;
	textSize?: string;
	userProfile?: User | null;
	usePlaceholderExtra?: boolean;
	setUsePlaceholderExtra?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Avatar({
	size,
	textSize,
	color,
	userProfile,
	usePlaceholderExtra,
	setUsePlaceholderExtra,
}: Props) {
	const { isLight } = useTheme();
	const user = userProfile ? userProfile : useUser().user;
	const isModerator = user?.type == UserTypes.MODERATOR ?? false;

	const [isLoading, setLoading] = useState(true);
	const [usePlaceholder, setUsePlaceholder] = useState(false);

	useEffect(() => {
		setUsePlaceholder(false);
	}, [user]);
	return (
		<div className={`${size ? size : 'w-10 h-10'} rounded-full mask mask-circle`}>
			{user?.avatarUrl && (usePlaceholderExtra ? !usePlaceholderExtra : !usePlaceholder) ? (
				<>
					<div
						className={`skeleton ${size ? size : 'w-10 h-10'} ${!isLoading ? 'hidden' : 'block'} rounded-full shrink-0`}
					></div>
					<img
						alt="Avatar"
						className={`${isLoading ? 'hidden' : 'block'}`}
						src={user.avatarUrl + '?ver=' + new Date().getTime()}
						onError={() => {
							if (setUsePlaceholderExtra) {
								setUsePlaceholderExtra(true);
							} else if (setUsePlaceholder) {
								setUsePlaceholder(true);
							}
							setLoading(false);
						}}
						onLoad={() => setLoading(false)}
					/>
				</>
			) : (
				<div className="avatar placeholder">
					<div
						className={`${isLight ? 'bg-base-content' : color ? color : 'bg-base-100'} text-white rounded-full ${
							size ? size : 'w-10'
						}`}
					>
						<span className={`${textSize ? textSize : 'text-lg'}`}>
							{isModerator ? 'M' : user?.organization?.substring(0, 1) ?? ''}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
