import { RouteComponentProps, withRouter } from 'react-router';
import * as React from 'react';
import { paths } from '../routes/routing';
import { loggEvent } from '../../utils/frontendLogger';

interface OwnProps {
    fødselsnummer: string;
}

type Props = RouteComponentProps<{}> & OwnProps;

class HandleBrukerprofilHotkeys extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.handleBrukerprofilHotkeys = this.handleBrukerprofilHotkeys.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleBrukerprofilHotkeys);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleBrukerprofilHotkeys);
    }

    render() {
        return null;
    }

    private handleBrukerprofilHotkeys(event: KeyboardEvent) {
        if (!event.altKey) {
            return;
        }

        const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;

        if (key === 'b') {
            loggEvent('Hurtigtast', 'Brukerprofil', {type: 'Alt + B'});
            this.props.history.push(`${paths.personUri}/${this.props.fødselsnummer}`);
        }
    }
}

export default withRouter(HandleBrukerprofilHotkeys);
