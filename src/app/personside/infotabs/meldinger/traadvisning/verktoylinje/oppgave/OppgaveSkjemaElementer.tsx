import React, { ChangeEvent } from 'react';
import { Select } from 'nav-frontend-skjema';
import { RadioPanelGruppe, Textarea } from 'nav-frontend-skjema';
import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OppgavePrioritet
} from '../../../../../../../models/meldinger/oppgave';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import styled from 'styled-components';
import AutoComplete from './AutoComplete';
import { AsyncResult, hasData, isPending, isLoading } from '@nutgaard/use-async';
import useFetch from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';

const credentials: RequestInit = { credentials: 'include' };

const KnappStyle = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        margin: 0;
    }
`;

const SkjemaStyle = styled.div`
    .inputPanelGruppe__inner {
        display: flex;
        > * {
            flex-grow: 1;
        }
    }
`;

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
        <SkjemaStyle>
            <Select
                label={'Tema'}
                onChange={event => props.form.actions.oppdaterStateVedValgtTema(hentValgtTema(props.gsakTema, event))}
            >
                <TemaOptions gsakTema={props.gsakTema} />
            </Select>
            <Select
                label={'Gjelder'}
                onChange={event => props.form.actions.settValgtUnderkategori(hentValgtUnderkategori(event, valgtTema))}
            >
                <UnderkategoriOptions valgtGsakTema={valgtTema} />
            </Select>
            <Select
                label={'Type oppgave'}
                onChange={event => props.form.actions.settValgtOppgavetype(hentValgtOppgavetype(event, valgtTema))}
            >
                <OppgavetypeOptions valgtGsakTema={valgtTema} />
            </Select>
            <AutoComplete<Enhet>
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
            <RadioPanelGruppe
                radios={[
                    { label: 'Høy', value: OppgavePrioritet.HOY },
                    { label: 'Normal', value: OppgavePrioritet.NORM },
                    { label: 'Lav', value: OppgavePrioritet.LAV }
                ]}
                name={'Prioritet'}
                checked={props.form.state.valgtPrioritet}
                legend={'Prioritet'}
                onChange={(_, value) => props.form.actions.settValgtPrioritet(OppgavePrioritet[value])}
            />
            <Textarea
                value={props.form.state.beskrivelse}
                label={'Beskrivelse'}
                onChange={e =>
                    props.form.actions.settBeskrivelse(
                        (e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value
                    )
                }
            />
            <KnappStyle>
                <Hovedknapp htmlType="submit">Send</Hovedknapp>
                <LenkeKnapp type="button" onClick={props.lukkPanel}>
                    Avbryt
                </LenkeKnapp>
            </KnappStyle>
        </SkjemaStyle>
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
        <option value={''} key={''}>
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
                  Velg underkategori
              </option>,
              props.valgtGsakTema.underkategorier.map(underkategori => (
                  <option value={`${underkategori.kode}`} key={underkategori.kode}>
                      {underkategori.tekst}
                  </option>
              ))
          ]
        : [
              <option value={''} key={''}>
                  Ingen tema valgt
              </option>
          ];

    return <>{options}</>;
}

function OppgavetypeOptions(props: { valgtGsakTema?: GsakTema }) {
    const options = props.valgtGsakTema
        ? [
              <option value={''} key={''}>
                  Velg oppgavetype
              </option>,
              props.valgtGsakTema.oppgavetyper.map(oppgavetype => (
                  <option value={`${oppgavetype.kode}`} key={oppgavetype.kode}>
                      {oppgavetype.tekst}
                  </option>
              ))
          ]
        : [
              <option value={''} key={''}>
                  Ingen tema valgt
              </option>
          ];

    return <>{options}</>;
}
