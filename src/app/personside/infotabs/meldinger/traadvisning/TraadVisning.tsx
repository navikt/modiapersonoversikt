import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import { genericDescendingDateComparator } from '../../../../../utils/dateUtils';
import EnkeltMelding from './Enkeltmelding';

interface Props {
    valgtTraad?: Traad;
}

const VisningStyle = styled.section`
    position: relative;
    flex-grow: 1;
`;
/*
const PanelStyle = styled.div`
    ${theme.hvittPanel};
    min-width: 24rem;
    flex-basis: 24rem;
    ol {
        list-style: none;
    }
`;

const TraadStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;*/

function AlleMeldinger(props: { traad: Traad }) {
    const sortertPåDato = props.traad.meldinger.sort(genericDescendingDateComparator(melding => melding.opprettetDato));

    const komponentListe = sortertPåDato.map(melding => <EnkeltMelding melding={melding} />);

    return <div>{komponentListe}</div>;
}

class TraadVisning extends React.PureComponent<Props> {
    render() {
        if (!this.props.valgtTraad) {
            return null;
        }

        return (
            <VisningStyle aria-label={'Meldinger for valgt tråd'}>
                <AlleMeldinger traad={this.props.valgtTraad} />
            </VisningStyle>
        );
    }
}

export default TraadVisning;
