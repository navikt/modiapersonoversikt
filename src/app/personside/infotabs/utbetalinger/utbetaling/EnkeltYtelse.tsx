import * as React from 'react';
import { formaterNOK, periodeStringFromYtelse } from '../utils/utbetalingerUtils';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { Ytelse } from '../../../../../models/utbetalinger';
import { FokusProps } from '../Utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { Normaltekst } from 'nav-frontend-typografi';

export interface EnkeltYtelseProps {
    ytelse: Ytelse;
    konto: string | undefined;
    melding: string | undefined;
}

type Props = FokusProps & EnkeltYtelseProps;

interface State {
    visDetaljer: boolean;
}

const EnkeltYtelseStyle = styled.li`
  transition: 0.3s;
  cursor: pointer;
  &:focus {
    ${theme.focus}
  }
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
        this.removeEnterListener = this.removeEnterListener.bind(this);
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
            this.addEnterListener();
        } else if (!this.erIFokus(this.props)) {
            this.removeEnterListener();
        }
    }

    removeEnterListener() {
        window.removeEventListener('keydown', this.handleEnter);
    }

    addEnterListener() {
        window.addEventListener('keydown', this.handleEnter);
    }

    erIFokus(props: Props) {
        if (props.ytelse) {
            return props.ytelseIFokus === props.ytelse;
        }
        return false;
    }

    setTilYtelseIFokus() {
        this.props.updateYtelseIFokus(this.props.ytelse);
    }

    render() {
        const ytelse = this.props.ytelse;
        const periode = periodeStringFromYtelse(ytelse);

        return (
            <EnkeltYtelseStyle
                onClick={() => cancelIfHighlighting(this.toggleVisDetaljer)}
                innerRef={this.myRef}
                tabIndex={0}
                onFocus={this.setTilYtelseIFokus}
                onBlur={this.removeEnterListener}
            >
                <SpaceBetween>
                    <Normaltekst><Bold>{ytelse.type}</Bold></Normaltekst>
                    <Normaltekst><Bold>{formaterNOK(ytelse.nettobeløp)}</Bold></Normaltekst>
                </SpaceBetween>
                <Normaltekst>
                    {periode}
                </Normaltekst>
                <UtbetalingsDetaljer
                    open={this.state.visDetaljer}
                    toggleVisDetaljer={this.toggleVisDetaljer}
                    ytelse={ytelse}
                    konto={this.props.konto}
                    melding={this.props.melding}
                />
            </EnkeltYtelseStyle>
        );
    }
}

export default EnkeltYtelse;