import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { datoSynkende } from '../../../../../utils/dateUtils';
import TraadListeElement from './TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    traader: Traad[];
    settValgtTraad: (traad: Traad) => void;
    valgtTraad?: Traad;
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
        .sort(datoSynkende(traad => traad.dato))
        .map(traad => (
            <TraadListeElement
                traad={traad}
                erValgtTraad={props.valgtTraad === traad}
                settValgtTraad={props.settValgtTraad}
                key={traad.traadId}
            />
        ));

    return <TraadListeStyle>{traadKomponenter}</TraadListeStyle>;
}

class TraadListe extends React.PureComponent<Props> {
    render() {
        if (this.props.traader.length === 0) {
            return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
        }

        return (
            <PanelStyle>
                <SortertListe traader={this.props.traader} settValgtTraad={this.props.settValgtTraad} />
            </PanelStyle>
        );
    }
}

export default TraadListe;
