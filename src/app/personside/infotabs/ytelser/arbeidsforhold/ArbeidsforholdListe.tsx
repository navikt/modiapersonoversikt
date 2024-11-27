import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import KnappBase from 'nav-frontend-knapper';
import { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import { useState } from 'react';

interface Props {
    arbeidsForhold: Arbeidsforhold[];
}

const StyledListe = styled.ol`
    li:not(:first-child) {
        padding-top: 1rem;
        margin-top: 1rem;
        border-top: ${theme.border.skilleSvak};
    }
`;

const StyledKnappBase = styled(KnappBase)`
    margin-top: 1rem;
`;

function ArbeidsForholdListe(props: Props) {
    const [visArbeidsforhold, setVisArbeidsforhold] = useState(false);
    const arbeidsforhold = props.arbeidsForhold;
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return <AlertStripeInfo>Ingen arbeidsgiver er registrert</AlertStripeInfo>;
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    const visAlleArbeidsforholdKnapp = (
        <StyledKnappBase type={'hoved'} onClick={() => setVisArbeidsforhold(!visArbeidsforhold)}>
            {arbeidsforhold.length > 1 && visArbeidsforhold ? 'Vis færre arbeidsforhold' : 'Vis alle arbeidsforhold'}
        </StyledKnappBase>
    );
    return (
        <>
            <StyledListe aria-label="Arbeidsgivere">
                <ArbeidsForholdListeElement arbeidsforhold={førsteArbForhold} />
                {visArbeidsforhold &&
                    resten.map((arbforhold, index) => (
                        <ArbeidsForholdListeElement key={index} arbeidsforhold={arbforhold} />
                    ))}
            </StyledListe>
            {arbeidsforhold.length > 1 && visAlleArbeidsforholdKnapp}
        </>
    );
}

export default ArbeidsForholdListe;
