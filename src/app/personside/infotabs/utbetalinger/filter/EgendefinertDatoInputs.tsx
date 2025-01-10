import { DatePicker, useDatepicker } from '@navikt/ds-react';
import dayjs, { type Dayjs } from 'dayjs';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { useState } from 'react';
import type { FraTilDato } from 'src/redux/utbetalinger/types';
import { ISO_DATE_FORMAT } from 'src/utils/date-utils';
import styled from 'styled-components';

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

    const [fraDato, setFraDato] = useState(dayjs(props.periode?.fra));
    const [tilDato, setTilDato] = useState(dayjs(props.periode?.til));
    const [periodeFeilmelding, setPeriodeFeilmelding] = useState<string | undefined>();

    const onFraDatoChange = (val?: Date) => {
        const value = dayjs(val);
        setFraDato(dayjs(val));
        onRangeDatoChange(value.format(ISO_DATE_FORMAT), tilDato.format(ISO_DATE_FORMAT));
    };

    const onTilDatoChange = (val?: Date) => {
        const value = dayjs(val).format(ISO_DATE_FORMAT);
        setTilDato(dayjs(val));
        onRangeDatoChange(fraDato.format(ISO_DATE_FORMAT), value);
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
        defaultSelected: fraDato.toDate(),
        onDateChange: onFraDatoChange
    });

    const { datepickerProps: toDatepickerProps, inputProps: toInputProps } = useDatepicker({
        defaultSelected: tilDato.toDate(),
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
                    <DatePicker.Input {...fromInputProps} size={'small'} label="Fra" />
                </DatePicker>
                <DatePicker
                    {...toDatepickerProps}
                    strategy={'fixed'}
                    locale={'nb'}
                    dropdownCaption={true}
                    fromDate={minTilDato}
                    toDate={toDate}
                >
                    <DatePicker.Input {...toInputProps} size={'small'} label="Til" />
                </DatePicker>
            </DatePickerWrapper>
            {periodeFeilmelding && <SkjemaelementFeilmelding>{periodeFeilmelding}</SkjemaelementFeilmelding>}
        </>
    );
}

export default EgendefinertDatoInputs;
