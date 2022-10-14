import * as React from 'react';
import { useEffect } from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import TraadListe from './traadliste/TraadListe';
import { useDispatch } from 'react-redux';
import { usePrevious } from '../../../../utils/customHooks';
import { useInfotabsDyplenker } from '../dyplenker';
import { useHistory } from 'react-router';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import { useSokEtterMeldinger } from './utils/meldingerUtils';
import { useValgtTraadIUrl } from './utils/useValgtTraadIUrl';
import TraadVisningWrapper from './traadvisning/TraadVisningWrapper';
import DelayRender from '../../../../components/DelayRender';
import { useKeepQueryParams } from '../../../../utils/hooks/useKeepQueryParams';
import brukersdialog from '../../../../rest/resources/brukersdialog';
import { hasData, isPending } from '@nutgaard/use-fetch';
import LazySpinner from '../../../../components/LazySpinner';
import { useMeldingsok } from '../../../../context/meldingsok';
import { useValgtenhet } from '../../../../context/valgtenhet-state';

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

function useSyncSøkMedVisning(traaderFørSøk: Traad[], traaderEtterSok: Traad[], valgtTraad: Traad) {
    const dyplenker = useInfotabsDyplenker();
    const history = useHistory();

    useEffect(() => {
        const valgtTaadErISøkeresultat = valgtTraad && traaderEtterSok.find((it) => it.traadId === valgtTraad.traadId);
        if (traaderFørSøk.length === traaderEtterSok.length || valgtTaadErISøkeresultat) {
            return;
        }
        if (traaderEtterSok.length > 0) {
            history.push(dyplenker.meldinger.link(traaderEtterSok[0]));
        }
    }, [valgtTraad, traaderFørSøk, traaderEtterSok, history, dyplenker.meldinger]);
}

function useReloadOnEnhetChange() {
    const dispatch = useDispatch();
    const enhet = useValgtenhet().enhetId;
    const forrigeEnhet = usePrevious(enhet);
    const meldingerResource = brukersdialog.useFetch();

    useEffect(() => {
        if (!forrigeEnhet) {
            return;
        }
        if (forrigeEnhet !== enhet) {
            hasData(meldingerResource) && meldingerResource.rerun();
        }
    }, [forrigeEnhet, enhet, meldingerResource, dispatch]);
}

function MeldingerContainer() {
    const traaderResource = brukersdialog.useFetch();
    const meldingsok = useMeldingsok();

    const traaderForSok = hasData(traaderResource) ? traaderResource.data : [];
    const traaderEtterSokOgFiltrering = useSokEtterMeldinger(traaderForSok, meldingsok.query);
    const valgtTraad = useValgtTraadIUrl() || traaderEtterSokOgFiltrering[0];
    useKeepQueryParams();
    useSyncSøkMedVisning(traaderForSok, traaderEtterSokOgFiltrering, valgtTraad);
    useReloadOnEnhetChange();

    if (isPending(traaderResource)) {
        return <LazySpinner type="M" />;
    }

    if (traaderForSok.length === 0) {
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
                    traader={traaderForSok}
                    traaderEtterSokOgFiltrering={traaderEtterSokOgFiltrering}
                    valgtTraad={valgtTraad}
                />
            </ScrollBar>
            <ScrollBar keepScrollId="meldinger-trådvisning">
                {traaderEtterSokOgFiltrering.length === 0 ? (
                    <AlertStripeInfo>Søket ga ingen treff på meldinger</AlertStripeInfo>
                ) : (
                    <TraadVisningWrapper sokeord={meldingsok.query} valgtTraad={valgtTraad} />
                )}
            </ScrollBar>
        </MeldingerStyle>
    );
}

export default MeldingerContainer;
