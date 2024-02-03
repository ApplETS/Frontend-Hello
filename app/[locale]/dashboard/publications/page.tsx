import React from "react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Search from "@/components/Search";
import Dropdown from "@/components/Dropdown";
import Constants from "@/constants";
import { formatDate } from "@/utils/formatDate";

type Props = {
  params: { locale: string };
};

export default function Publications({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Publications");

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, locale);

  const publications = [
    {
      author: "App|ETS",
      activity: "Club scientique",
      title: "Compétition AMC",
      releasedDate: formattedDate,
      eventdate: formattedDate,
      numberOfViews: 0,
      status: Constants.newsStatuses[0].id,
    },
    {
      author: "App|ETS",
      activity: "Club scientique",
      title: "Lancement de Hello",
      releasedDate: formattedDate,
      eventdate: formattedDate,
      numberOfViews: 230,
      status: Constants.newsStatuses[1].id,
    },
    {
      author: "App|ETS",
      activity: "Club scientique",
      title: "Conférence DevOps",
      releasedDate: formattedDate,
      eventdate: formattedDate,
      numberOfViews: 0,
      status: Constants.newsStatuses[2].id,
    },
    {
      author: "App|ETS",
      activity: "Club scientique",
      title: "Séance d'informations",
      releasedDate: formattedDate,
      eventdate: formattedDate,
      numberOfViews: 0,
      status: Constants.newsStatuses[5].id,
    },
  ];

  const filters = Constants.newsStatuses.map((status) =>
    t(`filters.${status.label}`)
  );

  return (
    <div>
      <div className="mb-4 flex justify-between items-center space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <Search search={t("search")} />
          <div className="w-56">
            <Dropdown title={t("filters.all")} items={filters} />
          </div>
        </div>
        <button className="btn btn-primary text-base-100">
          {t("create-new-post")}
        </button>
      </div>
      <table className="table w-full rounded-lg">
        <thead className="bg-base-300 rounded-t-lg h-17">
          <tr className="text-base-content text-base font-bold">
            <th className="rounded-tl-lg">{t("table.title")}</th>
            <th>{t("table.release-date")}</th>
            <th>{t("table.event-date")}</th>
            <th>{t("table.number-of-views")}</th>
            <th>{t("table.status")}</th>
            <th className="w-[10%] rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication, index) => (
            <tr key={index} className="border-b-2 border-base-300">
              <td className="text-base">{publication.title} </td>
              <td>{publication.releasedDate}</td>
              <td>{publication.eventdate}</td>
              <td>{publication.numberOfViews}</td>
              <td className="text-base">
                <div
                  className={`py-4 px-4 badge bg-${
                    Constants.newsStatuses[publication.status - 1].color ||
                    "badge-neutral"
                  } text-black`}
                >
                  {t(
                    `filters.${
                      Constants.newsStatuses[publication.status - 1].label
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
