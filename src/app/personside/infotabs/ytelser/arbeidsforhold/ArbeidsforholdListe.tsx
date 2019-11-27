import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import KnappBase from 'nav-frontend-knapper';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import { useAppState } from '../../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisAlleArbeidsforhold } from '../../../../../redux/ytelser/ytelserReducer';
import { Sykepenger } from '../../../../../models/ytelse/sykepenger';
import { Arbeidsforhold } from '../../../../../models/ytelse/arbeidsforhold';

interface Props {
    ytelse: Foreldrepengerettighet | Sykepenger;
    arbeidsForhold: Arbeidsforhold[];
}

const StyledListe = styled.ol`
    li:not(:first-child) {
        border-top: ${theme.border.skilleSvak};
    }
`;

function ArbeidsForholdListe(props: Props) {
    const visAlleArbeidsforhold = useAppState(state => state.ytelser.visAlleArbeidsforhold).includes(props.ytelse);
    const dispatch = useDispatch();
    const toggleVisAlle = (vis: boolean) => dispatch(toggleVisAlleArbeidsforhold(props.ytelse, vis));

    const arbeidsforhold = props.arbeidsForhold;
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return <AlertStripeInfo>Ingen arbeidsgiver er registrert</AlertStripeInfo>;
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    const visAlleArbeidsforholdKnapp = (
        <KnappBase type={'hoved'} onClick={() => toggleVisAlle(!visAlleArbeidsforhold)}>
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
