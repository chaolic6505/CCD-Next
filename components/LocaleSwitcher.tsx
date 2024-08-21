import { useLocale, useTranslations } from "next-intl";

import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
    const t = useTranslations("LocaleSwitcher");
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect
            label={t("label")}
            defaultValue={locale}
            items={[
                {
                    value: "ch",
                    label: t("ch"),
                },
                {
                    value: "tch",
                    label: t("tch"),
                },
                {
                    value: "en",
                    label: t("en"),
                },
                // {
                //     value: 'ru',
                //     label: t('ru')
                // },
                // {
                //     value: 'uk',
                //     label: t('uk')
                // }
            ]}
        />
    );
}
