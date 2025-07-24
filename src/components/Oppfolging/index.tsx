import { BodyShort, HGrid, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { Suspense } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { getMeldeplikt, getOppfolgingEnhet, getVeileder } from 'src/components/Oppfolging/utils';
import { useGjeldende14aVedtak, useOppfolging } from 'src/lib/clients/modiapersonoversikt-api';
import { datoEllerNull } from 'src/utils/string-utils';

const OppfolgingDetaljer = () => {
    const utvidetOppfolgingResponse = useOppfolging();
    const utvidetOppfolging = utvidetOppfolgingResponse.data;
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Arbeidsoppfølging
            </Heading>
            <HGrid gap="4" columns={{ sm: 1, md: 2, lg: 4 }} className="mt-2">
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Status:
                    </BodyShort>
                    <BodyShort size="small">
                        {utvidetOppfolging.oppfolging?.erUnderOppfolging ? 'Under oppfølging' : 'Ikke under oppfølging'}
                    </BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Oppfølgingsenhet:
                    </BodyShort>
                    <BodyShort size="small">{getOppfolgingEnhet(utvidetOppfolging.oppfolging)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Rettighetsgruppe:
                    </BodyShort>
                    <BodyShort size="small">{utvidetOppfolging.rettighetsgruppe}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Veileder:
                    </BodyShort>
                    <BodyShort size="small">{getVeileder(utvidetOppfolging.oppfolging?.veileder)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Meldeplikt:
                    </BodyShort>
                    <BodyShort size="small">{getMeldeplikt(utvidetOppfolging.meldeplikt)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Formidlingsgruppe:
                    </BodyShort>
                    <BodyShort size="small">{utvidetOppfolging.formidlingsgruppe}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Oppfølgingsvedtak:
                    </BodyShort>
                    <BodyShort size="small">{utvidetOppfolging.vedtaksdato}</BodyShort>
                </VStack>
            </HGrid>
        </Card>
    );
};

const Gjeldende14aVedtakDetaljer = () => {
    const gjeldende14aVedtakResponse = useGjeldende14aVedtak();
    const gjeldende14aVedtak = gjeldende14aVedtakResponse.data.gjeldende14aVedtak;

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                14 a-vedtak
            </Heading>{' '}
            <HGrid gap="4" columns={{ sm: 1, md: 2 }} className="mt-4">
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Status:
                    </BodyShort>
                    <BodyShort size="small">{gjeldende14aVedtak ? 'Har 14a vedtak' : 'Har ikke 14a vedtak'}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Innsatsgruppe:
                    </BodyShort>
                    <BodyShort size="small">{gjeldende14aVedtak?.innsatsgruppe.beskrivelse}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Hovedmål:
                    </BodyShort>
                    <BodyShort size="small">{gjeldende14aVedtak?.hovedmal?.beskrivelse}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Vedtaksdato:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(gjeldende14aVedtak?.fattetDato)}</BodyShort>
                </VStack>
            </HGrid>
        </Card>
    );
};

export const OppfolgingPage = () => {
    return (
        <VStack gap="2" minHeight="0" className="overflow-auto">
            <Heading size="xsmall">Oppfølging</Heading>
            <ErrorBoundary boundaryName="oppfolgingDetaljer">
                <Suspense fallback={<Skeleton variant="rounded" height={166} />}>
                    <OppfolgingDetaljer />
                </Suspense>
            </ErrorBoundary>
            <Heading size="xsmall" className="mt-4">
                14 a-vedtak
            </Heading>
            <ErrorBoundary boundaryName="gjeldende14aVedtakDetaljer">
                <Suspense fallback={<Skeleton variant="rounded" height={166} />}>
                    <Gjeldende14aVedtakDetaljer />
                </Suspense>
            </ErrorBoundary>
        </VStack>
    );
};
