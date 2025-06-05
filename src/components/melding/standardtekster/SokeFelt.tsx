import { Search } from '@navikt/ds-react';
import { useAtom } from 'jotai/index';
import { debounce } from 'lodash';
import { type RefObject, useState } from 'react';
import { sokEtterTekster } from 'src/app/personside/dialogpanel/sendMelding/standardTekster/sokUtils';
import { standardTekstSokAtom } from 'src/components/melding/standardtekster/StandardTekster';
import skrivestotteResource from 'src/rest/resources/skrivestotteResource';
import useHotkey from 'src/utils/hooks/use-hotkey';
import { cyclicClamp } from 'src/utils/math';

const SokeFelt = ({ sokRef }: { sokRef: RefObject<HTMLDivElement | null> }) => {
    const { data } = skrivestotteResource.useFetch();
    const [value, setValue] = useAtom(standardTekstSokAtom);
    const [internalValue, setInternalValue] = useState('');
    const filtrerTekst = (sok: string) => {
        const tekst = sokEtterTekster(data, sok);
        setValue((values) => ({
            ...values,
            tekst: tekst[0],
            filtrerteTekster: tekst
        }));
    };

    const debouncedFilter = debounce(filtrerTekst, 250);

    const velg = (offset: number) => () => {
        const index = value.filtrerteTekster.findIndex((tekst) => tekst.id === value.tekst?.id);
        if (index !== -1) {
            const nextIndex = cyclicClamp(index + offset, value.filtrerteTekster.length);
            const nextTekst = value.filtrerteTekster[nextIndex];
            setValue((vals) => ({
                ...vals,
                tekst: nextTekst
            }));
        }
    };

    useHotkey(
        'arrowup',
        velg(-1),
        [value.filtrerteTekster, value.tekst],
        'ForrigeStandardtekst',
        sokRef?.current ?? undefined
    );
    useHotkey(
        'arrowdown',
        velg(1),
        [value.filtrerteTekster, value.tekst],
        'NesteStandardtekst',
        sokRef?.current ?? undefined
    );

    return (
        <Search
            autoFocus
            ref={sokRef}
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

export default SokeFelt;
