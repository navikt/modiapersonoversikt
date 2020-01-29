import * as React from 'react';
import YtelseListe from './YtelserListe';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import styled from 'styled-components';
import ValgtYtelse from './ValgtYtelse';
import useBrukersYtelser from './useBrukersYtelser';
import { useInfotabsDyplenker } from '../dyplenker';
import { useKeepQueryParams } from '../../../../utils/hooks/useKeepQueryParams';

export const ytelserMediaTreshold = '45rem';

const Layout = styled.div`
    ${scrollBarContainerStyle(ytelserMediaTreshold)};
    @media (min-width: ${ytelserMediaTreshold}) {
        height: 0; /* IE11 */
        flex-grow: 1; /* IE11 */
        display: flex;
        > *:first-child {
            min-width: 19rem;
            flex-basis: 19rem;
            flex-grow: 0.5;
        }
        > *:last-child {
            flex-grow: 1;
        }
        align-items: flex-start;
    }
`;

const Styling = styled.section`
    flex-grow: 1; /* IE11 */
    flex-direction: column;
    display: flex;
`;

function Ytelser() {
    useKeepQueryParams();
    const ytelser = useBrukersYtelser();
    const dypLenker = useInfotabsDyplenker();
    const valgtYtelse = ytelser.ytelser.find(ytelse => dypLenker.ytelser.erValgt(ytelse));

    return (
        <Styling>
            {ytelser.feilmeldinger}
            <Layout>
                <ScrollBar keepScrollId="ytelser-liste">
                    <YtelseListe
                        pending={ytelser.pending}
                        ytelser={ytelser.ytelser}
                        valgtYtelse={valgtYtelse || ytelser.ytelser[0]}
                    />
                </ScrollBar>
                <ScrollBar keepScrollId="ytelser-valgt">
                    <ValgtYtelse valgtYtelse={valgtYtelse || ytelser.ytelser[0]} />
                </ScrollBar>
            </Layout>
        </Styling>
    );
}

export default Ytelser;
