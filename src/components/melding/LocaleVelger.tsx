import { Select } from '@navikt/ds-react';
import { useAtom } from 'jotai/index';
import { localeString } from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain';
import type * as StandardTeksterType from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { standardTekstSokAtom } from 'src/components/melding/StandardTekster';

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
