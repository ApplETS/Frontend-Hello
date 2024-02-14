import React from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Dropdown from "@/components/Dropdown";
import Search from "@/components/Search";
import Constants from "@/utils/constants";
import { formatDate } from "@/utils/formatDate";
import { getPendingEvents } from "@/lib/get-pending-events";

type Props = {
  params: { locale: string };
};

export default async function Approbations({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("Approbations");
  const events = await getPendingEvents();
  console.log(events)

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, locale);

  const filters = Object.values(Constants.newsStatuses).map(status => status.label);

  return (
    <div>
      <div className="mb-4 flex items-center space-x-4">
        <Search search={t("search")} />
        <Dropdown title={t("filters.all")} items={filters} />
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
          {events.map((event, index) => (
            <tr key={index} className="border-b-2 border-base-300">
              <td className="text-base flex items-center space-x-2">
                <img
                  src="https://placehold.co/500x500"
                  alt="Placeholder"
                  className="w-10 h-10 mr-3 rounded-full"
                ></img>
                <div>
                  <div>{event.organizer?.organisation}</div>
                  <div className="text-secondary">{event.organizer?.activityArea}</div>
                </div>
              </td>
              <td>{event.title}</td>
              <td>{event.publicationDate}</td>
              <td className="text-base">
                <div
                  className={`py-4 px-4 badge ${
                    Constants.newsStatuses[event.state].color ||
                    "badge-neutral"
                  } text-black`}
                >
                  {t(
                    `filters.${
                      Constants.newsStatuses[event.state].label
                    }`
                  )}
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
