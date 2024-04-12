'use client';

import { unsubscribeFromOrganizer } from '@/lib/subscriptions/actions/unsubscribe-from-organizer';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useEffect } from 'react';

interface Props {
	token: string;
}

export default function UnsubscribeClient({ token }: Props) {
	const { startTransition } = useLoading();

	useEffect(() => {
		startTransition(async () => {
			const result = await unsubscribeFromOrganizer(token);
		});
	});

	return <></>;
}
