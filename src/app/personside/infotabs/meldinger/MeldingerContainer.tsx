import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import TraadListe from './traadliste/TraadListe';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { useEffect, useState } from 'react';
import { hasData } from '../../../../rest/utils/restResource';
import { huskForrigeValgtTraad } from '../../../../redux/meldinger/actions';
import { useDispatch } from 'react-redux';
import { useAppState, useRestResource } from '../../../../utils/customHooks';
import { useInfotabsDyplenker } from '../dyplenker';
import { useHistory, withRouter } from 'react-router';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import { useSokEtterMeldinger } from './utils/meldingerUtils';
import { useValgtTraadIUrl } from './utils/useValgtTraadIUrl';
import TraadVisningWrapper from './traadvisning/TraadVisningWrapper';

const meldingerMediaTreshold = pxToRem(1000);

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

    useEffect(() => {
        valgtTraad && dispatch(huskForrigeValgtTraad(valgtTraad));
    }, [dispatch, valgtTraad]);

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

function MeldingerContainer() {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const valgtTraad = useValgtTraadIUrl();
    const [sokeord, setSokeord] = useState('');
    const traaderFørSøk = hasData(traaderResource) ? traaderResource.data : [];
    const traaderEtterSok = useSokEtterMeldinger(traaderFørSøk, sokeord);
    useSyncSøkMedVisning(traaderFørSøk, traaderEtterSok);
    useVelgTraadHvisIngenTraadErValgt(traaderEtterSok);

    return (
        <RestResourceConsumer<Traad[]>
            getResource={restResources => restResources.tråderOgMeldinger}
            returnOnPending={<CenteredLazySpinner />}
        >
            {data => {
                if (data.length === 0) {
                    return <AlertStripeInfo>Brukeren har ingen meldinger</AlertStripeInfo>;
                }
                return (
                    <MeldingerArticleStyle>
                        <ScrollBar>
                            <TraadListe
                                sokeord={sokeord}
                                setSokeord={setSokeord}
                                traader={data}
                                valgtTraad={valgtTraad}
                            />
                        </ScrollBar>
                        <ScrollBar>
                            {traaderEtterSok.length === 0 ? (
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
