import React, { useEffect } from 'react';
import { Select, Textarea } from 'nav-frontend-skjema';
import { Ansatt, Enhet } from '../../../../../../../models/meldinger/oppgave';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import AutoComplete from './AutoComplete';
import { hasData, isPending } from '@nutgaard/use-async';
import { FetchResult } from '@nutgaard/use-fetch';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';
import { usePrevious } from '../../../../../../../utils/customHooks';
import { useFetchWithLog } from '../../../../../../../utils/hooks/useFetchWithLog';
import useForeslatteEnheter from './useForeslåtteEnheter';
import useAnsattePaaEnhet from './useAnsattePaaEnhet';
import { hentValgtOppgavetype, hentValgtTema, hentValgtUnderkategori } from './oppgaveUtils';
import { OppgavetypeOptions, Prioriteter, TemaOptions, UnderkategoriOptions } from './SkjemaElementOptions';

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
                onChange={e => props.form.actions.settBeskrivelse(e.currentTarget.value)}
            />
        </>
    );
}
