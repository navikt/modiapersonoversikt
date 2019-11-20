import styled from 'styled-components';
import { theme } from '../../../styles/personOversiktTheme';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import VisuallyHiddenAutoFokusHeader from '../../../components/VisuallyHiddenAutoFokusHeader';
import Preview from './Preview';
import { Meldingstype } from '../../../models/meldinger/meldinger';
import { meldingstypeTekst } from '../infotabs/meldinger/utils/meldingstekster';
import { useDispatch } from 'react-redux';
import useTildelteOppgaver from '../../../utils/hooks/useTildelteOppgaver';
import { setValgtTraadDialogpanel } from '../../../redux/oppgave/actions';
import { useRestResource } from '../../../utils/customHooks';
import { hasData, isLoading } from '../../../rest/utils/restResource';
import Verktoylinje from '../infotabs/meldinger/traadvisning/verktoylinje/Verktoylinje';
import { erSammefritekstSomNyesteMeldingITraad } from '../infotabs/meldinger/utils/meldingerUtils';
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
    display: flex;
    flex-direction: column;
    > *:not(:first-child) {
        margin-top: 1rem;
    }
    padding: 1rem ${theme.margin.layout};
    ${theme.animation.fadeIn};
`;

export function DialogpanelFeilmelding() {
    return <AlertStripeFeil>Det skjedde en feil ved sending av melding</AlertStripeFeil>;
}
function Verktøylinje(props: { fritekst: string }) {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const traader = hasData(traaderResource) ? traaderResource.data : [];
    const sisteTraad = traader[0];
    const erRiktigMelding = erSammefritekstSomNyesteMeldingITraad(sisteTraad, props.fritekst);

    if (isLoading(traaderResource)) {
        return <LazySpinner />;
    }

    return <>{erRiktigMelding && <Verktoylinje valgtTraad={sisteTraad} skjulSkrivUt={true} />}</>;
}
export function DialogpanelKvittering(props: {
    tittel: string;
    fritekst: string;
    meldingstype: Meldingstype;
    lukk: () => void;
}) {
    const tildelteOppgaver = useTildelteOppgaver();
    const dispatch = useDispatch();
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);

    const nesteOppgavePåBruker = tildelteOppgaver.paaBruker[0];
    const gaaTilNesteSporsmaal = () => {
        if (!nesteOppgavePåBruker || !hasData(traaderResource)) {
            return;
        }
        const traadTilknyttetOppgave = traaderResource.data.find(
            traad => traad.traadId === nesteOppgavePåBruker.traadId
        );
        if (!traadTilknyttetOppgave) {
            return;
        }
        props.lukk();
        dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
    };
    return (
        <DialogpanelKvitteringStyling>
            <VisuallyHiddenAutoFokusHeader tittel={props.tittel} />
            <AlertStripeSuksess>{props.tittel}</AlertStripeSuksess>
            <Verktøylinje fritekst={props.fritekst} />
            <Preview fritekst={props.fritekst} tittel={meldingstypeTekst(props.meldingstype)} />
            <KnappBase type="standard" onClick={props.lukk}>
                Start ny dialog
            </KnappBase>
            {nesteOppgavePåBruker && (
                <KnappBase type="standard" onClick={gaaTilNesteSporsmaal}>
                    Gå til neste spørsmål
                </KnappBase>
            )}
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
