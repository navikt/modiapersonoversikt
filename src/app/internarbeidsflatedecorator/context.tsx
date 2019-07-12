import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import * as React from 'react';
import { initialiserToppmeny } from './dekorator-utils';
import { hentAktivBruker, hentAktivEnhet, hentIdent, oppdaterAktivBruker } from './context-api';
import ContextFeilmodal from './context-feilmodal';
import EnhetContextListener, {
    EnhetConnectionState,
    EnhetContextEvent,
    EnhetContextEventNames
} from './context-listener';
import NyBrukerModal from './ny-bruker-modal';

import './context.less';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { setNyBrukerIPath } from '../routes/routing';
import { RouteComponentProps, withRouter } from 'react-router';
import * as Cookies from 'js-cookie';
import DecoratorListener from './decorator-listener';

function miljoFraUrl() {
    return utledMiljoFraHost(window.location.host);
}

function utledMiljoFraHost(host: string) {
    const matches = host.match(/-[a-zA-Z][0-9]+/);
    return matches == null ? '' : matches[0];
}

function erDev() {
    const host: string = window.location.host;
    const devMode: boolean = window.location.search.includes('devmode');

    return host.includes('localhost') || host.includes('127.0.0.1') || devMode;
}

interface EnhetContextState {
    brukerModalSynlig: boolean;
    feilmodalSynlig: boolean;
    tilkoblingState: EnhetConnectionState;
    tilkoblingHarFeilet: boolean;
    lastBrukerPending: boolean;
    tekster: any;
    fnrContext?: string;
}

interface StateProps {
    fnr: string;
}
type Props = StateProps & RouteComponentProps<{}>;

class EnhetContext extends React.Component<Props, EnhetContextState> {
    public contextListenerPromise?: Promise<EnhetContextListener>;

    constructor(props: Props) {
        super(props);
        this.state = {
            brukerModalSynlig: false,
            feilmodalSynlig: false,
            fnrContext: this.props.fnr,
            lastBrukerPending: false,
            tekster: {},
            tilkoblingHarFeilet: false,
            tilkoblingState: EnhetConnectionState.NOT_CONNECTED
        };

        this.enhetContextHandler = this.enhetContextHandler.bind(this);
        this.lukkFeilmodal = this.lukkFeilmodal.bind(this);
        this.handleLastNyBruker = this.handleLastNyBruker.bind(this);
        this.handleFortsettSammeBruker = this.handleFortsettSammeBruker.bind(this);
    }

    public componentDidMount() {
        window.addEventListener('popstate', () => {
            this.oppdaterAktivBrukHvisEndret();
        });

        this.contextListenerPromise = hentIdent().then(ident => {
            const enhet = Cookies.get(`saksbehandlerinnstillinger-${ident}`);
            if (!enhet) {
                this.handleNyAktivEnhet();
            }
            return new EnhetContextListener(this.websocketUri(ident), this.enhetContextHandler);
        });

        const fnrFraUrl = this.props.fnr;
        if (fnrFraUrl != null) {
            this.oppdaterAktivBrukHvisEndret();
        } else {
            this.oppdaterSideMedNyAktivBruker();
        }
    }

    public componentWillUnmount() {
        if (this.contextListenerPromise) {
            this.contextListenerPromise.then(contextListener => contextListener.close());
        }
    }

    public render() {
        const alertIkkeTilkoblet = (
            <AlertStripeAdvarsel>
                Det er fare for at du kan ha forskjellige brukere i forskjellige flater/vinduer. Systemet feiler og
                klarer ikke oppfatte endringer du eventuelt har gjort i andre vinuer.
            </AlertStripeAdvarsel>
        );

        return (
            <div>
                {this.state.tilkoblingHarFeilet ? alertIkkeTilkoblet : null}
                <DecoratorListener />
                <NyBrukerModal
                    isOpen={this.state.brukerModalSynlig}
                    isPending={this.state.lastBrukerPending}
                    doLastNyBruker={this.handleLastNyBruker}
                    doFortsettSammeBruker={this.handleFortsettSammeBruker}
                    fodselsnummer={this.state.fnrContext!}
                />

                <ContextFeilmodal isOpen={this.state.feilmodalSynlig} onClose={this.lukkFeilmodal} />
            </div>
        );
    }

