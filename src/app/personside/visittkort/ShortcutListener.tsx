import { RouteComponentProps, withRouter } from 'react-router';
import * as React from 'react';
import { paths } from '../../routes/routing';

interface OwnProps {
    fødselsnummer: string;
}

type Props = OwnProps & RouteComponentProps<{}>;

class ShortcutListener extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.handleShortcut = this.handleShortcut.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keyup', this.handleShortcut);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleShortcut);
    }

    render() {
        return null;
    }

    private handleShortcut(event: KeyboardEvent) {
        if (event.altKey && event.key === 'b') {
            this.props.history.push(`${paths.brukerprofil}/${this.props.fødselsnummer}`);
        }
    }
}

export default withRouter(ShortcutListener);
