import React, { ReactElement } from 'react';
import DashboardLayout from '../dashboard/components/dashboardLayout';
import { useTheme } from '@/utils/provider/ThemeProvider';
import NewsLayout from './components/NewsLayout';

type Props = {
	children: ReactElement;
	params: { locale: string };
};

export default function Layout({ children, params: { locale } }: Props) {
	return <NewsLayout>{children}</NewsLayout>;
}
