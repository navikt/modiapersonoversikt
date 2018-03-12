import * as React from 'react';
import styled from 'styled-components';

interface MainLayoutProps {
    oversikt: object;
    dialogpanel: object;
}

function MainLayout(props: MainLayoutProps) {

    const Wrapper = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 1%;
        box-sizing: border-box;
    `;

    const boxShaddow = 'box-shadow: 0 0.2em 1.5em #999;';

    const float = 'float: right;';

    const panelStyling = `
        ${boxShaddow}
        ${float}
    `;

    const OversiktsPanel = styled.div`
        ${panelStyling}
        width: 70%;
        margin-right: 1%;
    `;

    const DialogPanel = styled.div`
        ${panelStyling}
        width: 29%;
    `;

    return (
        <Wrapper>
            <OversiktsPanel>
                {props.oversikt}
            </OversiktsPanel>
            <DialogPanel>
                {props.dialogpanel}
            </DialogPanel>
        </Wrapper>
    );
}

export default MainLayout;
