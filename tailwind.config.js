/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./utils/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				blue: '#06B6D4',
				lightblue: '#87CEFA',
				purple: '#AB7CDB',
				lilac: '#B794F4',
				green: '#64C788',
				pink: '#EA7CB7',
				orange: '#E7A455',
				yellow: '#ECC94B',
				teal: '#38B2AC',
				red: '#FF1F3C',
				gray: {
					700: '#424242',
					900: '#303030',
				},
				btn: {
					background: 'hsl(var(--btn-background))',
					'background-hover': 'hsl(var(--btn-background-hover))',
				},
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					'base-content': 'DCDCDC',
					'secondary-content': '#BABABA',
					'.btn-primary': {
						color: '#15191E',
					},
					'.btn-ghost': {
						color: '#DCDCDC',
					},
					'base-100': '#1D232A',
					'base-200': '#252c35',
					'base-300': '#15191E',
					'base-400': '#0E1014',
					primary: '#747FFF',
					accent: '#00CDB7',
					success: '#62EFBD',
					error: '#FF5861',
					warning: '#EAB308',
					info: '#00AAFF',
					secondary: '#9CA3AF',
					'--fc-today-bg-color': '#15191e',
				},
				light: {
					...require('daisyui/src/theming/themes')['light'],
					'.btn-ghost': {
						color: '#181A2A',
					},
					'.btn-primary': {
						color: '#FFFFFF',
					},
					'.input-bordered': {
						'border-color': '#181A2A',
					},
					'base-100': '#FFFFFF',
					'base-200': '#eeeeee',
					'base-300': '#D1D1D1',
					'base-400': '#BABABA',
					primary: '#4D6EFF',
					accent: '#08A493',
					success: '#00AA6E',
					error: '#FF5861',
					warning: '#EAB308',
					info: '#00AAFF',
					'base-content': '181A2A',
					'secondary-content': '#BABABA',
					secondary: '#646464',
					'--fc-today-bg-color': '#9a9ea2',
				},
			},
		],
	},
};
