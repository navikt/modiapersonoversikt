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
import { kontrollspørsmålHarBlittLukketForBruker } from './skjulPåTversAvVinduerUtils';
import { getFnrFromPerson } from '../../../redux/restReducers/personinformasjon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

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
    -ms-grid-columns: 1fr 1fr;
    grid-template-areas:
        'tittel knapper'
        'innhold innhold';
    .innhold {
        -ms-grid-row: 2;
        -ms-grid-column: 1;
        -ms-grid-column-span: 2;
        grid-area: innhold;
    }
    .tittel {
        -ms-grid-row: 1;
        -ms-grid-column: 1;
        grid-area: tittel;
    }
    .knapper {
        -ms-grid-row: 1;
        -ms-grid-column: 2;
        grid-area: knapper;
    }
`;

function Kontrollsporsmal(props: Props) {
    useEffect(() => {
        if (props.fnr && kontrollspørsmålHarBlittLukketForBruker(props.fnr)) {
            props.lukkKontrollSpørsmål();
        }
    }, [props.fnr]);

    if (!props.visKontrollSpørsmål) {
        return null;
    }

    return (
        <IfFeatureToggleOn toggleID={FeatureToggles.Kontrollspørsmål}>
            <KontrollSporsmalStyling role="region" aria-label="Visittkort-hode">
                <div className="tittel">
                    <Undertittel>Kontrollspørsmål</Undertittel>
                </div>
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
