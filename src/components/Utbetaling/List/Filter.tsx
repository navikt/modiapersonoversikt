import { Box, ExpansionCard, Fieldset, Switch, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { reduceUtbetlingerTilYtelser, utbetalingMottakere } from 'src/components/Utbetaling/List/utils';
import type { Utbetaling, Ytelse } from 'src/generated/modiapersonoversikt-api';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
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
    return <DateRangeSelector range={value} onChange={setValue} />;
};

const UtbetalingYtelserFilter = () => {
    const [selectedYtelse, setSelectedYtelse] = useAtom(utbetalingFilterYtelseTypeAtom);
    const dateRange = useAtomValue(utbetalingFilterDateRangeAtom);
    const startDato = dateRange.from.format('YYYY-MM-DD');
    const sluttDato = dateRange.to.format('YYYY-MM-DD');
    const { data } = useUtbetalinger(startDato, sluttDato);
    const utbetalinger = data?.utbetalinger ?? [];

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedYtelse(option);
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
    const filters = useAtomValue(utbetalingFilterAtom);

    const activeFilters = useMemo(() => {
        let count = 0;
        if (filters.ytelseTyper && filters.ytelseTyper.length > 0) {
            count++;
        }
        if (filters.utbetaltTil && filters.utbetaltTil.length > 0) {
            count++;
        }
        if (filters.dateRange) {
            count++;
        }

        return count ? `(${count})` : null;
    }, [filters]);

    return <>Filter {activeFilters}</>;
};

export const UtbetalingListFilter = () => {
    const [open, setOpen] = useState(false);
    const expansionFilterRef = useRef<HTMLDivElement>(null);

    const handleExpansionChange = () => {
        setTimeout(() => {
            if (!expansionFilterRef.current) return;
            setOpen(expansionFilterRef.current.classList.contains('aksel-expansioncard--open'));
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
                <ExpansionCard.Header className="p-1">
                    <Box.New paddingInline="4">
                        <ExpansionCard.Title size="small">
                            <FilterTitle />
                        </ExpansionCard.Title>
                    </Box.New>
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
