import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import TraadVisningContainer from './traadvisning/TraadVisningContainer';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import VerktoylinjeContainer from './traadvisning/verktoylinje/VerktoylinjeContainer';
import TraadListe from './traadliste/TraadListe';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';

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

function MeldingerContainer() {
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

export default MeldingerContainer;
