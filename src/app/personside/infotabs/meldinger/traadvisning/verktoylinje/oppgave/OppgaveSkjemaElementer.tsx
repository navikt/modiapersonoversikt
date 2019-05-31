import React, { ChangeEvent } from 'react';
import Select from 'nav-frontend-skjema/lib/select';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import {
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OppgavePrioritet
} from '../../../../../../../models/meldinger/oppgave';
import Textarea from 'nav-frontend-skjema/lib/textarea';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import styled from 'styled-components';

const KnappStyle = styled.div`
    display: flex;
    justify-content: space-between;
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
    const valgtTema = props.form.state.valgtTema;
    return (
        <SkjemaStyle>
            <Select
                label={'Tema'}
                onChange={event => props.form.actions.oppdaterStateVedValgtTema(hentValgtTema(props.gsakTema, event))}
            >
                {lagTemaOptions(props.gsakTema)}
            </Select>
            <Select
                label={'Gjelder'}
                onChange={event => props.form.actions.settValgtUnderkategori(hentValgtUnderkategori(event, valgtTema))}
            >
                {lagUnderkategoriOptions(valgtTema)}
            </Select>
            <Select
                label={'Type oppgave'}
                onChange={event => props.form.actions.settValgtOppgavetype(hentValgtOppgavetype(event, valgtTema))}
            >
                {lagOppgavetypeOptions(valgtTema)}
            </Select>
            <RadioPanelGruppe
                radios={[
                    { label: 'Høy', value: OppgavePrioritet.HOY, disabled: !valgtTema },
                    { label: 'Normal', value: OppgavePrioritet.NORM, disabled: !valgtTema },
                    { label: 'Lav', value: OppgavePrioritet.LAV, disabled: !valgtTema }
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
                <Hovedknapp role="submit" disabled={!valgtTema || !props.form.state.valgtOppgavetype}>
                    Send
                </Hovedknapp>
                <LenkeKnapp type="button" onClick={props.lukkPanel}>
                    Avbryt
                </LenkeKnapp>
            </KnappStyle>
        </SkjemaStyle>
    );
}

function hentValgtTema(gsakTema: GsakTema[], event: ChangeEvent<HTMLSelectElement>): GsakTema | undefined {
    return gsakTema.find(tema => tema.kode === event.target.value) || undefined;
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

function lagTemaOptions(gsakTema: GsakTema[]) {
    return [
        <option value={''} key={''}>
            Velg tema
        </option>,
        gsakTema.map(gsakTema => (
            <option value={`${gsakTema.kode}`} key={gsakTema.kode}>
                {gsakTema.tekst}
            </option>
        ))
    ];
}

function lagUnderkategoriOptions(valgtGsakTema?: GsakTema) {
    return valgtGsakTema
        ? [
              <option value={''} key={''}>
                  Velg underkategori
              </option>,
              valgtGsakTema.underkategorier.map(underkategori => (
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
}

function lagOppgavetypeOptions(valgtGsakTema?: GsakTema) {
    return valgtGsakTema
        ? [
              <option value={''} key={''}>
                  Velg oppgavetype
              </option>,
              valgtGsakTema.oppgavetyper.map(oppgavetype => (
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
}
