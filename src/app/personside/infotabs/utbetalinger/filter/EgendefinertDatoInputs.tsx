import * as React from 'react';
import { useState } from 'react';
import { FraTilDato } from '../../../../../redux/utbetalinger/types';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import styled from 'styled-components';
import { ISO_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';

interface EgendefinertDatoInputsProps {
    updateFraTilDato: (change: FraTilDato) => void;
    periode?: FraTilDato;
}

const DatePickerWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

function EgendefinertDatoInputs(props: EgendefinertDatoInputsProps) {
    const periodeValidering = [
        {
            erUgyldig(fra: Dayjs, til: Dayjs) {
                return !fra.isValid() || !til.isValid();
            },
            feilmelding: 'Du må velge gyldig fra og til dato. Gyldig datoformat er dd.mm.åååå'
        },
        {
            erUgyldig(fra: Dayjs, til: Dayjs) {
                return fra.isAfter(til);
            },
            feilmelding: 'Fra-dato kan ikke være senere enn til-dato'
        }
    ];

    const [fraDato, setFraDato] = useState(props.periode?.fra);
    const [tilDato, setTilDato] = useState(props.periode?.til);
    const [periodeFeilmelding, setPeriodeFeilmelding] = useState<string | undefined>();

    const onFraDatoChange = (val: Date) => {
        const value = dayjs(val).format(ISO_DATE_STRING_FORMAT);
        setFraDato(dayjs(val).format(ISO_DATE_STRING_FORMAT));
        onRangeDatoChange(value, tilDato);
    };

    const onTilDatoChange = (val: Date) => {
        const value = dayjs(val).format(ISO_DATE_STRING_FORMAT);
        setTilDato(dayjs(val).format(ISO_DATE_STRING_FORMAT));
        onRangeDatoChange(fraDato, value);
    };

    const onRangeDatoChange = (fra?: string, til?: string) => {
        const error = getDatoFeilmelding(fra, til);
        if (!error && fra && til) {
            setPeriodeFeilmelding(undefined);
            const newPeriode: FraTilDato = { fra, til };
            props.updateFraTilDato(newPeriode);
        } else {
            setPeriodeFeilmelding(error);
        }
    };

    const { datepickerProps: fromDatepickerProps, inputProps: fromInputProps } = useDatepicker({
        defaultSelected: new Date(fraDato ?? ''),
        onDateChange: onFraDatoChange
    });

    const { datepickerProps: toDatepickerProps, inputProps: toInputProps } = useDatepicker({
        defaultSelected: new Date(tilDato ?? ''),
        onDateChange: onTilDatoChange
    });

    const getDatoFeilmelding = (fra?: string, til?: string) => {
        const fraDato = dayjs(fra);
        const tilDato = dayjs(til);
        return periodeValidering.find((validering) => validering.erUgyldig(fraDato, tilDato))?.feilmelding;
    };

    const fromDate = dayjs().subtract(10, 'year').startOf('year').toDate();
    const toDate = dayjs().toDate();

    const maxFraDato = tilDato ? dayjs(tilDato).subtract(1, 'day').toDate() : toDate;
    const minTilDato = fraDato ? dayjs(fraDato).add(1, 'day').toDate() : fromDate;

    return (
        <>
            <DatePickerWrapper>
                <DatePicker
                    {...fromDatepickerProps}
                    strategy={'fixed'}
                    locale={'nb'}
                    dropdownCaption={true}
                    fromDate={fromDate}
                    toDate={maxFraDato}
                >
                    <DatePicker.Input {...fromInputProps} locale={'nb'} size={'small'} label="Fra" />
                </DatePicker>
                <DatePicker
                    {...toDatepickerProps}
                    strategy={'fixed'}
                    locale={'nb'}
                    dropdownCaption={true}
                    fromDate={minTilDato}
                    toDate={toDate}
                >
                    <DatePicker.Input {...toInputProps} locale={'nb'} size={'small'} label="Til" />
                </DatePicker>
            </DatePickerWrapper>
            {periodeFeilmelding && <SkjemaelementFeilmelding>{periodeFeilmelding}</SkjemaelementFeilmelding>}
        </>
    );
}

export default EgendefinertDatoInputs;
