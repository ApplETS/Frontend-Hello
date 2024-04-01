import React, { useEffect, useState } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { useUser } from '@/utils/provider/UserProvider';
import { UserTypes } from '@/models/user-types';

interface Props {
	size?: string;
	color?: string;
	textSize?: string;
}

export default function Avatar({ size, textSize, color }: Props) {
	const { isLight } = useTheme();
	const { user } = useUser();

	const [usePlaceholder, setUsePlaceholder] = useState(false);
	const [currentAvatarUrl, setCurrentAvatarUrl] = useState(user?.avatarUrl ?? '');
	const isModerator = user?.type == UserTypes.MODERATOR ?? false;

	useEffect(() => {
		setUsePlaceholder(localStorage.getItem('usePlaceholder') === 'true');
	}, []);

	useEffect(() => {
		localStorage.setItem('usePlaceholder', usePlaceholder.toString());
	}, [usePlaceholder]);

	useEffect(() => {
		if (user?.avatarUrl !== currentAvatarUrl) {
			setCurrentAvatarUrl(user?.avatarUrl ?? '');
			setUsePlaceholder(false);
		}
	}, [user?.avatarUrl, currentAvatarUrl]);

	return (
		<div className={`${size ? size : 'w-10'} rounded-full mask mask-circle`}>
			{user?.avatarUrl && !usePlaceholder ? (
				<img
					alt="Avatar"
					src={user.avatarUrl}
					onError={() => {
						setUsePlaceholder(true);
					}}
				/>
			) : (
				<div className="avatar placeholder">
					<div
						className={`${isLight ? 'bg-base-content' : color ? color : 'bg-base-100'} text-primary rounded-full ${
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
