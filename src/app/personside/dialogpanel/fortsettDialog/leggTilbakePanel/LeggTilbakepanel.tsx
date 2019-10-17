import * as React from 'react';
import { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import { Radio, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { UnmountClosed } from 'react-collapse';
import Temavelger from '../../component/Temavelger';
import { LeggTilbakeValidator } from './validatorer';
import { useDispatch } from 'react-redux';
import { useRestResource } from '../../../../../utils/customHooks';
import { Oppgave } from '../../../../../models/oppgave';
import theme from '../../../../../styles/personOversiktTheme';
import { Temagruppe, TemaPlukkbare } from '../../../../../models/Temagrupper';
import { isFailedPosting, isPosting } from '../../../../../rest/utils/postResource';
import { LeggTilbakeOppgaveFeil } from '../FortsettDialogKvittering';

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
    margin: ${theme.margin.layout};
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
    oppgave: Oppgave;
    temagruppe: Temagruppe;
}
function LeggTilbakeFeilmelding() {
    const leggTilbakeResource = useRestResource(resources => resources.leggTilbakeOppgave);

    if (isFailedPosting(leggTilbakeResource)) {
        return <LeggTilbakeOppgaveFeil resource={leggTilbakeResource} />;
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
    const leggTilbakeResource = useRestResource(resources => resources.leggTilbakeOppgave);
    const resetPlukkOppgaveResource = useRestResource(resources => resources.plukkNyeOppgaver.actions.reset);
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver.actions.reload);
    const leggerTilbake = isPosting(leggTilbakeResource);

    function ÅrsakRadio(props: { årsak: LeggTilbakeÅrsak }) {
        return (
            <Radio
                label={props.årsak}
                checked={props.årsak === state.årsak}
                onChange={() => updateState({ årsak: props.årsak })}
                name="årsak"
            />
        );
    }

    const handleLeggTilbake = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (leggerTilbake) {
            return;
        }
        const callback = () => {
            dispatch(resetPlukkOppgaveResource);
            dispatch(reloadTildelteOppgaver);
        };
        if (LeggTilbakeValidator.erGyldigInnhabilRequest(state)) {
            dispatch(
                leggTilbakeResource.actions.post({ oppgaveId: props.oppgave.oppgaveid, type: 'Innhabil' }, callback)
            );
        } else if (LeggTilbakeValidator.erGyldigAnnenAarsakRequest(state)) {
            dispatch(
                leggTilbakeResource.actions.post(
                    {
                        beskrivelse: state.tekst,
                        oppgaveId: props.oppgave.oppgaveid,
                        type: 'AnnenAarsak'
                    },
                    callback
                )
            );
        } else if (LeggTilbakeValidator.erGyldigFeilTemaRequest(state) && state.temagruppe) {
            dispatch(
                leggTilbakeResource.actions.post(
                    {
                        temagruppe: state.temagruppe,
                        oppgaveId: props.oppgave.oppgaveid,
                        type: 'FeilTema'
                    },
                    callback
                )
            );
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    return (
        <StyledEkspanderbartpanel tittel="Legg tilbake" border={true} tittelProps="normaltekst">
            <Style>
                <StyledSkjemaGruppe
                    feil={
                        !LeggTilbakeValidator.aarsak(state) && state.visFeilmeldinger
                            ? { feilmelding: 'Velg årsak' }
                            : undefined
                    }
                >
                    <legend className="sr-only">Velg årsak</legend>
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.Innhabil} />
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.FeilTemagruppe} />
                    <UnmountClosed isOpened={state.årsak === LeggTilbakeÅrsak.FeilTemagruppe} hasNestedCollapse={true}>
                        {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                        <Temavelger
                            setTema={tema => updateState({ temagruppe: tema })}
                            valgtTema={state.temagruppe}
                            visFeilmelding={!LeggTilbakeValidator.tema(state) && state.visFeilmeldinger}
                            temavalg={TemaPlukkbare.filter(tema => tema !== props.temagruppe)}
                        />
                    </UnmountClosed>
                    <ÅrsakRadio årsak={LeggTilbakeÅrsak.AnnenÅrsak} />
                    <UnmountClosed isOpened={state.årsak === LeggTilbakeÅrsak.AnnenÅrsak} hasNestedCollapse={true}>
                        {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                        <StyledSkjemaGruppe
                            feil={
                                !LeggTilbakeValidator.tekst(state) && state.visFeilmeldinger
                                    ? { feilmelding: 'Du må skrive en årsak' }
                                    : undefined
                            }
                        >
                            <Textarea
                                label="Årsak"
                                value={state.tekst}
                                onChange={e =>
                                    updateState({
                                        tekst: (e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value
                                    })
                                }
                            />
                        </StyledSkjemaGruppe>
                    </UnmountClosed>
                </StyledSkjemaGruppe>
                <LeggTilbakeFeilmelding />
                <Hovedknapp htmlType="button" spinner={leggerTilbake} onClick={handleLeggTilbake}>
                    Legg tilbake
                </Hovedknapp>
            </Style>
        </StyledEkspanderbartpanel>
    );
}

export default LeggTilbakepanel;
