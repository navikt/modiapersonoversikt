import styled from 'styled-components/macro';
import { pxToRem, theme } from '../../../styles/personOversiktTheme';
import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import VisuallyHiddenAutoFokusHeader from '../../../components/VisuallyHiddenAutoFokusHeader';
import Preview from './Preview';
import { Meldingstype, Traad } from '../../../models/meldinger/meldinger';
import { meldingstypeTekst } from '../infotabs/meldinger/utils/meldingstekster';
import Verktoylinje from '../infotabs/meldinger/traadvisning/verktoylinje/Verktoylinje';
import NavFrontendSpinner from 'nav-frontend-spinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import { useSendtMelding } from './useSendtMelding';
import GaaTilNesteOppgaveKnapp from './GaaTilNesteOppgaveKnapp';
import TidligereMeldinger from './fortsettDialog/tidligereMeldinger/TidligereMeldinger';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { SendNyMeldingStatus } from './sendMelding/SendNyMeldingTypes';

export const FormStyle = styled.form`
    display: flex;
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
    box-shadow: none;
    border: ${theme.border.skille};
    padding: 0.5rem;
`;

export function DialogpanelFeilmelding() {
    return <AlertStripeFeil>Det skjedde en feil ved sending av melding</AlertStripeFeil>;
}

const StyledVerktøylinje = styled(Verktoylinje)`
    box-shadow: none;
    border: ${theme.border.skille};
`;

function MeldingSendtVerktoyLinje(props: { fritekst: string }) {
    const sendtMelding = useSendtMelding(props.fritekst);

    if (sendtMelding.pending) {
        return (
            <SpinnerWrapper>
                <NavFrontendSpinner type="S" />
            </SpinnerWrapper>
        );
    }

    if (!sendtMelding.traad) {
        return <AlertStripeInfo>Kunne ikke vise journalføring/merk/oppgave-panel</AlertStripeInfo>;
    }
    return <StyledVerktøylinje valgtTraad={sendtMelding.traad} />;
}

function VarselTilBrukerOmStatus(props: { meldingstatus?: SendNyMeldingStatus; tittle: string }) {
    if (props.meldingstatus && props.meldingstatus === SendNyMeldingStatus.ERROR) return <DialogpanelFeilmelding />;
    else return <AlertStripeSuksess>{props.tittle}</AlertStripeSuksess>;
}

export function DialogpanelKvittering(props: {
    tittel: string;
    fritekst: string;
    meldingstype: Meldingstype;
    lukk: () => void;
    traad?: Traad;
    meldingstatus: SendNyMeldingStatus;
}) {
    return (
        <ErrorBoundary boundaryName="DialogpanelKvittering">
            <DialogpanelKvitteringStyling>
                <VisuallyHiddenAutoFokusHeader tittel={props.tittel} />
                <VarselTilBrukerOmStatus meldingstatus={props.meldingstatus} tittle={props.tittel} />
                {props.traad && (
                    <ErrorBoundary boundaryName="Tidligere meldinger Dialogpanelkvittering">
                        <TidligereMeldinger traad={props.traad} />
                    </ErrorBoundary>
                )}
                <ErrorBoundary boundaryName="Sendt melding preview">
                    <Preview
                        fritekst={props.fritekst}
                        tittel={meldingstypeTekst(props.meldingstype)}
                        meldingstatus={props.meldingstatus}
                    />
                </ErrorBoundary>
                {props.meldingstatus !== SendNyMeldingStatus.ERROR && (
                    <ErrorBoundary boundaryName="Sendt melding verktøylinje">
                        <MeldingSendtVerktoyLinje fritekst={props.fritekst} />
                    </ErrorBoundary>
                )}
                <KnappBase type="standard" onClick={props.lukk}>
                    Start ny dialog
                </KnappBase>
                <GaaTilNesteOppgaveKnapp lukk={props.lukk} />
            </DialogpanelKvitteringStyling>
        </ErrorBoundary>
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

export const KategoriSkille = styled.div`
    background-color: ${theme.color.kategori};
    padding: 0.2rem ${pxToRem(15)};
`;
