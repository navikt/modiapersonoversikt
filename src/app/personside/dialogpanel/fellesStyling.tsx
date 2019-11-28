import styled from 'styled-components';
import { theme } from '../../../styles/personOversiktTheme';
import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
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
import { hasData } from '../../../rest/utils/restResource';
import Verktoylinje from '../infotabs/meldinger/traadvisning/verktoylinje/Verktoylinje';
import NavFrontendSpinner from 'nav-frontend-spinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import { useSentMelding } from './useSendtMelding';

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
const SpinnerWrapper = styled(FillCenterAndFadeIn)`
    ${theme.hvittPanel};
    padding: 0.5rem;
`;

export function DialogpanelFeilmelding() {
    return <AlertStripeFeil>Det skjedde en feil ved sending av melding</AlertStripeFeil>;
}

function MeldingSendtVerktoyLinje(props: { fritekst: string }) {
    const sentMelding = useSentMelding(props.fritekst);

    if (sentMelding.pending) {
        return (
            <SpinnerWrapper>
                <NavFrontendSpinner type="S" />
            </SpinnerWrapper>
        );
    }

    if (!sentMelding.traad) {
        return <AlertStripeInfo>Feil ved lasting av journalføring/merk/oppgave</AlertStripeInfo>;
    }
    return <Verktoylinje valgtTraad={sentMelding.traad} skjulSkrivUt={true} />;
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

    const sentMelding = useSentMelding(props.fritekst);
    const opprettetDato = sentMelding.melding ? sentMelding.melding.opprettetDato : undefined;

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
            <Preview
                opprettetDato={opprettetDato}
                fritekst={props.fritekst}
                tittel={meldingstypeTekst(props.meldingstype)}
            />
            <MeldingSendtVerktoyLinje fritekst={props.fritekst} />
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
