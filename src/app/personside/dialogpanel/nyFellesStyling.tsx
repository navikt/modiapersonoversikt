import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';
import styled from 'styled-components';
import ErrorBoundary from '../../../components/ErrorBoundary';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import VisuallyHiddenAutoFokusHeader from '../../../components/VisuallyHiddenAutoFokusHeader';
import type { Traad } from '../../../models/meldinger/meldinger';
import theme from '../../../styles/personOversiktTheme';
import Verktoylinje from '../infotabs/meldinger/traadvisning/verktoylinje/Verktoylinje';
import { traadstittel } from '../infotabs/meldinger/utils/meldingerUtils';
import TidligereMeldinger from './fortsettDialog/tidligereMeldinger/TidligereMeldinger';
import GaaTilNesteOppgaveKnapp from './GaaTilNesteOppgaveKnapp';
import Preview from './Preview';
import { SendNyMeldingStatus } from './sendMelding/SendNyMeldingTypes';
import { useSendtMelding } from './useSendtMelding';

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

function DialogpanelFeilmelding() {
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
                    {props.traad && (
                        <Preview
                            fritekst={props.fritekst}
                            tittel={traadstittel(props.traad)}
                            meldingstatus={props.meldingstatus}
                            traad={props.traad}
                        />
                    )}
                </ErrorBoundary>
                {props.meldingstatus !== SendNyMeldingStatus.ERROR && (
                    <ErrorBoundary boundaryName="Sendt melding verktøylinje">
                        <MeldingSendtVerktoyLinje traad={props.traad} />
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
