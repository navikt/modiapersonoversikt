import * as React from 'react';
import { FormEvent } from 'react';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Traad, TraadType } from '../../../../models/meldinger/meldinger';
import TidligereMeldinger from './tidligereMeldinger/TidligereMeldinger';
import TekstFelt from '../sendMelding/TekstFelt';
import { UnmountClosed } from 'react-collapse';
import { Hovedknapp } from 'nav-frontend-knapper';
import { DialogpanelFeilmelding, FormStyle } from '../fellesStyling';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import styled from 'styled-components/macro';
import { FortsettDialogValidator } from './validatorer';
import { DialogPanelStatus, FortsettDialogPanelState, FortsettDialogState } from './FortsettDialogTypes';
import { erJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import { capitalizeName } from '../../../../utils/string-utils';
import persondataResource from '../../../../rest/resources/persondataResource';
import { Checkbox, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import Panel from 'nav-frontend-paneler';
import Oppgaveliste from '../sendMelding/Oppgaveliste';
import DialogpanelVelgSak from '../sendMelding/DialogpanelVelgSak';

const SubmitKnapp = styled(Hovedknapp)`
    white-space: normal;
`;

const StyledKnappMedBekreftPopup = styled(KnappMedBekreftPopup)`
    width: 100%;
`;

const StyledAlertStripeInfo = styled(AlertStripeInfo)`
    margin-top: 1rem;
`;

const StyledCheckbox = styled(Checkbox)`
    margin-top: 1rem;
`;

interface Props {
    handleSubmit: (event: FormEvent) => void;
    handleAvbryt: () => void;
    state: FortsettDialogState;
    updateState: (change: Partial<FortsettDialogState>) => void;
    traad: Traad;
    erTilknyttetOppgave: boolean;
    erSTOOppgave: boolean;
    fortsettDialogPanelState: FortsettDialogPanelState;
}

function Feilmelding(props: { status: DialogPanelStatus; errors?: Error[] }) {
    if (props.status === DialogPanelStatus.ERROR) {
        return <DialogpanelFeilmelding />;
    }

    if (props.errors) {
        props.errors.map((error) => {
            return <AlertStripeFeil>{error.message}</AlertStripeFeil>;
        });
    }

    return null;
}

const tekstMaksLengde = 5000;

function FortsettDialog(props: Props) {
    const { state, updateState, handleAvbryt, handleSubmit } = props;
    const personResponse = persondataResource.useFetch();

    const navn = personResponse.data
        ? capitalizeName(personResponse.data.person.navn.firstOrNull()?.fornavn || '')
        : 'bruker';

    const delMedBrukerTekst = props.erTilknyttetOppgave ? `Del med ${navn} og avslutt oppgave` : `Del med ${navn}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    const erOksosTraad = props.traad.meldinger.some((it) => it.temagruppe === 'OKSOS');
    const eksisterendeSaker = props.traad.journalposter.map((jp) => ({
        temaKode: jp.journalfortTema,
        saksId: jp.journalfortSaksid
    }));

    const erSamtalereferat = props.traad.traadType === TraadType.SAMTALEREFERAT;
    const visFeilmelding = !FortsettDialogValidator.sak(state) && state.visFeilmeldinger;
    const visVelgSak = !erJournalfort(props.traad) && !erOksosTraad;

    return (
        <FormStyle onSubmit={handleSubmit}>
            <TidligereMeldinger traad={props.traad} />
            <TekstFelt
                tekst={state.tekst}
                navn={navn}
                tekstMaksLengde={tekstMaksLengde}
                updateTekst={(tekst) => updateState({ tekst: tekst })}
                feilmelding={
                    !FortsettDialogValidator.tekst(state) && state.visFeilmeldinger
                        ? `Du må skrive en tekst på mellom 1 og ${tekstMaksLengde} tegn`
                        : undefined
                }
            />

            <div>
                <UnmountClosed isOpened={!erSamtalereferat}>
                    <Panel>
                        {visVelgSak && (
                            <DialogpanelVelgSak
                                setValgtSak={(sak) => updateState({ sak: sak })}
                                valgtSak={state.sak}
                                visFeilmelding={visFeilmelding}
                                eksisterendeSaker={eksisterendeSaker}
                            />
                        )}

                        {visVelgSak && visFeilmelding && (
                            <SkjemaelementFeilmelding>Du må velge sak </SkjemaelementFeilmelding>
                        )}

                        {!state.avsluttet ? (
                            <Oppgaveliste
                                oppgaveliste={state.oppgaveListe}
                                setOppgaveliste={(oppgaveliste) => updateState({ oppgaveListe: oppgaveliste })}
                            />
                        ) : (
                            <StyledAlertStripeInfo>Bruker kan ikke skrive mer i denne samtalen</StyledAlertStripeInfo>
                        )}
                        <StyledCheckbox
                            label={'Avslutt samtale etter sending'}
                            checked={state.avsluttet}
                            onChange={() => updateState({ avsluttet: !state.avsluttet })}
                        />
                    </Panel>
                </UnmountClosed>
            </div>
            <Feilmelding status={props.fortsettDialogPanelState.type} errors={props.state.errors} />
            <SubmitKnapp htmlType="submit" spinner={props.fortsettDialogPanelState.type === DialogPanelStatus.POSTING}>
                {delMedBrukerTekst}
            </SubmitKnapp>
            {!props.erTilknyttetOppgave && (
                <StyledKnappMedBekreftPopup
                    htmlType="reset"
                    type="flat"
                    onBekreft={handleAvbryt}
                    bekreftKnappTekst={'Ja, avbryt'}
                    popUpTekst="Er du sikker på at du vil avbryte? Du mister da meldinger du har påbegynt."
                >
                    Avbryt
                </StyledKnappMedBekreftPopup>
            )}
        </FormStyle>
    );
}

export default FortsettDialog;
