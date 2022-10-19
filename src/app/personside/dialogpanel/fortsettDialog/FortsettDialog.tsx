import * as React from 'react';
import { FormEvent } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Meldingstype, Traad } from '../../../../models/meldinger/meldinger';
import TidligereMeldinger from './tidligereMeldinger/TidligereMeldinger';
import VelgDialogType from './VelgDialogType';
import TekstFelt from '../sendMelding/TekstFelt';
import { UnmountClosed } from 'react-collapse';
import { Hovedknapp } from 'nav-frontend-knapper';
import { DialogpanelFeilmelding, FormStyle } from '../fellesStyling';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import BrukerKanSvare from './BrukerKanSvare';
import styled from 'styled-components/macro';
import { FortsettDialogValidator } from './validatorer';
import { DialogPanelStatus, FortsettDialogPanelState, FortsettDialogState } from './FortsettDialogTypes';
import {
    eldsteMelding,
    erJournalfort,
    erMeldingstypeSamtalereferat
} from '../../infotabs/meldinger/utils/meldingerUtils';
import { capitalizeName } from '../../../../utils/string-utils';
import persondataResource from '../../../../rest/resources/persondataResource';

const SubmitKnapp = styled(Hovedknapp)`
    white-space: normal;
    margin-top: 1rem;
`;

const StyledKnappMedBekreftPopup = styled(KnappMedBekreftPopup)`
    width: 100%;
`;

const Margin = styled.div`
    /* Pga React Collapse må vi slenge på noen div'er som tar seg av marginer for å unngå hopp i animasjon */
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

function Feilmelding(props: { status: DialogPanelStatus }) {
    if (props.status === DialogPanelStatus.ERROR) {
        return <DialogpanelFeilmelding />;
    }
    return null;
}

function useVarselInfotekst(meldingstype: Meldingstype): string {
    return meldingstype === Meldingstype.SVAR_SKRIFTLIG
        ? 'Gir varsel, dialogen avsluttes. Det er ikke mulig å sende flere meldinger i denne dialogen i ettertid.'
        : 'Gir varsel, bruker kan svare.';
}

export const tekstMaksLengde = 5000;

function FortsettDialog(props: Props) {
    const { state, updateState, handleAvbryt, handleSubmit } = props;
    const personResponse = persondataResource.useFetch();

    const navn = personResponse.data
        ? capitalizeName(personResponse.data.person.navn.firstOrNull()?.fornavn || '')
        : 'bruker';

    const delMedBrukerTekst = props.erTilknyttetOppgave ? `Del med ${navn} og avslutt oppgave` : `Del med ${navn}`;
    const erOksosTraad = props.traad.meldinger.some((it) => it.temagruppe === 'OKSOS');
    const eksisterendeSaker = props.traad.journalposter.map((jp) => ({
        temaKode: jp.journalfortTema,
        saksId: jp.journalfortSaksid
    }));
    const varselInfotekst = useVarselInfotekst(state.dialogType);

    const melding = eldsteMelding(props.traad);
    const erSamtalereferat = erMeldingstypeSamtalereferat(melding.meldingstype);
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
            <VelgDialogType
                formState={state}
                updateDialogType={(dialogType) => updateState({ dialogType: dialogType })}
                erTilknyttetOppgave={props.erTilknyttetOppgave}
                erSTOOppgave={props.erSTOOppgave}
                erOksosTraad={erOksosTraad}
                erSamtalereferat={erSamtalereferat}
            />
            <Margin>
                <UnmountClosed isOpened={!erSamtalereferat}>
                    <AlertStripeInfo>{varselInfotekst}</AlertStripeInfo>
                    <BrukerKanSvare
                        formState={state}
                        updateFormState={updateState}
                        visVelgSak={
                            !erJournalfort(props.traad) &&
                            !erOksosTraad &&
                            state.dialogType === Meldingstype.SPORSMAL_MODIA_UTGAAENDE
                        }
                        eksisterendeSaker={eksisterendeSaker}
                    />
                </UnmountClosed>
            </Margin>
            <Feilmelding status={props.fortsettDialogPanelState.type} />
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
