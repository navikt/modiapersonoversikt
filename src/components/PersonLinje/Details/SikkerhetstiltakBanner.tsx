import { BodyShort, Detail, LocalAlert, VStack } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import { hentPeriodeTekst } from '../utils';

type Sikkerhetstiltak = PersonData['sikkerhetstiltak'][number];

function periodeTekst(sikkerhetstiltak: Sikkerhetstiltak) {
    const fra = sikkerhetstiltak.gyldighetsPeriode?.gyldigFraOgMed;
    const til = sikkerhetstiltak.gyldighetsPeriode?.gyldigTilOgMed;

    if (fra && til) return `Gyldig: ${hentPeriodeTekst(fra, til)}`;
    if (fra) return `Gyldig fra: ${formaterDato(fra)}`;
    if (til) return `Gyldig til: ${formaterDato(til)}`;
    return null;
}

function Tiltak({ tiltak }: { tiltak: Sikkerhetstiltak }) {
    const gyldighet = periodeTekst(tiltak);

    return (
        <div>
            {gyldighet && <Detail>{gyldighet}</Detail>}
            <BodyShort>{tiltak.beskrivelse}</BodyShort>
        </div>
    );
}

function SikkerhetstiltakBanner() {
    const { data } = usePersonData();
    const sikkerhetstiltak = data?.person?.sikkerhetstiltak;

    if (!sikkerhetstiltak || sikkerhetstiltak.isEmpty()) return null;

    return (
        <LocalAlert status="warning" className="w-full">
            <LocalAlert.Header className="justify-center">
                <LocalAlert.Title>Sikkerhetstiltak</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content className="text-center">
                <VStack gap="space-12">
                    {sikkerhetstiltak.map((tiltak, index) => (
                        <Tiltak
                            key={`${tiltak.type}-${tiltak.gyldighetsPeriode?.gyldigFraOgMed ?? ''}-${index}`}
                            tiltak={tiltak}
                        />
                    ))}
                </VStack>
            </LocalAlert.Content>
        </LocalAlert>
    );
}

export default SikkerhetstiltakBanner;
