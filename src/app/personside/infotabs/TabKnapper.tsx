import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import styled from 'styled-components';
import { theme } from '../../../styles/personOversiktTheme';

interface TabPanelProps {
    onTabChange: Function;
    openTab: INFOTABS;
}

const TabKnapperNav = styled.nav`
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      > *:not(:last-child){
        margin-right: .2em;
      }
      > *:not(:first-child){
        margin-left: .2em;
      }
`;

const KnappWrapper = styled.div`
  flex-grow: 1;
  box-sizing: border-box;
`;

interface TabKnappProps {
    valgt: boolean;
}

const TabKnapp = styled<TabKnappProps, 'button'>('button')`
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    padding-top: 0.5em;
    margin-top: 0.5em;
    border: none;
    border-bottom: 4px solid ${props => props.valgt ? theme.color.selectedLink : 'transparent'};
    text-align: center;
    cursor: pointer;
    transition: border 0.3s;
    font-weight: bold;
    &:focus {
      ${theme.focus}
    }
    &:hover {
      border-bottom: 4px solid ${theme.color.hoverLink};
    }
`;

function TabKnapper(props: TabPanelProps) {

    const knapper = Object.keys(INFOTABS).map(key => {
        const erValgt = INFOTABS[key] === props.openTab;
        return (
            <KnappWrapper key={key}>
                <TabKnapp role="tab" aria-selected={erValgt} valgt={erValgt} onClick={() => props.onTabChange(key)}>
                    {INFOTABS[key]}
                </TabKnapp>
            </KnappWrapper>
        );
    });

    return (
        <TabKnapperNav aria-label="Tabpanel">
            {knapper}
        </TabKnapperNav>
    );
}

export default TabKnapper;
