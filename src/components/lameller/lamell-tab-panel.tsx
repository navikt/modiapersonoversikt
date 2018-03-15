import * as React from 'react';
import { LAMELLER } from './lamell-enum';
import styled from 'styled-components';
import TabKnapp from './tab-knapp';

interface TabPanelProps {
    onTabChange: Function;
    openTab: LAMELLER;
}

function LamellTabPanel(props: TabPanelProps) {

    const TabPanelDiv = styled.div`
      display: table;
      width: 100%;
      table-layout: fixed;
      border-spacing: 1em 0;
    `;

    const KnappWrapper = styled.div`
      display: table-cell;
      box-sizing: border-box;
    `;

    const tabLenker = Object.keys(LAMELLER).map((panel) => {

        const erValgt = LAMELLER[panel] === props.openTab;

        return (
            <KnappWrapper key={panel}>
                <TabKnapp valgt={erValgt} onClick={() => props.onTabChange(panel)}>
                    {LAMELLER[panel]}
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

export default LamellTabPanel;
