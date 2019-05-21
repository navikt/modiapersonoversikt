import { GsakTema, GsakTemaOppgavetype, GsakTemaUnderkategori } from '../../../../../../../models/meldinger/oppgave';
import React, { ChangeEvent } from 'react';

export function hentValgtTema(gsakTema: GsakTema[], event: ChangeEvent<HTMLSelectElement>): GsakTema | undefined {
    return gsakTema.find(tema => tema.kode === event.target.value) || undefined;
}

export function hentValgtUnderkategori(
    event: ChangeEvent<HTMLSelectElement>,
    valgtTema?: GsakTema
): GsakTemaUnderkategori | undefined {
    return valgtTema && valgtTema.underkategorier.find(underkategori => underkategori.kode === event.target.value);
}

export function hentValgtOppgavetype(
    event: ChangeEvent<HTMLSelectElement>,
    valgtTema?: GsakTema
): GsakTemaOppgavetype | undefined {
    return valgtTema && valgtTema.oppgavetyper.find(oppgavetype => oppgavetype.kode === event.target.value);
}

export function lagTemaOptions(gsakTema: GsakTema[]) {
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

export function lagUnderkategoriOptions(valgtGsakTema?: GsakTema) {
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

export function lagOppgavetypeOptions(valgtGsakTema?: GsakTema) {
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
