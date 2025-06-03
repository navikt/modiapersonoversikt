import { Box, Button, HGrid, HStack, Search, VStack } from '@navikt/ds-react';
import { atom } from 'jotai';
import { useAtom } from 'jotai/index';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import type * as StandardTeksterType from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { sokEtterTekster } from 'src/app/personside/dialogpanel/sendMelding/standardTekster/sokUtils';
import LocaleVelger from 'src/components/melding/standardtekster/LocaleVelger';
import StandardtekstListe from 'src/components/melding/standardtekster/StandardTekstListe';
import StandardTekstPreview from 'src/components/melding/standardtekster/StandardTekstPreview';
import { Locale } from 'src/lib/types/skrivestotte';
import skrivestotteResource from 'src/rest/resources/skrivestotteResource';

type standardTekstSok = {
    search: string;
    filtrerteTekster: StandardTeksterType.Tekst[];
    tekst?: StandardTeksterType.Tekst;
    locale: Locale;
};

export const standardTekstSokAtom = atom<standardTekstSok>({
    search: '',
    locale: Locale.nb_NO,
    filtrerteTekster: []
});

const useSetDefaultAtomVerdier = (hentetTekster?: StandardTeksterType.Tekster) => {
    const [_value, setValue] = useAtom(standardTekstSokAtom);
    const tekster: StandardTeksterType.Tekst[] = hentetTekster ? Object.values(hentetTekster) : [];

    useEffect(() => {
        setValue(() => ({
            search: '',
            filtrerteTekster: tekster,
            tekst: tekster[0],
            locale: tekster[0] ? (Object.keys(tekster[0].innhold)[0] as Locale) : Locale.nb_NO
        }));
    }, [tekster, setValue]);
};

const SearchField = () => {
    const { data } = skrivestotteResource.useFetch();
    const [internalValue, setInternalValue] = useState('');
    const [value, setValue] = useAtom(standardTekstSokAtom);

    useEffect(() => {
        setInternalValue(value.search ?? '');
    }, [value]);

    const filtrerTekst = (sok: string) => {
        const test = sokEtterTekster(data, sok);
        setValue((values) => ({
            ...values,
            search: sok,
            tekst: test[0],
            filtrerteTekster: test
        }));
    };

    const debouncedFilter = debounce(filtrerTekst, 500);

    return (
        <Search
            className="py-3"
            name="standardtekstsok"
            label="Søk etter standardtekster"
            autoComplete="off"
            variant="simple"
            value={internalValue}
            onChange={(v) => {
                setInternalValue(v);
                debouncedFilter(v);
            }}
        />
    );
};

function StandardTekster() {
    const { data } = skrivestotteResource.useFetch();
    useSetDefaultAtomVerdier(data);

    return (
        <Box minHeight="30rem" maxHeight="40rem" maxWidth="57rem" minWidth="40rem" width="100%">
            <h2 className="sr-only">Standardtekster</h2>
            <SearchField />
            <HGrid gap="0" columns={2}>
                <StandardtekstListe />
                <VStack
                    justify="space-between"
                    gap="space-16"
                    className="flex min-w-2/3 max-h-[40rem] h-full overflow-visible bg-ax-accent-100 p-4 rounded sm"
                >
                    <StandardTekstPreview />
                    <HStack justify="space-between" align="end">
                        <div>
                            <LocaleVelger />
                        </div>
                        <Button>
                            Velg <span className="sr-only">tekst</span>
                        </Button>
                    </HStack>
                </VStack>
            </HGrid>
        </Box>
    );
}

export default StandardTekster;
