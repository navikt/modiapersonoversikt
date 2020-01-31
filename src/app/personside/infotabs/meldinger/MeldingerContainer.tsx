import * as React from 'react';
import { useEffect, useState } from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import TraadListe from './traadliste/TraadListe';
import { huskSokAction, setSkjulVarslerAction } from '../../../../redux/meldinger/actions';
import { useDispatch } from 'react-redux';
import { useAppState, usePrevious } from '../../../../utils/customHooks';
import { useInfotabsDyplenker } from '../dyplenker';
import { useHistory, withRouter } from 'react-router';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import { filtrerBortVarsel, useSokEtterMeldinger } from './utils/meldingerUtils';
import { useValgtTraadIUrl } from './utils/useValgtTraadIUrl';
import TraadVisningWrapper from './traadvisning/TraadVisningWrapper';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import DelayRender from '../../../../components/DelayRender';
import { useKeepQueryParams } from '../../../../utils/hooks/useKeepQueryParams';

const meldingerMediaTreshold = pxToRem(800);

const MeldingerStyle = styled.div`
    ${scrollBarContainerStyle(meldingerMediaTreshold)};
    @media (min-width: ${meldingerMediaTreshold}) {
        height: 0; /* IE11 */
        flex-grow: 1; /* IE11 */
        display: flex;
        > *:first-child {
            flex: 35% 1 1;
        }
        > *:last-child {
            flex: 65% 1 1;
        }
    }
    position: relative;
`;

function useSyncSøkMedVisning(traaderFørSøk: Traad[], traaderEtterSok: Traad[]) {
    const dyplenker = useInfotabsDyplenker();
    const valgtTraad = useValgtTraadIUrl();
    const history = useHistory();

    useEffect(() => {
        const valgtTaadErISøkeresultat = valgtTraad && traaderEtterSok.includes(valgtTraad);
        if (traaderFørSøk.length === traaderEtterSok.length || valgtTaadErISøkeresultat) {
            return;
        }
        if (traaderEtterSok.length > 0) {
            history.push(dyplenker.meldinger.link(traaderEtterSok[0]));
        }
    }, [valgtTraad, traaderFørSøk, traaderEtterSok, history, dyplenker.meldinger]);
}

function useHuskSokeord(sokeord: string) {
    const dispatch = useDispatch();
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(huskSokAction(sokeord));
        }, 200);
        return () => clearTimeout(timeout);
    }, [sokeord, dispatch]);
}

function useReloadOnEnhetChange() {
    const dispatch = useDispatch();
    const enhet = useAppState(state => state.session.valgtEnhetId);
    const forrigeEnhet = usePrevious(enhet);
    const meldingerResource = useRestResource(resources => resources.tråderOgMeldinger);

    useEffect(() => {
        if (!forrigeEnhet) {
            return;
        }
        if (forrigeEnhet !== enhet) {
            meldingerResource.data && dispatch(meldingerResource.actions.reload);
        }
    }, [forrigeEnhet, enhet, meldingerResource, dispatch]);
}

function MeldingerContainer() {
    const dispatch = useDispatch();
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger, undefined, true);
    const skjulVarsler = useAppState(state => state.meldinger.skjulVarsler);
    const setSkjulVarsler = (skjul: boolean) => dispatch(setSkjulVarslerAction(skjul));
    const forrigeSok = useAppState(state => state.meldinger.forrigeSok);
    const [sokeord, setSokeord] = useState(forrigeSok);

    const traaderFørSøk = traaderResource.data ? traaderResource.data : [];
    const traaderEtterSokOgFiltrering = useSokEtterMeldinger(traaderFørSøk, sokeord).filter(traad =>
        skjulVarsler ? filtrerBortVarsel(traad) : true
    );
    const valgtTraad = useValgtTraadIUrl() || traaderEtterSokOgFiltrering[0];

    useKeepQueryParams();
    useSyncSøkMedVisning(traaderFørSøk, traaderEtterSokOgFiltrering);
    useHuskSokeord(sokeord);
    useReloadOnEnhetChange();

    if (!traaderResource.data) {
        return traaderResource.placeholder;
    }

    if (traaderFørSøk.length === 0) {
        return <AlertStripeInfo>Brukeren har ingen meldinger</AlertStripeInfo>;
    }

    if (!valgtTraad) {
        return (
            <DelayRender delay={300}>
                <AlertStripeFeil>Kunne ikke finne en valgt tråd</AlertStripeFeil>
            </DelayRender>
        );
    }

    return (
        <MeldingerStyle>
            <ScrollBar keepScrollId="meldinger-trådliste">
                <TraadListe
                    sokeord={sokeord}
                    setSokeord={setSokeord}
                    traader={traaderFørSøk}
                    traaderEtterSokOgFiltrering={traaderEtterSokOgFiltrering}
                    valgtTraad={valgtTraad}
                    skjulVarsler={skjulVarsler}
                    setSkjulVarsler={setSkjulVarsler}
                />
            </ScrollBar>
            <ScrollBar keepScrollId="meldinger-trådvisning">
                {traaderEtterSokOgFiltrering.length === 0 ? (
                    <AlertStripeInfo>Søket ga ingen treff på meldinger</AlertStripeInfo>
                ) : (
                    <TraadVisningWrapper sokeord={sokeord} valgtTraad={valgtTraad} />
                )}
            </ScrollBar>
        </MeldingerStyle>
    );
}

export default withRouter(MeldingerContainer);
