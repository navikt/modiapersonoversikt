import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import Header from './Header';
import SpørsmålOgSvar from './SporsmalOgSvarContainer';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import HandleKontrollSporsmalHotkeys from './HandleKontrollSporsmalHotkeys';
import IfFeatureToggleOn from '../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../components/featureToggle/toggleIDs';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { lukkKontrollSpørsmål } from '../../../redux/kontrollSporsmal/actions';
import { useEffect } from 'react';
import { kontrollspørsmålHarBlittLukketForBruker } from './skjulPåTversAvVinduerUtils';
import { getFnrFromPerson } from '../../../redux/restReducers/personinformasjon';

interface StateProps {
    visKontrollSpørsmål: boolean;
    fnr?: string;
}

interface DispatchProps {
    lukkKontrollSpørsmål: () => void;
}

type Props = DispatchProps & StateProps;

const KontrollSporsmalStyling = styled.section`
    ${theme.hvittPanel};
    padding: ${theme.margin.px10};
    margin-bottom: 0.5rem;
    position: relative;
`;

function Kontrollsporsmal(props: Props) {
    useEffect(() => {
        if (props.fnr && kontrollspørsmålHarBlittLukketForBruker(props.fnr)) {
            props.lukkKontrollSpørsmål();
        }
    }, []);

    if (!props.visKontrollSpørsmål) {
        return null;
    }

    return (
        <IfFeatureToggleOn toggleID={FeatureToggles.Kontrollspørsmål}>
            <KontrollSporsmalStyling role="region" aria-label="Visittkort-hode">
                <Header />
                <SpørsmålOgSvar />
                <HandleKontrollSporsmalHotkeys />
            </KontrollSporsmalStyling>
        </IfFeatureToggleOn>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        visKontrollSpørsmål: state.kontrollSpørsmål.synlig,
        fnr: getFnrFromPerson(state.restEndepunkter.personinformasjon)
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        lukkKontrollSpørsmål: () => dispatch(lukkKontrollSpørsmål())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Kontrollsporsmal);
