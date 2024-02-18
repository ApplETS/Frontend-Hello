import Image from 'next/image';

type Props = {
	icon: string;
	inputName: string;
};

export default function SocialInput({ icon, inputName }: Props) {
	return (
		<>
			<div className="avatar justify-self-center">
				<Image src={icon} alt="Facebook" />
			</div>
			<input type="text" className="input input-ghost col-span-2" name={inputName} />
		</>
	);
}
