import { BodyShort } from '@navikt/ds-react';
import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { hentSkjulingsaarsakTekst, type Skjulingsaarsak } from './skjulingsaarsak';

type Props = PropsWithChildren<{
    skjulingsaarsak?: Skjulingsaarsak | null;
    prefiks?: string;
    tekstKomponent?: ComponentType<{ children: ReactNode }>;
}>;

export default function Personopplysninger({ skjulingsaarsak, prefiks, tekstKomponent: Tekst, children }: Props) {
    if (!skjulingsaarsak) {
        return children;
    }

    const aarsak = hentSkjulingsaarsakTekst(skjulingsaarsak);
    const tekst = prefiks ? `${prefiks}: ${aarsak}` : aarsak;

    return Tekst ? <Tekst>{tekst}</Tekst> : <BodyShort size="small">{tekst}</BodyShort>;
}
