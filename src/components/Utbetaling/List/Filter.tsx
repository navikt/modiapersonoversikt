import { BodyShort, Box, ExpansionCard, Fieldset, Switch, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import {
    reduceUtbetlingerTilYtelser,
    useFilterUtbetalinger,
    utbetalingMottakere
} from 'src/components/Utbetaling/List/utils';
import type { Utbetaling, Ytelse } from 'src/generated/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';
import { filterType, trackExpansionCardApnet, trackExpansionCardLukket, trackFilterEndret } from 'src/utils/analytics';
import { sorterAlfabetisk } from 'src/utils/string-utils';
import { twMerge } from 'tailwind-merge';

export type UtbetalingFilter = {
    dateRange: DateRange;
    ytelseTyper: string[];
    utbetaltTil: string[];
};

const defaultDate = getPeriodFromOption(PeriodType.CUSTOM);

export const utbetalingFilterAtom = atomWithReset<UtbetalingFilter>({
    dateRange: defaultDate,
    ytelseTyper: [],
    utbetaltTil: utbetalingMottakere
});

const utbetalingFilterYtelseTypeAtom = atom(
    (get) => get(utbetalingFilterAtom).ytelseTyper,
    (_get, set, newVal: string) => {
        set(utbetalingFilterAtom, (filters) => ({
            ...filters,
            ytelseTyper: filters.ytelseTyper ? xor(filters.ytelseTyper, [newVal]) : [newVal]
        }));
    }
);

const utbetalingFilterUtbetaltTilAtom = atom(
    (get) => get(utbetalingFilterAtom).utbetaltTil,
    (_get, set, newVal: string) => {
        set(utbetalingFilterAtom, (filters) => ({
            ...filters,
            utbetaltTil: xor(filters.utbetaltTil, [newVal])
        }));
    }
);

export const utbetalingFilterDateRangeAtom = atom(
    (get) => get(utbetalingFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        const range = dateRange ?? defaultDate;
        set(utbetalingFilterAtom, (filters) => ({
            ...filters,
            dateRange: range
        }));
    }
);

const DateFilter = () => {
    const [value, setValue] = useAtom(utbetalingFilterDateRangeAtom);
    return <DateRangeSelector range={value} onChange={setValue} defaultPeriodType={PeriodType.CUSTOM} />;
};

const UtbetalingYtelserFilter = () => {
    const { utbetalinger } = useFilterUtbetalinger();
    const [selectedYtelse, setSelectedYtelse] = useAtom(utbetalingFilterYtelseTypeAtom);

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedYtelse(option);
            trackFilterEndret('utbetaling', filterType.YTELSE_TYPE);
        },
        [setSelectedYtelse]
    );

    const getUnikeYtelser = (data: Utbetaling[]): string[] => {
        const getTypeFromYtelse = (ytelse: Ytelse) => ytelse.type || 'Mangler beskrivelse';
        const fjernDuplikater = (ytelse: string, index: number, self: Array<string>) => self.indexOf(ytelse) === index;
        return reduceUtbetlingerTilYtelser(data).map(getTypeFromYtelse).filter(fjernDuplikater).sort(sorterAlfabetisk);
    };

    const unikeYtelser = getUnikeYtelser(utbetalinger);

    return (
        <UNSAFE_Combobox
            size="small"
            label="Ytelse"
            options={unikeYtelser}
            isMultiSelect
            selectedOptions={selectedYtelse}
            onToggleSelected={onToggleSelected}
        />
    );
};

const UtbetaltTilFilter = () => {
    const [selectedMottakere, setSelectedMottakere] = useAtom(utbetalingFilterUtbetaltTilAtom);
    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedMottakere(option);
            trackFilterEndret('utbetaling', filterType.TYPE);
        },
        [setSelectedMottakere]
    );

    return (
        <Fieldset size="small" legend="Utbetaling til">
            <VStack gap="2">
                {utbetalingMottakere.map((mottaker) => (
                    <Switch
                        key={mottaker}
                        size="small"
                        checked={selectedMottakere.includes(mottaker)}
                        onChange={() => onToggleSelected(mottaker)}
                    >
                        {mottaker}
                    </Switch>
                ))}
            </VStack>
        </Fieldset>
    );
};

const FilterTitle = () => {
    const { utbetalinger } = useFilterUtbetalinger();

    return (
        <>
            Filter ({utbetalinger.length} {utbetalinger.length === 1 ? 'utbetaling' : 'utbetalinger'})
            <BodyShort visuallyHidden>funnet</BodyShort>
        </>
    );
};

export const UtbetalingListFilter = () => {
    const setFilter = useSetAtom(utbetalingFilterAtom);
    const [open, setOpen] = useState(false);
    const fnr = usePersonAtomValue();
    const expansionFilterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFilter(RESET);
    }, [fnr]);

    const handleExpansionChange = () => {
        setTimeout(() => {
            if (!expansionFilterRef.current) return;
            const isOpen = expansionFilterRef.current.classList.contains('aksel-expansioncard--open');
            setOpen(isOpen);
            if (isOpen !== open) {
                isOpen ? trackExpansionCardApnet('utbetalingfilter') : trackExpansionCardLukket('utbetalingfilter');
            }
        }, 0);
    };
    return (
        <Box.New marginInline="0 2" className={twMerge(open && 'max-h-full')}>
            <ExpansionCard
                onClick={handleExpansionChange}
                ref={expansionFilterRef}
                className={twMerge(open && 'max-h-full overflow-auto')}
                size="small"
                aria-label="Filtrer utbetalinger"
            >
                <ExpansionCard.Header className="py-0 pl-2">
                    <ExpansionCard.Title size="small" as="h3" className="text-ax-medium" role="alert">
                        <FilterTitle />
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content className="overflow-visible">
                    <VStack gap="2">
                        <Box.New maxWidth="17rem">
                            <UtbetalingYtelserFilter />
                        </Box.New>
                        <Box.New maxWidth="17rem">
                            <UtbetaltTilFilter />
                        </Box.New>
                        <Box.New>
                            <DateFilter />
                        </Box.New>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </Box.New>
    );
};
