import { formaterDato } from '../../../../../../utils/dateUtils';
import { formaterNOK, getBruttoSumYtelser, getNettoSumYtelser } from '../../../utbetalinger/utils/utbetalingerUtils';
import { getSummertKreditortrekkFraUtbetaling } from './historiskeUtbetalingerUtils';
import * as React from 'react';
import { useState } from 'react';
import DetaljerCollapse from '../../../../../../components/DetaljerCollapse';
import DescriptionList from '../../../../../../components/DescriptionList';
import { Utbetaling, Ytelse } from '../../../../../../models/utbetalinger';

interface Props {
    ytelse: Ytelse;
    utbetaling: Utbetaling;
}

function HistoriskUtbetalingKomponent({ utbetaling, ytelse }: Props) {
    const nettoSum = getNettoSumYtelser([ytelse]);
    const bruttoSum = getBruttoSumYtelser([ytelse]);
    const utbetaltEntries = {
        Type: ytelse.type,
        Netto: nettoSum && formaterNOK(nettoSum) + ' NOK',
        Dato: utbetaling.utbetalingsdato && formaterDato(utbetaling.utbetalingsdato),
        Periode: `${formaterDato(ytelse.periode.start)} - ${formaterDato(ytelse.periode.slutt)}`,
        Utbetalingsgrad: 'Ikke implementert'
    };
    const kreditorTrekk = getSummertKreditortrekkFraUtbetaling(ytelse);
    const utbetaltDetaljerEntries = {
        Dagsats: 'Ikke implementert',
        Bruttobeløp: bruttoSum && formaterNOK(bruttoSum) + ' NOK',
        Arbeidsgiver: 'Ikke implementert',
        Organisasjonsnummer: 'Ikke implementert',
        Skattetrekk: ytelse.skattsum,
        Kreditortrekk: kreditorTrekk && formaterNOK(kreditorTrekk) + ' NOK'
    };
    const [visDetaljer, setVisDetaljer] = useState(false);
    return (
        <li aria-label={'Utført utbetaling ' + utbetaltEntries.Dato}>
            <DetaljerCollapse
                header={<DescriptionList entries={utbetaltEntries} />}
                alwaysGrayBackground={true}
                open={visDetaljer}
                toggle={() => setVisDetaljer(!visDetaljer)}
            >
                <DescriptionList entries={utbetaltDetaljerEntries} />
            </DetaljerCollapse>
        </li>
    );
}

export default HistoriskUtbetalingKomponent;
