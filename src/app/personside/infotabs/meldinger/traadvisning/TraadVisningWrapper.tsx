import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Verktoylinje from './verktoylinje/Verktoylinje';
import TraadVisning from './TraadVisning';
import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';

interface TraadVisningWrapperProps {
    valgtTraad?: Traad;
    sokeord: string;
}

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
`;

function TraadVisningWrapper(props: TraadVisningWrapperProps) {
    if (!props.valgtTraad) {
        return <AlertStripeInfo>Ingen melding valgt</AlertStripeInfo>;
    }
    return (
        <StyledArticle key={props.valgtTraad.traadId} role="tabpanel">
            <Verktoylinje valgtTraad={props.valgtTraad} />
            <TraadVisning sokeord={props.sokeord} valgtTraad={props.valgtTraad} />
        </StyledArticle>
    );
}

export default TraadVisningWrapper;
