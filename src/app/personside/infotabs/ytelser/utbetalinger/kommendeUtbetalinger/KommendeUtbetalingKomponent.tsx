import { KommendeUtbetaling } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import * as React from 'react';
import { useState } from 'react';
import DescriptionList from '../../../../../../components/DescriptionList';
import DetaljerCollapse from '../../../../../../components/DetaljerCollapse';
import {
    datoEllerNull,
    NOKellerNull,
    periodeEllerNull,
    prosentEllerNull
} from '../../../../../../utils/stringFormatting';

interface Props {
    kommendeUtbetaling: KommendeUtbetaling;
}

function KommendeUtbetalingKomponent({ kommendeUtbetaling }: Props) {
    const kommendeEntries = {
        Registeringsdato: datoEllerNull(kommendeUtbetaling.utbetalingsdato),
        Type: kommendeUtbetaling.type,
        Periode: periodeEllerNull(kommendeUtbetaling.vedtak),
        Utbetalingsgrad: prosentEllerNull(kommendeUtbetaling.utbetalingsgrad)
    };

    const kommendeDetaljerEntries = {
        Dagsats: NOKellerNull(kommendeUtbetaling.dagsats),
        Bruttobeløp: NOKellerNull(kommendeUtbetaling.bruttobeløp),
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
