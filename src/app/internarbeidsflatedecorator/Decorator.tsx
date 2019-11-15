import * as React from 'react';
import { useCallback, useState } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { DecoratorProps } from './decoratorprops';
import { apiBaseUri } from '../../api/config';
import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';
import { RouteComponentProps, withRouter } from 'react-router';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import './personsokKnapp.less';
import { useOnMount, useRestResource } from '../../utils/customHooks';
import { parseQueryParams } from '../../utils/url-utils';
import { settJobberIkkeMedSpørsmålOgSvar } from '../personside/kontrollsporsmal/cookieUtils';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function lagConfig(
    sokFnr: string | undefined | null,
    fnr: string | undefined | null,
    enhet: string | undefined | null,
    history: History,
    settEnhet: (enhet: string) => void
): DecoratorProps {
    return {
        appname: 'Modia personoversikt',
        fnr: sokFnr || fnr,
        enhet,
        toggles: {
            visEnhet: false,
            visEnhetVelger: true,
            visSokefelt: true,
            visVeilder: true
        },
        onSok(fnr: string | null): void {
            settJobberIkkeMedSpørsmålOgSvar();
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
                '<button class="personsok-button" id="toggle-personsok" aria-label="Åpne avansert søk" title="Åpne avansert søk" data-apne="Åpne avansert søk" data-lukke="Lukk avansert søk"> <span> A <span class="personsok-pil"></span> </span> </button>'
        },
        autoSubmit: true
    };
}

function Decorator({ location, history }: RouteComponentProps<{}>) {
    const queryParams = parseQueryParams(location.search);
    const sokFnr = queryParams.sokFnr === '0' ? '' : queryParams.sokFnr;
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);

    const [enhet, settEnhet] = useState(getSaksbehandlerEnhet());
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const dispatch = useDispatch();
    const handleSetEnhet = (enhet: string) => {
        dispatch(reloadMeldinger);
        settEnhet(enhet);
    };

    useOnMount(() => {
        if (queryParams.sokFnr === '0') {
            // Manuell nullstilling av bruker i context
            fetch('/modiacontextholder/api/context/aktivbruker', { method: 'DELETE', credentials: 'include' });
        }
    });

    const config = useCallback(lagConfig, [sokFnr, fnr, enhet, history, handleSetEnhet])(
        sokFnr,
        fnr,
        enhet,
        history,
        handleSetEnhet
    );

    return (
        <nav id="header">
            <InternflateDecorator {...config} />
        </nav>
    );
}
export default withRouter(Decorator);
