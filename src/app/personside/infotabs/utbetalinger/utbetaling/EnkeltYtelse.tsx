import * as React from 'react';
import { formaterNOK, periodeStringFromYtelse } from '../utils/utbetalingerUtils';
import { SpaceBetween } from '../../../../../components/common-styled-components';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import DetaljerKnapp from '../utils/DetaljerKnapp';
import { UnmountClosed } from 'react-collapse';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { Ytelse } from '../../../../../models/utbetalinger';
import { FokusProps } from '../Utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';

export interface EnkeltYtelseProps {
    ytelse: Ytelse;
    konto: string | undefined;
    melding: string | undefined;
}

type Props = FokusProps & EnkeltYtelseProps;

interface State {
    visDetaljer: boolean;
}

const EnkeltYtelseStyle = styled<{ åpen: boolean }, 'li'>('li')`
  transition: 0.3s;
  cursor: pointer;
  &:focus {
    ${theme.focus}
  }
  ${props => props.åpen && 'background-color: rgba(0, 0, 0, 0.03);'}
`;

const PadLeft = styled.div`
  margin-left: .5rem;
`;

class EnkeltYtelse extends React.Component<Props, State> {

    private myRef = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            visDetaljer: false
        };
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.setTilYtelseIFokus = this.setTilYtelseIFokus.bind(this);
    }

    toggleVisDetaljer() {
        this.setState({
            visDetaljer: !this.state.visDetaljer
        });
    }

    handleEnter(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.toggleVisDetaljer();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.erIFokus(this.props) && !this.erIFokus(prevProps) && this.myRef.current) {
            this.myRef.current.focus();
            window.addEventListener('keydown', this.handleEnter);
        } else if (!this.erIFokus(this.props)) {
            window.removeEventListener('keydown', this.handleEnter);
        }
    }

    erIFokus(props: Props) {
        if (props.ytelse) {
            return props.ytelseIFokus === props.ytelse;
        }
        return false;
    }

    setTilYtelseIFokus() {
        if (this.props.ytelse) {
            this.props.updateYtelseIFokus(this.props.ytelse);
        }
    }

    render() {
        const ytelse = this.props.ytelse;
        const periode = periodeStringFromYtelse(ytelse);

        return (
            <EnkeltYtelseStyle
                onClick={this.toggleVisDetaljer}
                åpen={this.state.visDetaljer}
                innerRef={this.myRef}
                tabIndex={0}
                onFocus={this.setTilYtelseIFokus}
                onBlur={() => window.removeEventListener('keydown', this.handleEnter)}
            >
                <SpaceBetween>
                    <UndertekstBold>
                        {ytelse.type}
                    </UndertekstBold>
                    <SpaceBetween>
                        <UndertekstBold>
                            {formaterNOK(ytelse.nettobeløp)}
                        </UndertekstBold>
                        <PadLeft/>
                        <DetaljerKnapp onClick={this.toggleVisDetaljer} open={this.state.visDetaljer}/>
                    </SpaceBetween>
                </SpaceBetween>
                <Undertekst>
                    {periode}
                </Undertekst>
                <UnmountClosed isOpened={this.state.visDetaljer}>
                    <UtbetalingsDetaljer
                        ytelse={ytelse}
                        konto={this.props.konto}
                        melding={this.props.melding}
                    />
                </UnmountClosed>
            </EnkeltYtelseStyle>
        );
    }
}

export default EnkeltYtelse;