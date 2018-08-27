import * as React from 'react';
import styled from 'styled-components';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import theme from '../../../../styles/personOversiktTheme';
import { createTable, formaterNOK } from './utbetalingerUtils';
import { Ytelse, Ytelseskomponent } from '../../../../models/utbetalinger';
import { EnkeltYtelseProps } from './SammensattUtbetaling';

const Wrapper = styled.div`
  margin: .5rem 0;
  opacity: .8;
  table {
    width: 100%;
    text-align: right;
    * {
      padding: 0;
    }
  }
  th {
    font-weight: bold;
  }
  tr {
    > *:first-child {
      text-align: left;
    }
  }
`;

const Border = styled.div`
  border-top: 2px solid ${theme.color.bakgrunn};
  margin: .5rem 0;
`;

function utbetalingskomponenterListe(ytelse: Ytelse) {
    if (ytelse.ytelseskomponentListe) {
        const tittelrekke = ['Utbetalingsdetaljer', 'Sats', 'Antall', 'Beløp'];

        const tabellElementer = ytelse.ytelseskomponentListe.map((ytelseskomponent: Ytelseskomponent) => [
            ytelseskomponent.ytelseskomponenttype,
            formaterNOK(ytelseskomponent.satsbeløp || 0),
            ytelseskomponent.satsantall,
            formaterNOK(ytelseskomponent.ytelseskomponentbeløp)
        ]);

        return createTable(
            tittelrekke,
            tabellElementer
        );
    } else {
        return 'Mangler detaljer om ytelseskomponenter i utbetaling';
    }
}

function UtbetalingsDetaljer(props: EnkeltYtelseProps) {
    const ytelse = props.ytelse;
    const ytelsesKomponenter = utbetalingskomponenterListe(ytelse);
    const oversikt = createTable(
        ['Konto', 'Brutto', 'Trekk', 'Utbetalt'],
        [[
            props.konto,
            formaterNOK(ytelse.ytelseskomponentersum),
            formaterNOK(ytelse.skattsum + ytelse.trekksum),
            formaterNOK(ytelse.nettobeløp)
        ]]
    );
    return (
        <Wrapper>
            <Undertekst tag="span">
                {oversikt}
            </Undertekst>
            <Border/>
            <Undertekst tag="span">
                {ytelsesKomponenter}
            </Undertekst>
            <Border/>
            <UndertekstBold tag={'h4'}>Melding:</UndertekstBold>
            <Undertekst>{props.melding}</Undertekst>
        </Wrapper>
    );
}

export default UtbetalingsDetaljer;
