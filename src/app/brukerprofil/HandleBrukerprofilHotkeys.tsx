import { RouteComponentProps, withRouter } from 'react-router';
import * as React from 'react';
import { paths } from '../routes/routing';
import { loggEvent } from '../../utils/frontendLogger';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';

interface StateProps {
    fødselsnummer: string;
}

type Props = RouteComponentProps<{}> & StateProps;

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
            event.stopPropagation();
            loggEvent('Hurtigtast', 'Brukerprofil', { type: 'Alt + B' });
            this.props.history.push(`${paths.personUri}/${this.props.fødselsnummer}`);
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer
    };
}

export default withRouter(connect(mapStateToProps)(HandleBrukerprofilHotkeys));
