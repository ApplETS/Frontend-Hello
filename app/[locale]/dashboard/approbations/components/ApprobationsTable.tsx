"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import Search from "@/components/Search";
import Constants from "@/utils/constants";
import { useTranslations } from "next-intl";
import { HelloEvent } from "@/models/hello-event";
import { formatDate } from "@/utils/formatDate";

type Props = {
	events: HelloEvent[];
	locale: string;
};

export default function ApprobationsTable({ events, locale }: Props) {
	const t = useTranslations("Approbations");
	const filterAll = t("filters.all").toLowerCase();
	const [selectedFilter, setSelectedFilter] = useState(filterAll);
	const [filteredEvents, setFilteredEvents] = useState(events);
	const [searchTerm, setSearchTerm] = useState("");

	const filters = Object.values(Constants.newsStatuses).map((status) =>
		t(`filters.${status.label}`)
	);

	useEffect(() => {
		const filtered = events.filter(
			(event) =>
				(t(
					`filters.${Constants.newsStatuses[event.state]?.label}`
				).toLowerCase() === selectedFilter ||
					selectedFilter === filterAll) &&
				(searchTerm === "" ||
					event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					event.organizer?.activityArea
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					event.organizer?.organisation
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()))
		);
		setFilteredEvents(filtered);
	}, [selectedFilter, searchTerm]);

	const handleFilterChanged = (filterIndex: number) => {
		setSelectedFilter(filters[filterIndex].toLowerCase());
	};

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};

	return (
		<div>
			<div className="mb-4 flex items-center space-x-4">
				<Search search={t("search")} onSearchTermChange={handleSearchChanged} />
				<Dropdown
					title={t("filters.all")}
					items={filters}
					onFilterChange={handleFilterChanged}
				/>
			</div>
			<table className="table w-full rounded-lg">
				<thead className="bg-base-300 rounded-t-lg h-17">
					<tr className="text-base-content text-base font-bold">
						<th className="rounded-tl-lg">{t("table.author")}</th>
						<th>{t("table.title")}</th>
						<th>{t("table.release-date")}</th>
						<th>{t("table.status")}</th>
						<th className="w-[10%] rounded-tr-lg"></th>
					</tr>
				</thead>
				<tbody>
					{filteredEvents.map((event, index) => (
						<tr key={index} className="border-b-2 border-base-300">
							<td className="text-base flex items-center space-x-2">
								<img
									src="https://placehold.co/500x500"
									alt="Placeholder"
									className="w-10 h-10 mr-3 rounded-full"
								></img>
								<div>
									<div>{event.organizer?.organisation}</div>
									<div className="text-secondary">
										{event.organizer?.activityArea}
									</div>
								</div>
							</td>
							<td>{event.title}</td>
							<td>{formatDate(new Date(event.publicationDate), locale)}</td>
							<td className="text-base">
								<div
									className={`py-4 px-4 badge ${
										Constants.newsStatuses[event.state].color || "badge-neutral"
									} text-black`}
								>
									{t(`filters.${Constants.newsStatuses[event.state].label}`)}
								</div>
							</td>
							<td className="text-base">
								<button className="btn btn-accent w-full">
									{t("table.open")}
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
