'use client';
import { Chrono } from 'react-chrono';
import daisyuiColors from 'daisyui/src/theming/themes';
import { useTheme } from '@/utils/provider/ThemeProvider';

export default function NewsTimeline() {
	const { isLight } = useTheme();
	const colors = isLight ? daisyuiColors.light : daisyuiColors.dark;
	return (
		<div className="h-full">
			<Chrono
				mode={'VERTICAL_ALTERNATING'}
				scrollable
				theme={{
					primary: colors['primary'],
					secondary: colors['secondary'],
					cardBgColor: colors['base-200'],
					titleColor: colors['base-content'],
					titleColorActive: 'red',
				}}
			>
				<div className="">
					<p className="text-xl">Test</p>
				</div>
			</Chrono>
		</div>
	);
}
