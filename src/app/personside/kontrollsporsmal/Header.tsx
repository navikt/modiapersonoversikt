import styled from 'styled-components';
import * as React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import theme from '../../../styles/personOversiktTheme';
import { toggleKontrollSpørsmål } from '../../../redux/restReducers/kontrollSporsmal/actions';
import Lukknapp from 'nav-frontend-lukknapp';
import { loggEvent } from '../../../utils/frontendLogger';

interface DispatchProps {
    toggleKontrollSpørsmål: () => void;
}

const HeaderStyling = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: ${theme.margin.px10};
  justify-content: space-between;
`;

class Header extends React.PureComponent<DispatchProps> {
    constructor(props: DispatchProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <HeaderStyling>
                <Undertittel tag="h1">Kontrollspørsmål</Undertittel>
                <Lukknapp
                    ariaLabel={'Skjul kontrollspørsmål'}
                    onClick={this.handleClick}
                >
                    Skjul kontrollspørsmål
                </Lukknapp>
            </HeaderStyling>
        );
    }

    private handleClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', {type: 'Lukk'});
        this.props.toggleKontrollSpørsmål();
    }
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        toggleKontrollSpørsmål: () => dispatch(toggleKontrollSpørsmål())
    };
}

export default connect(null, mapDispatchToProps)(Header);