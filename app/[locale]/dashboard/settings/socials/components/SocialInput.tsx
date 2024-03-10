import Image from 'next/image';

type Props = {
	icon: string;
	inputName: string;
};

export default function SocialInput({ icon, inputName }: Props) {
	return (
		<div className="flex flex-row justify-evenly gap-6 col-span-3 h-min">
			<div className="avatar justify-self-center">
				<Image src={icon} alt="Facebook" />
			</div>
			<input type="text" className="input input-ghost col-span-2 w-1/2" name={inputName} />
		</div>
	);
}
