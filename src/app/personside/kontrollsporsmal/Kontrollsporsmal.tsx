import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import Header from './Header';
import SpørsmålOgSvar from './SporsmalOgSvarContainer';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import HandleKontrollSporsmalHotkeys from './HandleKontrollSporsmalHotkeys';
import IfFeatureToggleOn from '../../../redux/featureToggle/IfFeatureToggleOn';

interface StateProps {
    visKontrollSpørsmål: boolean;
}

const KontrollSporsmalStyling = styled.section`
    ${theme.hvittPanel};
    padding: ${theme.margin.px10};
    margin-bottom: 0.5rem;
    position: relative;
`;

class Kontrollsporsmal extends React.PureComponent<StateProps> {
    render() {
        if (!this.props.visKontrollSpørsmål) {
            return null;
        }

        return (
            <IfFeatureToggleOn toggleID={'kontrollsporsmal'}>
                <KontrollSporsmalStyling role="region" aria-label="Visittkort-hode">
                    <Header />
                    <SpørsmålOgSvar />
                    <HandleKontrollSporsmalHotkeys />
                </KontrollSporsmalStyling>
            </IfFeatureToggleOn>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        visKontrollSpørsmål: state.kontrollSpørsmål.synlig
    };
}

export default connect(mapStateToProps)(Kontrollsporsmal);
