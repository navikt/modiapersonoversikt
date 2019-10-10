import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import * as React from 'react';
import styled from 'styled-components';

export enum Resultat {
    VELLYKKET = 'VELLYKKET',
    FEIL = 'FEIL'
}

const ResultatStyle = styled.div`
    margin-bottom: 1rem;
`;

function VisPostResultat({ resultat }: { resultat?: Resultat }) {
    if (!resultat) {
        return null;
    }

    if (resultat === Resultat.VELLYKKET) {
        return (
            <ResultatStyle>
                <AlertStripeSuksess>Operasjon vellykket</AlertStripeSuksess>
            </ResultatStyle>
        );
    } else {
        return (
            <ResultatStyle>
                <AlertStripeAdvarsel>Operasjon feilet</AlertStripeAdvarsel>
            </ResultatStyle>
        );
    }
}

export default VisPostResultat;
