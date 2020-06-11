import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import React from 'react';

export function TemaOptions(props: { gsakTema: GsakTema[] }) {
    const options = (props.gsakTema ?? []).map(tema => (
        <option value={tema.kode} key={tema.kode}>
            {tema.tekst}
        </option>
    ));
    options.unshift(
        <option value={''} key={''} disabled>
            {props.gsakTema ? 'Velg Tema' : 'Ingen tema funnet'}
        </option>
    );

    return <>{options}</>;
}

export function UnderkategoriOptions(props: { valgtGsakTema?: GsakTema }) {
    const options = (props.valgtGsakTema?.underkategorier ?? []).map(underkategori => (
        <option value={`${underkategori.kode}`} key={underkategori.kode}>
            {underkategori.tekst}
        </option>
    ));
    options.unshift(
        <option value={''} key={''} disabled>
            {props.valgtGsakTema ? 'Ingen underkategori' : 'Ingen tema valgt'}
        </option>
    );

    return <>{options}</>;
}

export function OppgavetypeOptions(props: { valgtGsakTema?: GsakTema }) {
    const options = (props.valgtGsakTema?.oppgavetyper ?? []).map(oppgavetype => (
        <option value={oppgavetype.kode} key={oppgavetype.kode}>
            {oppgavetype.tekst}
        </option>
    ));
    options.unshift(
        <option value={''} key={''} disabled>
            {props.valgtGsakTema ? 'Ingen oppgavetype' : 'Ingen tema valgt'}
        </option>
    );

    return <>{options}</>;
}

export function Prioriteter(props: { valgtGsakTeam?: GsakTema }) {
    const options = (props.valgtGsakTeam?.prioriteter ?? []).map(prioritet => (
        <option value={prioritet.kode} key={prioritet.kode}>
            {prioritet.tekst}
        </option>
    ));
    options.unshift(
        <option value={''} key={''} disabled>
            {props.valgtGsakTeam ? 'Ingen prioritet' : 'Ingen tema valgt'}
        </option>
    );
    return <>{options}</>;
}
