import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
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
import { OppgaveProps, OppgaveSkjemaForm, OppgaveSkjemaProps } from './oppgaveInterfaces';
import AutoComplete from './AutoComplete';
import { AsyncResult, hasData, isPending, isLoading } from '@nutgaard/use-async';
import useFetch from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';
import { useFødselsnummer, usePrevious } from '../../../../../../../utils/customHooks';
import { loggError } from '../../../../../../../utils/frontendLogger';

const credentials: RequestInit = { credentials: 'include' };

function useForeslatteEnheter(form: OppgaveSkjemaForm) {
    const fnr = useFødselsnummer();
    const [foreslatteEnheter, setForeslatteEnheter] = useState<Enhet[]>([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (!form.valgtTema || !form.valgtOppgavetype) {
            return;
        }

        const request = {
            fnr: fnr,
            temakode: form.valgtTema.kode,
            typekode: form.valgtOppgavetype.kode,
            underkategori: form.valgtUnderkategori && form.valgtUnderkategori.kode
        };
        const queryParams = Object.entries(request)
            .filter(entry => entry[1])
            .map(entry => entry[0] + '=' + entry[1])
            .join('&');

        setPending(true);
        fetch(`${apiBaseUri}/enheter/oppgavebehandlere/foreslatte?${queryParams}`, credentials)
            .then(response => response.json())
            .then(setForeslatteEnheter)
            .catch(e => loggError(e, 'Feil ved henting av foreslåtte enheter'))
            .finally(() => setPending(false));
    }, [form.valgtTema, form.valgtOppgavetype, form.valgtUnderkategori, fnr]);

    return useMemo(
        () => ({
            pending,
            foreslatteEnheter
        }),
        [pending, foreslatteEnheter]
    );
}

export function OppgaveSkjemaElementer(props: OppgaveProps & { form: OppgaveSkjemaProps }) {
    const enhetliste: AsyncResult<Array<Enhet>> = useFetch<Array<Enhet>>(
        `${apiBaseUri}/enheter/oppgavebehandlere/alle`,
        credentials
    );
    const foreslatteEnheter = useForeslatteEnheter(props.form.state);
    const ansattliste: AsyncResult<Array<Ansatt>> = useFetch<Array<Ansatt>>(
        `${apiBaseUri}/enheter/${props.form.state.valgtEnhet ? props.form.state.valgtEnhet.enhetId : '_'}/ansatte`,
        credentials
    );
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
                suggestions={hasData(ansattliste) ? ansattliste.data : []}
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
