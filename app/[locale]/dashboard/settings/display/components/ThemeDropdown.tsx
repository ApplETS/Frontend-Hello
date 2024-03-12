'use client';

import Dropdown from '@/components/SignUpActivity';
import { useTheme } from '@/utils/provider/ThemeProvider';

export default function ThemeDropdown({ lightTitle, darkTitle }: { lightTitle: string; darkTitle: string }) {
	const { isLight, toggleTheme } = useTheme();

	const themeDropdownItems = [
		{
			title: lightTitle,
			onClick: () => {
				if (!isLight) toggleTheme();
			},
		},
		{
			title: darkTitle,
			onClick: () => {
				if (isLight) toggleTheme();
			},
		},
	];

	return (
		<Dropdown
			items={themeDropdownItems}
			inputName="theme"
			defaultItemTheme={isLight ? themeDropdownItems[0] : themeDropdownItems[1]}
		/>
	);
}
