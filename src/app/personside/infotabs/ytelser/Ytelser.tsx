import * as React from 'react';
import { useState } from 'react';
import YtelseListe from './YtelserListe';
import { ScrollBar } from '../utils/InfoTabsScrollBar';
import styled from 'styled-components';
import YtelserContainer from './YtelserContainer';
import { Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import { Foreldrepengerettighet } from '../../../../models/ytelse/foreldrepenger';
import { Sykepenger } from '../../../../models/ytelse/sykepenger';

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

export type Ytelse = Pleiepengerettighet | Foreldrepengerettighet | Sykepenger | undefined;

function Ytelser() {
    const [valgtYtelse, setValgtYtelse] = useState<Ytelse>(undefined);
    return (
        <Styling>
            <ScrollBar keepScrollId="ytelser">
                <YtelseListe setValgtYtelse={setValgtYtelse} />
            </ScrollBar>
            <ScrollBar keepScrollId="ytelser">
                <YtelserContainer valgtYtelse={valgtYtelse} />
            </ScrollBar>
        </Styling>
    );
}

export default Ytelser;
