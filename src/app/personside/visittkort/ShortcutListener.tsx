import { RouteComponentProps, withRouter } from 'react-router';
import * as React from 'react';
import { paths } from '../../routes/routing';
import { connect, Dispatch } from 'react-redux';
import { toggleVisittkort } from '../../../redux/uiReducers/VisittkortUIDuck';

interface OwnProps {
    fødselsnummer: string;
}

interface DispatchProps {
    toggleVisittkort: () => void;
}

type Props = OwnProps & RouteComponentProps<{}> & DispatchProps;

class ShortcutListener extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.handleShortcut = this.handleShortcut.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleShortcut);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleShortcut);
    }

    render() {
        return null;
    }

    private handleShortcut(event: KeyboardEvent) {
        if (event.altKey && event.code === 'KeyB') {
            this.props.history.push(`${paths.brukerprofil}/${this.props.fødselsnummer}`);
        } else if (event.altKey && event.code === 'KeyN') {
            this.props.toggleVisittkort();
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): DispatchProps {
    return {
        toggleVisittkort: () => dispatch(toggleVisittkort())
    };
}

export default withRouter(connect(null, mapDispatchToProps)(ShortcutListener));
