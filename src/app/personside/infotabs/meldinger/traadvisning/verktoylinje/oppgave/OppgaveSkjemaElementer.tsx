import React, { ChangeEvent } from 'react';
import { Select } from 'nav-frontend-skjema';
import { Textarea } from 'nav-frontend-skjema';
import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OppgavePrioritet
} from '../../../../../../../models/meldinger/oppgave';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import AutoComplete from './AutoComplete';
import { AsyncResult, hasData, isPending, isLoading } from '@nutgaard/use-async';
import useFetch from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';

const credentials: RequestInit = { credentials: 'include' };

export function OppgaveSkjemaElementer(props: OppgaveProps & { form: OppgaveSkjemaProps }) {
    const enhetliste: AsyncResult<Array<Enhet>> = useFetch<Array<Enhet>>(
        `${apiBaseUri}/enheter/dialog/oppgave/alle`,
        credentials
    );
    const ansattliste: AsyncResult<Array<Ansatt>> = useFetch<Array<Ansatt>>(
        `${apiBaseUri}/enheter/${props.form.state.valgtEnhet ? props.form.state.valgtEnhet.enhetId : '_'}/ansatte`,
        credentials
    );
    const valgtTema = props.form.state.valgtTema;

    return (
        <>
            <Select
                feil={
                    props.form.valideringsResultat.felter.valgtTema &&
                    props.form.valideringsResultat.felter.valgtTema.skjemafeil
                }
                label={'Tema'}
                onChange={event => props.form.actions.oppdaterStateVedValgtTema(hentValgtTema(props.gsakTema, event))}
                value={(props.form.state.valgtTema && props.form.state.valgtTema.kode) || ''}
            >
                <TemaOptions gsakTema={props.gsakTema} />
            </Select>
            <Select
                feil={
                    props.form.valideringsResultat.felter.valgtUnderkategori &&
                    props.form.valideringsResultat.felter.valgtUnderkategori.skjemafeil
                }
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
            <AutoComplete<Enhet>
                feil={
                    props.form.valideringsResultat.felter.valgtEnhet &&
                    props.form.valideringsResultat.felter.valgtEnhet.skjemafeil
                }
                setValue={enhet => {
                    props.form.actions.settValgtEnhet(enhet);
                }}
                inputValue={undefined}
                itemToString={enhet => `${enhet.enhetId} ${enhet.enhetNavn}`}
                label={'Velg enhet'}
                suggestions={hasData(enhetliste) ? enhetliste.data : []}
                filter={(enhet, value) =>
                    enhet.enhetId.includes(value) || enhet.enhetNavn.toLowerCase().includes(value.toLowerCase())
                }
                spinner={isPending(enhetliste)}
            />
            <AutoComplete<Ansatt>
                setValue={ansatt => {
                    props.form.actions.settValgtAnsatt(ansatt);
                }}
                inputValue={undefined}
                itemToString={ansatt => `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})`}
                label={'Velg ansatt'}
                suggestions={hasData(ansattliste) ? ansattliste.data : []}
                filter={(ansatt, value) =>
                    ansatt.fornavn.toLowerCase().includes(value.toLowerCase()) ||
                    ansatt.etternavn.toLowerCase().includes(value.toLowerCase()) ||
                    ansatt.ident.toLowerCase().includes(value.toLowerCase())
                }
                spinner={isLoading(ansattliste)}
            />
            <Select
                value={OppgavePrioritet.NORM}
                label={'Velg prioritert'}
                onChange={value => props.form.actions.settValgtPrioritet(OppgavePrioritet[value.target.value])}
            >
                <option value={OppgavePrioritet.HOY}>Høy</option>
                <option value={OppgavePrioritet.NORM}>Normal</option>
                <option value={OppgavePrioritet.LAV}>Lav</option>
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
