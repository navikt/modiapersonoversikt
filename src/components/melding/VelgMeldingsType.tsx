import { Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { TraadType } from 'src/lib/types/modiapersonoversikt-api';

interface VelgMeldingsTypeProps {
    meldingsType: MeldingsType;
    setMeldingsType: (meldingsType: MeldingsType) => void;
}

export function VelgMeldingsType({ meldingsType, setMeldingsType }: VelgMeldingsTypeProps) {
    return (
        <RadioGroup legend="Type dialog" hideLegend onChange={setMeldingsType} value={meldingsType} size="small">
            <VStack gap="1">
                <MeldingsTypeRadioKnapper valgtMeldingsType={meldingsType} />
            </VStack>
        </RadioGroup>
    );
}

function MeldingsTypeRadioKnapper({ valgtMeldingsType }: { valgtMeldingsType: MeldingsType }) {
    return Object.entries(MeldingsType).map(([key, value]) => (
        <Radio
            key={key}
            value={value}
            description={valgtMeldingsType === value ? meldingsTyperTekst[value].beskrivelse : ''}
        >
            {value}
        </Radio>
    ));
}

export enum MeldingsType {
    Referat = 'Referat',
    Samtale = 'Samtale',
    Infomelding = 'Infomelding'
}

interface MeldingsTypeTekst {
    tittel: string;
    beskrivelse: string;
}

export const meldingsTyperTekst: Record<MeldingsType, MeldingsTypeTekst> = {
    Referat: {
        tittel: 'Referat',
        beskrivelse: 'Bruker får ikke varsel, og kan ikke svare'
    },
    Samtale: {
        tittel: 'Samtale',
        beskrivelse: 'Brukeren mottar varsel, og kan svare.'
    },
    Infomelding: {
        tittel: 'Infomelding',
        beskrivelse: 'Bruker mottar varsel, men kan ikke svare.'
    }
} as const;

export const traadTypeToMeldingsType = (traadType: TraadType): MeldingsType => {
    switch (traadType) {
        case TraadType.SAMTALEREFERAT:
            return MeldingsType.Referat;
        case TraadType.MELDINGSKJEDE:
        case TraadType.CHAT:
            return MeldingsType.Samtale;
    }
};
