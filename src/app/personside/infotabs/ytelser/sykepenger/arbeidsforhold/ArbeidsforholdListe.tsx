import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Arbeidsforhold } from '../../../../../../models/ytelse/sykepenger';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import KnappBase from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { AppState } from '../../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../../redux/ThunkTypes';
import { toggleVisAlleArbeidsforholdSykepengerActionCreator } from '../../../../../../redux/ytelser/sykepengerReducer';

interface OwnProps {
    arbeidsforhold?: Arbeidsforhold[];
}

interface StateProps {
    visAlleArbeidsforhold: boolean;
}

interface DispatchProps {
    toggleVisAlleArbeidsforhold: () => void;
}

type Props = DispatchProps & StateProps & OwnProps;

const StyledListe = styled.ol`
    li:not(:first-child) {
        border-top: ${theme.border.skilleSvak};
    }
`;

function ArbeidsForholdListe({ arbeidsforhold, visAlleArbeidsforhold, toggleVisAlleArbeidsforhold }: Props) {
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return <AlertStripeInfo>Kunne ikke finne noen arbeidsforhold</AlertStripeInfo>;
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    return (
        <>
            <StyledListe aria-label="Arbeidsgivere">
                <ArbeidsForholdListeElement arbeidsforhold={førsteArbForhold} />
                {visAlleArbeidsforhold &&
                    resten.map((arbforhold, index) => (
                        <ArbeidsForholdListeElement key={index} arbeidsforhold={arbforhold} />
                    ))}
            </StyledListe>
            <KnappBase type={'hoved'} onClick={() => toggleVisAlleArbeidsforhold()}>
                {arbeidsforhold.length > 1 && visAlleArbeidsforhold
                    ? 'Vis færre arbeidsforhold'
                    : 'Vis alle arbeidsforhold'}
            </KnappBase>
        </>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        visAlleArbeidsforhold: state.ytelser.sykepenger.visAlleArbeidsforhold
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        toggleVisAlleArbeidsforhold: () => dispatch(toggleVisAlleArbeidsforholdSykepengerActionCreator())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArbeidsForholdListe);
