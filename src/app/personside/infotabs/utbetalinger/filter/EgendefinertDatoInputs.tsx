import * as React from 'react';
import { UtbetalingFilterState, FraTilDato } from '../../../../../redux/utbetalinger/types';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { DatovelgerAvgrensninger } from 'nav-datovelger';
import moment from 'moment';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Feilmelding } from '../../../../../utils/Feilmelding';
import { tidligsteTilgjengeligeDatoUtbetalingerRestkonto } from '../../../../../redux/restReducers/utbetalinger';

interface Props {
    filter: UtbetalingFilterState;
    updateFilter: (change: Partial<UtbetalingFilterState>) => void;
}

function onDatoChange(props: Props, dato: Partial<FraTilDato>) {
    const newPeriode: FraTilDato = {
        fra: dato.fra && moment(dato.fra).isValid() ? dato.fra : new Date(props.filter.periode.egendefinertPeriode.fra),
        til: dato.til && moment(dato.til).isValid() ? dato.til : new Date(props.filter.periode.egendefinertPeriode.til)
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
        return <Feilmelding feil={{ feilmelding: 'Fra-dato kan ikke være senere enn til-dato' }} />;
    }
    if (til > new Date()) {
        return <Feilmelding feil={{ feilmelding: 'Du kan ikke velge dato frem i tid' }} />;
    }
    if (fra < tidligsteTilgjengeligeDatoUtbetalingerRestkonto) {
        return (
            <Feilmelding
                feil={{
                    feilmelding: `Du kan ikke velge en dato før ${formaterDato(
                        tidligsteTilgjengeligeDatoUtbetalingerRestkonto
                    )}`
                }}
            />
        );
    }
    return null;
}

function EgendefinertDatoInputs(props: Props) {
    const fra = props.filter.periode.egendefinertPeriode.fra;
    const til = props.filter.periode.egendefinertPeriode.til;
    const periodeFeilmelding = getDatoFeilmelding(fra, til);
    const avgrensninger: DatovelgerAvgrensninger = {
        minDato: formaterDato(tidligsteTilgjengeligeDatoUtbetalingerRestkonto),
        maksDato: formaterDato(new Date())
    };

    return (
        <>
            <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
            <Datovelger
                input={{ id: 'utbetalinger-datovelger-fra', name: 'Fra dato' }}
                visÅrVelger={true}
                valgtDato={formaterDato(props.filter.periode.egendefinertPeriode.fra)}
                onChange={dato => onDatoChange(props, { fra: moment(dato).toDate() })}
                id="utbetalinger-datovelger-fra"
                avgrensninger={avgrensninger}
            />
            <label htmlFor="utbetalinger-datovelger-til">Til:</label>
            <Datovelger
                input={{ id: 'utbetalinger-datovelger-til', name: 'Til dato' }}
                visÅrVelger={true}
                valgtDato={formaterDato(props.filter.periode.egendefinertPeriode.til)}
                onChange={dato => onDatoChange(props, { til: moment(dato).toDate() })}
                id="utbetalinger-datovelger-til"
                avgrensninger={avgrensninger}
            />
            {periodeFeilmelding}
        </>
    );
}

export default EgendefinertDatoInputs;
