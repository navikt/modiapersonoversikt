import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import TraadListeContainer from './traadliste/TraadListeContainer';
import TraadVisningContainer from './traadvisning/TraadVisningContainer';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

interface VisningProps {
    traader: Traad[];
}

const meldingerMediaTreshold = '80rem';

const MeldingerArticleStyle = styled.article`
    @media (min-width: ${meldingerMediaTreshold}) {
        display: flex;
        align-items: flex-start;
        > *:last-child {
            margin-left: ${theme.margin.layout};
        }
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    > * {
        margin-bottom: ${theme.margin.layout};
    }
`;

function MeldingerVisning(props: VisningProps) {
    return (
        <MeldingerArticleStyle>
            <TraadListeContainer />
            <TraadVisningContainer />
        </MeldingerArticleStyle>
    );
}

export default MeldingerVisning;
