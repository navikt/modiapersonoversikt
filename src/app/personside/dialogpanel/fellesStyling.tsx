import styled from 'styled-components';
import { theme } from '../../../styles/personOversiktTheme';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import VisuallyHiddenAutoFokusHeader from '../../../components/VisuallyHiddenAutoFokusHeader';
import Preview from './Hurtigreferat/Preview';
import { Meldingstype } from '../../../models/meldinger/meldinger';
import { meldingstypeTekst } from '../infotabs/meldinger/utils/meldingstekster';
import { FailedPostResource } from '../../../rest/utils/postResource';
import { useDispatch } from 'react-redux';

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

export function DialogpanelFeilmelding(props: { resource: FailedPostResource<any, {}> }) {
    const dispatch = useDispatch();
    return (
        <DialogpanelKvitteringStyling>
            <AlertStripeFeil>Det skjedde en feil ved sending av melding: {props.resource.error}</AlertStripeFeil>
            <KnappBase type="standard" onClick={() => dispatch(props.resource.actions.reset)}>
                Lukk
            </KnappBase>
        </DialogpanelKvitteringStyling>
    );
}

export function DialogpanelKvittering(props: {
    tittel: string;
    fritekst: string;
    meldingstype: Meldingstype;
    lukk: () => void;
}) {
    return (
        <DialogpanelKvitteringStyling>
            <VisuallyHiddenAutoFokusHeader tittel={props.tittel} />
            <AlertStripeSuksess>{props.tittel}</AlertStripeSuksess>
            <Preview fritekst={props.fritekst} tittel={meldingstypeTekst(props.meldingstype)} />
            <KnappBase type="standard" onClick={props.lukk}>
                Start ny dialog
            </KnappBase>
        </DialogpanelKvitteringStyling>
    );
}

export const VelgDialogtypeStyle = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    > * {
        margin-top: 0.3rem;
    }
    > *:not(:last-child) {
        margin-right: 1rem;
    }
`;
