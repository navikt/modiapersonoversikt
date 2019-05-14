import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { datoSynkende } from '../../../../../utils/dateUtils';
import TraadListeElement from './TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { sisteSendteMelding } from '../utils/meldingerUtils';
import Input from 'nav-frontend-skjema/lib/input';

interface Props {
    traader: Traad[];
    settValgtTraad: (traad: Traad) => void;
    valgtTraad?: Traad;
}

const InputStyle = styled.div`
    padding: ${theme.margin.layout};
`;

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
                <InputStyle>
                    <Input label={'Søk etter melding'} className={'move-input-label'} bredde={'L'} />
                </InputStyle>
                <SortertListe traader={this.props.traader} settValgtTraad={this.props.settValgtTraad} />
            </PanelStyle>
        );
    }
}

export default TraadListe;
