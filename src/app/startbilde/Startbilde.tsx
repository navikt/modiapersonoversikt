import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import KnappBase from 'nav-frontend-knapper';
import StartBildeLayout from './StartBildeLayout';
import { paths, setNyBrukerIPath } from '../routes/routing';
import { aremark } from '../../mock/person/aremark';
import { moss } from '../../mock/person/moss';
import HentOppgaveKnapp from '../personside/dialogpanel/HentOppgaveKnapp';

type StartbildeProps = RouteComponentProps<{}>;

class Startbilde extends React.Component<StartbildeProps> {
    snarveiTilAremark() {
        setNyBrukerIPath(this.props.history, aremark.fødselsnummer);
    }

    snarveiTilMoss() {
        setNyBrukerIPath(this.props.history, moss.fødselsnummer);
    }

    render() {
        return (
            <StartBildeLayout>
                <KnappBase onClick={() => this.snarveiTilAremark()} type="hoved">
                    Snarvei til Aremark!
                </KnappBase>
                <KnappBase onClick={() => this.snarveiTilMoss()} type="hoved">
                    Snarvei til Moss!
                </KnappBase>
                <KnappBase onClick={() => this.props.history.push(paths.standaloneKomponenter)} type="hoved">
                    Snarvei til standalone-komponenter
                </KnappBase>
                <HentOppgaveKnapp />
            </StartBildeLayout>
        );
    }
}

export default withRouter(Startbilde);
