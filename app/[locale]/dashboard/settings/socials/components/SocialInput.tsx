'use client';
import { useSettings } from '@/utils/provider/SettingsProvider';
import Image from 'next/image';

type Props = {
	icon: string;
	inputName: string;
	defaultValue: string;
};

export default function SocialInput({ icon, inputName, defaultValue }: Props) {
	const { setHasChanges } = useSettings();
	return (
		<div className="flex flex-row justify-evenly gap-6 col-span-3 h-min">
			<div className="avatar justify-self-center">
				<Image src={icon} alt="Facebook" />
			</div>
			<input
				type="text"
				className="input input-ghost col-span-2"
				name={inputName}
				defaultValue={defaultValue}
				onChange={() => setHasChanges(true)}
			/>
		</div>
	);
}
