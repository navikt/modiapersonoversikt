import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Pleiepengerettighet } from '../../../../../../models/ytelse/pleiepenger';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import styled from 'styled-components/macro';
import theme from '../../../../../../styles/personOversiktTheme';
import KnappBase from 'nav-frontend-knapper';
import { useAppState } from '../../../../../../utils/customHooks';
import { getAlleArbiedsforholdSortert } from '../pleiepengerUtils';
import { useDispatch } from 'react-redux';
import { toggleVisAlleArbeidsforhold } from '../../../../../../redux/ytelser/ytelserReducer';

interface Props {
    pleiepengerettighet: Pleiepengerettighet;
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
    const visAlle = useAppState(state => state.ytelser.visAlleArbeidsforhold).includes(props.pleiepengerettighet);
    const dispatch = useDispatch();
    const toggleVisAlle = (vis: boolean) => dispatch(toggleVisAlleArbeidsforhold(props.pleiepengerettighet, vis));

    const arbeidsforhold = getAlleArbiedsforholdSortert(props.pleiepengerettighet);
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return <AlertStripeInfo>Ingen arbeidsgiver er registrert</AlertStripeInfo>;
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    const visAlleArbeidsforholdKnapp = (
        <StyledKnappBase type={'hoved'} onClick={() => toggleVisAlle(!visAlle)}>
            {visAlle ? 'Vis færre arbeidsforhold' : 'Vis alle arbeidsforhold'}
        </StyledKnappBase>
    );
    return (
        <>
            <StyledListe aria-label="Arbeidsgivere">
                <ArbeidsForholdListeElement arbeidsforhold={førsteArbForhold} />
                {visAlle &&
                    resten.map((arbforhold, index) => (
                        <ArbeidsForholdListeElement key={index} arbeidsforhold={arbforhold} />
                    ))}
            </StyledListe>
            {arbeidsforhold.length > 1 && visAlleArbeidsforholdKnapp}
        </>
    );
}

export default ArbeidsForholdListe;
