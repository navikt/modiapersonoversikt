import * as React from 'react';
import { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Arbeidsforhold } from '../../../../../models/ytelse/arbeidsforhold';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
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
        return <AlertStripeInfo>Ingen arbeidsgiver er registrert</AlertStripeInfo>;
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    const visAlleArbeidsforholdKnapp = (
        <KnappBase type={'hoved'} onClick={() => setVisAlleArbeidsforhold(!visAlleArbeidsforhold)}>
            {arbeidsforhold.length > 1 && visAlleArbeidsforhold
                ? 'Vis færre arbeidsforhold'
                : 'Vis alle arbeidsforhold'}
        </KnappBase>
    );
    return (
        <>
            <StyledListe aria-label="Arbeidsgivere">
                <ArbeidsForholdListeElement arbeidsforhold={førsteArbForhold} />
                {visAlleArbeidsforhold &&
                    resten.map((arbforhold, index) => (
                        <ArbeidsForholdListeElement key={index} arbeidsforhold={arbforhold} />
                    ))}
            </StyledListe>
            {arbeidsforhold.length > 1 && visAlleArbeidsforholdKnapp}
        </>
    );
}

export default ArbeidsForholdListe;
