import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import Header from './Header';
import SpørsmålOgSvar from './SporsmalOgSvarContainer';
import NesteSporsmal from './NyttSporsmal';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import HandleKontrollSporsmalHotkeys from './HandleKontrollSporsmalHotkeys';

interface StateProps {
    visKontrollSpørsmål: boolean;
}

const KontrollSporsmalStyling = styled.section`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  padding: ${theme.margin.px10};
  margin-bottom: .5rem;
  position: relative;
`;

class Kontrollsporsmal extends React.PureComponent<StateProps> {

    render() {
        if (!this.props.visKontrollSpørsmål) {
            return null;
        }

        return (
            <KontrollSporsmalStyling
                role="region"
                aria-label="Visittkort-hode"
            >
                <Header/>
                <SpørsmålOgSvar/>
                <NesteSporsmal/>
                <HandleKontrollSporsmalHotkeys/>
            </KontrollSporsmalStyling>
        );
    }

}

function mapStateToProps(state: AppState): StateProps {
    return {
        visKontrollSpørsmål: state.kontrollSpørsmål.synlig,
    };
}

export default connect(mapStateToProps)(Kontrollsporsmal);