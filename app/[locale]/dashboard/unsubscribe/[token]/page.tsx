'use client';

import UnsubscribeClient from './clientPage';

interface Props {
	params: { token: string };
}

export default function Unsubscribe({ params: { token } }: Props) {
	return <UnsubscribeClient token={token} />;
}
