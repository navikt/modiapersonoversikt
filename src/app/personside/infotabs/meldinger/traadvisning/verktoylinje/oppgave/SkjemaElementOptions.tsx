import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import React from 'react';

export function TemaOptions(props: { gsakTema: GsakTema[] }) {
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

export function UnderkategoriOptions(props: { valgtGsakTema?: GsakTema }) {
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

export function OppgavetypeOptions(props: { valgtGsakTema?: GsakTema }) {
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

export function Prioriteter(props: { valgtGsakTeam?: GsakTema }) {
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
