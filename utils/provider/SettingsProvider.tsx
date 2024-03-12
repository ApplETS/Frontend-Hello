'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface SettingsContextType {
	hasChanges: boolean;
	setHasChanges: (hasChanges: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (context === undefined) {
		throw new Error('useSettings must be used within a SettingsProvider');
	}
	return context;
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [hasChanges, setHasChanges] = useState(false);

	return <SettingsContext.Provider value={{ hasChanges, setHasChanges }}>{children}</SettingsContext.Provider>;
};
