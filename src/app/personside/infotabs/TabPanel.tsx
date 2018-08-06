import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import styled from 'styled-components';
import TabKnapp from './TabKnapp';

interface TabPanelProps {
    onTabChange: Function;
    openTab: INFOTABS;
}

const TabPanelDiv = styled.nav`
      display: table;
      width: 100%;
      table-layout: fixed;
      border-spacing: 1em 0;
    `;

const KnappWrapper = styled.div`
      display: table-cell;
      box-sizing: border-box;
    `;

function InfoTabPanel(props: TabPanelProps) {

    const tabLenker = Object.keys(INFOTABS).map((panel) => {
        const erValgt = INFOTABS[panel] === props.openTab;
        return (
            <KnappWrapper key={panel}>
                <TabKnapp valgt={erValgt} onClick={() => props.onTabChange(panel)}>
                    {INFOTABS[panel]}
                </TabKnapp>
            </KnappWrapper>
        );
    });

    return (
        <TabPanelDiv>
            {tabLenker}
        </TabPanelDiv>
    );
}

export default InfoTabPanel;
