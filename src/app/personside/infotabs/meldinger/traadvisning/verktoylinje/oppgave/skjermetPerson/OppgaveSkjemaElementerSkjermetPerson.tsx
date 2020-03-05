import React from 'react';
import { Select, Textarea } from 'nav-frontend-skjema';
import { OppgaveProps, SkjermetPersonOppgaveSkjemaProps } from '../oppgaveInterfaces';
import { hentValgtOppgavetype, hentValgtTema, hentValgtUnderkategori } from '../oppgaveUtils';
import { OppgavetypeOptions, Prioriteter, TemaOptions, UnderkategoriOptions } from '../SkjemaElementOptions';

export function OppgaveSkjemaElementerSkjermetPerson(props: OppgaveProps & { form: SkjermetPersonOppgaveSkjemaProps }) {
    const valgtTema = props.form.state.valgtTema;

    return (
        <>
            <Select
                feil={
                    props.form.valideringsResultat.felter.valgtTema &&
                    props.form.valideringsResultat.felter.valgtTema.skjemafeil
                }
                autoFocus={true}
                label={'Tema'}
                onChange={event => props.form.actions.oppdaterStateVedValgtTema(hentValgtTema(props.gsakTema, event))}
                value={(props.form.state.valgtTema && props.form.state.valgtTema.kode) || ''}
            >
                <TemaOptions gsakTema={props.gsakTema} />
            </Select>
            <Select
                label={'Gjelder'}
                onChange={event => props.form.actions.settValgtUnderkategori(hentValgtUnderkategori(event, valgtTema))}
                value={(props.form.state.valgtUnderkategori && props.form.state.valgtUnderkategori.kode) || ''}
            >
                <UnderkategoriOptions valgtGsakTema={valgtTema} />
            </Select>
            <Select
                feil={
                    props.form.valideringsResultat.felter.valgtOppgavetype &&
                    props.form.valideringsResultat.felter.valgtOppgavetype.skjemafeil
                }
                label={'Type oppgave'}
                onChange={event => props.form.actions.settValgtOppgavetype(hentValgtOppgavetype(event, valgtTema))}
                value={(props.form.state.valgtOppgavetype && props.form.state.valgtOppgavetype.kode) || ''}
            >
                <OppgavetypeOptions valgtGsakTema={valgtTema} />
            </Select>
            <Select
                value={props.form.state.valgtPrioritet || ''}
                label={'Velg prioritet'}
                onChange={event => props.form.actions.settValgtPrioritet(event.target.value)}
                feil={props.form.valideringsResultat.felter.valgtPrioritet?.skjemafeil}
            >
                <Prioriteter valgtGsakTeam={valgtTema} />
            </Select>
            <Textarea
                feil={props.form.valideringsResultat.felter.beskrivelse.skjemafeil}
                maxLength={0}
                value={props.form.state.beskrivelse}
                label={'Beskrivelse'}
                onChange={e =>
                    props.form.actions.settBeskrivelse(
                        (e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value
                    )
                }
            />
        </>
    );
}
