import * as React from 'react';
import { formaterNOK, periodeStringFromYtelse } from '../utils/utbetalingerUtils';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { Ytelse } from '../../../../../models/utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';

export interface Props {
    ytelse: Ytelse;
    konto: string | undefined;
    melding: string | undefined;
    toggleVisDetaljer: (ytelse: Ytelse) => void;
    visDetaljer: boolean;
    erIFokus: boolean;
    updateYtelseIFokus: (ytelse: Ytelse) => void;
}

const DelUtbetalingStyle = styled.li`
  transition: 0.3s;
  cursor: pointer;
  &:focus {
    ${theme.focus}
  }
`;

const BulletPoint = styled<{ show: boolean }, 'div'>('div')`
  position: relative;
  transition: .3s;
  ${props => props.show && 'padding-left: 1.5rem;'}
  &::before {
    position: absolute;
    left: -.5rem;
    content: '•';
    font-size: 4rem;
    line-height: 1.5rem;
    color: ${theme.color.kategori};
    transition: .3s;
    ${props => !props.show && 'opacity: 0'}
  }
`;

class DelUtbetaling extends React.PureComponent<Props> {

    private ytelseRef = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.handleEnter = this.handleEnter.bind(this);
        this.setTilYtelseIFokus = this.setTilYtelseIFokus.bind(this);
        this.removeEnterListener = this.removeEnterListener.bind(this);
    }

    handleEnter(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.props.toggleVisDetaljer(this.props.ytelse);
        }
    }

    componentDidUpdate(prevProps: Props) {
        const fikkFokus = this.props.erIFokus && !prevProps.erIFokus;
        const mistetFokus = !this.props.erIFokus && prevProps.erIFokus;
        if (fikkFokus && this.ytelseRef.current) {
            this.ytelseRef.current.focus();
            this.addEnterListener();
        } else if (mistetFokus) {
            this.removeEnterListener();
        }
    }

    removeEnterListener() {
        window.removeEventListener('keydown', this.handleEnter);
    }

    addEnterListener() {
        window.addEventListener('keydown', this.handleEnter);
    }

    setTilYtelseIFokus() {
        this.props.updateYtelseIFokus(this.props.ytelse);
    }

    render() {
        const ytelse = this.props.ytelse;
        const periode = periodeStringFromYtelse(ytelse);
        const header = (
            <BulletPoint show={!this.props.visDetaljer}>
                <SpaceBetween>
                    <Normaltekst><Bold>{ytelse.type}</Bold></Normaltekst>
                    <Normaltekst><Bold>{formaterNOK(ytelse.nettobeløp)}</Bold></Normaltekst>
                </SpaceBetween>
                <Normaltekst>
                    {periode}
                </Normaltekst>
            </BulletPoint>
        );

        return (
            <DelUtbetalingStyle
                onClick={() => cancelIfHighlighting(() => this.props.toggleVisDetaljer(this.props.ytelse))}
                innerRef={this.ytelseRef}
                tabIndex={0}
                onFocus={this.setTilYtelseIFokus}
                onBlur={this.removeEnterListener}
            >
                <DetaljerCollapse
                    open={this.props.visDetaljer}
                    toggle={() => this.props.toggleVisDetaljer(this.props.ytelse)}
                    header={header}
                >
                    <UtbetalingsDetaljer
                        ytelse={ytelse}
                        {...this.props}
                    />
                </DetaljerCollapse>
            </DelUtbetalingStyle>
        );
    }
}

export default DelUtbetaling;