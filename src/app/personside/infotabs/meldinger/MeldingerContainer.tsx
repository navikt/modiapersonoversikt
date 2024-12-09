import { useNavigate } from '@tanstack/react-router';
import AlertStripe, { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useEffect } from 'react';
import styled from 'styled-components';
import DelayRender from '../../../../components/DelayRender';
import LazySpinner from '../../../../components/LazySpinner';
import { useMeldingsok } from '../../../../context/meldingsok';
import type { Traad } from '../../../../models/meldinger/meldinger';
import dialogResource from '../../../../rest/resources/dialogResource';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import { useInfotabsDyplenker } from '../dyplenker';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import TraadListe from './traadliste/TraadListe';
import TraadVisningWrapper from './traadvisning/TraadVisningWrapper';
import { useSokEtterMeldinger } from './utils/meldingerUtils';
import { useValgtTraadIUrl } from './utils/useValgtTraadIUrl';

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
    const navigate = useNavigate();

    useEffect(() => {
        const valgtTaadErISøkeresultat = valgtTraad && traaderEtterSok.find((it) => it.traadId === valgtTraad.traadId);
        if (traaderFørSøk.length === traaderEtterSok.length || valgtTaadErISøkeresultat) {
            return;
        }
        if (traaderEtterSok.length > 0) {
            navigate({ to: '/person/meldinger', search: { traadId: traaderEtterSok[0].traadId } });
        }
    }, [valgtTraad, traaderFørSøk, traaderEtterSok, history, dyplenker.meldinger]);
}

function MeldingerContainer() {
    const traaderResource = dialogResource.useFetch();
    const meldingsok = useMeldingsok();

    const traaderForSok = traaderResource.data ?? [];
    const traaderEtterSokOgFiltrering = useSokEtterMeldinger(traaderForSok, meldingsok.query);
    const valgtTraad = useValgtTraadIUrl() || traaderEtterSokOgFiltrering[0];
    useSyncSøkMedVisning(traaderForSok, traaderEtterSokOgFiltrering, valgtTraad);

    if (traaderResource.isLoading) {
        return <LazySpinner type="M" />;
    } else if (traaderResource.isError) {
        return <AlertStripe type="advarsel">Kunne ikke laste inn brukers meldinger</AlertStripe>;
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
