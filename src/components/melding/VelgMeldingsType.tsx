import { RadioGroup } from '@navikt/ds-react';
import MeldingsTypeRadioKnapper from 'src/components/melding/MeldingsTypeRadioKnapper';

export interface VelgMeldingsTypeProps {
    meldingsType: MeldingsType;
    setMeldingsType: (meldingsType: MeldingsType) => void;
}

export function VelgMeldingsType({ meldingsType, setMeldingsType }: VelgMeldingsTypeProps) {
    return (
        <RadioGroup legend="Type dialog" onChange={setMeldingsType} value={meldingsType} size="small">
            <MeldingsTypeRadioKnapper />
        </RadioGroup>
    );
}

export enum MeldingsType {
    Referat = 'Referat',
    Samtale = 'Samtale',
    Infomelding = 'Infomelding'
}

export interface MeldingsTypeTekst {
    tittel: string;
    beskrivelse: string;
}

export const meldingsTyperTekst: Record<MeldingsType, MeldingsTypeTekst> = {
    Referat: {
        tittel: 'Nytt referat',
        beskrivelse: 'Brukeren kan se referatet, men mottar ikke varsel.'
    },
    Samtale: {
        tittel: 'Ny samtale',
        beskrivelse: 'Brukeren mottar varsel og kan svare.'
    },
    Infomelding: {
        tittel: 'Ny infomelding',
        beskrivelse: 'Brukeren mottar varsel, men kan ikke svare.'
    }
} as const;
