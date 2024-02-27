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
		<>
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
		</>
	);
}
