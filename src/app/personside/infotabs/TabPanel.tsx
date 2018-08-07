import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import styled from 'styled-components';
import TabKnapp from './TabKnapp';

interface TabPanelProps {
    onTabChange: Function;
    openTab: INFOTABS;
}

const TabPanelDiv = styled.nav`
      display: flex;
      width: 100%;
      > *:not(:last-child){
        margin-right: .2em;
      }
      > *:not(:first-child){
        margin-left: .2em;
      }
`;

const KnappWrapper = styled.div`
  flex: 1 0;
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
