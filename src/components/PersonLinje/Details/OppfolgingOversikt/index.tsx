import { CheckmarkCircleIcon, ChevronRightIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Skeleton, Tag, VStack } from '@navikt/ds-react';
import { useNavigate } from '@tanstack/react-router';
import { useArbeidsoppfolging, useGjeldende14aVedtak } from 'src/lib/clients/modiapersonoversikt-api';
import { SeksjonFeil } from '../components';
import KlikkbartKort from '../KlikkbartKort';

function OppfolgingOversikt() {
    const navigate = useNavigate();
    const { data, isLoading, errorMessages: oppfolgingFeil } = useArbeidsoppfolging();
    const { data: vedtakData, isLoading: isLoadingVedtak, errorMessages: vedtakFeil } = useGjeldende14aVedtak();

    if (isLoading || isLoadingVedtak) {
        return <Skeleton variant="rectangle" height={80} />;
    }

    if (oppfolgingFeil.length > 0) {
        return <SeksjonFeil feilmeldinger={oppfolgingFeil} />;
    }

    const oppfolging = data?.oppfolging;

    if (!oppfolging?.erUnderOppfolging) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ikke under arbeidsrettet oppfølging
            </BodyShort>
        );
    }

    const veileder = oppfolging.veileder;

    return (
        <VStack gap="space-8">
            {vedtakFeil.length > 0 && <SeksjonFeil feilmeldinger={vedtakFeil} />}
            <KlikkbartKort
                padding="space-12"
                style={{ backgroundColor: 'var(--ax-bg-warning-soft)' }}
                ariaLabel="Arbeidsoppfølging – gå til oppfølging"
                onAktiver={() => navigate({ to: '/new/person/oppfolging' })}
            >
                <HStack justify="space-between" align="center" wrap={false} gap="space-8">
                    <VStack gap="space-24" style={{ minWidth: 0 }}>
                        <VStack gap="space-4">
                            <BodyShort size="small" weight="semibold">
                                Arbeidsoppfølging
                            </BodyShort>
                            {veileder && (
                                <BodyShort size="small" textColor="subtle">
                                    Veileder: {veileder.navn} ({veileder.ident})
                                </BodyShort>
                            )}
                        </VStack>
                        {vedtakFeil.length > 0 ? null : vedtakData?.gjeldende14aVedtak ? (
                            <Tag
                                data-color="success"
                                variant="moderate"
                                size="small"
                                icon={<CheckmarkCircleIcon aria-hidden />}
                                style={{ width: 'fit-content' }}
                            >
                                § 14 a-vedtak
                            </Tag>
                        ) : (
                            <Tag
                                data-color="danger"
                                variant="moderate"
                                size="small"
                                icon={<XMarkOctagonIcon aria-hidden />}
                                style={{ width: 'fit-content' }}
                            >
                                Ikke § 14 a-vedtak
                            </Tag>
                        )}
                    </VStack>
                    <ChevronRightIcon fontSize="1.5rem" aria-hidden style={{ flexShrink: 0 }} />
                </HStack>
            </KlikkbartKort>
        </VStack>
    );
}

export default OppfolgingOversikt;
