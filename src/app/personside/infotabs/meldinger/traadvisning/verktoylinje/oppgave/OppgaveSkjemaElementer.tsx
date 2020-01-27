import React, { ChangeEvent, useEffect } from 'react';
import { Select, Textarea } from 'nav-frontend-skjema';
import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori
} from '../../../../../../../models/meldinger/oppgave';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import AutoComplete from './AutoComplete';
import { hasData, isPending } from '@nutgaard/use-async';
import { FetchResult } from '@nutgaard/use-fetch';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';
import { usePrevious } from '../../../../../../../utils/customHooks';
import { useFetchWithLog } from '../../../../../../../utils/hooks/useFetchWithLog';
import useForeslatteEnheter from './useForeslåtteEnheter';
import useAnsattePaaEnhet from './useAnsattePaaEnhet';

export function OppgaveSkjemaElementer(props: OppgaveProps & { form: OppgaveSkjemaProps }) {
    const enhetliste: FetchResult<Array<Enhet>> = useFetchWithLog<Array<Enhet>>(
        `${apiBaseUri}/enheter/oppgavebehandlere/alle`,
        'LagOppgave-Enheter',
        includeCredentials
    );
    const foreslatteEnheter = useForeslatteEnheter(props.form.state);
    const ansattliste = useAnsattePaaEnhet(props.form.state.valgtEnhet);
    const valgtTema = props.form.state.valgtTema;

    const prevForeslatteEnheter = usePrevious(foreslatteEnheter);
    useEffect(
        function automatiskVelgForeslattEnhet() {
            if (prevForeslatteEnheter === foreslatteEnheter) {
                return;
            }
            if (!props.form.state.valgtEnhet && foreslatteEnheter.foreslatteEnheter.length === 1) {
                props.form.actions.settValgtEnhet(foreslatteEnheter.foreslatteEnheter[0]);
            }
        },
        [foreslatteEnheter, props.form.actions, props.form.state.valgtEnhet, prevForeslatteEnheter]
    );

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
            <AutoComplete<Enhet>
                feil={
                    props.form.valideringsResultat.felter.valgtEnhet &&
                    props.form.valideringsResultat.felter.valgtEnhet.skjemafeil
                }
                setValue={enhet => {
                    props.form.actions.settValgtEnhet(enhet);
                }}
                value={props.form.state.valgtEnhet}
                itemToString={enhet => `${enhet.enhetId} ${enhet.enhetNavn}`}
                label={'Velg enhet'}
                suggestions={hasData(enhetliste) ? enhetliste.data : []}
                topSuggestions={foreslatteEnheter.foreslatteEnheter}
                topSuggestionsLabel="Foreslåtte enheter"
                otherSuggestionsLabel="Andre enheter"
                spinner={isPending(enhetliste) || foreslatteEnheter.pending}
            />
            <AutoComplete<Ansatt>
                setValue={ansatt => {
                    props.form.actions.settValgtAnsatt(ansatt);
                }}
                value={props.form.state.valgtAnsatt}
                itemToString={ansatt => `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})`}
                label={'Velg ansatt'}
                suggestions={ansattliste.ansatte}
                spinner={ansattliste.pending}
            />
            <Select
                value={props.form.state.valgtPrioritet || ''}
                label={'Velg prioritert'}
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
