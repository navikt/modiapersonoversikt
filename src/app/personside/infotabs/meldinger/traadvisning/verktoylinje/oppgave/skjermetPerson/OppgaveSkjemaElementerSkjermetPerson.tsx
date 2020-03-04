import React, { ChangeEvent } from 'react';
import { Select, Textarea } from 'nav-frontend-skjema';
import { GsakTema, GsakTemaOppgavetype, GsakTemaUnderkategori } from '../../../../../../../../models/meldinger/oppgave';
import { OppgaveProps, SkjermetPersonOppgaveSkjemaProps } from '../oppgaveInterfaces';

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

function hentValgtTema(gsakTema: GsakTema[], event: ChangeEvent<HTMLSelectElement>): GsakTema | undefined {
    return gsakTema.find(tema => tema.kode === event.target.value);
}

function hentValgtUnderkategori(
    event: ChangeEvent<HTMLSelectElement>,
    valgtTema?: GsakTema
): GsakTemaUnderkategori | undefined {
    return valgtTema && valgtTema.underkategorier.find(underkategori => underkategori.kode === event.target.value);
}

function hentValgtOppgavetype(
    event: ChangeEvent<HTMLSelectElement>,
    valgtTema?: GsakTema
): GsakTemaOppgavetype | undefined {
    return valgtTema && valgtTema.oppgavetyper.find(oppgavetype => oppgavetype.kode === event.target.value);
}

function TemaOptions(props: { gsakTema: GsakTema[] }) {
    const options = [
        <option value={''} key={''} disabled>
            Velg tema
        </option>,
        props.gsakTema.map(gsakTema => (
            <option value={`${gsakTema.kode}`} key={gsakTema.kode}>
                {gsakTema.tekst}
            </option>
        ))
    ];

    return <>{options}</>;
}

function UnderkategoriOptions(props: { valgtGsakTema?: GsakTema }) {
    const options = props.valgtGsakTema
        ? [
              <option value={''} key={''}>
                  Ingen underkategori
              </option>,
              props.valgtGsakTema.underkategorier.map(underkategori => (
                  <option value={`${underkategori.kode}`} key={underkategori.kode}>
                      {underkategori.tekst}
                  </option>
              ))
          ]
        : [
              <option value={''} key={''} disabled>
                  Ingen tema valgt
              </option>
          ];

    return <>{options}</>;
}

function OppgavetypeOptions(props: { valgtGsakTema?: GsakTema }) {
    const options = props.valgtGsakTema
        ? [
              <option value={''} key={''} disabled>
                  Velg oppgavetype
              </option>,
              props.valgtGsakTema.oppgavetyper.map(oppgavetype => (
                  <option value={`${oppgavetype.kode}`} key={oppgavetype.kode}>
                      {oppgavetype.tekst}
                  </option>
              ))
          ]
        : [
              <option value={''} key={''} disabled>
                  Ingen tema valgt
              </option>
          ];

    return <>{options}</>;
}

function Prioriteter(props: { valgtGsakTeam?: GsakTema }) {
    const options = props.valgtGsakTeam
        ? [
              <option value={''} key={''} disabled>
                  Velg prioritet
              </option>,
              props.valgtGsakTeam.prioriteter.map(prioritet => (
                  <option value={`${prioritet.kode}`} key={prioritet.kode}>
                      {prioritet.tekst}
                  </option>
              ))
          ]
        : [
              <option value={''} key={''} disabled>
                  Ingen tema valgt
              </option>
          ];
    return <>{options}</>;
}
