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
import TraadVisning from './traadvisning/TraadVisning';
import Verktoylinje from './traadvisning/verktoylinje/Verktoylinje';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import { useSokEtterMeldinger } from './utils/meldingerUtils';
import { useValgtTraadIUrl } from './utils/useValgtTraadIUrl';

interface TraadVisningWrapperProps {
    valgtTraad?: Traad;
    sokeord: string;
    traaderEtterSok: Traad[];
}

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

function TraadVisningWrapper(props: TraadVisningWrapperProps) {
    if (props.traaderEtterSok.length === 0) {
        return <AlertStripeInfo>Søket ga ingen treff på meldinger</AlertStripeInfo>;
    }
    return (
        <>
            <Verktoylinje valgtTraad={props.valgtTraad} />
            <TraadVisning sokeord={props.sokeord} valgtTraad={props.valgtTraad} />
        </>
    );
}

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
        if (traaderFørSøk.length === traaderEtterSok.length) {
            return;
        }
        const valgtTaadMatcherSøk = valgtTraad && traaderEtterSok.includes(valgtTraad);
        if (traaderEtterSok.length > 0 && !valgtTaadMatcherSøk) {
            history.push(dyplenker.meldinger.link(traaderEtterSok[0]));
        }
    }, [valgtTraad, traaderFørSøk, traaderEtterSok, history, dyplenker.meldinger]);
}

function MeldingerContainer() {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const valgtTraad = useValgtTraadIUrl();
    const [sokeord, setSokeord] = useState('');
    const traaderFørSøk = hasData(traaderResource) ? traaderResource.data : [];
    const traaderEtterSok = useSokEtterMeldinger(traaderFørSøk, sokeord);
    useSyncSøkMedVisning(traaderFørSøk, traaderEtterSok);
    const forrigeValgteTraad = useHuskValgtTraad();

    const traadSomSkalVises = valgtTraad || forrigeValgteTraad || traaderEtterSok[0] || undefined;

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
                                valgtTraad={traadSomSkalVises}
                            />
                        </ScrollBar>
                        <ScrollBar>
                            <TraadVisningWrapper
                                traaderEtterSok={traaderEtterSok}
                                sokeord={sokeord}
                                valgtTraad={traadSomSkalVises}
                            />
                        </ScrollBar>
                    </MeldingerArticleStyle>
                );
            }}
        </RestResourceConsumer>
    );
}

export default withRouter(MeldingerContainer);
