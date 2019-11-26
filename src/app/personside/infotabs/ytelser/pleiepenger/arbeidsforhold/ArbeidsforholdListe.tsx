import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Arbeidsforhold } from '../../../../../../models/ytelse/pleiepenger';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import KnappBase from 'nav-frontend-knapper';
import { useState } from 'react';
import { AppState } from '../../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../../redux/ThunkTypes';
import { toggleVisAlleArbeidsforholdActionCreator } from '../../../../../../redux/ytelser/ytelserReducer';
import { connect } from 'react-redux';

interface StateProps {
    visAlleArbeidsforhold: boolean;
}

interface DispatchProps {
    toggleVisAlleArbeidsforhold: () => void;
}

interface OwnProps {
    arbeidsforhold?: Arbeidsforhold[];
}

type Props = DispatchProps & StateProps & OwnProps;

const StyledListe = styled.ol`
    li:not(:first-child) {
        border-top: ${theme.border.skilleSvak};
    }
`;

function ArbeidsForholdListe({ arbeidsforhold }: Props) {
    const [visAlle, setVisAlle] = useState(false);
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return <AlertStripeInfo>Ingen arbeidsgiver er registrert</AlertStripeInfo>;
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    const visAlleArbeidsforholdKnapp = (
        <KnappBase type={'hoved'} onClick={() => setVisAlle(!visAlle)}>
            {visAlle ? 'Vis færre arbeidsforhold' : 'Vis alle arbeidsforhold'}
        </KnappBase>
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

function mapStateToProps(state: AppState): StateProps {
    return {
        visAlleArbeidsforhold: state.ytelser.visAlleArbeidsforhold
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        toggleVisAlleArbeidsforhold: () => dispatch(toggleVisAlleArbeidsforholdActionCreator())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArbeidsForholdListe);
