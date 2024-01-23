import { ChangeEvent, useTransition } from "react";
import { useRouter, usePathname } from "../navigation";
import { useLocale } from "next-intl";

export default function LanguageButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextLocale = event.target.checked ? "fr" : "en"; // Toggle between 'fr' and 'en'
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <label className="btn btn-circle btn-ghost swap swap-flip text-base text-base-content">
      {/* This hidden checkbox controls the state */}
      <input
        type="checkbox"
        checked={locale === "fr"}
        disabled={isPending}
        onChange={onSelectChange}
      />

      <div className="swap-on">FR</div>
      <div className="swap-off">EN</div>
    </label>
  );
}
