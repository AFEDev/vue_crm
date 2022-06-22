import store from "@/store";
import lt from "@/filters/locales/lt.json";
import en from "@/filters/locales/en.json";

const locale = store.getters.info.locale || "en-US";

const filters = {
  dateFilter(value, format = "date") {
    const locale = store.getters.info.locale || "en-US";
    const options = {};

    if (format.includes("date")) {
      options.day = "2-digit";
      options.month = "long";
      options.year = "numeric";
    }

    if (format.includes("time")) {
      options.hour = "2-digit";
      options.minute = "2-digit";
      options.second = "2-digit";
    }
    return new Intl.DateTimeFormat(locale, options).format(new Date(value));
  },
  currencyFilter(value, currency) {
    const locale = store.getters.info.locale || "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  },
  localizeFilter(key) {
    const locale = store.getters.info.locale || "en-US";
    const locales = {
      "lt-LT": lt,
      "en-US": en,
    };
    return locales[locale][key] || `[Localize error]: key ${key} not found `;
  },
};

export default filters;
