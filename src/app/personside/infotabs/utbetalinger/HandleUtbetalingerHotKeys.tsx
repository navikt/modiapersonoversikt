import * as React from 'react';
import { Utbetaling, Ytelse } from '../../../../models/utbetalinger';
import { flatMapYtelser } from './utils/utbetalingerUtils';
import { Dispatch } from 'redux';
import {
    setEkspanderYtelse,
    setNyYtelseIFokus
} from '../../../../redux/utbetalinger/utbetalingerStateReducer';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';

interface OwnProps {
    children: React.ReactNode;
    utbetalinger: Utbetaling[];
}

interface DispatchProps {
    settYtelseIFokus: (ytelse: Ytelse) => void;
    ekspanderYtelse: (ytelse: Ytelse, ekspander: boolean) => void;
}

interface StateProps {
    ytelseIFokus: Ytelse | null;
    ekspanderteYtelser: Ytelse[];
}

type Props = DispatchProps & OwnProps & StateProps;

class HandleUtbetalingerHotKeys extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event: React.KeyboardEvent) {
        const eventTargetIsButton = event.target instanceof HTMLButtonElement;
        if (eventTargetIsButton) {
            return;
        }
        this.handlePilknapper(event);
        this.handleEnter(event);
    }

    handlePilknapper(event: React.KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            this.props.settYtelseIFokus(this.finnNesteYtelse());
        } else if (event.key === 'ArrowUp') {
            this.props.settYtelseIFokus(this.finnForrigeYtelse());
        }
    }

    finnNesteYtelse() {
        const ytelser: Ytelse[] = flatMapYtelser(this.props.utbetalinger);
        const currentIndex = this.props.ytelseIFokus ? ytelser.indexOf(this.props.ytelseIFokus) : -1;
        return ytelser[currentIndex + 1] || ytelser[0];
    }

    finnForrigeYtelse() {
        const ytelser: Ytelse[] = flatMapYtelser(this.props.utbetalinger);
        const currentIndex = this.props.ytelseIFokus ? ytelser.indexOf(this.props.ytelseIFokus) : ytelser.length;
        return ytelser[currentIndex - 1] || ytelser[ytelser.length - 1];
    }

    handleEnter(event: React.KeyboardEvent) {
        if (event.key === 'Enter' && !event.repeat) {
            this.toggleEkspanderYtelseIFokus();
        }
    }

    toggleEkspanderYtelseIFokus() {
        const ytelseIFokus = this.props.ytelseIFokus;
        if (!ytelseIFokus) {
            return;
        }
        const erEkspandert = this.props.ekspanderteYtelser.includes(ytelseIFokus);
        this.props.ekspanderYtelse(ytelseIFokus, !erEkspandert);
    }

    render() {
        return (
            <div onKeyDown={this.handleKeyDown}>
                {this.props.children}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): DispatchProps {
    return {
        settYtelseIFokus: ytelse => dispatch(setNyYtelseIFokus(ytelse)),
        ekspanderYtelse: (ytelse: Ytelse, ekspander: boolean) => dispatch(setEkspanderYtelse(ytelse, ekspander))
    };
}

function mapStateToProps(state: AppState): StateProps {
    return {
        ytelseIFokus: state.utbetalinger.ytelseIFokus,
        ekspanderteYtelser: state.utbetalinger.ekspanderteYtelser
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HandleUtbetalingerHotKeys);
