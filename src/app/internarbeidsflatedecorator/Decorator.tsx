import * as React from 'react';
import { useCallback, useState } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import raw from 'raw.macro';
import styled from 'styled-components/macro';
import { DecoratorProps, EnhetDisplay, FnrDisplay, RESET_VALUE } from './decoratorprops';
import { fjernBrukerFraPath, paths, setNyBrukerIPath } from '../routes/routing';
import { matchPath, useHistory } from 'react-router';
import { useAppState, useOnMount } from '../../utils/customHooks';
import PersonsokContainer from '../personsok/Personsok';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import { velgEnhetAction } from '../../redux/session/session';
import { parseQueryString, useQueryParams } from '../../utils/url-utils';
import HurtigtastTipsContainer from '../../components/hutigtastTips/HurtigtastTipsContainer';
import useHandleGosysUrl from './useHandleGosysUrl';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { removePrefix } from '../../utils/string-utils';
import OppdateringsloggContainer, {
    DecoratorButtonId as OppdateringsloggButtonId
} from '../oppdateringslogg/OppdateringsloggContainer';
import './personsokKnapp.less';
import './hurtigtaster.less';
import './decorator.less';

const bjelleIkon = raw('../../svg/bjelle.svg');

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

const etterSokefelt = `
        <div class="knapper_container">
          <button class="personsok-button" id="toggle-personsok" aria-label="Åpne avansert søk" title="Åpne avansert søk">
            <span> A <span class="personsok-pil"></span></span>
          </button>
          <button class="hurtigtaster-button" id="hurtigtaster-button" aria-label="Åpne hurtigtaster" title="Åpne hurtigtaster">
            <span class="typo-element hurtigtaster-ikon">?<span class="sr-only">Vis hurtigtaster</span></span>
          </button>
          <button class="${OppdateringsloggButtonId}" id="${OppdateringsloggButtonId}" title="Åpne oppdateringslogg">
            <div class="oppdateringslogg__ikon">
              ${bjelleIkon}
            </div>
            <span class="oppdateringslogg__beskrivelse" aria-label="Åpne oppdateringslogg"></span>
            <span class="oppdateringslogg__ulestindikator" aria-label="(Uleste)"></span>
          </button>
        </div>
    `;

const StyledNav = styled.nav`
    .dekorator .dekorator__container {
        max-width: initial;
    }
`;

function lagConfig(
    enhet: string | undefined | null,
    history: History,
    settEnhet: (enhet: string) => void
): DecoratorProps {
    const { sokFnr, pathFnr } = getFnrFraUrl();
    const onsketFnr = sokFnr || pathFnr;
    const fnrValue = onsketFnr === '0' ? RESET_VALUE : onsketFnr;
    return {
        appname: 'Modia personoversikt',
        fnr: {
            value: fnrValue,
            display: FnrDisplay.SOKEFELT,
            onChange(fnr: string | null): void {
                if (fnr === getFnrFraUrl().pathFnr) {
                    return;
                }
                if (fnr && fnr.length > 0) {
                    setNyBrukerIPath(history, fnr);
                } else {
                    fjernBrukerFraPath(history);
                }
            }
        },
        enhet: {
            initialValue: enhet || null,
            display: EnhetDisplay.ENHET_VALG,
            onChange(enhet: string | null): void {
                if (enhet) {
                    settEnhet(enhet);
                }
            }
        },
        toggles: {
            visVeileder: true
        },
        markup: {
            etterSokefelt: etterSokefelt
        }
    };
}

// TODO Jupp, dette er en superhack pga fnr i redux-state ikke blir satt tidlig nok.
// gjeldendeBruker.fnr burde fjernes fra state og hentes fra url slik at man har en single-point-of truth.
function useVenterPaRedux() {
    const [klar, setKlar] = useState(false);
    useOnMount(() => {
        setKlar(true);
    });
    return klar;
}

function getPathnameFromUrl(): string {
    const { pathname, hash } = window.location;
    return removePrefix(pathname + hash, process.env.PUBLIC_URL, '/#', '#');
}

function getFnrFraUrl(): { sokFnr: string | null; pathFnr: string | null } {
    const location = window.location;
    const pathname = getPathnameFromUrl();

    const queryParams = parseQueryString<{ sokFnr?: string }>(location.search);
    const sakerUriMatch = matchPath<{ fnr: string }>(pathname, `${paths.sakerFullscreen}/:fnr`);
    const saksdokumentUriMatch = matchPath<{ fnr: string }>(pathname, `${paths.saksdokumentEgetVindu}/:fnr`);
    const personUriMatch = matchPath<{ fnr: string }>(pathname, `${paths.personUri}/:fnr`);

    return {
        sokFnr: queryParams.sokFnr ?? null,
        pathFnr: sakerUriMatch?.params.fnr ?? saksdokumentUriMatch?.params.fnr ?? personUriMatch?.params.fnr ?? null
    };
}

function Decorator() {
    const reduxErKlar = useVenterPaRedux();
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    const history = useHistory();
    const dispatch = useDispatch();
    const queryParams = useQueryParams<{ sokFnr?: string }>();

    useHandleGosysUrl();

    useOnMount(() => {
        if (queryParams.sokFnr) {
            loggEvent('Oppslag', 'Puzzle');
        }
    });

    const handleSetEnhet = (enhet: string) => {
        dispatch(velgEnhetAction(enhet));
    };

    const config = useCallback(lagConfig, [valgtEnhet, history, handleSetEnhet])(valgtEnhet, history, handleSetEnhet);

    return (
        <StyledNav>
            {reduxErKlar && (
                <>
                    <InternflateDecorator {...config} />
                    <PersonsokContainer />
                    <HurtigtastTipsContainer />
                    <OppdateringsloggContainer />
                    <DecoratorEasterEgg />
                </>
            )}
        </StyledNav>
    );
}

export default Decorator;
