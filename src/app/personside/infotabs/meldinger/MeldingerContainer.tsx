import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import TraadVisningContainer from './traadvisning/TraadVisningContainer';
import TraadListeContainer from './traadliste/TraadListeContainer';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import VerktoylinjeContainer from './traadvisning/verktoylinje/VerktoylinjeContainer';

const meldingerMediaTreshold = '80rem';

const MeldingerMainStyle = styled.div`
    > *:last-child {
        margin-top: ${theme.margin.layout};
    }
`;

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
`;

function MeldingerContainer() {
    return (
        <MeldingerMainStyle>
            <MeldingerArticleStyle>
                <RestResourceConsumer<Traad[]> getResource={restResources => restResources.tråderOgMeldinger}>
                    {data => <TraadListeContainer traader={data} />}
                </RestResourceConsumer>
                <div>
                    <VerktoylinjeContainer />
                    <TraadVisningContainer />
                </div>
            </MeldingerArticleStyle>
        </MeldingerMainStyle>
    );
}

export default MeldingerContainer;
