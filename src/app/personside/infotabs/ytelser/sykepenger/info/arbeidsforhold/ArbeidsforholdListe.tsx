import * as React from 'react';
import { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Arbeidsforhold } from '../../../../../../../models/ytelse/sykepenger';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import styled from 'styled-components';
import theme from '../../../../../../../styles/personOversiktTheme';
import KnappBase from 'nav-frontend-knapper';

interface Props {
    arbeidsforhold?: Arbeidsforhold[];
}

const StyledListe = styled.ol`
    li:not(:first-child) {
        border-top: ${theme.border.skilleSvak};
    }
`;

function ArbeidsForholdListe({ arbeidsforhold }: Props) {
    const [visAlleArbeidsforhold, setVisAlleArbeidsforhold] = useState(false);
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return <AlertStripeInfo>Kunne ikke finne noen arbeidsforhold</AlertStripeInfo>;
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    return (
        <>
            <StyledListe aria-label="Arbeidsgivere">
                <ArbeidsForholdListeElement arbeidsforhold={førsteArbForhold} />
                {visAlleArbeidsforhold &&
                    resten.map(element => <ArbeidsForholdListeElement arbeidsforhold={element} />)}
            </StyledListe>
            <KnappBase type={'hoved'} onClick={() => setVisAlleArbeidsforhold(!visAlleArbeidsforhold)}>
                {arbeidsforhold.length > 1 && visAlleArbeidsforhold
                    ? 'Vis færre arbeidsforhold'
                    : 'Vis alle arbeidsforhold'}
            </KnappBase>
        </>
    );
}

export default ArbeidsForholdListe;
