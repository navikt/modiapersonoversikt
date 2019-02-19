import { KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import { formaterDato } from '../../../../../utils/dateUtils';
import { formaterNOK } from '../../utbetalinger/utils/utbetalingerUtils';
import * as React from 'react';
import { useState } from 'react';
import DescriptionList from '../../../../../components/DescriptionList';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';

interface Props {
    kommendeUtbetaling: KommendeUtbetaling;
}

function KommendeUtbetalingKomponent({ kommendeUtbetaling }: Props) {
    const kommendeEntries = {
        Registeringsdato: kommendeUtbetaling.utbetalingsdato && formaterDato(kommendeUtbetaling.utbetalingsdato),
        Type: kommendeUtbetaling.type,
        Periode:
            kommendeUtbetaling.vedtak &&
            `${formaterDato(kommendeUtbetaling.vedtak.fra)} - ${formaterDato(kommendeUtbetaling.vedtak.til)}`,
        Utbetalingsgrad: kommendeUtbetaling.utbetalingsgrad && kommendeUtbetaling.utbetalingsgrad + '%'
    };

    const kommendeDetaljerEntries = {
        Dagsats: kommendeUtbetaling.dagsats && formaterNOK(kommendeUtbetaling.dagsats) + ' NOK',
        Bruttobeløp: kommendeUtbetaling.bruttobeløp && formaterNOK(kommendeUtbetaling.bruttobeløp) + ' NOK',
        Arbeidsgiver: kommendeUtbetaling.arbeidsgiverNavn,
        Organisasjonsnummer: kommendeUtbetaling.arbeidsgiverOrgNr,
        'Saksbehandlerident (Tryde-ident)': kommendeUtbetaling.saksbehandler
    };
    const [visDetaljer, setVisDetaljer] = useState(false);
    return (
        <li aria-label={'Kommende utbetaling ' + kommendeEntries.Registeringsdato}>
            <DetaljerCollapse
                header={<DescriptionList entries={kommendeEntries} />}
                alwaysGrayBackground={true}
                open={visDetaljer}
                toggle={() => setVisDetaljer(!visDetaljer)}
            >
                <DescriptionList entries={kommendeDetaljerEntries} />
            </DetaljerCollapse>
        </li>
    );
}

export default KommendeUtbetalingKomponent;
