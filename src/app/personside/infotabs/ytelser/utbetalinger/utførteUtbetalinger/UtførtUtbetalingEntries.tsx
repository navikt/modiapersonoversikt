import { datoEllerNull, formaterDato, NOKellerNull } from '../../../../../../utils/stringFormatting';
import { formaterNOK, getBruttoSumYtelser, getNettoSumYtelser } from '../../../utbetalinger/utils/utbetalingerUtils';
import * as React from 'react';
import { Trekk, Utbetaling, Ytelse } from '../../../../../../models/utbetalinger';
import styled from 'styled-components';
import { TableRow } from '../../../../../../utils/tableUtils';
import theme from '../../../../../../styles/personOversiktTheme';

function getKreditorTrekk(ytelse: Ytelse): React.ReactNode | null {
    if (!ytelse.trekkListe || ytelse.trekkListe.length === 0) {
        return null;
    }
    return <KreditortrekkListe trekkListe={ytelse.trekkListe} />;
}

const KreditorListeStyle = styled.ul`
    > li {
        display: flex;
        justify-content: space-between;
        > *:last-child {
            margin-left: 1rem;
        }
        &:not(:last-child) {
            border-bottom: ${theme.border.skilleSvak};
            padding-bottom: 0.1rem;
            margin-bottom: 0.1rem;
        }
    }
`;

function KreditortrekkListe(props: { trekkListe: Trekk[] }) {
    const kreditorliste = props.trekkListe.map((trekk, index) => {
        return (
            <li key={index}>
                <span>{trekk.kreditor || '\u2014'}</span> <span>{formaterNOK(trekk.trekkbeløp)} NOK</span>
            </li>
        );
    });
    return <KreditorListeStyle>{kreditorliste}</KreditorListeStyle>;
}

function utførtUtbetalingEntries(ytelse: Ytelse, utbetaling: Utbetaling): TableRow {
    const nettoSum = getNettoSumYtelser([ytelse]);
    const bruttoSum = getBruttoSumYtelser([ytelse]);
    return [
        ytelse.type,
        NOKellerNull(nettoSum),
        datoEllerNull(utbetaling.utbetalingsdato),
        `${formaterDato(ytelse.periode.start)} - ${formaterDato(ytelse.periode.slutt)}`,
        NOKellerNull(bruttoSum),
        ytelse.arbeidsgiver && ytelse.arbeidsgiver.navn,
        ytelse.arbeidsgiver && ytelse.arbeidsgiver.orgnr,
        NOKellerNull(ytelse.skattsum),
        getKreditorTrekk(ytelse)
    ];
}

export default utførtUtbetalingEntries;
