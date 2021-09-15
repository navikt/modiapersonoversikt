import * as React from 'react';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import { Action, Dispatch } from 'redux';
import { lukkKontrollSporsmal } from '../../../redux/kontrollSporsmal/actions';
import { connect } from 'react-redux';

interface DispatchProps {
    lukkKontrollSporsmal: () => void;
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
            loggEvent('Hurtigtast', 'Lukk-kontrollsporsmal', { type: 'Alt + L' });
            this.props.lukkKontrollSporsmal();
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        lukkKontrollSporsmal: () => dispatch(lukkKontrollSporsmal())
    };
}

export default connect(null, mapDispatchToProps)(HandleKontrollSporsmalHotkeys);
