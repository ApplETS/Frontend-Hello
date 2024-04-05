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
		<div className="flex flex-row justify-start items-center p-2">
			<div className="avatar px-4">
				<Image src={icon} alt={inputName} />
			</div>
			<input
				type="text"
				className="input input-ghost flex-grow ml-2"
				name={inputName}
				defaultValue={defaultValue}
				onChange={() => setHasChanges(true)}
			/>
		</div>
	);
}
