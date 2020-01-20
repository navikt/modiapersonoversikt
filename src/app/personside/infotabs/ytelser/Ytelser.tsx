import * as React from 'react';

import YtelseListe from './YtelserListe';
import { ScrollBar } from '../utils/InfoTabsScrollBar';
import styled from 'styled-components';
import ValgtYtelse from './ValgtYtelse';

const Styling = styled.section`
    flex-grow: 1; /* IE11 */
    display: flex;
    > *:first-child {
        min-width: 19rem;
        flex-basis: 19rem;
        flex-grow: 0;
        padding-top: 1rem;
    }
    > *:last-child {
        flex-grow: 1;
    }
    align-items: flex-start;
`;

function Ytelser() {
    return (
        <Styling>
            <ScrollBar keepScrollId="ytelser">
                <YtelseListe />
            </ScrollBar>
            <ScrollBar keepScrollId="ytelser">
                <ValgtYtelse />
            </ScrollBar>
        </Styling>
    );
}

export default Ytelser;
