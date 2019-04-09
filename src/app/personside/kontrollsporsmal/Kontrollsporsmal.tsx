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
import { erKontaktsenter } from '../../../utils/loggInfo/saksbehandlersEnhetInfo';

interface StateProps {
    visKontrollSpørsmål: boolean;
    fnr: string;
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
    -ms-grid-columns: 2fr 1fr;
    grid-template-areas: 'innhold knapper';
    .innhold {
        -ms-grid-row: 1;
        -ms-grid-column: 1;
        grid-area: innhold;
    }
    .knapper {
        -ms-grid-row: 1;
        -ms-grid-column: 2;
        grid-area: knapper;
    }
`;

function Kontrollsporsmal(props: Props) {
    useEffect(() => {
        if (kontrollspørsmålHarBlittLukketForBruker(props.fnr)) {
            props.lukkKontrollSpørsmål();
        }
    }, [props.fnr]);

    if (!props.visKontrollSpørsmål || jobberMedSpørsmålOgSvar() || !erKontaktsenter()) {
        return null;
    }

    return (
        <IfFeatureToggleOn toggleID={FeatureToggles.Kontrollspørsmål}>
            <KontrollSporsmalStyling role="region" aria-label="Visittkort-hode">
                <h2 className={'visually-hidden'}>Kontrollspørsmål</h2>
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
        visKontrollSpørsmål: state.kontrollSpørsmål.open,
        fnr: state.gjeldendeBruker.fødselsnummer
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
