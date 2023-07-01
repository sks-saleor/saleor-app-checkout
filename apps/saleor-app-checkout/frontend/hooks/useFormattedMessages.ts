import { useRouter } from "next/router";
import { useMemo } from "react";

import English from "../../content/compiled-locales/en.json";

export const useFormattedMessages = () => {
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const messages = useMemo(() => {
    switch (shortLocale) {
      case "en":
        return English;
      default:
        return English;
    }
  }, [shortLocale]);

  return {
    locale: shortLocale,
    messages,
  };
};
