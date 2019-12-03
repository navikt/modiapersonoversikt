import * as React from 'react';
import { useCallback, useState } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { DecoratorProps } from './decoratorprops';
import { apiBaseUri } from '../../api/config';
import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';
import { RouteComponentProps, withRouter } from 'react-router';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import './personsokKnapp.less';
import { useFødselsnummer, useOnMount, useRestResource } from '../../utils/customHooks';
import { parseQueryParams } from '../../utils/url-utils';
import { settJobberIkkeMedSpørsmålOgSvar } from '../personside/kontrollsporsmal/cookieUtils';
import PersonsokContainer from '../personsok/Personsok';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function lagConfig(
    sokFnr: string | undefined | null,
    gjeldendeFnr: string | undefined | null,
    enhet: string | undefined | null,
    history: History,
    settEnhet: (enhet: string) => void
): DecoratorProps {
    return {
        appname: 'Modia personoversikt',
        fnr: sokFnr || gjeldendeFnr,
        enhet,
        toggles: {
            visEnhet: false,
            visEnhetVelger: true,
            visSokefelt: true,
            visVeilder: true
        },
        onSok(fnr: string | null): void {
            if (fnr === gjeldendeFnr) {
                return;
            }
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
        autoSubmitOnMount: true
    };
}

function useKlargjorContextholder(sokFnr?: string) {
    const [klar, setKlar] = useState(false);
    useOnMount(() => {
        if (sokFnr === '0') {
            // Manuell nullstilling av bruker i context
            fetch('/modiacontextholder/api/context/aktivbruker', { method: 'DELETE', credentials: 'include' }).then(
                () => setKlar(true)
            );
        } else {
            setKlar(true);
        }
    });

    return klar;
}

function Decorator({ location, history }: RouteComponentProps<{}>) {
    const queryParams = parseQueryParams(location.search);
    const sokFnr = queryParams.sokFnr === '0' ? '' : queryParams.sokFnr;
    const gjeldendeFnr = useFødselsnummer();

    const [enhet, settEnhet] = useState(getSaksbehandlerEnhet());
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const dispatch = useDispatch();
    const handleSetEnhet = (enhet: string) => {
        dispatch(reloadMeldinger);
        settEnhet(enhet);
    };

    const contextErKlar = useKlargjorContextholder(queryParams.sokFnr);

    const config = useCallback(lagConfig, [sokFnr, gjeldendeFnr, enhet, history, handleSetEnhet])(
        sokFnr,
        gjeldendeFnr,
        enhet,
        history,
        handleSetEnhet
    );

    return (
        <nav id="header">
            {contextErKlar && (
                <>
                    <InternflateDecorator {...config} />
                    <PersonsokContainer />
                    <DecoratorEasterEgg />
                </>
            )}
        </nav>
    );
}

export default withRouter(Decorator);
