import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";
import type { App } from "vue";

import zh from "./zh_cn.json";

const resources = {
    zh: {
        translation: zh,
    },
};

i18next.use(LanguageDetector).init({
    fallbackLng: "zh",
    resources: resources,
});

export default (app: App<Element>) => app.use(I18NextVue, { i18next });
