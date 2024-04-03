import Modal from './Modal';

interface Props {
	localModal?: boolean;
}

export default function LoadingSpinner({ localModal }: Props) {
	return (
		<Modal localModal={localModal}>
			<div className="loading loading-spinner loading-lg"></div>
		</Modal>
	);
}
