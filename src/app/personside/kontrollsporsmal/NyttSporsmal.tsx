import styled from 'styled-components';
import * as React from 'react';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import theme from '../../../styles/personOversiktTheme';
import { roterKontrollSpørsmål } from '../../../redux/restReducers/kontrollSporsmal/actions';
import KnappBase from 'nav-frontend-knapper';
import { loggEvent } from '../../../utils/frontendLogger';

export interface DispatchProps {
    nyttSpørsmål: () => void;
}

const NyttSpørsmålStyling = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: ${theme.margin.px10};
  > * {
    text-transform: none; 
  }
`;

class NyttSporsmal extends React.PureComponent<DispatchProps> {
    constructor(props: DispatchProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <NyttSpørsmålStyling>
                <KnappBase
                    type="standard"
                    onClick={this.handleClick}
                >
                    Nytt spørsmål
                </KnappBase>
            </NyttSpørsmålStyling>
        );
    }

    private handleClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', {type: 'Nytt'});
        this.props.nyttSpørsmål();
    }

}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        nyttSpørsmål: () => dispatch(roterKontrollSpørsmål())
    };
}

export default connect(null, mapDispatchToProps)(NyttSporsmal);