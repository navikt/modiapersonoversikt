import { Box, Button, HGrid, HStack, VStack } from '@navikt/ds-react';
import { atom } from 'jotai';
import { useAtom } from 'jotai/index';
import { type DependencyList, type RefObject, useEffect, useRef } from 'react';
import {
    type AutofullforData,
    autofullfor,
    byggAutofullforMap,
    useAutoFullforData
} from 'src/app/personside/dialogpanel/sendMelding/autofullforUtils';
import type * as StandardTeksterModels from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain';
import type * as StandardTeksterType from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { erGyldigValg, rapporterBruk } from 'src/app/personside/dialogpanel/sendMelding/standardTekster/sokUtils';
import LocaleVelger from 'src/components/melding/standardtekster/LocaleVelger';
import SokeFelt from 'src/components/melding/standardtekster/SokeFelt';
import StandardtekstListe from 'src/components/melding/standardtekster/StandardTekstListe';
import StandardTekstPreview from 'src/components/melding/standardtekster/StandardTekstPreview';
import { useStandardTekster } from 'src/lib/clients/skrivestotte';
import { Locale } from 'src/lib/types/skrivestotte';
import useHotkey from 'src/utils/hooks/use-hotkey';

type standardTekstSok = {
    filtrerteTekster: StandardTeksterType.Tekst[];
    tekst?: StandardTeksterType.Tekst;
    locale: Locale;
};

export const standardTekstSokAtom = atom<standardTekstSok>({
    locale: Locale.nb_NO,
    filtrerteTekster: []
});

function submitTekst(values: standardTekstSok, velgTekst: (tekst: string) => void, autofullforData?: AutofullforData) {
    if (erGyldigValg(values.tekst, values.locale)) {
        rapporterBruk(values.tekst);
        const localeTekst = values.tekst.innhold[values.locale as StandardTeksterModels.Locale]?.trim();
        if (!localeTekst) return;
        if (autofullforData) {
            const nokler = byggAutofullforMap(
                values.locale,
                autofullforData.enhet,
                autofullforData.person,
                autofullforData.saksbehandler
            );
            const ferdigTekst = autofullfor(localeTekst, nokler);
            velgTekst(ferdigTekst);
        } else {
            velgTekst(localeTekst);
        }
    }
}

const useSetDefaultAtomVerdier = (hentetTekster?: StandardTeksterType.Tekster) => {
    const [_value, setValue] = useAtom(standardTekstSokAtom);
    const tekster: StandardTeksterType.Tekst[] = hentetTekster ? Object.values(hentetTekster) : [];

    useEffect(() => {
        setValue(() => ({
            filtrerteTekster: tekster,
            tekst: tekster[0],
            locale: tekster[0] ? (Object.keys(tekster[0].innhold)[0] as Locale) : Locale.nb_NO
        }));
    }, [tekster, setValue]);
};

const useSubmitTekstByEnter = (ref: RefObject<HTMLDivElement | null>, submitTekst: () => void, dep: DependencyList) => {
    useHotkey('enter', () => submitTekst(), dep, 'velg standardtekst', ref?.current || undefined);
};

function StandardTekster({
    velgTekst,
    modalRef
}: { velgTekst: (tekst: string) => void; modalRef?: React.RefObject<HTMLDialogElement | null> }) {
    const { data } = useStandardTekster();
    useSetDefaultAtomVerdier(data);
    const [values] = useAtom(standardTekstSokAtom);
    const autoFullforData = useAutoFullforData();
    const listeRef = useRef<HTMLDivElement | null>(null);
    const sokRef = useRef<HTMLDivElement | null>(null);

    const submitTekstOgLukkModal = () => {
        submitTekst(values, velgTekst, autoFullforData);
        modalRef?.current?.close();
    };

    useSubmitTekstByEnter(listeRef, submitTekstOgLukkModal, [values.filtrerteTekster, values.tekst]);
    useSubmitTekstByEnter(sokRef, submitTekstOgLukkModal, [values.filtrerteTekster, values.tekst]);

    return (
        <Box>
            <h2 className="sr-only">Standardtekster</h2>
            <SokeFelt sokRef={sokRef} />
            <HGrid gap="2" columns="1fr 2fr">
                <StandardtekstListe listeRef={listeRef} />
                {erGyldigValg(values.tekst, values.locale) ? (
                    <VStack
                        justify="space-between"
                        gap="space-16"
                        overflowY="auto"
                        className="bg-ax-bg-accent-soft p-4 rounded-sm"
                        height="60vh"
                    >
                        <StandardTekstPreview />
                        <HStack justify="space-between" align="end">
                            <div>
                                <LocaleVelger />
                            </div>
                            <HStack gap="3">
                                <Button
                                    size="small"
                                    variant="secondary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        modalRef?.current?.close();
                                    }}
                                >
                                    Avbryt
                                </Button>
                                <Button
                                    size="small"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        submitTekstOgLukkModal();
                                    }}
                                >
                                    Velg <span className="sr-only">tekst</span>
                                </Button>
                            </HStack>
                        </HStack>
                    </VStack>
                ) : (
                    <div />
                )}
            </HGrid>
        </Box>
    );
}

export default StandardTekster;
