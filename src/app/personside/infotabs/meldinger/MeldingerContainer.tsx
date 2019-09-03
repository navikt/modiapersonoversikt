import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import TraadVisningContainer from './traadvisning/TraadVisningContainer';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import VerktoylinjeContainer from './traadvisning/verktoylinje/VerktoylinjeContainer';
import TraadListe from './traadliste/TraadListe';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { useEffect } from 'react';
import { hasData } from '../../../../rest/utils/restResource';
import { setValgtTraadMeldingspanel } from '../../../../redux/meldinger/actions';
import { useDispatch } from 'react-redux';
import { useAppState, useRestResource } from '../../../../utils/customHooks';
import { erValgtIDyplenke, MeldingerDyplenkeRouteComponentProps } from '../dyplenker';
import { withRouter } from 'react-router';

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
    const valgtTraad = useAppState(state => state.meldinger.valgtTraad);
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);

    useEffect(() => {
        if (!hasData(traaderResource)) {
            return;
        }
        const traadIUrl = traaderResource.data.find(traad => erValgtIDyplenke.meldinger(traad, props));
        if (traadIUrl && traadIUrl !== valgtTraad) {
            dispatch(setValgtTraadMeldingspanel(traadIUrl));
        } else if (!valgtTraad) {
            dispatch(setValgtTraadMeldingspanel(traaderResource.data[0]));
        }
    }, [valgtTraad, traaderResource, dispatch, props]);

    return (
        <article>
            <RestResourceConsumer<Traad[]>
                getResource={restResources => restResources.tråderOgMeldinger}
                returnOnPending={<CenteredLazySpinner />}
            >
                {data => (
                    <MeldingerArticleStyle>
                        <TraadListe traader={data} />
                        <div>
                            <VerktoylinjeContainer />
                            <TraadVisningContainer />
                        </div>
                    </MeldingerArticleStyle>
                )}
            </RestResourceConsumer>
        </article>
    );
}

export default withRouter(MeldingerContainer);
