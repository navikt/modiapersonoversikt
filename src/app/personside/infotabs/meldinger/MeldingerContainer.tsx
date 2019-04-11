import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import TraadVisningContainer from './traadvisning/TraadVisningContainer';
import TraadListeContainer from './traadliste/TraadListeContainer';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';

const meldingerMediaTreshold = '80rem';

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
        <MeldingerArticleStyle>
            <RestResourceConsumer<Traad[]> getResource={restResources => restResources.tråderOgMeldinger}>
                {data => <TraadListeContainer traader={data} />}
            </RestResourceConsumer>
            <TraadVisningContainer />
        </MeldingerArticleStyle>
    );
}

export default MeldingerContainer;
