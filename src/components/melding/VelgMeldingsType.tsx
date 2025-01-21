import { Radio, RadioGroup } from '@navikt/ds-react';

export interface VelgMeldingsTypeProps {
    meldingsType: MeldingsType;
    setMeldingsType: (meldingsType: MeldingsType) => void;
}

export function VelgMeldingsType({ meldingsType, setMeldingsType }: VelgMeldingsTypeProps) {
    const meldingsTypeRadioKnapper = Object
        .entries(MeldingsType)
        .map(([key, value]) => (
            <Radio key={key} value={value}>{value}</Radio>
        ));

    return <RadioGroup
        legend="Type dialog"
        onChange={setMeldingsType}
        value={meldingsType}
        size="small"
    >
        {meldingsTypeRadioKnapper}
    </RadioGroup>;
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