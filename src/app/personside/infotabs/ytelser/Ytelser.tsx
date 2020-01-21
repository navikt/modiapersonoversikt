import * as React from 'react';
import YtelseListe from './YtelserListe';
import { ScrollBar } from '../utils/InfoTabsScrollBar';
import styled from 'styled-components';
import ValgtYtelse from './ValgtYtelse';
import useBrukersYtelser from './useBrukersYtelser';
import { useInfotabsDyplenker } from '../dyplenker';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

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
    const ytelser = useBrukersYtelser();
    const dypLenker = useInfotabsDyplenker();
    const valgtYtelse = ytelser.ytelser.find(ytelse => dypLenker.ytelser.erValgt(ytelse));
    const history = useHistory();

    useEffect(() => {
        if (!valgtYtelse) {
            const førsteYtelse = ytelser.ytelser[0];
            førsteYtelse && history.push(dypLenker.ytelser.link(førsteYtelse));
        }
    }, [ytelser.ytelser, dypLenker, history, valgtYtelse]);

    return (
        <div>
            {ytelser.feilmeldinger}
            <Styling>
                <ScrollBar keepScrollId="ytelser-liste">
                    <YtelseListe pending={ytelser.pending} ytelser={ytelser.ytelser} />
                </ScrollBar>
                <ScrollBar keepScrollId="ytelser-valgt">
                    <ValgtYtelse valgtYtelse={valgtYtelse} />
                </ScrollBar>
            </Styling>
        </div>
    );
}

export default Ytelser;
