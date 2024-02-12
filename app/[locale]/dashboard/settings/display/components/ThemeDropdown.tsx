'use client';
import Dropdown from '@/components/SignUpActivity';
import { useTheme } from '@/utils/provider/ThemeProvider';

export default function ThemeDropdown() {
	const { isDark, toggleTheme } = useTheme();

	const themeDropdownItems = [
		{
			title: 'Light',
			onClick: () => {
				if (!isDark) toggleTheme();
			},
		},
		{
			title: 'Dark',
			onClick: () => {
				if (isDark) toggleTheme();
			},
		},
	];

	return (
		<Dropdown
			items={themeDropdownItems}
			inputName="theme"
			defaultItem={isDark ? themeDropdownItems[1] : themeDropdownItems[0]}
		/>
	);
}
