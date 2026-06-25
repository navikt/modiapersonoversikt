import { Radio, RadioGroup } from '@navikt/ds-react';
import { Normaltekst } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import { useDisableDialog } from 'src/lib/state/dialog';
import { TraadType } from 'src/lib/types/modiapersonoversikt-api';

interface VelgMeldingsTypeProps {
    meldingsType?: MeldingsType;
    setMeldingsType: (meldingsType: MeldingsType) => void;
    error?: ReactNode;
}

export function VelgMeldingsType({ meldingsType, setMeldingsType, error }: VelgMeldingsTypeProps) {
    const disableDialog = useDisableDialog();
    return (
        <RadioGroup
            error={error}
            legend="Velg type dialog"
            onChange={setMeldingsType}
            value={meldingsType}
            size="small"
            disabled={disableDialog}
        >
            <MeldingsTypeRadioKnapper />
        </RadioGroup>
    );
}

function MeldingsTypeRadioKnapper() {
    return Object.entries(MeldingsType).map(([key, value]) => (
        <Radio
            className="p-[0.3rem]"
            key={key}
            value={value}
            description={meldingsTyperTekst[value].beskrivelse}
            size="small"
        >
            <Normaltekst className="font-ax-bold">{value}</Normaltekst>
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
        beskrivelse: 'Bruker mottar ikke varsel, og kan ikke svare'
    },
    Samtale: {
        tittel: 'Samtale',
        beskrivelse: 'Bruker mottar varsel, og kan svare'
    },
    Infomelding: {
        tittel: 'Infomelding',
        beskrivelse: 'Bruker mottar varsel, og kan ikke svare'
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
