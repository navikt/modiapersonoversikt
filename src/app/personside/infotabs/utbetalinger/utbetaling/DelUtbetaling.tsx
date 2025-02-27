import { Element, Normaltekst } from 'nav-frontend-typografi';
import { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import type { AnyAction, Dispatch } from 'redux';
import styled from 'styled-components';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import { BulletPoint, SpaceBetween } from '../../../../../components/common-styled-components';
import type { Ytelse } from '../../../../../models/utbetalinger';
import type { AppState } from '../../../../../redux/reducers';
import { setEkspanderYtelse, setNyYtelseIFokus } from '../../../../../redux/utbetalinger/actions';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/function-utils';
import { formaterNOK, periodeStringFromYtelse } from '../utils/utbetalinger-utils';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';

interface OwnProps {
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

class DelUtbetaling extends PureComponent<Props> {
    private ytelseRef = createRef<HTMLLIElement>();

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
                    <Element>{formaterNOK(ytelse.nettobelop)}</Element>
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
                <article aria-expanded={this.props.erEkspandert} aria-label={`Delutbetaling ${ytelse.type}`}>
                    <DetaljerCollapse open={this.props.erEkspandert} toggle={this.toggleVisDetaljer} header={header}>
                        <UtbetalingsDetaljer {...this.props} />
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
