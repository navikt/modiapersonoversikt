import * as React from 'react';
import { loggEvent } from '../../../utils/frontendLogger';
import { getSaksbehandlerIdent } from '../../../utils/loggInfo/getSaksbehandlerIdent';
import { Action, Dispatch } from 'redux';
import { lukkKontrollSpørsmål } from '../../../redux/kontrollSporsmal/actions';
import { connect } from 'react-redux';

interface DispatchProps {
    lukkKontrollSpørsmål: () => void;
}

class HandleKontrollSporsmalHotkeys extends React.Component<DispatchProps> {
    constructor(props: DispatchProps) {
        super(props);
        this.handleHotkey = this.handleHotkey.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleHotkey);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleHotkey);
    }

    render() {
        return null;
    }

    private handleHotkey(event: KeyboardEvent) {
        const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;

        if (key === 'l' && event.altKey) {
            loggEvent('Hurtigtast', 'Kontrollsporsmal', { type: 'Alt + L' }, { ident: getSaksbehandlerIdent() });
            this.props.lukkKontrollSpørsmål();
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        lukkKontrollSpørsmål: () => dispatch(lukkKontrollSpørsmål())
    };
}

export default connect(
    null,
    mapDispatchToProps
)(HandleKontrollSporsmalHotkeys);
