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
        this.handleShortcut = this.handleShortcut.bind(this);
        this.setTilValgtYtelse = this.setTilValgtYtelse.bind(this);
    }

    toggleVisDetaljer() {
        this.setState({
            visDetaljer: !this.state.visDetaljer
        });
    }

    handleShortcut(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.toggleVisDetaljer();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.erValgt(this.props) && !this.erValgt(prevProps) && this.myRef.current) {
            this.myRef.current.focus();
            window.addEventListener('keydown', this.handleShortcut);
        } else if (!this.erValgt(this.props)) {
            window.removeEventListener('keydown', this.handleShortcut);
        }
    }

    erValgt(props: Props) {
        if (props.ytelse) {
            return props.valgtYtelse === props.ytelse;
        }
        return false;
    }

    setTilValgtYtelse() {
        if (this.props.ytelse && this.props.updateValgtYtelse) {
            this.props.updateValgtYtelse(this.props.ytelse);
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
                onFocus={this.setTilValgtYtelse}
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