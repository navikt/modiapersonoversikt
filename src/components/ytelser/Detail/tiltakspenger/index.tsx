import { Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { BarnetilleggPeriode, VedtakDto } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

const TiltaksPengerRetten = ({ tiltaksPenger }: { tiltaksPenger: VedtakDto }) => {
    const entries = {
        'Fra og med': formaterDato(tiltaksPenger.periode.fraOgMed),
        'Til og med': formaterDato(tiltaksPenger.periode.tilOgMed),
        Kilde: tiltaksPenger.kilde,
        Rettighet: tiltaksPenger.rettighet
    };

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Om tiltakspenger
            </Heading>
            <TitleValuePairsComponent entries={entries} columns={4} />
        </Card>
    );
};

const getBarneTilleggEntries = (barnetilleggPeriode: BarnetilleggPeriode) => {
    return {
        'Antall barn': barnetilleggPeriode.antallBarn,
        Periode: `${formaterDato(barnetilleggPeriode.periode.fraOgMed)} - ${formaterDato(barnetilleggPeriode.periode.tilOgMed)}`
    };
};

const TiltaksPengerBarneTillegg = ({ tiltaksPenger }: { tiltaksPenger: VedtakDto }) => {
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Barnetillegg
            </Heading>
            {tiltaksPenger.barnetillegg?.perioder?.map((periode, index) => {
                return <TitleValuePairsComponent key={index} entries={getBarneTilleggEntries(periode)} columns={4} />;
            })}
        </Card>
    );
};

export const TiltaksPengerDetails = ({ tiltaksPenger }: { tiltaksPenger: VedtakDto }) => {
    return (
        <VStack gap="2" minHeight="0">
            <ErrorBoundary boundaryName="tiltaksPengerDetails">
                <TiltaksPengerRetten tiltaksPenger={tiltaksPenger} />
                <TiltaksPengerBarneTillegg tiltaksPenger={tiltaksPenger} />
            </ErrorBoundary>
        </VStack>
    );
};
