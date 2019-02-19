import { HistoriskUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import { formaterDato } from '../../../../../utils/dateUtils';
import { formaterNOK } from '../../utbetalinger/utils/utbetalingerUtils';
import { getFormatertKreditortrekkFraHistoriskUtbetaling } from './utbetalingerUtils';
import * as React from 'react';
import { useState } from 'react';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import DescriptionList from '../../../../../components/DescriptionList';

interface Props {
    historiskUtbetaling: HistoriskUtbetaling;
}

function HistoriskUtbetalingKomponent({ historiskUtbetaling }: Props) {
    const utbetaltEntries = {
        Type: historiskUtbetaling.type,
        Netto: historiskUtbetaling.nettobeløp && formaterNOK(historiskUtbetaling.nettobeløp) + ' NOK',
        Dato: historiskUtbetaling.utbetalingsdato && formaterDato(historiskUtbetaling.utbetalingsdato),
        Periode:
            historiskUtbetaling.vedtak &&
            `${formaterDato(historiskUtbetaling.vedtak.fra)} - ${formaterDato(historiskUtbetaling.vedtak.til)}`,
        Utbetalingsgrad: historiskUtbetaling.utbetalingsgrad && historiskUtbetaling.utbetalingsgrad + '%'
    };
    const utbetaltDetaljerEntries = {
        Dagsats: historiskUtbetaling.dagsats && formaterNOK(historiskUtbetaling.dagsats),
        Bruttobeløp: historiskUtbetaling.bruttobeløp && formaterNOK(historiskUtbetaling.bruttobeløp) + ' NOK',
        Arbeidsgiver: historiskUtbetaling.arbeidsgiverNavn,
        Organisasjonsnummer: historiskUtbetaling.arbeidsgiverOrgNr,
        Skattetrekk: historiskUtbetaling.skattetrekk,
        Kreditortrekk: getFormatertKreditortrekkFraHistoriskUtbetaling(historiskUtbetaling)
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
