import styled from 'styled-components';
import { theme } from '../../../styles/personOversiktTheme';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import LazySpinner from '../../../components/LazySpinner';

export const FormStyle = styled.form`
    display: flex;
    margin-top: 1rem;
    flex-direction: column;
    align-items: stretch;
    .skjemaelement {
        margin-bottom: 0;
    }
    > * {
        margin-bottom: 1rem;
    }
`;

export const DialogpanelKvitteringStyling = styled.div`
    > *:not(:first-child) {
        margin-top: 1rem;
    }
    padding: 1rem ${theme.margin.layout};
    ${theme.animation.fadeIn};
`;

const CenterSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export function DialogpanelSpinner() {
    return (
        <CenterSpinner>
            <LazySpinner delay={100} type="XL" />
        </CenterSpinner>
    );
}

export function DialogpanelFeilmelding(props: { errormessage: string; lukk: () => void }) {
    return (
        <DialogpanelKvitteringStyling>
            <AlertStripeFeil>Det skjedde en feil ved sending av melding: {props.errormessage}</AlertStripeFeil>
            <KnappBase type="standard" onClick={props.lukk}>
                Lukk
            </KnappBase>
        </DialogpanelKvitteringStyling>
    );
}
