import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { genericDescendingDateComparator } from '../../../../../utils/dateUtils';
import TraadListeElement from './TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    traader: Traad[];
    oppdaterValgtTraad: (traad: Traad) => void;
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
    > * {
        border-top: ${theme.border.skille};
    }
`;

function SortertListe(props: Props) {
    const sortertPåDato = props.traader.sort(genericDescendingDateComparator(traad => traad.dato));

    const traadKomponenter = sortertPåDato.map(traad => (
        <TraadListeElement
            traad={traad}
            erValgtTraad={props.valgtTraad === traad}
            oppdaterValgtTraad={props.oppdaterValgtTraad}
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
                <SortertListe traader={this.props.traader} oppdaterValgtTraad={this.props.oppdaterValgtTraad} />
            </PanelStyle>
        );
    }
}

export default TraadListe;
