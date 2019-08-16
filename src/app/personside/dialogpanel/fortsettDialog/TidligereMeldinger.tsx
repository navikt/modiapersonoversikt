import * as React from 'react';
import EnkeltMelding from '../../infotabs/meldinger/traadvisning/Enkeltmelding';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';

interface Props {
    traad: Traad;
}

const StyledEkspanderbartpanel = styled(Ekspanderbartpanel)`
    .ekspanderbartPanel__hode {
        padding: 0.6rem;
    }
    margin-bottom: 1rem;
`;

function TidligereMeldinger(props: Props) {
    return (
        <StyledEkspanderbartpanel tittel="Tidligere meldinger" border={true} tittelProps="normaltekst">
            {props.traad.meldinger.map(melding => (
                <EnkeltMelding key={melding.id} melding={melding} />
            ))}
        </StyledEkspanderbartpanel>
    );
}

export default TidligereMeldinger;
