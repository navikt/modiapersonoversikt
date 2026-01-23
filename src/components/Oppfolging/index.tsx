import { Alert, BodyShort, Heading, HGrid, Skeleton, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import {
    getMeldeplikt,
    getOppfolgingEnhet,
    getVeileder,
    use14aVedtak,
    useOppfolging
} from 'src/components/Oppfolging/utils';
import { datoEllerNull } from 'src/utils/string-utils';

const OppfolgingDetaljer = () => {
    const { data: utvidetOppfolging, isLoading } = useOppfolging();

    return (
        <ErrorBoundary boundaryName="oppfolgingDetaljer">
            {isLoading ? (
                <Skeleton variant="rounded" height={166} />
            ) : utvidetOppfolging ? (
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
                                {utvidetOppfolging.oppfolging?.erUnderOppfolging
                                    ? 'Under oppfølging'
                                    : 'Ikke under oppfølging'}
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
            ) : (
                <Alert variant="info">Brukeren har ingen oppfølging.</Alert>
            )}
        </ErrorBoundary>
    );
};

const Gjeldende14aVedtakDetaljer = () => {
    const {
        data: { gjeldende14aVedtak },
        isLoading
    } = use14aVedtak();

    return (
        <ErrorBoundary boundaryName="gjeldende14aVedtakDetaljer">
            {isLoading ? (
                <Skeleton variant="rounded" height={166} />
            ) : (
                <Card padding="4">
                    <Heading as="h4" size="small">
                        14 a-vedtak
                    </Heading>
                    <HGrid gap="4" columns={{ sm: 1, md: 2 }} className="mt-4">
                        <VStack justify="space-between">
                            <BodyShort size="small" weight="semibold">
                                Status:
                            </BodyShort>
                            <BodyShort size="small">
                                {gjeldende14aVedtak ? 'Har 14a vedtak' : 'Har ikke 14a vedtak'}
                            </BodyShort>
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
            )}
        </ErrorBoundary>
    );
};

const OppfolgingPageContent = () => {
    const { errorMessages: gjeldende14aVedtakErrorMessage } = use14aVedtak();
    const { errorMessages: utvidetOppfolgingErrorMessage } = useOppfolging();

    return (
        <VStack gap="2" minHeight="0" overflow="auto">
            <Heading visuallyHidden size="small">
                Oppfølging
            </Heading>
            <AlertBanner alerts={[...gjeldende14aVedtakErrorMessage, ...utvidetOppfolgingErrorMessage]} />
            <OppfolgingDetaljer />
            <Gjeldende14aVedtakDetaljer />
        </VStack>
    );
};

export const OppfolgingPage = () => {
    return (
        <ErrorBoundary boundaryName="OppgaverPage" errorText="Det oppstod en feil under lasting av oppgaver.">
            <OppfolgingPageContent />
        </ErrorBoundary>
    );
};
