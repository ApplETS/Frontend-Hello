'use client';

import Image from "next/image";
import fr_dark from "@/public/ETS/dark/fr.png";
import en_dark from "@/public/ETS/dark/en.png";
import fr_light from "@/public/ETS/light/fr.png";
import en_light from "@/public/ETS/light/en.png";

interface Props {
  lang: string;
  isDarkTheme: boolean;
}

export default function ETSImage(props: Props) {
  const theme = props.isDarkTheme ? "dark" : "light";

  const images = {
    dark: {
      fr: fr_dark,
      en: en_dark,
    },
    light: {
      fr: fr_light,
      en: en_light,
    },
  };

  const defaultImage = en_light;

  const imageSrc = images[theme]?.[props.lang] || defaultImage;

  return (
    <Image
      src={imageSrc}
      alt="ETS Logo"
      width={200}
    />
  );
}
