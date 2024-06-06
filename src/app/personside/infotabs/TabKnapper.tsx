import * as React from 'react';
import { InfotabConfig, INFOTABS } from './InfoTabEnum';
import styled, { css } from 'styled-components/macro';
import theme, { pxToRem } from '../../../styles/personOversiktTheme';

interface TabPanelProps {
    // eslint-disable-next-line @typescript-eslint/ban-types
    onTabChange: Function;
    openTab: InfotabConfig;
}

const TabKnapperNav = styled.nav`
    flex-shrink: 0;
    border-top: ${theme.border.skille};
    border-bottom: ${theme.border.skille};
    background-color: ${theme.color.navLysGra};
`;

const TabListStyle = styled.ul`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    > *:not(:last-child) {
        margin-right: 0.2em;
    }
    > *:not(:first-child) {
        margin-left: 0.2em;
    }
`;

const KnappWrapper = styled.li`
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
    margin-top: ${pxToRem(4)};
    padding: ${theme.margin.layout};
    border: none;
    border-bottom: 4px solid ${(props) => (props.valgt ? theme.color.lenkeSelected : 'transparent')};
    ${(props) =>
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
    const knapper = Object.keys(INFOTABS).map((key) => {
        const erValgt = INFOTABS[key] === props.openTab;
        return (
            <KnappWrapper key={key} role="presentation">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-return */}
                <TabKnapp role="tab" aria-selected={erValgt} valgt={erValgt} onClick={() => props.onTabChange(key)}>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    {INFOTABS[key].tittel}
                </TabKnapp>
            </KnappWrapper>
        );
    });

    return (
        <TabKnapperNav aria-label="Faner">
            <h2 className="sr-only">Faner</h2>
            <TabListStyle role="tablist">{knapper}</TabListStyle>
        </TabKnapperNav>
    );
}

export default TabKnapper;
