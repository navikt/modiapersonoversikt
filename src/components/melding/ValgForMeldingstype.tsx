import type { ReactElement } from 'react';
import { MeldingsType } from 'src/components/melding/VelgMeldingsType';
import type VelgOppgaveliste from 'src/components/melding/VelgOppgaveliste';
import type VelgTema from 'src/components/melding/VelgTema';
import type VelgSak from 'src/components/sakVelger/VelgSak';

interface ValgForMeldingstypeProps {
    meldingsType: MeldingsType;
    velgTema: ReactElement<typeof VelgTema>;
    velgOppgaveliste: ReactElement<typeof VelgOppgaveliste>;
    velgSak: ReactElement<typeof VelgSak>;
}

export function ValgForMeldingstype({ meldingsType, velgTema, velgOppgaveliste, velgSak }: ValgForMeldingstypeProps) {
    switch (meldingsType) {
        case MeldingsType.Referat:
            return velgTema;
        case MeldingsType.Samtale:
            return (
                <>
                    {velgSak}
                    {velgOppgaveliste}
                </>
            );
        case MeldingsType.Infomelding:
            return velgSak;
    }
}
