import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import NAVSPA from '@navikt/navspa';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { DecoratorProps, EnhetDisplay, FnrDisplay, RESET_VALUE } from './decoratorprops';
import { fjernBrukerFraPath, paths, setNyBrukerIPath } from '../routes/routing';
import { matchPath, useHistory } from 'react-router';
import './personsokKnapp.less';
import './hurtigtaster.less';
import './decorator.less';
import './notifikasjonKnapp.less';
import { useAppState, useOnMount } from '../../utils/customHooks';
import PersonsokContainer from '../personsok/Personsok';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import { velgEnhetAction } from '../../redux/session/session';
import { parseQueryString, useQueryParams } from '../../utils/url-utils';
import styled from 'styled-components';
import HurtigtastTipsContainer from '../../components/hutigtastTips/HurtigtastTipsContainer';
import useHandleGosysUrl from './useHandleGosysUrl';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { removePrefix } from '../../utils/string-utils';
import NotifikasjonsContainer from '../notifikasjon/NotifikasjonsContainer';
import raw from 'raw.macro';
import useNotifikasjoner from '../notifikasjon/useNotifikasjoner';

const bjelleIkon = raw('../../svg/bjelle.svg');

const notifikasjoner = useNotifikasjoner();

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

const etterSokefelt = `
        <div class="knapper_container">
          <button class="personsok-button" id="toggle-personsok" aria-label="Åpne avansert søk" title="Åpne avansert søk">
            <span> A <span class="personsok-pil"></span></span>
          </button>
          <button class="hurtigtaster-button" id="hurtigtaster-button" aria-label="Åpne hurtigtaster" title="Åpne hurtigtaster">
            <span class="typo-element hurtigtaster-ikon">?<span class="sr-only">Vis hurtigtaster</span></span>
          </button>
          <Popover>
            <button class="notifikasjon-button" id="notifikasjon-button" aria-label="Åpne notifikasjoner" title="Åpne notifikasjoner">
              <span>${bjelleIkon}<span class="notifikasjon-varsel">${notifikasjoner.length}</span></span>
            </button>
          </Popover>
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
    const [lest, setLest] = useState(false);

    useHandleGosysUrl();

    useOnMount(() => {
        if (queryParams.sokFnr) {
            loggEvent('Oppslag', 'Puzzle');
        }
    });

    const handleSetEnhet = (enhet: string) => {
        dispatch(velgEnhetAction(enhet));
    };

    const config = useCallback(lagConfig, [valgtEnhet, history, handleSetEnhet, lest])(
        valgtEnhet,
        history,
        handleSetEnhet
    );

    useEffect(() => {
        const element = document.querySelector('#notifikasjon-button');
        element?.classList.remove('alle-lest');
        if (lest) {
            element?.classList.add('alle-lest');
        }
    }, [lest]);

    return (
        <StyledNav>
            {reduxErKlar && (
                <>
                    <InternflateDecorator {...config} />
                    <PersonsokContainer />
                    <HurtigtastTipsContainer />
                    <NotifikasjonsContainer setLest={setLest} />
                    <DecoratorEasterEgg />
                </>
            )}
        </StyledNav>
    );
}

export default Decorator;
