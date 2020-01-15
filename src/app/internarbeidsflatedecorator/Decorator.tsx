import * as React from 'react';
import { useCallback, useState } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { DecoratorProps } from './decoratorprops';
import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';
import { useHistory } from 'react-router';
import './personsokKnapp.less';
import { useAppState, useFødselsnummer, useOnMount } from '../../utils/customHooks';
import { settJobberIkkeMedSpørsmålOgSvar } from '../personside/kontrollsporsmal/cookieUtils';
import PersonsokContainer from '../personsok/Personsok';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import { velgEnhetAction } from '../../redux/session/session';
import { useQueryParams } from '../../utils/urlUtils';
import styled from 'styled-components';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

const StyledNav = styled.nav`
    .dekorator .dekorator__container {
        max-width: initial;
    }
`;

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
            fetch('/modiacontextholder/api/context/aktivbruker', {
                method: 'DELETE',
                credentials: 'include'
            }).then(() => setKlar(true));
        } else {
            setKlar(true);
        }
    });

    return klar;
}

function Decorator() {
    const history = useHistory();
    const queryParams = useQueryParams<{ sokFnr: string }>();
    const sokFnr = queryParams.sokFnr === '0' ? '' : queryParams.sokFnr;
    const gjeldendeFnr = useFødselsnummer();
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    const dispatch = useDispatch();

    const handleSetEnhet = (enhet: string) => {
        dispatch(velgEnhetAction(enhet));
    };

    const contextErKlar = useKlargjorContextholder(queryParams.sokFnr);

    const config = useCallback(lagConfig, [sokFnr, gjeldendeFnr, valgtEnhet, history, handleSetEnhet])(
        sokFnr,
        gjeldendeFnr,
        valgtEnhet,
        history,
        handleSetEnhet
    );

    return (
        <StyledNav>
            {contextErKlar && (
                <>
                    <InternflateDecorator {...config} />
                    <PersonsokContainer />
                    <DecoratorEasterEgg />
                </>
            )}
        </StyledNav>
    );
}

export default Decorator;
