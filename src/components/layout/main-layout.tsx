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
        flex-flow: row nowrap;
        padding: 1%;
    `;

    const boxShaddow = 'box-shadow: 0 0.2em 1.5em rgba(150, 150, 150, 0.7);';

    const OversiktsPanel = styled.div`
        > * {
          ${boxShaddow}
        }
        flex: 1 0 70%;
        margin-right: 1%;
    `;

    const DialogPanel = styled.div`
        ${boxShaddow}
        flex: 1 0 29%;
    `;

    return (
        <Wrapper className={'main-layout'}>
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
