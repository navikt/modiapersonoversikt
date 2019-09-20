import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { datoSynkende } from '../../../../../utils/dateUtils';
import TraadListeElement from './TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { sisteSendteMelding } from '../utils/meldingerUtils';
import TraadFilterPanel from './filter/TraadFilterPanel';

interface Props {
    traader: Traad[];
    valgtTraad?: Traad;
}

const PanelStyle = styled.nav`
    ${theme.hvittPanel};
    ol {
        list-style: none;
    }
`;

const TraadListeStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function TraadListe(props: Props) {
    if (props.traader.length === 0) {
        return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
    }
    const traadKomponenter = props.traader
        .sort(datoSynkende(traad => sisteSendteMelding(traad).opprettetDato))
        .map(traad => <TraadListeElement traad={traad} key={traad.traadId} erValgt={traad === props.valgtTraad} />);

    return (
        <PanelStyle>
            <TraadFilterPanel />
            <TraadListeStyle>{traadKomponenter}</TraadListeStyle>
        </PanelStyle>
    );
}

export default TraadListe;
