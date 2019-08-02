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

const PanelStyle = styled.div`
    ${theme.hvittPanel};
    min-width: 24rem;
    flex-basis: 24rem;
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

    return <TraadListeStyle>{traadKomponenter}</TraadListeStyle>;
}

class TraadListe extends React.PureComponent<Props> {
    render() {
        if (this.props.traader.length === 0) {
            return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
        }

        return (
            <PanelStyle>
                <TraadFilterPanel />
                <SortertListe traader={this.props.traader} />
            </PanelStyle>
        );
    }
}

export default TraadListe;
