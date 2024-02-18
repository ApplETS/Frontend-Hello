"use server";

import React from "react";
import { getEvents } from "@/lib/get-events";
import ApprobationsTable from "./components/ApprobationsTable";

type Props = {
	params: { locale: string };
};

export default async function Approbations({ params: { locale } }: Props) {
	const events = await getEvents();
	return <ApprobationsTable locale={locale} events={events} />;
}
