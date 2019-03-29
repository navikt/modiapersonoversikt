import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import { datoSynkende } from '../../../../../utils/dateUtils';
import EnkeltMelding from './Enkeltmelding';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';

interface Props {
    valgtTraad?: Traad;
}

const VisningStyle = styled.section`
    flex-grow: 1;
`;

function AlleMeldinger(props: { traad: Traad }) {
    const meldingskomponenter = props.traad.meldinger
        .sort(datoSynkende(melding => melding.opprettetDato))
        .map(melding => <EnkeltMelding melding={melding} key={melding.id} />);

    return <div>{meldingskomponenter}</div>;
}

class TraadVisning extends React.PureComponent<Props> {
    render() {
        if (!this.props.valgtTraad) {
            return <AlertStripeInfo>Ingen tråd er valgt</AlertStripeInfo>;
        }

        return (
            <VisningStyle aria-label={'Meldinger for valgt tråd'}>
                <AlleMeldinger traad={this.props.valgtTraad} />
            </VisningStyle>
        );
    }
}

export default TraadVisning;
