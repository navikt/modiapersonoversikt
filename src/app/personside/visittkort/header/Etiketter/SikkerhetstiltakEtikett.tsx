import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import theme from '../../../../../styles/personOversiktTheme';
import styled, { keyframes } from 'styled-components';

interface Props {
}

const fadeIn = keyframes`
  from { transform: scale(1.1); }
  to { transform: scale(1); }
`;

const Styling = styled.div`
  display: inline-block;
  animation: ${fadeIn} .3s 8 alternate-reverse ease;
  &:focus {
    ${theme.focus}
  }
`;

class SikkerhetstiltakEtikett extends React.Component<Props> {

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
