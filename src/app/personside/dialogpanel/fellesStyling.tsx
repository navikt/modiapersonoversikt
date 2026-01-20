import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';
import styled from 'styled-components';
import ErrorBoundary from '../../../components/ErrorBoundary';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import VisuallyHiddenAutoFokusHeader from '../../../components/VisuallyHiddenAutoFokusHeader';
import type { Traad } from '../../../models/meldinger/meldinger';
import theme, { pxToRem } from '../../../styles/personOversiktTheme';
import Verktoylinje from '../infotabs/meldinger/traadvisning/verktoylinje/Verktoylinje';
import { traadstittel } from '../infotabs/meldinger/utils/meldingerUtils';
import TidligereMeldinger from './fortsettDialog/tidligereMeldinger/TidligereMeldinger';
import GaaTilNesteOppgaveKnapp from './GaaTilNesteOppgaveKnapp';
import Preview from './Preview';
import { SendNyMeldingStatus } from './sendMelding/SendNyMeldingTypes';
import { useSendtMelding } from './useSendtMelding';

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

const DialogpanelKvitteringStyling = styled.div`
    display: flex;
    flex-direction: column;
    > *:not(:first-child) {
        margin-top: 1rem;
    }
    padding: 1rem ${theme.margin.layout};
    ${theme.animation.fadeIn};
`;

const SpinnerWrapper = styled(FillCenterAndFadeIn)`
    box-shadow: none;
    border: ${theme.border.skille};
    padding: 0.5rem;
`;

export function DialogpanelFeilmelding() {
    return <AlertStripeFeil>Det skjedde en feil ved sending av melding</AlertStripeFeil>;
}

const StyledVerktoylinje = styled(Verktoylinje)`
    box-shadow: none;
    border: ${theme.border.skille};
`;

function MeldingSendtVerktoyLinje(props: { traad: Traad | undefined }) {
    const sendtMelding = useSendtMelding(props.traad);

    if (sendtMelding.pending) {
        return (
            <SpinnerWrapper>
                <Panel>
                    <NavFrontendSpinner type="S" />
                </Panel>
            </SpinnerWrapper>
        );
    }

    if (!sendtMelding.traad) {
        return <AlertStripeInfo>Kunne ikke vise journalføring/merk/oppgave-panel</AlertStripeInfo>;
    }
    return <StyledVerktoylinje valgtTraad={sendtMelding.traad} />;
}

function VarselTilBrukerOmStatus(props: { meldingstatus: SendNyMeldingStatus; tittle: string }) {
    if (props.meldingstatus === SendNyMeldingStatus.ERROR) {
        return <DialogpanelFeilmelding />;
    }
    return <AlertStripeSuksess>{props.tittle}</AlertStripeSuksess>;
}

export function DialogpanelKvittering(props: {
    tittel: string;
    fritekst: string;
    lukk: () => void;
    traad?: Traad;
    meldingstatus: SendNyMeldingStatus;
}) {
    return (
        <ErrorBoundary boundaryName="DialogpanelKvittering">
            <DialogpanelKvitteringStyling>
                <VisuallyHiddenAutoFokusHeader tittel={props.tittel} />
                <VarselTilBrukerOmStatus meldingstatus={props.meldingstatus} tittle={props.tittel} />
                {props.traad && props.traad.meldinger.length > 1 && (
                    <ErrorBoundary boundaryName="Tidligere meldinger Dialogpanelkvittering">
                        <TidligereMeldinger traad={props.traad} />
                    </ErrorBoundary>
                )}
                <ErrorBoundary boundaryName="Sendt melding preview">
                    <Preview
                        fritekst={props.fritekst}
                        tittel={props.traad ? traadstittel(props.traad) : props.tittel}
                        meldingstatus={props.meldingstatus}
                        traad={props.traad}
                    />
                </ErrorBoundary>
                {props.meldingstatus !== SendNyMeldingStatus.ERROR && (
                    <ErrorBoundary boundaryName="Sendt melding verktøylinje">
                        <MeldingSendtVerktoyLinje traad={props.traad} />
                    </ErrorBoundary>
                )}
                <KnappBase type="standard" onClick={props.lukk}>
                    {props.meldingstatus !== SendNyMeldingStatus.ERROR ? 'Start ny dialog' : 'Gå tilbake'}
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
