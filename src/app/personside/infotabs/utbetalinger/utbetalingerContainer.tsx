import * as React from 'react';
import Utbetalinger from './utbetalinger';
import { AppState } from '../../../../redux/reducers';
import { connect, Dispatch } from 'react-redux';
import { RestReducer } from '../../../../redux/restReducers/restReducer';
import { UtbetalingerResponse } from '../../../../models/utbetalinger';
import Innholdslaster from '../../../../components/Innholdslaster';
import { STATUS } from '../../../../redux/restReducers/utils';
import { Action } from 'redux';
import { hentUtbetalinger } from '../../../../redux/restReducers/utbetalinger';

interface StateProps {
    utbetalingerReducer: RestReducer<UtbetalingerResponse>;
}

interface DispatchProps {
    hentUtbetalinger: (fødselsnummer: string) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

class UtbetalingerContainer extends React.Component<Props> {

    componentDidMount() {
        if (this.props.utbetalingerReducer.status === STATUS.NOT_STARTED) {
            this.props.hentUtbetalinger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.utbetalingerReducer]}>
                <Utbetalinger utbetalinger={this.props.utbetalingerReducer.data.utbetalinger}/>
            </Innholdslaster>
        );
    }
}

function mapStateToProps (state: AppState): StateProps {
    return ({
        utbetalingerReducer: state.restEndepunkter.utbetalingerReducer
    });
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentUtbetalinger: (fødselsnummer: string) => dispatch(hentUtbetalinger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UtbetalingerContainer);
