import * as React from 'react';
import { UtbetalingFilterState, FraTilDato } from '../../../../../redux/utbetalinger/types';
import { formaterDato, formaterTilISO8601Date } from '../../../../../utils/string-utils';
import { DatovelgerAvgrensninger } from 'nav-datovelger';
import moment from 'moment';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { tidligsteTilgjengeligeDatoUtbetalingerRestkonto } from '../../../../../redux/restReducers/utbetalinger';
import { Periode } from '../../../../../models/tid';
import { isValidDate } from '../../../../../utils/date-utils';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';

interface Props {
    filter: UtbetalingFilterState;
    updateFilter: (change: Partial<UtbetalingFilterState>) => void;
}

function onDatoChange(props: Props, dato: Partial<Periode>) {
    const newPeriode: FraTilDato = {
        fra: dato.fra ? moment(dato.fra).toDate() : props.filter.periode.egendefinertPeriode.fra,
        til: dato.til ? moment(dato.til).toDate() : props.filter.periode.egendefinertPeriode.til
    };
    props.updateFilter({
        periode: {
            ...props.filter.periode,
            egendefinertPeriode: newPeriode
        }
    });
}

function getDatoFeilmelding(fra: Date, til: Date) {
    if (fra > til) {
        return <SkjemaelementFeilmelding>Fra-dato kan ikke være senere enn til-dato</SkjemaelementFeilmelding>;
    }
    if (til > new Date()) {
        return <SkjemaelementFeilmelding>Du kan ikke velge dato frem i tid</SkjemaelementFeilmelding>;
    }
    if (fra < tidligsteTilgjengeligeDatoUtbetalingerRestkonto) {
        return (
            <SkjemaelementFeilmelding>
                `Du kan ikke velge en dato før ${formaterDato(tidligsteTilgjengeligeDatoUtbetalingerRestkonto)}`
            </SkjemaelementFeilmelding>
        );
    }
    if (!isValidDate(fra) || !isValidDate(til)) {
        return <SkjemaelementFeilmelding>Du må velge gyldige datoer</SkjemaelementFeilmelding>;
    }
    return null;
}

function EgendefinertDatoInputs(props: Props) {
    const fra = props.filter.periode.egendefinertPeriode.fra;
    const til = props.filter.periode.egendefinertPeriode.til;
    const periodeFeilmelding = getDatoFeilmelding(fra, til);
    const avgrensninger: DatovelgerAvgrensninger = {
        minDato: formaterTilISO8601Date(tidligsteTilgjengeligeDatoUtbetalingerRestkonto),
        maksDato: formaterTilISO8601Date(new Date())
    };

    return (
        <>
            <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
            <Datovelger
                input={{ id: 'utbetalinger-datovelger-fra', name: 'Fra dato' }}
                visÅrVelger={true}
                valgtDato={formaterTilISO8601Date(props.filter.periode.egendefinertPeriode.fra)}
                onChange={dato => onDatoChange(props, { fra: dato })}
                id="utbetalinger-datovelger-fra"
                avgrensninger={avgrensninger}
            />
            <label htmlFor="utbetalinger-datovelger-til">Til:</label>
            <Datovelger
                input={{ id: 'utbetalinger-datovelger-til', name: 'Til dato' }}
                visÅrVelger={true}
                valgtDato={formaterTilISO8601Date(props.filter.periode.egendefinertPeriode.til)}
                onChange={dato => onDatoChange(props, { til: dato })}
                id="utbetalinger-datovelger-til"
                avgrensninger={avgrensninger}
            />
            {periodeFeilmelding}
        </>
    );
}

export default EgendefinertDatoInputs;
