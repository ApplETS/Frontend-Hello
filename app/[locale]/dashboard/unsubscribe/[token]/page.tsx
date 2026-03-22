'use client';
import { use } from "react";

import UnsubscribeClient from './clientPage';

interface Props {
	params: Promise<{ token: string }>;
}

export default function Unsubscribe(props: Props) {
    const params = use(props.params);

    const {
        token
    } = params;

    return <UnsubscribeClient token={token} />;
}
