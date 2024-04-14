import React from 'react';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

import { NextIntlClientProvider } from 'next-intl';
import ThemeProvider from '../utils/provider/ThemeProvider';

import messages from "../messages/fr.json";

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../app/[locale]/globals.css';


const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
      theme: themes.dark,
    },
	},
	decorators: [
		(Story) => (
			<ThemeProvider>
				<NextIntlClientProvider locale="fr"	messages={messages}>
					<Story />
				</NextIntlClientProvider>
			</ThemeProvider>
		),
	],
};

export default preview;
