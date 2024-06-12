import * as React from 'react';
import { UtbetalingFilterState, FraTilDato } from '../../../../../redux/utbetalinger/types';
import { Periode } from '../../../../../models/tid';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { Datepicker, isISODateString } from 'nav-datovelger';
import dayjs, { Dayjs } from 'dayjs';
import { INPUT_DATE_STRING_FORMAT, ISO_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';
import { DatepickerLimitations } from 'nav-datovelger/lib/types';

interface Props {
    filter: UtbetalingFilterState;
    updateFilter: (change: Partial<UtbetalingFilterState>) => void;
}

function onDatoChange(props: Props, dato: Partial<Periode>) {
    const newPeriode: FraTilDato = {
        fra: dato.fra ?? props.filter.periode.egendefinertPeriode.fra,
        til: dato.til ?? props.filter.periode.egendefinertPeriode.til
    };
    props.updateFilter({
        periode: {
            ...props.filter.periode,
            egendefinertPeriode: newPeriode
        }
    });
}

const senesteDato: Dayjs = dayjs();

const isoSenesteDato = senesteDato.format(ISO_DATE_STRING_FORMAT);

const periodeValidering = [
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return !fra.isValid();
        },
        feilmelding: 'Du må velge gyldig fra-dato. Gyldig datoformat er dd.mm.åååå'
    },
    {
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return !til.isValid();
        },
        feilmelding: 'Du må velge gyldig til-dato. Gyldig datoformat er dd.mm.åååå'
    },
    {
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return fra.isAfter(til);
        },
        feilmelding: 'Fra-dato kan ikke være senere enn til-dato'
    },
    {
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return til.isAfter(senesteDato);
        },
        feilmelding: `Du kan ikke velge dato etter ${senesteDato.format(INPUT_DATE_STRING_FORMAT)}`
    }
];

function getDatoFeilmelding(fra: string, til: string) {
    const fraDato = dayjs(fra, ISO_DATE_STRING_FORMAT);
    const tilDato = dayjs(til, ISO_DATE_STRING_FORMAT);
    const feilmelding: string | undefined = periodeValidering.find((validering) =>
        validering.erUgyldig(fraDato, tilDato)
    )?.feilmelding;
    if (feilmelding) {
        return <SkjemaelementFeilmelding>{feilmelding}</SkjemaelementFeilmelding>;
    }
    return null;
}

function EgendefinertDatoInputs(props: Props) {
    const fra = props.filter.periode.egendefinertPeriode.fra;
    const til = props.filter.periode.egendefinertPeriode.til;
    const periodeFeilmelding = getDatoFeilmelding(fra, til);
    const avgrensninger: DatepickerLimitations = {
        maxDate: isoSenesteDato
    };

    return (
        <>
            <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
            <Datepicker
                locale={'nb'}
                inputId="utbetalinger-datovelger-fra"
                value={fra}
                onChange={(dato) => onDatoChange(props, { fra: dato })}
                inputProps={{
                    name: 'Fra dato',
                    'aria-invalid': fra !== '' && isISODateString(fra) === false
                }}
                showYearSelector={true}
                limitations={avgrensninger}
                dayPickerProps={{
                    onMonthChange(dato: Date) {
                        onDatoChange(props, {
                            fra: dayjs(dato).format(ISO_DATE_STRING_FORMAT)
                        });
                    }
                }}
            />
            <label htmlFor="utbetalinger-datovelger-til">Til:</label>
            <Datepicker
                locale={'nb'}
                inputId="utbetalinger-datovelger-til"
                value={til}
                onChange={(dato) => onDatoChange(props, { til: dato })}
                inputProps={{
                    name: 'Til dato',
                    'aria-invalid': til !== '' && isISODateString(til) === false
                }}
                showYearSelector={true}
                limitations={avgrensninger}
                dayPickerProps={{
                    onMonthChange(dato: Date) {
                        onDatoChange(props, {
                            til: dayjs(dato).format(ISO_DATE_STRING_FORMAT)
                        });
                    }
                }}
            />
            {periodeFeilmelding}
        </>
    );
}

export default EgendefinertDatoInputs;
