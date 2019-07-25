import * as React from 'react';
import { useCallback } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { DecoratorProps } from './decoratorprops';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import { apiBaseUri } from '../../api/config';
import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';
import { RouteComponentProps, withRouter } from 'react-router';
import { isDevelopment } from '../../utils/environment';
import { finnMiljoStreng } from '../../utils/url-utils';

interface StateProps extends RouteComponentProps<{}> {
    fnr: string | null;
    enhet: string | undefined;
}

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');
const identSource = () => fetch(`${apiBaseUri}/hode/me`).then(resp => resp.json());
const enheterSource = () => fetch(`${apiBaseUri}/hode/enheter`).then(resp => resp.json());

function lagConfig(fnr: string | undefined | null, enhet: string | undefined | null, history: History): DecoratorProps {
    return {
        appname: 'Modia personoversikt',
        fnr,
        enhet,
        toggles: {
            visEnhet: false,
            visEnhetVelger: true,
            visSokefelt: true,
            visVeilder: true
        },
        identSource,
        enheterSource,
        onSok(fnr: string | null): void {
            if (fnr && fnr.length > 0) {
                setNyBrukerIPath(history, fnr);
            } else {
                fjernBrukerFraPath(history);
            }
        },
        onEnhetChange(enhet: string): void {
            fetch(`${apiBaseUri}/hode/velgenhet`, {
                credentials: 'same-origin',
                method: 'POST',
                body: enhet,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        contextholder: isDevelopment()
            ? { url: 'ws://localhost:2999/hereIsWS' }
            : { url: `wss://veilederflatehendelser${finnMiljoStreng()}.adeo.no/modiaeventdistribution/websocket` }
    };
}

function Decorator({ fnr, enhet, history }: StateProps) {
    const config = useCallback(lagConfig, [fnr, enhet, history])(fnr, enhet, history);

    console.log('config', config);
    return (
        <nav id="header">
            <InternflateDecorator {...config} />
        </nav>
    );
}

function mapStateToProps(state: AppState) {
    return {
        fnr: state.gjeldendeBruker.fødselsnummer,
        enhet: getSaksbehandlerEnhet()
    };
}

export default withRouter(connect(mapStateToProps)(Decorator));
