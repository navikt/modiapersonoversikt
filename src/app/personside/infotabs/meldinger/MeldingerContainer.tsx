import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import TraadListe from './traadliste/TraadListe';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { useEffect } from 'react';
import { hasData } from '../../../../rest/utils/restResource';
import { huskForrigeValgtTraad } from '../../../../redux/meldinger/actions';
import { useDispatch } from 'react-redux';
import { useAppState, useRestResource } from '../../../../utils/customHooks';
import { erValgtIDyplenke, MeldingerDyplenkeRouteComponentProps, useInfotabsDyplenker } from '../dyplenker';
import { withRouter } from 'react-router';
import TraadVisning from './traadvisning/TraadVisning';
import Verktoylinje from './traadvisning/verktoylinje/Verktoylinje';

const meldingerMediaTreshold = pxToRem(900);

const MeldingerArticleStyle = styled.article`
    @media (min-width: ${meldingerMediaTreshold}) {
        display: flex;
        align-items: flex-start;
        > *:last-child {
            margin-left: ${theme.margin.layout};
        }
    }
    > * {
        margin-bottom: ${theme.margin.layout};
    }
    position: relative;
    > *:first-child {
        flex: 30% 1 1;
    }
    > *:last-child {
        position: sticky;
        top: 0;
        flex: 70% 1 1;
    }
`;

function MeldingerContainer(props: MeldingerDyplenkeRouteComponentProps) {
    const dispatch = useDispatch();
    const forrigeValgteTraad = useAppState(state => state.meldinger.forrigeValgteTraad);
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const dyplenker = useInfotabsDyplenker();

    useEffect(() => {
        if (!hasData(traaderResource)) {
            return;
        }
        const traadIUrl = traaderResource.data.find(traad => erValgtIDyplenke.meldinger(traad, props));
        if (!traadIUrl) {
            props.history.push(dyplenker.meldinger.link(forrigeValgteTraad || traaderResource.data[0]));
        } else if (traadIUrl !== forrigeValgteTraad) {
            dispatch(huskForrigeValgtTraad(traadIUrl));
        }
    }, [forrigeValgteTraad, traaderResource, dispatch, props, dyplenker.meldinger]);

    return (
        <RestResourceConsumer<Traad[]>
            getResource={restResources => restResources.tråderOgMeldinger}
            returnOnPending={<CenteredLazySpinner />}
        >
            {data => (
                <MeldingerArticleStyle>
                    <TraadListe traader={data} />
                    <div>
                        <Verktoylinje />
                        <TraadVisning />
                    </div>
                </MeldingerArticleStyle>
            )}
        </RestResourceConsumer>
    );
}

export default withRouter(MeldingerContainer);
