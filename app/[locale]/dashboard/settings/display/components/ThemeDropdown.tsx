'use client';
import Dropdown from '@/components/SignUpActivity';
import { useTheme } from '@/utils/provider/ThemeProvider';

export default function ThemeDropdown() {
	const { isLight, toggleTheme } = useTheme();
	console.log(isLight);

	const themeDropdownItems = [
		{
			title: 'Light',
			onClick: () => {
				if (!isLight) toggleTheme();
			},
		},
		{
			title: 'Dark',
			onClick: () => {
				if (isLight) toggleTheme();
			},
		},
	];

	return (
		<Dropdown
			items={themeDropdownItems}
			inputName="theme"
			defaultItem={isLight ? themeDropdownItems[0] : themeDropdownItems[1]}
		/>
	);
}
