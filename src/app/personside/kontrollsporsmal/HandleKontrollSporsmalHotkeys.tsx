import * as React from 'react';
import { loggEvent } from '../../../utils/frontendLogger';
import { getSaksbehandlerIdent } from '../../../utils/loggInfo/getSaksbehandlerIdent';
import { Action, Dispatch } from 'redux';
import { toggleKontrollSpørsmål } from '../../../redux/kontrollSporsmal/actions';
import { connect } from 'react-redux';

interface DispatchProps {
    toggleKontrollSpørsmål: () => void;
}

class HandleKontrollSporsmalHotkeys extends React.Component<DispatchProps> {

    constructor(props: DispatchProps) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('keydown', this);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this);
    }

    render() {
        return null;
    }

    handleEvent(event: Event) {
        if (!(event instanceof KeyboardEvent)) {
            return;
        }
        const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;

        if (key === 'l' && event.altKey) {
            loggEvent('Hurtigtast', 'Kontrollsporsmal', {type: 'Alt + L'}, {ident: getSaksbehandlerIdent()});
            this.props.toggleKontrollSpørsmål();
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        toggleKontrollSpørsmål: () => dispatch(toggleKontrollSpørsmål())
    };
}

export default connect(null, mapDispatchToProps)(HandleKontrollSporsmalHotkeys);
