import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import KontrollSpørsmålKnapper from './KontrollSpørsmålKnapper';
import SpørsmålOgSvar from './SporsmalOgSvarContainer';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import HandleKontrollSporsmalHotkeys from './HandleKontrollSporsmalHotkeys';
import IfFeatureToggleOn from '../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../components/featureToggle/toggleIDs';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { lukkKontrollSpørsmål } from '../../../redux/kontrollSporsmal/actions';
import { jobberMedSpørsmålOgSvar, kontrollspørsmålHarBlittLukketForBruker } from './cookieUtils';
import { getFnrFromPerson } from '../../../redux/restReducers/personinformasjon';
import VisuallyHiddenAutoFokusHeader from '../../../components/VisuallyHiddenAutoFokusHeader';

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
    padding: ${theme.margin.px20};
    margin-bottom: 0.5rem;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-areas: 'innhold innhold knapper';
    .innhold {
        -ms-grid-row: 1;
        -ms-grid-column: 1;
        -ms-grid-column-span: 2;
        grid-area: innhold;
    }
    .knapper {
        -ms-grid-row: 1;
        -ms-grid-column: 2;
        grid-area: knapper;
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

function Kontrollsporsmal(props: Props) {
    useEffect(() => {
        if (props.fnr && kontrollspørsmålHarBlittLukketForBruker(props.fnr)) {
            props.lukkKontrollSpørsmål();
        }
    }, [props.fnr]);

    if (!props.visKontrollSpørsmål || jobberMedSpørsmålOgSvar()) {
        return null;
    }

    return (
        <IfFeatureToggleOn toggleID={FeatureToggles.Kontrollspørsmål}>
            <KontrollSporsmalStyling role="region" aria-label="Visittkort-hode">
                <VisuallyHiddenAutoFokusHeader tittel="Kontrollspørsmål" />
                <div className="innhold">
                    <SpørsmålOgSvar />
                </div>
                <div className="knapper">
                    <KontrollSpørsmålKnapper />
                </div>
            </KontrollSporsmalStyling>
            <HandleKontrollSporsmalHotkeys />
        </IfFeatureToggleOn>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        visKontrollSpørsmål: state.kontrollSpørsmål.synlig,
        fnr: getFnrFromPerson(state.restResources.personinformasjon)
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