    private websocketUri(ident: string) {
        const miljo = erDev() ? '-q6' : miljoFraUrl();
        return `wss://veilederflatehendelser${miljo}.adeo.no/modiaeventdistribution/ws/${ident}`;
    }

    private handleFeilet(e?: any) {
        this.setState({
            brukerModalSynlig: false,
            feilmodalSynlig: true,
            lastBrukerPending: false
        });
    }

    private oppdaterAktivBrukHvisEndret() {
        const fnrFraUrl = this.props.fnr;
        return hentAktivBruker()
            .then(nyBruker => {
                this.setState({ fnrContext: nyBruker });

                if (!!fnrFraUrl && nyBruker !== fnrFraUrl) {
                    oppdaterAktivBruker(fnrFraUrl);
                }
            })
            .catch(() => this.handleFeilet());
    }

    private oppdaterSideMedNyAktivBruker() {
        hentAktivBruker()
            .then(bruker => {
                const fnrFraUrl = this.props.fnr;
                this.setState({ fnrContext: bruker });

                if (bruker != null && bruker !== fnrFraUrl) {
                    setNyBrukerIPath(this.props.history, bruker);
                }
            })
            .catch(() => this.handleFeilet());
    }

    private enhetContextHandler(event: EnhetContextEvent) {
        switch (event.type) {
            case EnhetContextEventNames.CONNECTION_STATE_CHANGED:
                this.handleTilkoblingStateChange(event.state);
                break;
            case EnhetContextEventNames.NY_AKTIV_ENHET:
                this.handleNyAktivEnhet();
                break;
            case EnhetContextEventNames.NY_AKTIV_BRUKER:
                this.handleNyAktivBruker();
                break;
        }
    }

    private handleNyAktivBruker() {
        hentAktivBruker()
            .then(nyBruker => {
                const fnrFraUrl = this.props.fnr;
                this.setState({ fnrContext: nyBruker });

                if (fnrFraUrl == null) {
                    this.oppdaterSideMedNyAktivBruker();
                } else if (nyBruker !== fnrFraUrl) {
                    this.setState({
                        brukerModalSynlig: true
                    });
                }
            })
            .catch(() => this.handleFeilet());
    }

    private handleTilkoblingStateChange(nyTilkoblingState: EnhetConnectionState) {
        const fortsattFeil =
            this.state.tilkoblingState === EnhetConnectionState.FAILED &&
            nyTilkoblingState !== EnhetConnectionState.CONNECTED;
        this.setState({
            tilkoblingHarFeilet: nyTilkoblingState === EnhetConnectionState.FAILED || fortsattFeil,
            tilkoblingState: nyTilkoblingState
        });
    }

    private handleNyAktivEnhet() {
        hentAktivEnhet()
            .then(enhet => {
                initialiserToppmeny(this.props.fnr, enhet);
            })
            .catch(e => this.handleFeilet(e));
    }

    private handleLastNyBruker() {
        this.oppdaterSideMedNyAktivBruker();
        this.setState({ brukerModalSynlig: false });
    }

    private handleFortsettSammeBruker() {
        this.setState({ lastBrukerPending: true });
        this.oppdaterAktivBrukHvisEndret().then(() =>
            this.setState({
                brukerModalSynlig: false,
                lastBrukerPending: false
            })
        );
    }

    private lukkFeilmodal() {
        this.setState({ feilmodalSynlig: false });
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fnr: state.gjeldendeBruker.fødselsnummer
    };
}

export default withRouter(connect(mapStateToProps)(EnhetContext));
