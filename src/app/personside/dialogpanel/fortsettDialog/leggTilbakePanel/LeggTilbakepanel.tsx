import * as React from 'react';
import { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import { Radio, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { Kodeverk } from '../../../../../models/kodeverk';
import { UnmountClosed } from 'react-collapse';
import Temavelger from '../../component/Temavelger';
import { LeggTilbakeValidator } from './validatorer';
import { useDispatch } from 'react-redux';
import { useRestResource } from '../../../../../utils/customHooks';
import { Oppgave } from '../../../../../models/oppgave';
import theme from '../../../../../styles/personOversiktTheme';

export interface LeggTilbakeState {
    årsak?: LeggTilbakeÅrsak;
    tema?: Kodeverk;
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
}

function LeggTilbakepanel(props: Props) {
    const [state, setState] = useState<LeggTilbakeState>({
        årsak: undefined,
        tekst: '',
        tema: undefined,
        visFeilmeldinger: false
    });
    const updateState = (change: Partial<LeggTilbakeState>) =>
        setState({ ...state, visFeilmeldinger: false, ...change });
    const dispatch = useDispatch();
    const leggTilbakeResource = useRestResource(resources => resources.leggTilbakeOppgave);

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
        if (LeggTilbakeValidator.erGyldigInnhabilRequest(state)) {
            dispatch(leggTilbakeResource.actions.post({ oppgaveId: props.oppgave.oppgaveid, type: 'innhabil' }));
        } else if (LeggTilbakeValidator.erGyldigAnnenAarsakRequest(state)) {
            dispatch(
                leggTilbakeResource.actions.post({
                    beskrivelse: state.tekst,
                    oppgaveId: props.oppgave.oppgaveid,
                    type: 'annenaarsak'
                })
            );
        } else if (LeggTilbakeValidator.erGyldigFeilTemaRequest(state) && state.tema) {
            dispatch(
                leggTilbakeResource.actions.post({
                    temagruppe: state.tema.kodeRef,
                    oppgaveId: props.oppgave.oppgaveid,
                    type: 'feiltema'
                })
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
                            setTema={tema => updateState({ tema: tema })}
                            tema={state.tema}
                            visFeilmelding={!LeggTilbakeValidator.tema(state) && state.visFeilmeldinger}
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
                <Hovedknapp htmlType="button" onClick={handleLeggTilbake}>
                    Legg tilbake
                </Hovedknapp>
            </Style>
        </StyledEkspanderbartpanel>
    );
}

export default LeggTilbakepanel;
