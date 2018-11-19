import * as React from 'react';
import { Utbetaling as UtbetalingInterface, Ytelse } from '../../../../../models/utbetalinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SammensattUtbetaling from './SammensattUtbetaling';

import EnkelUtbetaling from './EnkelUtbetaling';
import { Dispatch } from 'redux';
import { settNyYtelseIFokus } from '../../../../../redux/utbetalinger/utbetalingerStateReducer';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';

interface OwnProps {
    utbetaling: UtbetalingInterface;
}

interface DispatchProps {
    settYtelseIFokus: (ytelse: Ytelse) => void;
}

interface StateProps {
    ytelseIFokus: Ytelse | null;
}

type Props = OwnProps & StateProps & DispatchProps;

function Utbetaling(props: Props) {
    const utbetaling = props.utbetaling;
    if (!utbetaling.ytelser) {
        console.error('Utbetaling mangler ytelser', utbetaling);
        return <AlertStripeInfo>Manglende data om utbetaling</AlertStripeInfo>;
    }

    const enkeltYtelse = utbetaling.ytelser.length === 1;

    return enkeltYtelse
        ? (
            <EnkelUtbetaling
                utbetaling={utbetaling}
                updateYtelseIFokus={props.settYtelseIFokus}
                erIFokus={props.ytelseIFokus === utbetaling.ytelser[0]}
            />)
        : (
            <SammensattUtbetaling
                updateYtelseIFokus={props.settYtelseIFokus}
                utbetaling={utbetaling}
                ytelseIFokus={props.ytelseIFokus}
            />
        );
}

function mapDispatchToProps(dispatch: Dispatch<{}>): DispatchProps {
    return {
        settYtelseIFokus: ytelse => dispatch(settNyYtelseIFokus(ytelse))
    };
}

function mapStateToProps(state: AppState): StateProps {
    return {
        ytelseIFokus: state.utbetalinger.ytelseIFokus
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Utbetaling);
