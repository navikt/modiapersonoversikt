import { RouteComponentProps, withRouter } from 'react-router';
import * as React from 'react';
import { paths } from '../../routes/routing';
import { connect } from 'react-redux';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import { Action, Dispatch } from 'redux';
import { loggEvent } from '../../../utils/frontendLogger';
import { runOnceDaily } from '../../../utils/runOnceDaily';

interface OwnProps {
    fødselsnummer: string;
}

interface DispatchProps {
    toggleVisittkort: () => void;
}

type Props = OwnProps & RouteComponentProps<{}> & DispatchProps;

class HandleVisittkortHotkeys extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.handleVisittkortHotkeys = this.handleVisittkortHotkeys.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleVisittkortHotkeys);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleVisittkortHotkeys);
    }

    render() {
        return null;
    }

    private handleVisittkortHotkeys(event: KeyboardEvent) {
        if (!event.altKey) {
            return;
        }

        const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;

        if (key === 'b') {
            loggEvent('Hurtigtast', 'Visittkort', {type: 'Alt + B'});
            runOnceDaily(
                'hurtigtastAltB',
                () => loggEvent('HurtigtastUnikBruker', 'Visittkort', {type: 'Alt + B'}));
            this.props.history.push(`${paths.brukerprofil}/${this.props.fødselsnummer}`);
        } else if (key === 'n') {
            loggEvent('Hurtigtast', 'Visittkort', {type: 'Alt + N'});
            runOnceDaily(
                'hurtigtastAltN',
                () => loggEvent('HurtigtastUnikBruker', 'Visittkort', {type: 'Alt + N'}));
            this.props.toggleVisittkort();
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        toggleVisittkort: () => dispatch(toggleVisittkort())
    };
}

export default withRouter(connect(null, mapDispatchToProps)(HandleVisittkortHotkeys));
