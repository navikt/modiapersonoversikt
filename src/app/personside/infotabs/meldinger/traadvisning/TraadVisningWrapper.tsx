import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Verktoylinje from './verktoylinje/Verktoylinje';
import TraadVisning from './TraadVisning';
import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { meldingstittel, nyesteMelding } from '../utils/meldingerUtils';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import styled from 'styled-components';

interface TraadVisningWrapperProps {
    valgtTraad?: Traad;
    sokeord: string;
}

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
    > *:nth-child(1) {
        order: 2;
    }
    > *:nth-child(2) {
        order: 1;
    }
`;

function TraadVisningWrapper(props: TraadVisningWrapperProps) {
    if (!props.valgtTraad) {
        return <AlertStripeInfo>Ingen melding valgt</AlertStripeInfo>;
    }
    const sisteMelding = nyesteMelding(props.valgtTraad);
    return (
        <StyledArticle key={props.valgtTraad.traadId} role="tabpanel">
            <h3 className="sr-only">
                Valgt melding - {meldingstittel(sisteMelding)} {formatterDatoTid(sisteMelding.opprettetDato)}
            </h3>
            <TraadVisning sokeord={props.sokeord} valgtTraad={props.valgtTraad} />
            <Verktoylinje valgtTraad={props.valgtTraad} />
        </StyledArticle>
    );
}

export default TraadVisningWrapper;
