import * as React from 'react';
import { connect } from 'react-redux';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import { Action, Dispatch } from 'redux';
import { loggEvent } from '../../../utils/frontendLogger';
import { getSaksbehandlerIdent } from '../../../utils/loggInfo/getSaksbehandlerIdent';
import { runOnceDaily } from '../../../utils/runOnceDaily';

interface DispatchProps {
    toggleVisittkort: () => void;
}

type Props = DispatchProps;

class HandleVisittkortHotkeysGamleModia extends React.Component<Props> {

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

        if (key === 'n') {
            loggEvent('Hurtigtast', 'Visittkort', {type: 'Alt + N'}, {ident: getSaksbehandlerIdent()});
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

export default connect(null, mapDispatchToProps)(HandleVisittkortHotkeysGamleModia);
