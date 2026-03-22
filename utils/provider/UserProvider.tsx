'use client';

import { DefaultSession } from 'next-auth';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type Props = {
	children: ReactNode;
};

interface UserContextType {
	user: DefaultSession['user'] | undefined;
	setUser: Dispatch<SetStateAction<DefaultSession['user'] | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: Props) {
	const [user, setUser] = useState<DefaultSession['user']>();

	const value = {
		user,
		setUser,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
