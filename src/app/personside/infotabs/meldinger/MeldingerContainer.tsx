import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import TraadVisningContainer from './traadvisning/TraadVisningContainer';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import VerktoylinjeContainer from './traadvisning/verktoylinje/VerktoylinjeContainer';
import TraadListe from './traadliste/TraadListe';

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
    > *:last-child {
        flex-grow: 1;
    }
`;

function MeldingerContainer() {
    return (
        <MeldingerMainStyle>
            <MeldingerArticleStyle>
                <RestResourceConsumer<Traad[]> getResource={restResources => restResources.tråderOgMeldinger}>
                    {data => (
                        <>
                            <TraadListe traader={data} />
                            <div>
                                <VerktoylinjeContainer />
                                <TraadVisningContainer />
                            </div>
                        </>
                    )}
                </RestResourceConsumer>
            </MeldingerArticleStyle>
        </MeldingerMainStyle>
    );
}

export default MeldingerContainer;
