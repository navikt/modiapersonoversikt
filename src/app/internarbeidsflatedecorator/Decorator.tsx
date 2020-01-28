import * as React from 'react';
import { useCallback, useState } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { DecoratorProps } from './decoratorprops';
import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';
import { useHistory } from 'react-router';
import './personsokKnapp.less';
import './hurtigtaster.less';
import './decorator.less';
import { useAppState, useFødselsnummer, useOnMount } from '../../utils/customHooks';
import PersonsokContainer from '../personsok/Personsok';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import { velgEnhetAction } from '../../redux/session/session';
import { useQueryParams } from '../../utils/urlUtils';
import styled from 'styled-components';
import HurtigtastTipsContainer from '../../components/hutigtastTips/HurtigtastTipsContainer';
import useHandleQueryParams from './useHandleQueryParams';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');
const etterSokefelt = `
<div class="knapper_container">
  <button class="personsok-button" id="toggle-personsok" aria-label="Åpne avansert søk" title="Åpne avansert søk" data-apne="Åpne avansert søk" data-lukke="Lukk avansert søk">
    <span> A <span class="personsok-pil"></span></span>
  </button>
  <button class="hurtigtaster-button" id="hurtigtaster-button" aria-label="Åpne hurtigtaster" title="Åpne hurtigtaster" data-apne="Åpne hurtigtaster" data-lukke="Lukk hurtigtaster">
    <span class="typo-element hurtigtaster-ikon">?<span class="sr-only">Vis hurtigtaster</span></span>
  </button>
</div>
`;

const StyledNav = styled.nav`
    .dekorator .dekorator__container {
        max-width: initial;
    }
`;

function lagConfig(
    gjeldendeFnr: string | undefined | null,
    enhet: string | undefined | null,
    history: History,
    settEnhet: (enhet: string) => void
): DecoratorProps {
    return {
        appname: 'Modia personoversikt',
        fnr: gjeldendeFnr,
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
            etterSokefelt: etterSokefelt
        },
        autoSubmitOnMount: true
    };
}

function useKlargjorContextholder() {
    const [klar, setKlar] = useState(false);
    const queryParams = useQueryParams<{ sokFnr?: string }>();
    useOnMount(() => {
        if (queryParams.sokFnr === '0') {
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
    const gjeldendeFnr = useFødselsnummer();
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    const history = useHistory();
    const dispatch = useDispatch();

    useHandleQueryParams();

    const handleSetEnhet = (enhet: string) => {
        dispatch(velgEnhetAction(enhet));
    };

    const contextErKlar = useKlargjorContextholder();

    const config = useCallback(lagConfig, [gjeldendeFnr, valgtEnhet, history, handleSetEnhet])(
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
                    <HurtigtastTipsContainer />
                    <DecoratorEasterEgg />
                </>
            )}
        </StyledNav>
    );
}

export default Decorator;
