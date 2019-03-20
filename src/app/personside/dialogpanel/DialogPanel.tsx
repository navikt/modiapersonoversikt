import * as React from 'react';
import styled from 'styled-components/macro';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { theme } from '../../../styles/personOversiktTheme';
import { Normaltekst } from 'nav-frontend-typografi';

const border = 'rgba(0, 0, 0, 0.1) 1px solid';

const DialogPanelWrapper = styled.div`
    margin: 0 1em;
    border-top: ${border};
    border-bottom: ${border};
    flex-grow: 1;
    > *:not(:last-child) {
        margin-bottom: ${theme.margin.layout};
    }
`;

function DialogPanel() {
    return (
        <DialogPanelWrapper role="region" aria-label="Dialogpanel">
            <Undertittel>Dialogpanel</Undertittel>
            <Normaltekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Normaltekst>
        </DialogPanelWrapper>
    );
}

export default DialogPanel;
