import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import styled, { css } from 'styled-components';
import theme from '../../../styles/personOversiktTheme';

interface TabPanelProps {
    onTabChange: Function;
    openTab: INFOTABS;
}

const TabKnapperNav = styled.nav`
    flex-shrink: 0;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: ${theme.margin.layout};
    > *:not(:last-child) {
        margin-right: 0.2em;
    }
    > *:not(:first-child) {
        margin-left: 0.2em;
    }
    border-top: ${theme.border.skille};
    border-bottom: ${theme.border.skille};
    background-color: ${theme.color.navLysGra};
`;

const KnappWrapper = styled.div`
    flex-grow: 1;
    box-sizing: border-box;
`;

interface TabKnappProps {
    valgt: boolean;
}

const TabKnapp = styled.button<TabKnappProps>`
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    padding-top: 0.5em;
    border: none;
    border-bottom: 4px solid ${props => (props.valgt ? theme.color.lenkeSelected : 'transparent')};
    ${props =>
        props.valgt &&
        css`
            color: ${theme.color.lenkeSelected};
        `};
    text-align: center;
    cursor: pointer;
    transition: border 0.3s;
    font-weight: bold;
    &:focus {
        ${theme.focus};
        border-radius: ${theme.borderRadius.layout};
    }
    &:hover {
        border-bottom: 4px solid ${theme.color.lenkeHover};
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
        <TabKnapperNav role="tablist" aria-label="Tabpanel">
            {knapper}
        </TabKnapperNav>
    );
}

export default TabKnapper;
