import * as React from 'react';
import { formaterNOK, periodeStringFromYtelse } from '../utils/utbetalingerUtils';
import { BulletPoint, SpaceBetween } from '../../../../../components/common-styled-components';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { Ytelse } from '../../../../../models/utbetalinger';
import styled from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { setEkspanderYtelse, setNyYtelseIFokus } from '../../../../../redux/utbetalinger/actions';

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

class DelUtbetaling extends React.PureComponent<Props> {
    private ytelseRef = React.createRef<HTMLLIElement>();

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
            <BulletPoint showBulletPoint={!this.props.erEkspandert} color={theme.color.kategori}>
                <SpaceBetween>
                    <Element tag="h5">{ytelse.type}</Element>
                    <Element>{formaterNOK(ytelse.nettobeløp)}</Element>
                </SpaceBetween>
                <Normaltekst>{periode}</Normaltekst>
            </BulletPoint>
        );

        return (
            <DelUtbetalingStyle
                onClick={() => cancelIfHighlighting(this.toggleVisDetaljer)}
                ref={this.ytelseRef}
                tabIndex={0}
                onFocus={this.props.settYtelseIFokus}
            >
                <article aria-expanded={this.props.erEkspandert} aria-label={'Delutbetaling ' + ytelse.type}>
                    <DetaljerCollapse open={this.props.erEkspandert} toggle={this.toggleVisDetaljer} header={header}>
                        <UtbetalingsDetaljer ytelse={ytelse} {...this.props} />
                    </DetaljerCollapse>
                </article>
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

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: OwnProps): DispatchProps {
    return {
        settYtelseIFokus: () => dispatch(setNyYtelseIFokus(ownProps.ytelse)),
        ekspanderYtelse: (ekspander: boolean) => dispatch(setEkspanderYtelse(ownProps.ytelse, ekspander))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelUtbetaling);
