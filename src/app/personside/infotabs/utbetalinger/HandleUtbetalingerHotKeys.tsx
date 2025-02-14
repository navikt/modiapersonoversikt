import * as React from 'react';
import { connect } from 'react-redux';
import type { AnyAction, Dispatch } from 'redux';
import styled from 'styled-components';
import type { Utbetaling, Ytelse } from '../../../../models/utbetalinger';
import type { AppState } from '../../../../redux/reducers';
import { setEkspanderYtelse, setNyYtelseIFokus } from '../../../../redux/utbetalinger/actions';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import { flatMapYtelser } from './utils/utbetalinger-utils';

interface OwnProps {
    children: React.ReactNode;
    utbetalinger: Utbetaling[];
}

interface DispatchProps {
    settYtelseIFokus: (ytelse: Ytelse | null) => void;
    ekspanderYtelse: (ytelse: Ytelse, ekspander: boolean) => void;
}

interface StateProps {
    ytelseIFokus: Ytelse | null;
    ekspanderteYtelser: Ytelse[];
}

type Props = DispatchProps & OwnProps & StateProps;

function eventTargetIsButton(event: React.KeyboardEvent) {
    return event.target instanceof HTMLButtonElement;
}

const Wrapper = styled.div`
    &:focus {
        outline: none;
    }
`;

class HandleUtbetalingerHotKeys extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event: React.KeyboardEvent) {
        switch (event.which) {
            case 13:
                loggEvent('Hurtigtast', 'Utbetalinger', { type: 'Enter' });
                this.handleEnter(event);
                break;
            case 32:
                loggEvent('Hurtigtast', 'Utbetalinger', { type: 'Space' });
                this.handleSpace(event);
                break;
            case 38:
                loggEvent('Hurtigtast', 'Utbetalinger', { type: 'Pil Opp' });
                this.settForrigeYtelseIFokus();
                break;
            case 40:
                loggEvent('Hurtigtast', 'Utbetalinger', { type: 'Pil Ned' });
                this.settNesteYtelseIFokus();
                break;
            default:
        }
    }

    settNesteYtelseIFokus() {
        const ytelser: Ytelse[] = flatMapYtelser(this.props.utbetalinger);
        const currentIndex = this.props.ytelseIFokus ? ytelser.indexOf(this.props.ytelseIFokus) : -1;
        const nesteYtelse = ytelser[currentIndex + 1] || ytelser[0];
        this.props.settYtelseIFokus(nesteYtelse);
    }

    settForrigeYtelseIFokus() {
        const ytelser: Ytelse[] = flatMapYtelser(this.props.utbetalinger);
        const currentIndex = this.props.ytelseIFokus ? ytelser.indexOf(this.props.ytelseIFokus) : ytelser.length;
        const forrigeYtelse = ytelser[currentIndex - 1] || ytelser[ytelser.length - 1];
        this.props.settYtelseIFokus(forrigeYtelse);
    }

    handleEnter(event: React.KeyboardEvent) {
        if (event.repeat || eventTargetIsButton(event)) {
            return;
        }
        this.toggleEkspanderYtelseIFokus();
    }

    toggleEkspanderYtelseIFokus() {
        const ytelseIFokus = this.props.ytelseIFokus;
        if (!ytelseIFokus) {
            return;
        }
        const erEkspandert = this.props.ekspanderteYtelser.includes(ytelseIFokus);
        this.props.ekspanderYtelse(ytelseIFokus, !erEkspandert);
    }

    handleSpace(event: React.KeyboardEvent) {
        if (eventTargetIsButton(event)) {
            return;
        }
        event.preventDefault();
        this.toggleEkspanderYtelseIFokus();
    }

    render() {
        return (
            <Wrapper onKeyDown={this.handleKeyDown} tabIndex={-1}>
                {this.props.children}
            </Wrapper>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchProps {
    return {
        settYtelseIFokus: (ytelse) => dispatch(setNyYtelseIFokus(ytelse)),
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
