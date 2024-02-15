'use client';
import React, { ReactElement } from 'react';
import DashboardLayout from '../dashboard/components/dashboardLayout';
import { useTheme } from '@/utils/provider/ThemeProvider';

type Props = {
	children: ReactElement;
	params: { locale: string };
};

export default function Layout({ children, params: { locale } }: Props) {
	const pages = {};
	const { isLight } = useTheme();

	return <DashboardLayout pages={pages}>{children}</DashboardLayout>;
}
