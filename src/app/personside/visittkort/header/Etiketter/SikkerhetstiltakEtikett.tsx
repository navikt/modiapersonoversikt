import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import theme from '../../../../../styles/personOversiktTheme';
import styled, { keyframes } from 'styled-components';

const bump = keyframes`
  to { transform: scale(1.1); }
`;

const Styling = styled.div`
  display: inline-block;
  animation: ${bump} .3s 1s 6 alternate;
  &:focus {
    ${theme.focus}
  }
`;

class SikkerhetstiltakEtikett extends React.Component<{}> {

    private etikettRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        if (this.etikettRef.current) {
            this.etikettRef.current.focus();
        }
    }

    render() {
        return (
            <Styling
                tabIndex={-1}
                innerRef={this.etikettRef}
                role="alert"
                aria-live="assertive"
            >
                <EtikettBase type={'advarsel'}>
                    Sikkerhetstiltak
                </EtikettBase>
            </Styling>
        );
    }
}

export default SikkerhetstiltakEtikett;
