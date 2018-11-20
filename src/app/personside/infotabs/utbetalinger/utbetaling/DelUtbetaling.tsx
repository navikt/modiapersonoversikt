import * as React from 'react';
import { formaterNOK, periodeStringFromYtelse } from '../utils/utbetalingerUtils';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { Ytelse } from '../../../../../models/utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import DetaljerCollapse from '../DetaljerCollapse';
import { Dispatch } from 'redux';
import { setEkspanderYtelse, setNyYtelseIFokus } from '../../../../../redux/utbetalinger/utbetalingerStateReducer';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';

export interface OwnProps {
    ytelse: Ytelse;
    konto: string | undefined;
    melding: string | undefined;
}

interface StateProps {
    erEkspandert: boolean;
    erIFokus: boolean;
}

interface DispatchProps {
    settYtelseIFokus: () => void;
    ekspanderYtelse: (ekspander: boolean) => void;
}

type Props = DispatchProps & OwnProps & StateProps;

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
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        const fikkFokus = this.props.erIFokus && !prevProps.erIFokus;
        if (fikkFokus && this.ytelseRef.current) {
            this.ytelseRef.current.focus();
        }
    }

    toggleVisDetaljer() {
        this.props.ekspanderYtelse(!this.props.erEkspandert);
    }

    render() {
        const ytelse = this.props.ytelse;
        const periode = periodeStringFromYtelse(ytelse);
        const header = (
            <BulletPoint show={!this.props.erEkspandert}>
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
                onClick={() => cancelIfHighlighting(this.toggleVisDetaljer)}
                innerRef={this.ytelseRef}
                tabIndex={0}
                onFocus={this.props.settYtelseIFokus}
            >
                <DetaljerCollapse
                    open={this.props.erEkspandert}
                    toggle={this.toggleVisDetaljer}
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

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        erEkspandert: state.utbetalinger.ekspanderteYtelser.includes(ownProps.ytelse),
        erIFokus: state.utbetalinger.ytelseIFokus === ownProps.ytelse
    };
}

function mapDispatchToProps(dispatch: Dispatch<{}>, ownProps: OwnProps): DispatchProps {
    return {
        settYtelseIFokus: () => dispatch(setNyYtelseIFokus(ownProps.ytelse)),
        ekspanderYtelse: (ekspander: boolean) => dispatch(setEkspanderYtelse(ownProps.ytelse, ekspander))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelUtbetaling);
