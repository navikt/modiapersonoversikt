import { RouteComponentProps, withRouter } from 'react-router';
import * as React from 'react';
import { paths } from '../../routes/routing';
import { connect } from 'react-redux';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import { Action, Dispatch } from 'redux';

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
            this.props.history.push(`${paths.brukerprofil}/${this.props.fødselsnummer}`);
        } else if (key === 'n') {
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
