import * as React from 'react';
import YtelseListe from './YtelserListe';
import { ScrollBar } from '../utils/InfoTabsScrollBar';
import EkspanderbartYtelserPanel from './felles-styling/EkspanderbartYtelserPanel';
import styled from 'styled-components';

const Styling = styled.section`
    display: flex;
    > *:first-child {
        flex-basis: 25%;
    }
    > *:last-child {
        flex-grow: 1;
    }
`;
function Ytelser() {
    return (
        <Styling>
            <ScrollBar keepScrollId="ytelser">
                <YtelseListe />
            </ScrollBar>
            <ScrollBar keepScrollId="ytelser">
                <EkspanderbartYtelserPanel setOpen={open => false} children={null} open={true} tittel="Test" />
            </ScrollBar>
        </Styling>
    );
}

export default Ytelser;
