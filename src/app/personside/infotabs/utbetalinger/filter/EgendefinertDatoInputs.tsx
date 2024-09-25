import * as React from 'react';
import { useState } from 'react';
import { FraTilDato } from '../../../../../redux/utbetalinger/types';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, HStack, useRangeDatepicker } from '@navikt/ds-react';
import styled from 'styled-components';
import { ISO_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';

interface EgendefinertDatoInputsProps {
    updateFraTilDato: (change: FraTilDato) => void;
    periode?: FraTilDato;
}

const DatePickerWrapper = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

type DateRange = {
    from: Date;
    to: Date;
};

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

    const fra = props.periode?.fra ?? '';
    const til = props.periode?.til ?? '';
    const [periodeFeilmelding, setPeriodeFeilmelding] = useState<string | undefined>();

    const onRangeDatoChange = (val?: DateRange) => {
        const fraDato = val?.from ? dayjs(val.from).format(ISO_DATE_STRING_FORMAT) : fra;
        const tilDato = val?.to ? dayjs(val.to).format(ISO_DATE_STRING_FORMAT) : til;
        const newPeriode: FraTilDato = {
            fra: fraDato,
            til: tilDato
        };

        const error = getDatoFeilmelding(fraDato, tilDato);
        if (error) {
            setPeriodeFeilmelding(error);
        } else {
            setPeriodeFeilmelding(undefined);
            props.updateFraTilDato(newPeriode);
        }
    };

    const defaultSelected = { from: new Date(fra), to: new Date(til) };

    const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
        onRangeChange: onRangeDatoChange,
        defaultSelected: defaultSelected
    });

    const getDatoFeilmelding = (fra: string, til: string) => {
        const fraDato = dayjs(fra);
        const tilDato = dayjs(til);
        return periodeValidering.find((validering) => validering.erUgyldig(fraDato, tilDato))?.feilmelding;
    };

    const fromDate = dayjs().subtract(50, 'year').startOf('year').toDate();
    const toDate = dayjs().toDate();

    return (
        <>
            <DatePickerWrapper>
                <DatePicker
                    {...datepickerProps}
                    strategy={'fixed'}
                    locale={'nb'}
                    dropdownCaption={true}
                    fromDate={fromDate}
                    toDate={toDate}
                >
                    <HStack wrap gap="4" justify="center">
                        <DatePicker.Input {...fromInputProps} locale={'nb'} type={'small'} label="Fra" />
                        <DatePicker.Input {...toInputProps} locale={'nb'} type={'small'} label="Til" />
                    </HStack>
                </DatePicker>
            </DatePickerWrapper>
            {periodeFeilmelding && <SkjemaelementFeilmelding>{periodeFeilmelding}</SkjemaelementFeilmelding>}
        </>
    );
}

export default EgendefinertDatoInputs;
