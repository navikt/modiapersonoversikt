import * as React from 'react';
import { useCallback } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { AppState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import { DecoratorProps } from './decoratorprops';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import { apiBaseUri } from '../../api/config';
import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';
import { RouteComponentProps, withRouter } from 'react-router';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

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
        contextholder: true
    };
}

function Decorator({ history }: RouteComponentProps<{}>) {
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const enhet = getSaksbehandlerEnhet();
    const config = useCallback(lagConfig, [fnr, enhet, history])(fnr, enhet, history);

    return (
        <nav id="header">
            <InternflateDecorator {...config} />
        </nav>
    );
}
export default withRouter(Decorator);
