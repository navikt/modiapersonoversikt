import * as React from 'react';
import { useCallback, useState } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { AppState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import { DecoratorProps } from './decoratorprops';
import { apiBaseUri } from '../../api/config';
import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';
import { RouteComponentProps, withRouter } from 'react-router';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import './personsokKnapp.less';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function lagConfig(
    fnr: string | undefined | null,
    enhet: string | undefined | null,
    history: History,
    settEnhet: (enhet: string) => void
): DecoratorProps {
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
            settEnhet(enhet);
        },
        contextholder: true,
        markup: {
            etterSokefelt:
                '<button class="personsok-button" id="toggle-personsok" aria-label="Åpne avansert søk" title="Åpne avansert søk" data-apne="Åpne avansert søk" data-lukke="Lukk avansert søk"> <span> AS <span class="personsok-pil"></span> </span> </button>'
        }
    };
}

function Decorator({ history }: RouteComponentProps<{}>) {
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const [enhet, settEnhet] = useState(getSaksbehandlerEnhet());
    const config = useCallback(lagConfig, [fnr, enhet, history, settEnhet])(fnr, enhet, history, settEnhet);

    return (
        <nav id="header">
            <InternflateDecorator {...config} />
        </nav>
    );
}
export default withRouter(Decorator);
