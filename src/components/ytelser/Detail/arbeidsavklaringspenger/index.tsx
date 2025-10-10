import { Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { Arbeidsavklaringspenger } from 'src/models/ytelse/arbeidsavklaringspenger';
import { formaterDato } from 'src/utils/string-utils';

const Arbeidsavklaringspenger = ({ aap }: { aap: Arbeidsavklaringspenger }) => {
    const entries = {
        VedtaksId: aap.vedtakId,
        Vedtaksdato: aap.vedtaksdato ? formaterDato(aap.vedtaksdato) : '',
        'Fra og med': aap.periode.fraOgMedDato ? formaterDato(aap.periode.fraOgMedDato) : '',
        'Til og med': aap.periode.tilOgMedDato ? formaterDato(aap.periode.tilOgMedDato) : '',
        Rettighet: aap.rettighetsType ?? '',
        Status: aap.status ?? '',
        Kilde: aap.kildesystem ?? '',
        Dagsats: aap.dagsats ?? '',
        ...(aap.opphorsAarsak ? { Opphørsårsak: aap.opphorsAarsak } : {})
    };

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Om arbeidsavklaringspenger
            </Heading>
            <TitleValuePairsComponent entries={entries} columns={{ xs: 2, lg: 4 }} />
        </Card>
    );
};

const BarneTillegg = ({ aap }: { aap: Arbeidsavklaringspenger }) => {
    if (aap.barnMedStonad === 0) return;

    const entries = {
        'Barn med stønad': aap.barnMedStonad ?? 0,
        Barnetillegg: aap.barnetillegg ?? ''
    };

    return (
        <Card padding="4">
            <Heading as="h4" size="xsmall">
                Barnetillegg
            </Heading>
            <TitleValuePairsComponent entries={entries} columns={{ xs: 2, lg: 4 }} />
        </Card>
    );
};

export const ArbeidsavklaringspengerDetails = ({ aap }: { aap: Arbeidsavklaringspenger }) => {
    return (
        <VStack gap="2" minHeight="0">
            <ErrorBoundary boundaryName="arbreidsavklaringspengerBoundary">
                <Arbeidsavklaringspenger aap={aap} />
                <BarneTillegg aap={aap} />
            </ErrorBoundary>
        </VStack>
    );
};
