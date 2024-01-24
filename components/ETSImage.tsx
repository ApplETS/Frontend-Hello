import Image from "next/image";
import fr_dark from "@/public/ETS/dark/fr.png";
import en_dark from "@/public/ETS/dark/en.png";
import fr_light from "@/public/ETS/light/fr.png";
import en_light from "@/public/ETS/light/en.png";

interface Props {
  theme: string;
  lang: string;
}

export default function ETSImage(prop: Props) {
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

  const imageSrc = images[prop.theme]?.[prop.lang] || defaultImage;

  return (
    <Image
      src={imageSrc}
      alt="ETS Logo"
      width={241}
      height={79}
    />
  );
}
