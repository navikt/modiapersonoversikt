import * as React from 'react';
import styled from 'styled-components';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { theme } from '../../../styles/personOversiktTheme';

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
        <DialogPanelWrapper>
            <Undertittel>Dialogpanel</Undertittel>
            <Undertekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Undertekst>
            <Undertekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Undertekst>
            <Undertekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Undertekst>
            <Undertekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Undertekst>
            <Undertekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Undertekst>
            <Undertekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Undertekst>
            <Undertekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Undertekst>
        </DialogPanelWrapper>
    );
}

export default DialogPanel;
