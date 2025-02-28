import { Radio, RadioGroup } from '@navikt/ds-react';
import { TraadType } from 'src/lib/types/modiapersonoversikt-api';

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

function MeldingsTypeRadioKnapper() {
    return Object.entries(MeldingsType).map(([key, value]) => (
        <Radio key={key} value={value}>
            {value}
        </Radio>
    ));
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
export default MeldingsTypeRadioKnapper;

export const traadTypeToMeldingsType = (traadType: TraadType): MeldingsType => {
    switch (traadType) {
        case TraadType.SAMTALEREFERAT:
            return MeldingsType.Referat;
        case TraadType.MELDINGSKJEDE:
        case TraadType.CHAT:
            return MeldingsType.Samtale;
    }
};
