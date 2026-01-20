import type { JSX } from 'react';
import type { GsakTema } from '../../../../../../../models/meldinger/oppgave';

export function TemaOptions({ gsakTema }: { gsakTema: GsakTema[] }) {
    const options: JSX.Element[] = [
        <option value={''} key={''} disabled>
            {gsakTema ? 'Velg tema' : 'Ingen tema funnet'}
        </option>
    ];

    for (const tema of gsakTema) {
        options.push(
            <option value={tema.kode} key={tema.kode}>
                {tema.tekst}
            </option>
        );
    }

    return <>{options}</>;
}

export function UnderkategoriOptions({ valgtGsakTema }: { valgtGsakTema?: GsakTema }) {
    const options: JSX.Element[] = [
        <option value={''} key={''}>
            {valgtGsakTema ? 'Ingen underkategori' : 'Ingen tema valgt'}
        </option>
    ];

    if (valgtGsakTema?.underkategorier) {
        for (const underkategori of valgtGsakTema.underkategorier) {
            options.push(
                <option value={`${underkategori.kode}`} key={underkategori.kode}>
                    {underkategori.tekst}
                </option>
            );
        }
    }

    return <>{options}</>;
}

export function OppgavetypeOptions({ valgtGsakTema }: { valgtGsakTema?: GsakTema }) {
    const options: JSX.Element[] = [
        <option value={''} key={''} disabled>
            {valgtGsakTema ? 'Ingen oppgavetype' : 'Ingen tema valgt'}
        </option>
    ];

    if (valgtGsakTema?.oppgavetyper) {
        for (const oppgavetype of valgtGsakTema.oppgavetyper) {
            options.push(
                <option value={oppgavetype.kode} key={oppgavetype.kode}>
                    {oppgavetype.tekst}
                </option>
            );
        }
    }

    return <>{options}</>;
}

export function Prioriteter({ valgtGsakTema }: { valgtGsakTema?: GsakTema }) {
    const options: JSX.Element[] = [
        <option value={''} key={''} disabled>
            {valgtGsakTema ? 'Ingen prioritet' : 'Ingen tema valgt'}
        </option>
    ];

    if (valgtGsakTema?.prioriteter) {
        for (const prioritet of valgtGsakTema.prioriteter) {
            options.push(
                <option value={prioritet.kode} key={prioritet.kode}>
                    {prioritet.tekst}
                </option>
            );
        }
    }

    return <>{options}</>;
}
