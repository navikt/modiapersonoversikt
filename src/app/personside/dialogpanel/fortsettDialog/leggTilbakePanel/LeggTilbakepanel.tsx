import * as React from 'react';
import { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components/macro';
import { Radio, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { UnmountClosed } from 'react-collapse';
import Temavelger from '../../component/Temavelger';
import { LeggTilbakeValidator } from './validatorer';
import { useDispatch } from 'react-redux';
import { LeggTilbakeOppgaveRequest } from '../../../../../models/leggTilbakeOppgave';
import { Temagruppe, TemaLeggTilbake } from '../../../../../models/temagrupper';
import { apiBaseUri } from '../../../../../api/config';
import { post } from '../../../../../api/api';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { DialogPanelStatus, FortsettDialogPanelState } from '../FortsettDialogTypes';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import { useAppState } from '../../../../../utils/customHooks';
import { selectValgtEnhet } from '../../../../../redux/session/session';
export interface LeggTilbakeState {
    årsak?: LeggTilbakeÅrsak;
    temagruppe?: Temagruppe;
    tekst: string;
    visFeilmeldinger: boolean;
}

export enum LeggTilbakeÅrsak {
    Innhabil = 'Innhabil',
    FeilTemagruppe = 'Feil temagruppe',
    AnnenÅrsak = 'Annen årsak'
}

const StyledEkspanderbartpanel = styled(Ekspanderbartpanel)`
    .ekspanderbartPanel__hode {
        padding: 0.6rem;
    }
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    > *:not(:first-child) {
        margin-top: 0.3rem;
    }
    margin-bottom: 1rem;
`;

const Style = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        margin-top: 0.5rem;
    }
`;

interface Props {
    oppgaveId: string;
    traadId: string;
    temagruppe?: Temagruppe | null;
    status: FortsettDialogPanelState;
    setDialogStatus: (status: FortsettDialogPanelState) => void;
}

function LeggTilbakeFeilmelding(props: { status: FortsettDialogPanelState }) {
    if (props.status.type === DialogPanelStatus.ERROR) {
        return <AlertStripeFeil>Det skjedde en feil ved tilbakelegging av oppgave</AlertStripeFeil>;
    }
    return null;
}

function LeggTilbakepanel(props: Props) {
    const [state, setState] = useState<LeggTilbakeState>({
        årsak: undefined,
        tekst: '',
        temagruppe: undefined,
        visFeilmeldinger: false
    });
    const updateState = (change: Partial<LeggTilbakeState>) =>
        setState({ ...state, visFeilmeldinger: false, ...change });
    const dispatch = useDispatch();
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver).actions.reload;
    const valgtEnhet = useAppState(selectValgtEnhet);
    const leggerTilbake = props.status.type === DialogPanelStatus.POSTING;

    function ÅrsakRadio(props: { årsak: LeggTilbakeÅrsak; label?: string }) {
        return (
            <Radio
                label={props.label ?? props.årsak}
                checked={props.årsak === state.årsak}
                onChange={() => updateState({ årsak: props.årsak })}
                name="årsak"
            />
        );
    }

    const handleLeggTilbake = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (props.status.type === DialogPanelStatus.POSTING) {
            return;
        }
        const callback = () => {
            dispatch(reloadTildelteOppgaver);
        };
        if (LeggTilbakeValidator.erGyldigInnhabilRequest(state)) {
            props.setDialogStatus({ type: DialogPanelStatus.POSTING });
            const payload: LeggTilbakeOppgaveRequest = {
                enhet: valgtEnhet,
                oppgaveId: props.oppgaveId,
                type: 'Innhabil'
            };
            post(`${apiBaseUri}/oppgaver/legg-tilbake`, payload, 'LeggTilbakeOppgave-Innhabil')
                .then(() => {
                    callback();
                    props.setDialogStatus({ type: DialogPanelStatus.OPPGAVE_LAGT_TILBAKE, payload: payload });
                })
                .catch(() => {
                    props.setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else if (LeggTilbakeValidator.erGyldigAnnenAarsakRequest(state)) {
            props.setDialogStatus({ type: DialogPanelStatus.POSTING });
            const payload: LeggTilbakeOppgaveRequest = {
                enhet: valgtEnhet,
                beskrivelse: state.tekst,
                oppgaveId: props.oppgaveId,
                type: 'AnnenAarsak'
            };
            post(`${apiBaseUri}/oppgaver/legg-tilbake`, payload, 'LeggTilbakeOppgave-AnnenÅrsak')
                .then(() => {
                    callback();
                    props.setDialogStatus({ type: DialogPanelStatus.OPPGAVE_LAGT_TILBAKE, payload: payload });
                })
                .catch(() => {
                    props.setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else if (LeggTilbakeValidator.erGyldigFeilTemaRequest(state) && state.temagruppe) {
            props.setDialogStatus({ type: DialogPanelStatus.POSTING });
            const payload: LeggTilbakeOppgaveRequest = {
                enhet: valgtEnhet,
                temagruppe: state.temagruppe,
                oppgaveId: props.oppgaveId,
                traadId: props.traadId,
                type: 'FeilTema'
            };
            post(`${apiBaseUri}/oppgaver/legg-tilbake`, payload, 'LeggTilbakeOppgave-FeilTema')
                .then(() => {
                    props.setDialogStatus({ type: DialogPanelStatus.OPPGAVE_LAGT_TILBAKE, payload: payload });
                    callback();
                })
                .catch(() => {
                    props.setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    return (
        <StyledEkspanderbartpanel tittel={<Normaltekst>Legg tilbake</Normaltekst>} border={true}>
            <Style>
                <StyledSkjemaGruppe
                    feil={
                        !LeggTilbakeValidator.aarsak(state) && state.visFeilmeldinger ? (
                            <SkjemaelementFeilmelding>Velg årsak</SkjemaelementFeilmelding>
                        ) : (
                            undefined
                        )
                    }
                >
                    <legend className="sr-only">Velg årsak</legend>
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.Innhabil} label="Inhabil" />
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.FeilTemagruppe} />
                    <UnmountClosed isOpened={state.årsak === LeggTilbakeÅrsak.FeilTemagruppe}>
                        {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                        <Temavelger
                            setTema={tema => updateState({ temagruppe: tema })}
                            valgtTema={state.temagruppe}
                            visFeilmelding={!LeggTilbakeValidator.tema(state) && state.visFeilmeldinger}
                            temavalg={TemaLeggTilbake}
                        />
                    </UnmountClosed>
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.AnnenÅrsak} />
                    <UnmountClosed isOpened={state.årsak === LeggTilbakeÅrsak.AnnenÅrsak}>
                        {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                        <StyledSkjemaGruppe
                            feil={
                                !LeggTilbakeValidator.tekst(state) && state.visFeilmeldinger ? (
                                    <SkjemaelementFeilmelding>Du må skrive en årsak</SkjemaelementFeilmelding>
                                ) : (
                                    undefined
                                )
                            }
                        >
                            <Textarea
                                maxLength={0}
                                label="Årsak"
                                value={state.tekst}
                                onChange={e =>
                                    updateState({
                                        tekst: e.currentTarget.value
                                    })
                                }
                            />
                        </StyledSkjemaGruppe>
                    </UnmountClosed>
                </StyledSkjemaGruppe>
                <LeggTilbakeFeilmelding status={props.status} />
                <Hovedknapp htmlType="button" spinner={leggerTilbake} onClick={handleLeggTilbake}>
                    Legg tilbake
                </Hovedknapp>
            </Style>
        </StyledEkspanderbartpanel>
    );
}

export default LeggTilbakepanel;
