import { images } from "../../constants";
import { t } from "@hooks/UseI18n";
export default [
  {
    id: 1,
    title: t("slide1Title"),
    description: t("slide1description"),
    image: images.onBorading1,
  },
  {
    id: 2,
    title: t("slide2Title"),
    description: t("slide2description"),
    image: images.onBorading2,
  },
  {
    id: 3,
    title: t("slide3Title"),
    description: t("slide3description"),
    image: images.onBorading3,
  },

  {
    id: 4,
    title: t("slide4Title"),
    description: t("slide4description"),
    image: images.onBorading4,
  },
];
