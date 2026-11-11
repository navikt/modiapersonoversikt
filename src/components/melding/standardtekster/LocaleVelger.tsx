import { Select } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { standardTekstSokAtom } from 'src/components/melding/standardtekster/StandardTekster';
import type * as StandardTeksterType from 'src/lib/types/skrivestotte';
import { localeString } from 'src/lib/types/skrivestotte';

const LocaleVelger = () => {
    const [value, setValue] = useAtom(standardTekstSokAtom);

    if (value.tekst === undefined) {
        return null;
    }
    const locales = Object.keys(value.tekst.innhold) as (keyof typeof value.tekst.innhold)[];

    if (locales.length < 2) {
        return null;
    }
    const options = locales.map((locale) => (
        <option value={locale} key={locale}>
            {localeString[locale]}
        </option>
    ));

    return (
        <Select
            size="small"
            onChange={(event) =>
                setValue((values) => ({
                    ...values,
                    locale: event.target.value as StandardTeksterType.Locale
                }))
            }
            label="Språk"
            hideLabel
        >
            {options}
        </Select>
    );
};

export default LocaleVelger;
