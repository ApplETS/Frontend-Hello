'use client';

import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { User } from '@/models/user';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type Props = {
	children: ReactNode;
};

interface UserContextType {
	user: User | undefined;
	setUser: Dispatch<SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: Props) {
	const [user, setUser] = useState<User>();

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
