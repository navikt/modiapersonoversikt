import { formaterDato } from '../../../../../../utils/dateUtils';
import { formaterNOK, getBruttoSumYtelser, getNettoSumYtelser } from '../../../utbetalinger/utils/utbetalingerUtils';
import * as React from 'react';
import { useState } from 'react';
import DetaljerCollapse from '../../../../../../components/DetaljerCollapse';
import DescriptionList from '../../../../../../components/DescriptionList';
import { Trekk, Utbetaling, Ytelse } from '../../../../../../models/utbetalinger';
import styled from 'styled-components';

interface Props {
    ytelse: Ytelse;
    utbetaling: Utbetaling;
}

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
        margin-bottom: 0.5rem;
        > *:first-child {
            margin-right: 2rem;
        }
    }
`;

function KreditortrekkListe(props: { trekkListe: Trekk[] }) {
    const kreditorliste = props.trekkListe.map((trekk, index) => {
        return (
            <li key={index}>
                <span>{trekk.kreditor}</span> <span>{formaterNOK(trekk.trekkbeløp)} NOK</span>
            </li>
        );
    });
    return <KreditorListeStyle>{kreditorliste}</KreditorListeStyle>;
}

function UtførtUtbetaling({ utbetaling, ytelse }: Props) {
    const nettoSum = getNettoSumYtelser([ytelse]);
    const bruttoSum = getBruttoSumYtelser([ytelse]);
    const utbetaltEntries = {
        Type: ytelse.type,
        Netto: nettoSum && formaterNOK(nettoSum) + ' NOK',
        Dato: utbetaling.utbetalingsdato && formaterDato(utbetaling.utbetalingsdato),
        Periode: `${formaterDato(ytelse.periode.start)} - ${formaterDato(ytelse.periode.slutt)}`
    };
    const utbetaltDetaljerEntries = {
        Bruttobeløp: bruttoSum && formaterNOK(bruttoSum) + ' NOK',
        Arbeidsgiver: ytelse.arbeidsgiver && ytelse.arbeidsgiver.navn,
        Organisasjonsnummer: ytelse.arbeidsgiver && ytelse.arbeidsgiver.orgnr,
        Skattetrekk: ytelse.skattsum,
        Kreditortrekk: getKreditorTrekk(ytelse)
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

export default UtførtUtbetaling;
