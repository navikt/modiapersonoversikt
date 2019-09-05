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

function SortertListe(props: Props) {
    const traadKomponenter = props.traader
        .sort(datoSynkende(traad => sisteSendteMelding(traad).opprettetDato))
        .map(traad => <TraadListeElement traad={traad} key={traad.traadId} />);

    return <TraadListeStyle aria-label="Brukers tråder">{traadKomponenter}</TraadListeStyle>;
}

function TraadListe(props: Props) {
    if (props.traader.length === 0) {
        return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
    }

    return (
        <PanelStyle>
            <TraadFilterPanel />
            <SortertListe traader={props.traader} />
        </PanelStyle>
    );
}

export default TraadListe;
