import { MeldingsType } from 'src/components/melding/VelgMeldingsType';
import { ReactElement } from 'react';
import VelgTema from 'src/components/melding/VelgTema';
import VelgOppgaveliste from 'src/components/melding/VelgOppgaveliste';
import VelgSak from 'src/components/melding/VelgSak';
import AvsluttDialogEtterSending from 'src/components/melding/AvsluttDialogEtterSending';

interface ValgForMeldingstypeProps {
    meldingsType: MeldingsType;
    velgTema: ReactElement<typeof VelgTema>;
    velgOppgaveliste: ReactElement<typeof VelgOppgaveliste>;
    velgSak: ReactElement<typeof VelgSak>;
    avsluttDialogEtterSending: ReactElement<typeof AvsluttDialogEtterSending>;
}

export function ValgForMeldingstype(
    {
        meldingsType,
        velgTema,
        velgOppgaveliste,
        velgSak,
        avsluttDialogEtterSending
    }: ValgForMeldingstypeProps
) {
    switch (meldingsType) {
        case MeldingsType.Referat:
            return velgTema;
        case MeldingsType.Samtale:
            return <>
                {velgSak}
                {velgOppgaveliste}
                {avsluttDialogEtterSending}
            </>;
        case MeldingsType.Infomelding:
            return velgSak;
    }
}