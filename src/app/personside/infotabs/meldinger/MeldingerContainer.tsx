import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import TraadListe from './traadliste/TraadListe';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { useEffect, useState } from 'react';
import { hasData } from '../../../../rest/utils/restResource';
import { huskForrigeValgtTraad, huskSokAction, setSkjulVarslerAction } from '../../../../redux/meldinger/actions';
import { useDispatch } from 'react-redux';
import { useAppState, useRestResource } from '../../../../utils/customHooks';
import { useInfotabsDyplenker } from '../dyplenker';
import { useHistory, withRouter } from 'react-router';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import { filtrerBortVarsel, useSokEtterMeldinger } from './utils/meldingerUtils';
import { useValgtTraadIUrl } from './utils/useValgtTraadIUrl';
import TraadVisningWrapper from './traadvisning/TraadVisningWrapper';

const meldingerMediaTreshold = pxToRem(850);

const MeldingerArticleStyle = styled.article`
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

function useHuskValgtTraad() {
    const dispatch = useDispatch();
    const valgtTraad = useValgtTraadIUrl();
    const forrigeValgteTraad = useAppState(state => state.meldinger.forrigeValgteTraad);
    const meldingerResource = useRestResource(resources => resources.tråderOgMeldinger);
    const forrigeTraadErFjernet =
        hasData(meldingerResource) && forrigeValgteTraad && !meldingerResource.data.includes(forrigeValgteTraad);

    useEffect(() => {
        if (forrigeTraadErFjernet) {
            dispatch(huskForrigeValgtTraad(undefined));
        }
        valgtTraad && dispatch(huskForrigeValgtTraad(valgtTraad));
    }, [dispatch, valgtTraad, forrigeTraadErFjernet]);

    return forrigeValgteTraad;
}

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

function useVelgTraadHvisIngenTraadErValgt(traaderEtterSok: Traad[]) {
    const valgtTraad = useValgtTraadIUrl();
    const forrigeValgteTraad = useHuskValgtTraad();
    const history = useHistory();
    const dyplenker = useInfotabsDyplenker();
    useEffect(() => {
        if (!valgtTraad) {
            const redirectTo = forrigeValgteTraad || traaderEtterSok[0];
            redirectTo && history.replace(dyplenker.meldinger.link(redirectTo));
        }
    });
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

function MeldingerContainer() {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const valgtTraad = useValgtTraadIUrl();
    const forrigeSok = useAppState(state => state.meldinger.forrigeSok);
    const [sokeord, setSokeord] = useState(forrigeSok);
    const skjulVarsler = useAppState(state => state.meldinger.skjulVarsler);
    const dispatch = useDispatch();
    const setSkjulVarsler = (skjul: boolean) => dispatch(setSkjulVarslerAction(skjul));
    const traaderFørSøk = hasData(traaderResource) ? traaderResource.data : [];
    const traaderEtterSokOgFiltrering = useSokEtterMeldinger(traaderFørSøk, sokeord).filter(traad =>
        skjulVarsler ? filtrerBortVarsel(traad) : true
    );
    useSyncSøkMedVisning(traaderFørSøk, traaderEtterSokOgFiltrering);
    useVelgTraadHvisIngenTraadErValgt(traaderEtterSokOgFiltrering);
    useHuskSokeord(sokeord);

    return (
        <RestResourceConsumer<Traad[]>
            getResource={restResources => restResources.tråderOgMeldinger}
            returnOnPending={<CenteredLazySpinner />}
        >
            {data => {
                if (traaderFørSøk.length === 0) {
                    return <AlertStripeInfo>Brukeren har ingen meldinger</AlertStripeInfo>;
                }
                return (
                    <MeldingerArticleStyle>
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
                    </MeldingerArticleStyle>
                );
            }}
        </RestResourceConsumer>
    );
}

export default withRouter(MeldingerContainer);
