import { BodyShort } from '@navikt/ds-react';
import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import type { Tilgangsavslag } from 'src/lib/types/modiapersonoversikt-api';
import { hentSkjulingsaarsakTekst, type Skjulingsaarsak } from './skjulingsaarsak';

type Props = PropsWithChildren<{
    skjulingsaarsak?: Skjulingsaarsak | null;
    tilgangsavslag?: Tilgangsavslag | null;
    prefiks?: string;
    tekstKomponent?: ComponentType<{ children: ReactNode }>;
}>;

export default function Personopplysninger({
    skjulingsaarsak,
    tilgangsavslag,
    prefiks,
    tekstKomponent: Tekst,
    children
}: Props) {
    if (!skjulingsaarsak) {
        return children;
    }

    const aarsak = hentSkjulingsaarsakTekst(skjulingsaarsak, tilgangsavslag);
    const tekst = <span className="wrap-anywhere">{prefiks ? `${prefiks}: ${aarsak}` : aarsak}</span>;

    return Tekst ? <Tekst>{tekst}</Tekst> : <BodyShort size="small">{tekst}</BodyShort>;
}
